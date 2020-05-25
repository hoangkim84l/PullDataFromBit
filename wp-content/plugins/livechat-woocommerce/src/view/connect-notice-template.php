<?php
/**
 * Connect notice template.
 *
 * @category Admin pages
 */
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
?>
<div class="lc-design-system-typography notice notice-info lc-notice" id="lc-connect-notice">
    <div class="lc-notice-column">
        <img class="lc-notice-logo" src="<?php echo plugins_url('livechat-woocommerce').'/src/media/livechat-logo.svg'; ?>" alt="LiveChat logo" />
    </div>
    <div class="lc-notice-column">
        <p id="lc-connect-notice-header">
            <?php _e('Action required - connect LiveChat', 'livechat-woocommerce') ?>
        </p>
        <p>
            <?php _e('Please') ;?>
            <a href="admin.php?page=wc-livechat"><?php _e('connect your LiveChat account'); ?></a>
            <?php _e('to start chatting with your customers.', 'livechat-woocommerce'); ?>
        </p>
    </div>
    <div class="lc-notice-column" id="lc-connect-notice-button-column">
        <p>
            <button class="lc-btn lc-btn--primary" id="lc-connect-notice-button" type="button">
                <?php _e('Connect', 'livechat-woocommerce'); ?>
            </button>
        </p>
    </div>
</div>
