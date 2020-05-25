<?php
/**
 * Review notice template.
 *
 * @category Admin pages
 */
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
?>
<div class="lc-design-system-typography lc-notice notice notice-info is-dismissible" id="wc-lc-review-notice">
    <div class="lc-notice-column">
        <img class="lc-notice-logo" src="<?php echo plugins_url('livechat-woocommerce').'/src/media/livechat-logo.svg'; ?>" alt="LiveChat logo" />
    </div>
    <div class="lc-notice-column">
        <p><?php _e('Hey, you’ve been using <strong>LiveChat</strong> for more than 14 days - that’s awesome! Could you please do us a BIG favour and <strong>give LiveChat a 5-star rating on WordPress</strong>? Just to help us spread the word and boost our motivation.', 'livechat-woocommerce'); ?></p>
        <p><?php _e('<strong>&ndash; The LiveChat Team</strong>'); ?></p>
        <div id="wc-lc-review-notice-actions">
            <a href="https://wordpress.org/support/plugin/livechat-woocommerce/reviews/#new-post" target="_blank" class="lc-review-notice-action lc-btn lc-btn--compact lc-btn--primary" id="wc-lc-review-now">
                <i class="material-icons">thumb_up</i> <span><?php _e('Ok, you deserve it', 'livechat-woocommerce'); ?></span>
            </a>
            <a href="#" class="lc-review-notice-action lc-btn lc-btn--compact" id="wc-lc-review-postpone">
                <i class="material-icons">schedule</i> <span><?php _e('Maybe later', 'livechat-woocommerce'); ?></span>
            </a>
            <a href="#" class="lc-review-notice-action lc-btn lc-btn--compact" id="wc-lc-review-dismiss">
                <i class="material-icons">not_interested</i> <span><?php _e('No, thanks', 'livechat-woocommerce'); ?></span>
            </a>
        </div>
    </div>
</div>
