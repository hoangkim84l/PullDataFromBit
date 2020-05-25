(function ($) {
    $(document).ready(function () {
        var dismissButton = $("#wc-lc-review-notice button");
        dismissButton.hide();
        $("#wc-lc-review-dismiss").click(function (e) {
            e.preventDefault();
            $.ajax({
                url: ajaxurl,
                type: "POST",
                data: {
                    action: 'wc_lc_review_dismiss'
                }
            });
            dismissButton.click();
        });
        $("#wc-lc-review-postpone").click(function (e) {
            e.preventDefault();
            $.ajax({
                url: ajaxurl,
                type: "POST",
                data: {
                    action: 'wc_lc_review_postpone'
                }
            });
            dismissButton.click();
        });
        $("#wc-lc-review-now").click(function () {
            $.ajax({
                url: ajaxurl,
                type: "POST",
                data: {
                    action: 'wc_lc_review_dismiss'
                }
            });
            dismissButton.click();
        });
    })
})(jQuery);