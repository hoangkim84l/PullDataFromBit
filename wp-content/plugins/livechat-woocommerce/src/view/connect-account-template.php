<?php
/**
 * Connecting account template.
 * @category Admin pages
 */
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
?>

<div class="lc-design-system-typography lc-table">
    <div class="lc-column">
        <p id="lc-plus-wp">
            <img src="<?php echo plugins_url('livechat-woocommerce'); ?>/src/media/lc-plus-wc.png" srcset="<?php echo plugins_url('livechat-woocommerce'); ?>/src/media/lc-plus-wc.png, <?php echo plugins_url('livechat-woocommerce'); ?>/src/media/lc-plus-wc@2x.png 2x " alt="LiveChat for WooCommerce" >
        </p>
        <p>
            <iframe id="login-with-livechat" src="https://addons.livechatinc.com/sign-in-with-livechat/woocommerce/?designSystem=1&popupRoute=signup&partner_id=woocommerce&utm_source=woocommerce.com&utm_medium=integration&utm_campaign=woocommerce_plugin&name=<?php echo urlencode($username) ;?>&email=<?php echo urlencode($user_email) ;?>&url=<?php echo urlencode($url) ?>" > </iframe>
        </p>
        <form id="licenseForm" action="" method="post">
            <input type="hidden" name="licenseEmail" id="licenseEmail">
            <input type="hidden" name="licenseNumber" id="licenseNumber">
        </form>
    </div>
    <div class="lc-column">
        <p>
            <img src="<?php echo plugins_url('livechat-woocommerce').'/src/media/lc-app.png'; ?>" alt="LiveChat apps" id="lc-app-img">
        </p>
        <p>
            <?php _e('Check out our apps for', 'livechat-woocommerce'); ?>
            <a href="https://www.livechatinc.com/applications/?utm_source=woocommerce.com&utm_medium=integration&utm_campaign=woocommerce_plugin" target="_blank">
                <?php _e('desktop or mobile!', 'livechat-woocommerce'); ?>
            </a>
        </p>
    </div>
</div>
