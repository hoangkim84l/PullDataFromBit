// WooCommerce LiveChat
//
// @category Admin pages
(function ($) {
    var WooCommerceLiveChat = {
        slug: 'livechat-woocommerce',
        buttonLoaderHtml:
            '<div class="lc-loader-wrapper lc-btn__loader"><div class="lc-loader-spinner-wrapper lc-loader-spinner-wrapper--small"><div class="lc-loader-spinner lc-loader-spinner--thin" /></div></div>',
        init: function () {
            this.signInWithLiveChat();
            this.bindDisconnect();
            this.alreadyHaveAccountForm();
            this.settingsForm();
            this.connectNoticeButtonHandler();
            this.deactivationModalOpenHandler();
            this.deactivationModalCloseHandler();
            this.deactivationFormOptionSelectHandler();
            this.deactivationFormSkipHandler();
            this.deactivationFormSubmitHandler();
        },
        sanitize: function (str) {
            var tmpDiv = document.createElement('div');
            tmpDiv.textContent = str;
            return tmpDiv.innerHTML;
        },
        bindEvent: function(element, eventName, eventHandler) {
            if (element.addEventListener){
                element.addEventListener(eventName, eventHandler, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + eventName, eventHandler);
            }
        },
        signInWithLiveChat: function () {
            var logoutButton = document.getElementById('resetAccount'),
                iframeEl = document.getElementById('login-with-livechat');

            WooCommerceLiveChat.bindEvent(window, 'message', function (e) {
                if (e.origin !== 'https://addons.livechatinc.com') {
                    return false;
                }

                try {
                    var lcDetails = JSON.parse(e.data);
                    if (lcDetails.type === 'logged-in') {
                        var licenseForm = $('form#licenseForm');
                        if(licenseForm.length) {
                            licenseForm.find('input#licenseEmail').val(lcDetails.email);
                            licenseForm.find('input#licenseNumber').val(lcDetails.license);
                            WooCommerceLiveChat.sendEvent(
                                'Integrations: User authorized the app',
                                lcDetails.license,
                                lcDetails.email,
                                function () {
                                    licenseForm.submit();
                                }
                            );
                        }
                    }
                } catch (e) {
                    console.warn(e);
                }
            });

            if(logoutButton) {
                WooCommerceLiveChat.bindEvent(logoutButton, 'click', function (e) {
                    sendMessage('logout');
                });
            }

            var sendMessage = function(msg) {
                iframeEl.contentWindow.postMessage(msg, '*');
            };
        },
        bindDisconnect: function() {
            $('#resetAccount').click(function (e) {
                e.preventDefault();
                WooCommerceLiveChat.sendEvent(
                    'Integrations: User unauthorized the app',
                    lcDetails.license,
                    lcDetails.email,
                    function () {
                        location.href = $('#resetAccount').attr('href');
                    }
                );
            });
        },
        sendEvent: function(eventName, license, email, callback) {
            var amplitudeURL = 'https://queue.livechatinc.com/app_event/';
            var data = {
                "e" : JSON.stringify(
                    [{
                        "event_type": eventName,
                        "user_id": email,
                        "user_properties": {
                            "license": license
                        },
                        "product_name": "livechat",
                        "event_properties": {
                            "integration name": "livechat-woocommerce"
                        }
                    }]
                )
            };
            $.ajax({
                url: amplitudeURL,
                type: 'GET',
                crossOrigin: true,
                data: data
            }).always(function () {
                if(callback) callback();
            });
        },
        alreadyHaveAccountForm: function () {
            var licenseForm = $('form#licenseForm');
            licenseForm.submit(function () {

                var licenseEmail = licenseForm.find('input#licenseEmail').val();
                var licenseNumber = licenseForm.find('input#licenseNumber').val();

                WooCommerceLiveChat.setSettings('licenseEmail', licenseEmail);
                WooCommerceLiveChat.setSettings('licenseId', licenseNumber, 1);

                return false;
            });
        },
        setSettings: function(key, value, reload) {
            var data = {action: 'wc-livechat-update-settings'};
            data[key] = value;

            $.ajax({
                url: WcLcUrls.setSettings,
                type: "POST",
                data: data,
                dataType: 'json',
                cache: false,
                async: false,
                success: function (data, status, error) {
                    if (data == 'ok') {
                        if (reload == 1) {
                            location.reload();
                        }
                    }
                },
                error: function (data, status, error) {
                    alert('Something went wrong. Please try again or contact our support team.');
                }
            });

        },
        settingsForm: function() {
            $('#resetAccount').click(function() {
                return confirm('This will reset your LiveChat plugin settings. Do you want to continue?');
            });
            $('.settings .title').click(function() {
                $(this).next('.onoffswitch').children('label').click();
            });
            $('.onoffswitch-checkbox').change(function() {
                var paramName = $(this).attr('id');
                WooCommerceLiveChat.setSettings('customDataSettings', paramName + ':' + (
                    $('#' + paramName).is(':checked') ? 1 : 0
                ));
            });
        },
        connectNoticeButtonHandler: function () {
            $('#lc-connect-notice-button').click(function () {
                window.location.replace('admin.php?page=wc-livechat');
            })
        },
        deactivationFormHelpers: {
            hideErrors: function () {
                $('.lc-field-error').hide();
            },
            toggleModal: function () {
                $('#lc-deactivation-feedback-modal-overlay').toggleClass('lc-modal-base__overlay--visible');
            },
            showError: function (errorType) {
                $('#lc-deactivation-feedback-form-' + errorType + '-error').show();
            }
        },
        deactivationModalOpenHandler: function() {
            var that = this;
            $('table.plugins tr[data-slug=' + that.slug + '] span.deactivate a').click(function (e) {
                if ($('#lc-deactivation-feedback-modal-container').length < 1) {
                    return;
                }
                e.preventDefault();
                that.deactivationFormHelpers.toggleModal();
            })
        },
        deactivationModalCloseHandler: function() {
            var that = this;
            var modalOverlay = $('#lc-deactivation-feedback-modal-overlay');
            modalOverlay.click(function (e) {
                if (
                    modalOverlay.hasClass('lc-modal-base__overlay--visible') &&
                    (
                        !$(e.target).closest('#lc-deactivation-feedback-modal-container').length ||
                        $(e.target).closest('.lc-modal-base__close').length
                    )
                ) {
                    that.deactivationFormHelpers.toggleModal();
                }
            });
        },
        deactivationFormOptionSelectHandler: function () {
            var that = this;
            $('.lc-radio').click(function () {
                that.deactivationFormHelpers.hideErrors();
                var otherTextField = $('#lc-deactivation-feedback-other-field');
                $('.lc-radio').removeClass('lc-radio--selected');
                $(this).addClass('lc-radio--selected');
                if ($(this).find('#lc-deactivation-feedback-option-other').length > 0) {
                    otherTextField.show();
                    otherTextField.find('textarea').focus();
                } else {
                    otherTextField.hide();
                }
            })
        },
        sendFeedback: function(response, comment) {
            var that = this;
            response = response ? this.sanitize(response) : 'skipped';
            comment = comment ? this.sanitize(comment) : '';
            $.ajax({
                method: 'POST',
                url: 'https://script.google.com/macros/s/AKfycbxqXkuWGYrjhWBQ1pfkJuaQ8o3d2uOrGdNiQdYGIBODL5OvOsI/exec',
                data: $.param({
                    plugin: that.slug,
                    url: window.location.href.replace(/(.*)wp-admin.*/, '$1'),
                    license: window.deactivationDetails.license,
                    name: window.deactivationDetails.name,
                    wpEmail: window.deactivationDetails.wpEmail,
                    response,
                    comment
                }),
                dataType: 'jsonp',
                complete: function () {
                    window.location.replace(
                        $('table.plugins tr[data-slug=' + that.slug + '] span.deactivate a').attr('href')
                    );
                }
            });
        },
        deactivationFormSkipHandler: function() {
            var that = this;
            $('#lc-deactivation-feedback-modal-skip-btn').click(function () {
                $(this).addClass('lc-btn--loading lc-btn--disabled').html(
                    $(this).html() + that.buttonLoaderHtml
                );
                $('#lc-deactivation-feedback-modal-submit-btn')
                    .attr('disabled', true)
                    .addClass('lc-btn--disabled');
                that.sendFeedback();
            });
        },
        deactivationFormSubmitHandler: function () {
            var that = this;
            $('#lc-deactivation-feedback-modal-submit-btn').click(function (e) {
                e.preventDefault();
                that.deactivationFormHelpers.hideErrors();
                var response = $('.lc-radio.lc-radio--selected .lc-radio__input').val();
                if (!response) {
                    that.deactivationFormHelpers.showError('option');
                    return;
                }
                var comment = $('#lc-deactivation-feedback-other-field .lc-textarea').val();
                if (response.toLowerCase() === 'other' && !comment) {
                    that.deactivationFormHelpers.showError('other');
                    return;
                }
                $(this).addClass('lc-btn--loading lc-btn--disabled').html(
                    $(this).html() + that.buttonLoaderHtml
                );
                $('#lc-deactivation-feedback-modal-skip-btn')
                    .attr('disabled', true)
                    .addClass('lc-btn--disabled');
                that.sendFeedback(response, comment);
            })
        }
    };

    $(document).ready(function ()
    {
        WooCommerceLiveChat.init();
    });
})(jQuery);