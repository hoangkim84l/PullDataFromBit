<style>
    body {
        background: #f1f1f1 !important;
    }
</style>
<div class="updates-form-form" >
    <div class="popup-form-content">
        <div id="add-update-folder-title" class="add-update-folder-title">
            Would you like to get feature updates for Chaty in real-time?
        </div>
        <div class="folder-form-input">
            <input id="chaty_update_email" autocomplete="off" value="<?php echo get_option( 'admin_email' ) ?>" placeholder="Email address">
        </div>
        <div class="updates-content-buttons">
            <button href="javascript:;" class="button button-primary form-submit-btn yes">Yes, I want</button>
            <button href="javascript:;" class="button button-secondary form-cancel-btn no">Skip</button>
            <div style="clear: both"></div>
        </div>
        <input type="hidden" id="chaty_update_status" value="<?php echo wp_create_nonce("chaty_update_status") ?>">
    </div>
</div>
<script>
    jQuery(document).ready(function($) {
        $(document).on("click", ".updates-content-buttons button", function () {
            var updateStatus = 0;
            if ($(this).hasClass("yes")) {
                updateStatus = 1;
            }
            $(".updates-content-buttons button").attr("disabled", true);
            $.ajax({
                url: ajaxurl,
                data: "action=chaty_update_status&status=" + updateStatus + "&nonce=" + $("#chaty_update_status").val() + "&email=" + $("#chaty_update_email").val(),
                type: 'post',
                cache: false,
                success: function () {
                    window.location.reload();
                }
            })
        });
    });
</script>