<?php
/* Initialize widget if widget is enable for current page */
$social = $this->get_social_icon_list();            // get active icon list
$cht_active = get_option("cht_active");

//$bg_color = $this->get_current_color();
// get custom background color for widget
$def_color = get_option('cht_color' );
$custom_color = get_option('cht_custom_color' );     // checking for custom color
if (!empty($custom_color)) {
    $color = $custom_color;
} else {
    $color = $def_color;
}
$bg_color = strtoupper($color);

$len = count($social);                              // get total active channels
$cta =nl2br(get_option('cht_cta'));
$cta = str_replace(array("\r","\n"),"",$cta);
$cta = esc_attr__(wp_unslash($cta));

$isPro = get_option('cht_token');                                 // is PRO version
$isPro = (empty($isPro) || $isPro == null)?0:1;

$positionSide = get_option('positionSide');                             // get widget position
$cht_bottom_spacing = get_option('cht_bottom_spacing');                 // get widget position from bottom
$cht_side_spacing = get_option('cht_side_spacing');                     // get widget position from left/Right
$cht_widget_size = get_option('cht_widget_size');                       // get widget size
$positionSide = empty($positionSide) ? 'right' : $positionSide;         // Initialize widget position if not exists
$cht_side_spacing = ($cht_side_spacing) ? $cht_side_spacing : '25';     // Initialize widget from left/Right if not exists
$cht_widget_size = ($cht_widget_size) ? $cht_widget_size : '54';        // Initialize widget size if not exists
$position = get_option('cht_position');
$position = ($position) ? $position : 'right';                          // Initialize widget position if not exists
$total = $cht_side_spacing+$cht_widget_size+$cht_side_spacing;
$cht_bottom_spacing = ($cht_bottom_spacing) ? $cht_bottom_spacing : '25';   // Initialize widget bottom position if not exists
$cht_side_spacing = ($cht_side_spacing) ? $cht_side_spacing : '25';     // Initialize widget left/Right position if not exists
$image_id = "";
$imageUrl = plugin_dir_url("")."chaty-pro/admin/assets/images/chaty-default.png";       // Initialize default image
$analytics = get_option("cht_google_analytics");                        // check for google analytics enable or not
$analytics = empty($analytics)?0:$analytics;                            // Initialize google analytics flag to 0 if not data not exists
$text = get_option("cht_close_button_text");                            // close button settings
$close_text = ($text === false)?"Hide":$text;

$imageUrl = "";
if($image_id != "") {
    $image_data = wp_get_attachment_image_src($image_id, "full");
    if(!empty($image_data) && is_array($image_data)) {
        $imageUrl = $image_data[0];                                     // change close button image if exists
    }
}
$font_family = get_option('cht_widget_font');
/* add inline css for custom position */

$animation_class = get_option("chaty_attention_effect");
$animation_class = empty($animation_class)?"":$animation_class;

$time_trigger = get_option("chaty_trigger_on_time");
$time_trigger = empty($time_trigger)?"no":$time_trigger;

$trigger_time = get_option("chaty_trigger_time");
$trigger_time = (empty($trigger_time) || !is_numeric($trigger_time) || $trigger_time < 0)?"0":$trigger_time;

$exit_intent = get_option("chaty_trigger_on_exit");
$exit_intent = empty($exit_intent)?"no":$exit_intent;

$on_page_scroll = get_option("chaty_trigger_on_scroll");
$on_page_scroll = empty($on_page_scroll)?"no":$on_page_scroll;

$page_scroll = get_option("chaty_trigger_on_page_scroll");
$page_scroll = (empty($page_scroll) || !is_numeric($page_scroll) || $page_scroll < 0)?"0":$page_scroll;

$state = get_option("chaty_default_state");
$state = empty($state)?"click":$state;

$has_close_button = get_option("cht_close_button");
$has_close_button = empty($has_close_button)?"yes":$has_close_button;

$display_days = get_option("cht_date_and_time_settings");
$display_rules = array();

$gmt = "";
if(!empty($display_days)) {
    $count = 0;
    foreach ($display_days as $key=>$value) {
        if($count == 0) {
            $gmt = intval($value['gmt']);
            $count++;
        }
        $record = array();
        $record['days'] = $value['days']-1;
        $record['start_time'] = $value['start_time'];
        $record['start_hours'] = intval(date("G",strtotime(date("Y-m-d ".$value['start_time']))));
        $record['start_min'] = intval(date("i",strtotime(date("Y-m-d ".$value['start_time']))));
        $record['end_time'] = $value['end_time'];
        $record['end_hours'] = intval(date("G",strtotime(date("Y-m-d ".$value['end_time']))));
        $record['end_min'] = intval(date("i",strtotime(date("Y-m-d ".$value['end_time']))));
        $display_rules[] = $record;
    }
}
$display_conditions = 0;
if(!empty($display_rules)) {
    $display_conditions = 1;
}

$mode = get_option("chaty_icons_view");
$mode = empty($mode) ? "vertical" : $mode;

/* widget setting array */
$settings = array();
$settings['isPRO'] = 0;
$settings['position'] = $position;;
$settings['social'] = $this->get_social_icon_list();
$settings['pos_side'] = $positionSide;
$settings['bot'] = $cht_bottom_spacing;
$settings['side'] = $cht_side_spacing;
$settings['device'] = $this->device();
$settings['color'] = ($bg_color) ? $bg_color : '#A886CD';
$settings['widget_size'] = $cht_widget_size;
$settings['widget_type'] = get_option('widget_icon');
$settings['widget_img'] = $this->getCustomWidgetImg();
$settings['cta'] = $cta;
$settings['link_active'] = get_option('cht_credit');
$settings['active'] = ($cht_active && $len >= 1) ? 'true' : 'false';
$settings['close_text'] = $close_text;
$settings['analytics'] = $analytics;
$settings['save_user_clicks'] = 0;
$settings['close_img'] = "";
$settings['is_mobile'] = (wp_is_mobile())?1:0;
$settings['ajax_url'] = admin_url('admin-ajax.php');
$settings['animation_class'] = $animation_class;
$settings['time_trigger'] = $time_trigger;
$settings['trigger_time'] = $trigger_time;
$settings['exit_intent'] = $exit_intent;
$settings['on_page_scroll'] = $on_page_scroll;
$settings['page_scroll'] = $page_scroll;
$settings['gmt'] = $gmt;
$settings['display_conditions'] = $display_conditions;
$settings['display_rules'] = $display_rules;
$settings['display_state'] = $state;
$settings['has_close_button'] = $has_close_button;
$settings['mode'] = $mode;
$data = array();
$data['object_settings'] = $settings;
ob_start();
?>
<style>
    <?php if($position == "left") { ?>
    #wechat-qr-code{left: {<?php esc_attr_e($total) ?>}px; right:auto;}
    <?php } else if($position == "right") { ?>
    #wechat-qr-code{right: {<?php esc_attr_e($total) ?>}px; left:auto;}
    <?php } else if($position == "custom") { ?>
    <?php if($positionSide == "left") { ?>
    #wechat-qr-code{left: {<?php esc_attr_e($total) ?>}px; right:auto;}
    <?php } else { ?>
    #wechat-qr-code{right: {<?php esc_attr_e($total) ?>}px; left:auto;}
    <?php } ?>
    <?php } ?>
    .chaty-widget-is a{display: block; margin:0; padding:0; }
    .chaty-widget-is svg{margin:0; padding:0;}
    .chaty-main-widget { display: none; }
    .chaty-in-desktop .chaty-main-widget.is-in-desktop { display: block; }
    .chaty-in-mobile .chaty-main-widget.is-in-mobile { display: block; }
    .chaty-widget.hide-widget { display: none !important; }
    .chaty-widget, .chaty-widget .get, .chaty-widget .get a { width: <?php echo esc_attr($cht_widget_size+8); ?>px }
    .facustom-icon { width: <?php echo esc_attr($cht_widget_size); ?>px; line-height: <?php echo esc_attr($cht_widget_size); ?>px; height: <?php echo esc_attr($cht_widget_size); ?>px; font-size: <?php echo esc_attr(intval($cht_widget_size/2)); ?>px; }
    <?php if(!empty($font_family)) { ?>
    .chaty-widget { font-family: <?php echo esc_attr($font_family) ?>; }
    <?php } ?>
    <?php foreach($settings['social'] as $social) {
        if(!empty($social['bg_color']) && $social['bg_color'] != "#ffffff") {
            ?>
    .facustom-icon.chaty-btn-<?php echo esc_attr($social['social_channel']) ?> {background-color: <?php echo esc_attr($social['bg_color']) ?>}
    .chaty-<?php echo esc_attr($social['social_channel']) ?> .color-element {fill: <?php echo esc_attr($social['bg_color']) ?>}
    <?php }
    } ?>
    /*.chaty-widget-i-title.hide-it { display: none !important; }*/
    body div.chaty-widget.hide-widget { display: none !important; }
</style>
<?php
echo ob_get_clean();

if($len >= 1 && !empty($settings['social'])) {

    $chaty_updated_on = get_option("chaty_updated_on");
    if(empty($chaty_updated_on)) {
        $chaty_updated_on = time();
    }

    /* add js for front end widget */
    if(!empty($font_family)) {
        wp_enqueue_style( 'custom-google-fonts', 'https://fonts.googleapis.com/css?family='.urlencode($font_family), false, false );
    }
    /* WP change this */
    wp_enqueue_style( 'chaty-front-css', CHT_PLUGIN_URL."css/chaty-front.min.css", array(), $chaty_updated_on);
    wp_enqueue_script( "chaty-front-end", CHT_PLUGIN_URL."js/cht-front-script.min.js", array( 'jquery' ), $chaty_updated_on);
    wp_localize_script('chaty-front-end', 'chaty_settings',  $data);
}
?>
