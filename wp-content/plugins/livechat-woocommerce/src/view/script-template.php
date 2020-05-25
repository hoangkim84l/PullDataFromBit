<?php
/**
 * Script template. This template is included to all public pages. Includes LiveChat window script and function for
 * updating LiveChat custom parameters.
 *
 * @category Public pages
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
header( "Content-type: text/javascript; charset: UTF-8" );

$integration_settings = (isset($integration_settings)) ? $integration_settings : [];

$integration_settings['disableMobile'] = (array_key_exists('disableMobile', $integration_settings)) ? $integration_settings['disableMobile'] : 0;
$integration_settings['disableGuests'] = (array_key_exists('disableGuests', $integration_settings)) ? $integration_settings['disableGuests'] : 0;


if (!$integration_settings['disableMobile'] || ($integration_settings['disableMobile']) && !$check_mobile) {
if (!$integration_settings['disableGuests'] || ($integration_settings['disableGuests']) && $check_logged) {  ?>
var __lc = {};
__lc.license = <?php echo $license_id ?>;
__lc.visitor = {
    name: "<?php echo $visitor_name ?>",
    email: "<?php echo $visitor_email ?>"
};
__lc.params = [
<?php foreach ($custom_data as $key => $value): ?>
    { name: '<?php echo $key ?>', value: '<?php echo $value ?>' },
<?php endforeach ?>
];
(function() {
var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = true;
lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.livechatinc.com/tracking.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
})();

function checkCart() {
    var params = 'action=wc-livechat-check-cart';
    var obj;
    try {
        obj = new XMLHttpRequest();
    } catch(e){
        try {
        obj = new ActiveXObject("Msxml2.XMLHTTP");
        } catch(e) {
            try {
            obj = new ActiveXObject("Microsoft.XMLHTTP");
            } catch(e) {
                return false;
            }
        }
    }
    obj.onreadystatechange = function() {
        if(obj.readyState === 4) {
            var currentParams = JSON.parse(obj.responseText);
            if (JSON.stringify(__lc.params) !== JSON.stringify(currentParams)) {
                LC_API.set_custom_variables(currentParams);
                __lc.params = currentParams;
            }
        }
    }
    setTimeout(function(){
        obj.open('POST', '<?php echo $ajax_url ?>', true);
        obj.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
        obj.send(params);
    }, 1000);
    return obj;
}

var xhrOpen = window.XMLHttpRequest.prototype.open;

function catchOpen(method, url) {

    var reAdd = new RegExp("(wc-ajax=add_to_cart)"),
        reRefresh = new RegExp("(wc-ajax=get_refreshed_fragments)"),
        reRemove = new RegExp("(wc-ajax=remove_from_cart)");

    if ( ( reAdd.test(url) || reRefresh.test(url) || reRemove.test(url) ) && method === 'POST') {
        checkCart();
    }

    return xhrOpen.apply(this, arguments);
}

window.XMLHttpRequest.prototype.open = catchOpen;
<?php } ?>
<?php } ?>