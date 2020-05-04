/**
 * easyModal.js v1.3.2
 * A minimal jQuery modal that works with your CSS.
 * Author: Flavius Matis - http://flaviusmatis.github.com/
 * URL: https://github.com/flaviusmatis/easyModal.js
 *
 * Copyright 2012, Flavius Matis
 * Released under the MIT license.
 * http://flaviusmatis.github.com/license.html
 */

/* jslint browser: true */
/* global jQuery */

jQuery(document).ready(function () {
    var chatyError;
    jQuery("#cht-form").submit(function () {
        set_social_channel_order();
        phoneNumberReg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        if (jQuery("#cht-form #Whatsapp").length && jQuery("#cht-form #Whatsapp").val() != "") {
            InputVal = jQuery.trim(jQuery("#cht-form #Whatsapp").val());
            chatyError = check_for_number_chaty(InputVal, "Whatsapp");
            if(chatyError) {
                if(!confirm("Seems like the WhatsApp number you're trying to enter isn't in the right syntax. Would you like to publish it anyway?")) {
                    jQuery("#cht-form #Whatsapp").focus();
                    return false;
                }
            }
        }
        if (jQuery("#cht-form #Phone").length && jQuery("#cht-form #Phone").val() != "") {
            InputVal = jQuery.trim(jQuery("#cht-form #Phone").val());
            chatyError = check_for_number_chaty(InputVal, "Phone");
            if(chatyError) {
                if(!confirm("Seems like the phone number you're trying to enter isn't in the right syntax. Would you like to publish it anyway?")) {
                    jQuery("#cht-form #Phone").focus();
                    return false;
                }
            }
        }
        if (jQuery("#cht-form #Facebook_Messenger").length && jQuery("#cht-form #Facebook_Messenger").val() != "") {
            faceBookMeReg = /(?:http:\/\/)?m\.me\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/;
            faceBookReg = /(?:http:\/\/)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/;
            InputVal = jQuery.trim(jQuery("#Facebook_Messenger").val());
            jQuery("#cht-form #Facebook_Messenger").val(InputVal);
            if (!faceBookReg.test(InputVal) && !faceBookMeReg.test(InputVal)) {
                alert("Please make sure your Facebook page's URL looks like, \nhttps://m.me/YOURPAGE");
                jQuery("#cht-form #Facebook_Messenger").focus();
                return false;
            }
        }
        if (jQuery("#cht-form #SMS").length && jQuery("#cht-form #SMS").val() != "") {
            InputVal = jQuery.trim(jQuery("#cht-form #SMS").val());
            chatyError = check_for_number_chaty(InputVal, "SMS");
            if(chatyError) {
                if(!confirm("Seems like the SMS number you're trying to enter isn't in the right syntax. Would you like to publish it anyway?")) {
                    jQuery("#cht-form #SMS").focus();
                    return false;
                }
            }
        }
        if (jQuery("#cht-form #Viber").length && jQuery("#cht-form #Viber").val() != "") {
            InputVal = jQuery.trim(jQuery("#cht-form #Viber").val());
            chatyError = check_for_number_chaty(InputVal, "Viber");
            if(chatyError) {
                if(!confirm("Seems like the Viber number you're trying to enter isn't in the right syntax. Would you like to publish it anyway?")) {
                    jQuery("#cht-form #Viber").focus();
                    return false;
                }
            }
        }
        errorCount = 0;
        if (jQuery("#chaty-page-options .cht-required").length) {
            jQuery("#chaty-page-options .cht-required").each(function () {
                if (jQuery.trim(jQuery(this).val()) == "") {
                    jQuery(this).addClass("cht-input-error");
                    errorCount++;
                }
            });
        }
        if (jQuery(".chaty-data-and-time-rules .cht-required").length) {
            jQuery(".chaty-data-and-time-rules .cht-required").each(function () {
                if (jQuery.trim(jQuery(this).val()) == "") {
                    jQuery(this).addClass("cht-input-error");
                    errorCount++;
                }
            });
        }
        if (errorCount != 0) {
            return false;
        } else {
            var inputError = 0;
            if(jQuery("#channels-selected-list > li:not(#chaty-social-close").find(".channels__input").length) {
                jQuery("#channels-selected-list > li:not(#chaty-social-close").find(".channels__input").each(function(){
                    if(jQuery.trim(jQuery(this).val()) == "") {
                        inputError++;
                    }
                });
                if(inputError == jQuery("#channels-selected-list > li:not(#chaty-social-close").find(".channels__input").length) {
                    if(confirm("You need to fill out at least one channel details for Chaty to show up on your website. Click cancel to keep editing.")) {
                        return true;
                    } else {
                        jQuery("#channels-selected-list > li:not(#chaty-social-close").find(".channels__input").each(function(){
                            if(jQuery.trim(jQuery(this).val()) == "") {
                                inputError = 1;
                            }
                        });
                        jQuery("#channels-selected-list > li:not(#chaty-social-close").find(".channels__input").addClass("border-red");
                        jQuery("#channels-selected-list > li:not(#chaty-social-close) .channels__input:first").focus();
                        return false;
                    }
                }
            }
        }
        return true;
    });
    jQuery(document).on("click", ".preview-section-chaty", function(e){
        e.stopPropagation();
    });
    jQuery(document).on("click", ".preview-section-overlay", function(){
        jQuery(".preview-help-btn").removeClass("active");
        jQuery(".preview-section-chaty").removeClass("active");
        jQuery(".preview-section-overlay").removeClass("active");
    });
    jQuery(document).on("click", ".preview-help-btn", function(e){
        e.preventDefault();
        if(jQuery(this).hasClass("active")) {
            jQuery(this).removeClass("active");
            jQuery(".preview-section-chaty").removeClass("active");
            jQuery(".preview-section-overlay").removeClass("active");
        } else {
            jQuery(this).addClass("active");
            jQuery(".preview-section-chaty").addClass("active");
            jQuery(".preview-section-overlay").addClass("active");
        }
    });
});

function check_for_number_chaty(phoneNumber, validationFor) {
    if (phoneNumber != "") {
        if (phoneNumber[0] == "+") {
            phoneNumber = phoneNumber.substr(1, phoneNumber.length)
        }
        if (validationFor == "Phone") {
            if (phoneNumber[0] == "*") {
                phoneNumber = phoneNumber.substr(1, phoneNumber.length)
            }
        }
        if (isNaN(phoneNumber)) {
            return true;
        }
    }
    return false;
}

(function ($, sr) {
    var debounce = function (func, threshold, execAsap) {
        var timeout;

        return function debounced() {
            var obj = this;
            var
                args = arguments;

            function delayed() {
                if (!execAsap) func.apply(obj, args);
                timeout = null;
            }

            if (timeout) clearTimeout(timeout);
            else if (execAsap) func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 100);
        };
    };
    // smartModalResize
    jQuery.fn[sr] = function (fn) {
        return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
    };
}(jQuery, 'smartModalResize'));

(function ($) {
    'use strict';

    var methods = {
        init: function (options) {
            var defaults = {
                top: 'auto',
                left: 'auto',
                autoOpen: false,
                overlayOpacity: 0.5,
                overlayColor: '#000',
                overlayClose: true,
                overlayParent: 'body',
                closeOnEscape: true,
                closeButtonClass: '.close',
                transitionIn: '',
                transitionOut: '',
                onOpen: false,
                onClose: false,
                zIndex: function () {
                    return (function (value) {
                        return value === -Infinity ? 0 : value + 1;
                    }(Math.max.apply(Math, $.makeArray(jQuery('*').map(function () {
                        return jQuery(this).css('z-index');
                    }).filter(function () {
                        return $.isNumeric(this);
                    }).map(function () {
                        return parseInt(this, 10);
                    })))));
                },
                updateZIndexOnOpen: true,
                hasVariableWidth: false
            };

            options = $.extend(defaults, options);

            return this.each(function () {
                var o = options;


                var $overlay = jQuery('<div class="lean-overlay"></div>');


                var $modal = jQuery(this);

                $overlay.css({
                    display: 'none',
                    position: 'fixed',
                    // When updateZIndexOnOpen is set to true, we avoid computing the z-index on initialization,
                    // because the value would be replaced when opening the modal.
                    'z-index': (o.updateZIndexOnOpen ? 0 : o.zIndex()),
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    background: o.overlayColor,
                    opacity: o.overlayOpacity,
                    overflow: 'auto'
                }).appendTo(o.overlayParent);

                $modal.css({
                    display: 'none',
                    position: 'fixed',
                    // When updateZIndexOnOpen is set to true, we avoid computing the z-index on initialization,
                    // because the value would be replaced when opening the modal.
                    'z-index': (o.updateZIndexOnOpen ? 0 : o.zIndex() + 1),
                    left: parseInt(o.left, 10) > -1 ? o.left + 'px' : 50 + '%',
                    top: parseInt(o.top, 10) > -1 ? o.top + 'px' : 50 + '%'
                });

                $modal.bind('openModal', function () {
                    var overlayZ = o.updateZIndexOnOpen ? o.zIndex() : parseInt($overlay.css('z-index'), 10);


                    var modalZ = overlayZ + 1;

                    if (o.transitionIn !== '' && o.transitionOut !== '') {
                        $modal.removeClass(o.transitionOut).addClass(o.transitionIn);
                    }
                    $modal.css({
                        display: 'block',
                        'margin-left': (parseInt(o.left, 10) > -1 ? 0 : -($modal.outerWidth() / 2)) + 'px',
                        'margin-top': (parseInt(o.top, 10) > -1 ? 0 : -($modal.outerHeight() / 2)) + 'px',
                        'z-index': modalZ
                    });

                    $overlay.css({'z-index': overlayZ, display: 'block'});

                    if (o.onOpen && typeof o.onOpen === 'function') {
                        // onOpen callback receives as argument the modal window
                        o.onOpen($modal[0]);
                    }
                });

                $modal.bind('closeModal', function () {
                    if (o.transitionIn !== '' && o.transitionOut !== '') {
                        $modal.removeClass(o.transitionIn).addClass(o.transitionOut);
                        $modal.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                            $modal.css('display', 'none');
                            $overlay.css('display', 'none');
                        });
                    } else {
                        $modal.css('display', 'none');
                        $overlay.css('display', 'none');
                    }
                    if (o.onClose && typeof o.onClose === 'function') {
                        // onClose callback receives as argument the modal window
                        o.onClose($modal[0]);
                    }
                });

                // Close on overlay click
                $overlay.click(function () {
                    if (o.overlayClose) {
                        $modal.trigger('closeModal');
                    }
                });

                jQuery(document).keydown(function (e) {
                    // ESCAPE key pressed
                    if (o.closeOnEscape && e.keyCode === 27) {
                        $modal.trigger('closeModal');
                    }
                });

                jQuery(window).smartModalResize(function () {
                    if (o.hasVariableWidth) {
                        $modal.css({
                            'margin-left': (parseInt(o.left, 10) > -1 ? 0 : -($modal.outerWidth() / 2)) + 'px',
                            'margin-top': (parseInt(o.top, 10) > -1 ? 0 : -($modal.outerHeight() / 2)) + 'px'
                        });
                    }
                });

                // Close when button pressed
                $modal.on('click', o.closeButtonClass, function (e) {
                    $modal.trigger('closeModal');
                    e.preventDefault();
                });

                // Automatically open modal if option set
                if (o.autoOpen) {
                    $modal.trigger('openModal');
                }
            });
        }
    };

    $.fn.easyModal = function (method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }

        if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }

        $.error('Method ' + method + ' does not exist on jQuery.easyModal');
    };
}(jQuery));
(function ($) {
    jQuery(document).ready(function () {
        jQuery('input, .icon, textarea, .btn-cancel:not(.close-btn-set) ').click(function (event) {
            window.onbeforeunload = function (e) {
                e = e || window.event;
                e.preventDefault = true;
                e.cancelBubble = true;
                e.returnValue = 'Your beautiful goodbye message';
            };
        });

        jQuery(document).on('submit', 'form', function (event) {
            window.onbeforeunload = null;
        });

        jQuery(document).on('change', '.channel-select-input', function (event) {
            var selChannel = $(this).closest("li").attr("data-id");
            jQuery.ajax({
                type: 'POST',
                url: ajaxurl,
                dataType: 'json',
                data: {
                    social: jQuery(this).val(),
                    channel: selChannel,
                    action: 'get_chaty_settings'
                },
                success: function (response) {
                    if(response.status == 1) {
                        jQuery(".custom-icon-"+response.channel+" svg").html(response.data.svg);
                        jQuery("#chaty-social-"+response.channel).attr("data-channel", response.data.slug);
                        jQuery("#chaty-social-"+response.channel).find(".sp-preview-inner").css("background-color", response.data.color);
                        jQuery("#chaty-social-"+response.channel).find(".chaty-color-field").val(response.data.color);
                        jQuery("#chaty-social-"+response.channel).find(".channels__input").attr("placeholder", response.data.placeholder);
                        jQuery("#chaty-social-"+response.channel).find(".channel-example").text(response.data.example);
                        jQuery("#chaty-social-"+response.channel).find(".chaty-title").val(response.data.title);
                        jQuery("#chaty-social-"+response.channel).find(".icon").attr("data-title", response.data.title);
                        jQuery("#chaty-social-"+response.channel).find(".chaty-color-field").trigger("change");
                        jQuery(".help-section").html("");
                        if(response.data.help_link != "") {
                            jQuery(".help-section").html('<div class="viber-help"><a target="_blank" href="'+response.data.help_link+'">'+response.data.help_title+'</a></div>');
                        } else if(response.data.help_text != "") {
                            jQuery(".help-section").html('<div class="viber-help"><span class="help-text">'+response.data.help_text+'</span><span class="help-title">'+response.data.help_title+'</span></div>');
                        }
                    }
                }
            })
        });

        //jQuery('.preview').stick_in_parent({
        //    offset_top: 200
        //});

        jQuery(document).on("click", "#chaty_icons_view", function(e){
            jQuery(".page-body .chaty-widget").removeClass("vertical").removeClass("horizontal");
            jQuery(".page-body .chaty-widget").addClass(jQuery(this).val());
        });

        jQuery('.upg').click(function (event) {
            jQuery('.valid_domain_input').val(jQuery('.valid_domain_input').val().replace(' ', ''));
            if (!/^(http(s)?:\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(jQuery('.valid_domain_input').val())) {
                event.preventDefault();
                jQuery('.valid_domain').fadeIn().css({
                    display: 'block'
                });
            }
        });
        jQuery('.del_token').click(function (event) {
            $.ajax({
                type: 'POST',
                url: ajaxurl,
                data: {
                    action: 'del_token',
                    nonce_code: cht_nonce_ajax.cht_nonce
                },
                success: function (bool) {
                    location.reload();
                },
                error: function (xhr, status, error) {

                }
            });
        });

        jQuery(document).on("blur", "#channels-selected-list > li:not(#chaty-social-close) .channels__input", function(){
            if(jQuery(this).hasClass("border-red") && jQuery(this).val() != "") {
                jQuery(this).removeClass("border-red");
            }
        });

        (function easyModal() {
            jQuery('.easy-modal').easyModal({
                top: 150,
                overlay: 0.2
            });
            jQuery('.easy-modal-open').click(function (e) {
                var target = jQuery(this).attr('href');
                jQuery(target).trigger('openModal');
                e.preventDefault();
            });
            jQuery('.easy-modal-close').click(function (e) {
                e.preventDefault();
                jQuery('.easy-modal').trigger('closeModal');
            });
        }());
        var count_click = 1000000003;
        jQuery('.show_up').click(function () {
            count_click += 10;
            jQuery('#upgrade-modal').css({
                'z-index': count_click,
                display: 'block',
                'margin-left': '-258px'
            });
        });

        (function colorPicker() {
            jQuery('.color-picker-btn, .color-picker-btn-close, .color-picker-custom button').on('click', function (e) {
                e.preventDefault();

                jQuery('.color-picker').toggle();
                jQuery('.color-picker-btn').toggle();
            });

            jQuery('.color-picker-radio input').change(function () {
                var $this = jQuery(this);
                jQuery('.color-picker-custom input[name="cht_custom_color"]').val('');
                jQuery('.color-picker-custom .circle').html('?').css({
                    'background-color': '#fff'
                });
                if ($this.prop('checked')) {
                    jQuery('.color-picker-radio input').prop('checked', false);
                    $this.prop('checked', true);
                    var color = $this.val();
                    var title = $this.prop('title');
                } else {
                    color = jQuery('.color-picker-custom input').val();
                    title = 'Custom';
                }

                jQuery('.color-picker-btn .circle').css({backgroundColor: color});
                jQuery('.color-picker-btn .text').text(title);
                jQuery('#chaty-social-close ellipse').attr("fill", color);
            });

            jQuery('.color-picker-custom input').change(function () {
                jQuery('.color-picker-radio input').prop('checked', false);

                var $this = jQuery(this);

                var color = $this.val();

                jQuery('.color-picker-btn .circle').css({backgroundColor: color});
                jQuery('.color-picker-btn .text').text('Custom');
                jQuery('#chaty-social-close ellipse').attr("fill", color);
            });
        }());

        (function customSelect() {
            jQuery('[name="cht_position"]').change(function () {
                if (jQuery('#positionCustom').prop('checked')) {
                    jQuery('#positionPro').show();
                } else {
                    jQuery('#positionPro').hide();
                }
            });
        }());


        /**
         * add Token
         */

        var AddTokenBtn = jQuery('.update_token');

        AddTokenBtn.on('click', function (e) {
            e.preventDefault();
            var token = jQuery('input[name="cht_token"]').val();

            $.ajax({
                type: 'POST',
                url: ajaxurl,
                data: {
                    action: 'add_token',
                    nonce_code: cht_nonce_ajax.cht_nonce,
                    token: token
                },
                beforeSend: function (xhr) {

                },
                success: function (bool) {
                    if (bool) {
                        alert('Your pro plan is activated');
                        location.reload();
                    } else {
                        alert('You`ve entered a wrong token');
                    }
                },
                error: function (xhr, status, error) {

                }
            });
        });
        jQuery('textarea[name=cht_cta]').keyup(function (event) {
            jQuery('.tooltiptext span').html(jQuery(this).val());
            if (jQuery(this).val().length == 0) {
                jQuery('.cta').hide(200);
                jQuery('.tooltiptext span').hide(200);
            } else {
                jQuery('.cta').show(300);
                jQuery('.tooltiptext span').show(200);
            }
        });
    });
}(jQuery));

(function ($) {
    jQuery(document).ready(function () {
        (function preview() {
            (function previewColor() {
                jQuery('.color-picker-radio input').change(function () {
                    var $this = jQuery(this);

                    if ($this.prop('checked')) {
                        var color = $this.val();
                    } else {
                        color = jQuery('.color-picker-custom input').val();
                    }
                    detectIcon();
                });

                jQuery('.color-picker-custom input').change(function () {
                    var $this = jQuery(this);

                    var color = $this.val();

                    detectIcon();
                });

                jQuery(document).on("change", "#chaty_default_state", function(){

                    detectIcon();
                });

                jQuery('#cht_close_button, #trigger_on_time, #chaty_trigger_on_scroll').click(function () {
                    detectIcon();
                });
            }());

            (function previewTooltip() {
                var $widgetTooltip = jQuery('#widgetTooltip');
                var $icon = jQuery('.preview .page .icon');

                function tooltipToggle() {
                    if (jQuery('[name=cht_cta]').val().length >= 1) {
                        $icon.removeClass('no-tooltip');
                    } else {
                        $icon.addClass('no-tooltip');
                    }
                }

                tooltipToggle();

                $widgetTooltip.change(function () {
                    tooltipToggle();
                });
            }());

            function previewPosition() {
                var $inputPosBot = jQuery('#positionBottom');
                var $inputPosSide = jQuery('#positionSide');
                var $chatyWidget = jQuery('.preview .page .chaty-widget');
                var customSpace = '7px';

                var value = jQuery('[name="cht_position"]:checked').val();

                if (value === 'right') {
                    $chatyWidget.css({right: customSpace, left: 'auto', bottom: '7px'});
                } else if (value === 'left') {
                    $chatyWidget.css({left: customSpace, right: 'auto', bottom: '7px'});
                } else if (value === 'custom') {
                    if ($inputPosBot.val()) {
                        var positionBottom = $inputPosBot.val() + 'px';
                    } else {
                        positionBottom = customSpace;
                    }

                    if ($inputPosSide.val()) {
                        var positionSide = $inputPosSide.val() + 'px';
                    } else {
                        positionSide = customSpace;
                    }

                    $inputPosBot.change(function () {
                        positionBottom = jQuery('#positionBottom').val() + 'px';

                        $chatyWidget.css({bottom: positionBottom});
                    });

                    $inputPosSide.change(function () {
                        var valueCustom = jQuery('[name="positionSide"]:checked').val();
                        positionSide = jQuery(this).val() + 'px';

                        if (valueCustom === 'right') {
                            jQuery('.page-body .chaty-widget ').removeClass('chaty-widget-icons-left');
                            jQuery('.page-body .chaty-widget ').addClass('chaty-widget-icons-right');
                            $chatyWidget.css({right: positionSide, left: 'auto'});
                        } else if (valueCustom === 'left') {
                            jQuery('.page-body .chaty-widget ').removeClass('chaty-widget-icons-right');
                            jQuery('.page-body .chaty-widget ').addClass('chaty-widget-icons-left');
                            $chatyWidget.css({left: positionSide, right: 'auto'});
                        }
                    });

                    jQuery('[name="positionSide"]').change(function () {
                        var valueCustom = jQuery('[name="positionSide"]:checked').val();

                        if (valueCustom === 'right') {
                            jQuery('.page-body .chaty-widget ').removeClass('chaty-widget-icons-left');
                            jQuery('.page-body .chaty-widget ').addClass('chaty-widget-icons-right');
                            $chatyWidget.css({right: positionSide, left: 'auto'});
                        } else if (valueCustom === 'left') {
                            jQuery('.page-body .chaty-widget ').removeClass('chaty-widget-icons-right');
                            jQuery('.page-body .chaty-widget ').addClass('chaty-widget-icons-left');
                            $chatyWidget.css({left: positionSide, right: 'auto'});
                        }
                    });
                }
            }

            previewPosition();


            jQuery('input[name="cht_position"]').change(function () {
                var valueCustom = jQuery('[name="cht_position"]:checked').val();

                if (valueCustom === 'right') {
                    jQuery('.page-body .chaty-widget ').removeClass('chaty-widget-icons-left');
                    jQuery('.page-body .chaty-widget ').addClass('chaty-widget-icons-right');
                } else if (valueCustom === 'left') {
                    jQuery('.page-body .chaty-widget ').removeClass('chaty-widget-icons-right');
                    jQuery('.page-body .chaty-widget ').addClass('chaty-widget-icons-left');
                }
                previewPosition();
            });

        }());
        jQuery('.popover').hide();
        two_soc();

        var socialIcon = jQuery('.channels-icons > .icon-sm');

        var socialInputsContainer = jQuery('.social-inputs');

        var click = 0;
        jQuery('input[name=cht_custom_color]').keyup(function (event) {
            var color = jQuery(this).val();
            jQuery('.circle').html('');
            jQuery('.color-picker-custom .circle').css({
                'background-color': color
            });
            if (jQuery(this).val().length < 1) {
                jQuery('.color-picker-custom .circle').html('?');
            }
        });
        socialIcon.on('click', function () {
            ++click;
            two_soc();

            var $this = jQuery(this);

            var social = $this.data('social');

            var socialItem = socialInputsContainer.find('.social-form-group');

            if ($this.hasClass('active')) {
                var del = ',' + jQuery(this).attr('data-social');

                var newlocaldata = jQuery('.add_slug').val();
                newlocaldata = newlocaldata.replace(del, '');
                jQuery('.add_slug').val(newlocaldata);
                newlocaldata = newlocaldata.replace(del, '');
                jQuery('.add_slug').val(newlocaldata);
                newlocaldata = newlocaldata.replace(del, '');
                jQuery('.add_slug').val(newlocaldata);
                newlocaldata = newlocaldata.replace(del, '');


                jQuery('.add_slug').val(newlocaldata);

                $this.toggleClass('active');
                return;
            }
            socialIcon.addClass('disabled');
            icon = jQuery(this).data('social');

            if (jQuery('.add_slug').val().indexOf(icon) == '1' && jQuery('.add_slug').val() != '') {
                var del = ',' + icon;
                var newlocaldata = jQuery('.add_slug').val();

                newlocaldata = newlocaldata.replace(del, '');
                jQuery('.add_slug').val(newlocaldata);
                newlocaldata = newlocaldata.replace(del, '');
                jQuery('.add_slug').val(newlocaldata);
                newlocaldata = newlocaldata.replace(del, '');
                jQuery('.add_slug').val(newlocaldata);
            } else {
                jQuery('.add_slug').val(jQuery('.add_slug').val() + ',' + jQuery(this).attr('data-social'));
            }


            /*  if(jQuery('section').is("#pro")){

             }else if(click >='3'){
             // alert(click);
             jQuery('.popover').show().effect( "shake", {times:3}, 600 );
             click = jQuery('.channels-selected__item.free').length;
             return;


             } */

            if (!jQuery('section').is('#pro') && jQuery('.channels-icons > .icon.active').length >= 2) {
                jQuery('.popover').show().effect('shake', {times: 3}, 600);
                socialIcon.removeClass('disabled');
                return;
            }

            $this.toggleClass('active');


            if (jQuery('section').is('#pro')) {
                var token = 'pro';
            } else {
                var token = 'free';
            }


            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: ajaxurl,
                data: {
                    action: 'choose_social',
                    social: social,
                    nonce_code: cht_nonce_ajax.cht_nonce,
                    version: token,
                    widget_index: jQuery("#widget_index").val()
                },
                beforeSend: function (xhr) {

                },
                success: function (data) {
                    var item = jQuery(data);
                    var itemName = item.find('.icon').data('title');

                    if (!jQuery('.channels-selected div[data-social="' + itemName + '"]').length) {
                        jQuery('#chaty-social-close').before(item);
                    }

                    socialIcon.removeClass('disabled');
                    detectIcon();
                    two_soc();

                    //jQuery('.chaty-color-field').wpColorPicker({
                    //    pick: "Background Color",
                    //    target: false,
                    //    change: function(event, ui){
                    //        chaty_set_bg_color();
                    //    }
                    //});
                    jQuery('.chaty-color-field').spectrum({
                        chooseText: "Submit",
                        preferredFormat: "hex",
                        showInput: true,
                        cancelText: "Cancel",
                        move: function (color) {
                            jQuery(this).val(color.toHexString());
                            chaty_set_bg_color();
                        }
                    });
                    check_for_chaty_close_button();
                },
                error: function (xhr, status, error) {

                }
            });

            two_soc();
        });

        /**
         * Cancel Btn
         *
         */
        var cancelBtn = jQuery('body');

        cancelBtn.on('click', '.icon, .btn-cancel:not(.close-btn-set)', function (e) {

            if (jQuery(this).hasClass("close-btn-set")) {
                return;
            }

            e.preventDefault();

            if (jQuery(this).hasClass('icon') && jQuery(this).hasClass('active')) {
                return;
            }

            icon = jQuery(this).data('social');
            if (jQuery(this).hasClass('btn-cancel')) {
                jQuery('.icon.active[data-social^="' + icon + '"]').removeClass('active');

                var del = ',' + icon;
                var newlocaldata = jQuery('.add_slug').val();
                newlocaldata = newlocaldata.replace(del, '');

                jQuery('.add_slug').val(newlocaldata);
            }
            var del_item = jQuery('#chaty-social-' + icon);
            del_item.remove();

            var item = jQuery(this).parent('.channels-selected__item');


            var social = jQuery(this).data('social');

            // $.ajax({
            //     type: 'POST',
            //     dataType: 'json',
            //     url: ajaxurl,
            //     data: {
            //         action: 'remove_social',
            //         nonce_code: cht_nonce_ajax.cht_nonce,
            //         social: social,
            //         widget_index: jQuery("#widget_index").val()
            //     },
            //     beforeSend: function (xhr) {
            //
            //     },
            //     success: function (bool) {
            //         if (bool) {
            //             item.closest("li").remove();
            //             del_item.remove();
            //
            //
            //             jQuery('.icon-sm').each(function () {
            //                 if (jQuery(this).data('social') === social) {
            //                     // jQuery(this).removeClass('active');
            //                 }
            //             });
            //             set_social_channel_order();
            //         }
            //         check_for_chaty_close_button();
            //     },
            //     error: function (xhr, status, error) {
            //
            //     }
            // });
            detectIcon();
            two_soc();
            set_social_channel_order();
            check_for_chaty_close_button();
        });

        function two_soc() {
            if (jQuery('section').is('#pro')) {
                return;
            }

            if (jQuery('.channels-selected__item').length <= 1) {
                jQuery('.channels-selected__item').hide();
                jQuery('.popover').hide();
            } else if (jQuery('.channels-selected__item').length >= 2) {
                jQuery('.channels-selected__item').show();
            }
        }

        jQuery('.btn-help').click(function (event) {
            window.open(
                'https://premio.io/help/chaty/',
                '_blank' // <- This is what makes it open in a new window.
            );
        });


        var freeCustomInput = jQuery('.free-custom-radio, .free-custom-checkbox');

        freeCustomInput.on('click', function (e) {
            e.preventDefault();
        });
        var chatyCta = jQuery('[name=cht_cta]');
        var toolTip = jQuery('.preview .tooltip-show');

        chatyCta.keyup(function () {
            var $icon = jQuery('.preview .page .icon');
            if (chatyCta.val().length >= 1) {
                $icon.removeClass('no-tooltip');
            } else {
                $icon.addClass('no-tooltip');
            }
            toolTip.attr('data-title', chatyCta.val());
        });


        var baseIcon = '<svg version="1.1" id="ch" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-496 507.7 54 54" style="enable-background:new -496 507.7 54 54;" xml:space="preserve">\n' +
                '                            <style type="text/css">.st0 {fill: #A886CD;}  .st1 {fill: #FFFFFF;}\n' +
                '                        </style><g><circle class="st0" cx="-469" cy="534.7" r="27"/></g><path class="st1" d="M-459.9,523.7h-20.3c-1.9,0-3.4,1.5-3.4,3.4v15.3c0,1.9,1.5,3.4,3.4,3.4h11.4l5.9,4.9c0.2,0.2,0.3,0.2,0.5,0.2 h0.3c0.3-0.2,0.5-0.5,0.5-0.8v-4.2h1.7c1.9,0,3.4-1.5,3.4-3.4v-15.3C-456.5,525.2-458,523.7-459.9,523.7z"/>\n' +
                '                                                    <path class="st0" d="M-477.7,530.5h11.9c0.5,0,0.8,0.4,0.8,0.8l0,0c0,0.5-0.4,0.8-0.8,0.8h-11.9c-0.5,0-0.8-0.4-0.8-0.8l0,0\n' +
                '                            C-478.6,530.8-478.2,530.5-477.7,530.5z"/>\n' +
                '                                                    <path class="st0" d="M-477.7,533.5h7.9c0.5,0,0.8,0.4,0.8,0.8l0,0c0,0.5-0.4,0.8-0.8,0.8h-7.9c-0.5,0-0.8-0.4-0.8-0.8l0,0\n' +
                '                            C-478.6,533.9-478.2,533.5-477.7,533.5z"/>\n' +
                '                        </svg>',
            defaultIcon = '<svg version="1.1" id="ch" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-496 507.7 54 54" style="enable-background:new -496 507.7 54 54;" xml:space="preserve">\n' +
                '                            <style type="text/css">.st0 {fill: #A886CD;}  .st1 {fill: #FFFFFF;}\n' +
                '                        </style><g><circle class="st0" cx="-469" cy="534.7" r="27"/></g><path class="st1" d="M-459.9,523.7h-20.3c-1.9,0-3.4,1.5-3.4,3.4v15.3c0,1.9,1.5,3.4,3.4,3.4h11.4l5.9,4.9c0.2,0.2,0.3,0.2,0.5,0.2 h0.3c0.3-0.2,0.5-0.5,0.5-0.8v-4.2h1.7c1.9,0,3.4-1.5,3.4-3.4v-15.3C-456.5,525.2-458,523.7-459.9,523.7z"/>\n' +
                '                                                    <path class="st0" d="M-477.7,530.5h11.9c0.5,0,0.8,0.4,0.8,0.8l0,0c0,0.5-0.4,0.8-0.8,0.8h-11.9c-0.5,0-0.8-0.4-0.8-0.8l0,0\n' +
                '                            C-478.6,530.8-478.2,530.5-477.7,530.5z"/>\n' +
                '                                                    <path class="st0" d="M-477.7,533.5h7.9c0.5,0,0.8,0.4,0.8,0.8l0,0c0,0.5-0.4,0.8-0.8,0.8h-7.9c-0.5,0-0.8-0.4-0.8-0.8l0,0\n' +
                '                            C-478.6,533.9-478.2,533.5-477.7,533.5z"/>\n' +
                '                        </svg>',
            iconBlock = document.getElementById('iconWidget'),
            desktopIcon,
            mobileIcon,
            colorFill = jQuery('.color-picker-radio input:checked').val();

        jQuery('#testUpload').on('change', function () {
            if (this.value.length > 0) {
                document.querySelector('.js-upload').disabled = false;
            } else {
                document.querySelector('.js-upload').disabled = true;
                document.getElementById('uploadInput').checked = false;
            }
        });

        jQuery(document).on("keyup", "textarea.test_textarea", function(){
            detectIcon();
        });

        jQuery('.js-switch-preview').on('change', function () {
            if (getPreviewDesktop()) {
                jQuery(this).closest(".preview").removeClass('mobiel-view');
            } else {
                jQuery(this).closest(".preview").addClass('mobiel-view');
            }
            detectIcon();
        });

        function detectIcon() {
            var desktop,
                mobile,
                colorSelf = false;
            jQuery("#iconWidget").removeClass("img-p-active");

            if (getPreviewDesktop()) {
                if (jQuery('.js-chanel-desktop:checked').length === 0) {
                    desktop = false;
                    jQuery(".page-body .chaty-widget").hide();
                } else {
                    jQuery(".page-body .chaty-widget").show();
                }
                if (jQuery('.js-chanel-desktop:checked').length === 1) {
                    desktop = jQuery('.js-chanel-desktop:checked').closest("li").find(".icon.icon-md").html();
                    if (jQuery('.js-chanel-desktop:checked').closest(".channels-selected__item").hasClass("img-active")) {
                        jQuery("#iconWidget").addClass("img-p-active");
                    }
                }
                if (jQuery('.js-chanel-desktop:checked').length > 1) {
                    desktop = defaultIcon;
                    colorSelf = true;
                }
            } else {
                if (jQuery('.js-chanel-mobile:checked').length === 0) {
                    mobile = false;
                    jQuery(".page-body .chaty-widget").hide();
                } else {
                    jQuery(".page-body .chaty-widget").show();
                }
                if (jQuery('.js-chanel-mobile:checked').length === 1) {
                    mobile = jQuery('.js-chanel-mobile:checked').closest("li").find(".icon.icon-md").html();
                    if (jQuery('.js-chanel-mobile:checked').closest(".channels-selected__item").hasClass("img-active")) {
                        jQuery("#iconWidget").addClass("img-p-active");
                    }
                }
                if (jQuery('.js-chanel-mobile:checked').length > 1) {
                    mobile = defaultIcon;
                    colorSelf = true;
                }
            }

            desktopIcon = desktop;
            mobileIcon = mobile;

            if (getPreviewDesktop()) {
                setIcon(desktopIcon, colorSelf)
            } else {
                setIcon(mobileIcon, colorSelf)
            }
        }

        function stickyelement_iconformat(icon) {
            var originalOption = icon.element;
            return jQuery('<span><i class="' + icon.text + '"></i> ' + icon.text + '</span>');
        }

        function setIcon(icon, colorSelf) {
            if (icon) {
                //jQuery('.preview .page .chaty-widget').show();
                iconBlock.innerHTML = icon;
            } else {
                //jQuery('.preview .page .chaty-widget').hide();
                iconBlock.innerHTML = '';
            }
            if (colorSelf) {
                var color = jQuery('.color-picker-custom input').val() ? jQuery('.color-picker-custom input').val() : jQuery('.color-picker-radio input:checked').val();
                jQuery('.preview .page svg circle').css({fill: color});
                jQuery('#chaty-social-close ellipse').attr("fill", color);
            }

            thisVal = jQuery("#chaty_default_state").val();
            if(thisVal == "open") {
                jQuery(".hide-show-button").addClass("active");
            } else {
                jQuery(".hide-show-button").removeClass("active");
            }

            jQuery(".chaty-widget").removeClass("active").removeClass("hover").removeClass("click");
            if(thisVal == "open") {
                jQuery(".chaty-widget").addClass("active");
            } else if(thisVal == "hover") {
                jQuery(".chaty-widget").addClass("hover");
            } else {
                jQuery(".chaty-widget").addClass("click");
            }

            jQuery(".chaty-channels").html("");
            var eClass = ".js-chanel-mobile";
            if (getPreviewDesktop()) {
                var eClass = ".js-chanel-desktop";
            }

            if(thisVal == "open" && jQuery(eClass+':checked').length > 1) {
                jQuery("#chaty_attention_effect").val("");
                jQuery("#chaty_attention_effect, .test_textarea").attr("disabled", true);
                jQuery("#chaty_attention_effect option:first-child").text("Doesn't apply for the open state");
                if(jQuery(".test_textarea").val() != "Doesn't apply for the open state") {
                    jQuery(".test_textarea").attr("data-value", jQuery(".test_textarea").val());
                }
                jQuery(".test_textarea").val("Doesn't apply for the open state");
            } else {
                jQuery("#chaty_attention_effect, .test_textarea").attr("disabled", false);
                jQuery("#chaty_attention_effect option:first-child").text("None");
                jQuery(".test_textarea").attr("placeholder","");
                if(jQuery(".test_textarea").val() == "Doesn't apply for the open state") {
                    jQuery(".test_textarea").val(jQuery(".test_textarea").attr("data-value"));
                }
            }

            if (jQuery(eClass+':checked').length > 1) {
                jQuery(eClass+':checked').each(function(){
                    var socialIcon = jQuery(this).closest("li").find(".icon").html();
                    var socialIcon = jQuery(this).closest("li").find(".icon").html();
                    var socialIconText = jQuery(this).closest("li").find(".chaty-title").val();
                    var eClass = jQuery(this).closest(".channels-selected__item").hasClass("img-active")?"img-active":"";
                    if(socialIconText != "") {
                        socialIconText = "<span class='social-tooltip'>"+socialIconText+"</span>";
                    }
                    jQuery(".chaty-channels").append("<div class='social-item-box "+eClass+"'><span class='tooltip-icon'>"+socialIcon+"</span>"+socialIconText+"</div>");
                });

                if(jQuery("#chaty_default_state").val() == "open" && jQuery("#cht_close_button").is(":checked")) {
                    jQuery("#iconWidget").css("display", "block");
                    jQuery(".chaty-widget .tooltiptext").css("display","block");
                    jQuery(".chaty-widget").removeClass("hide-arrow");
                } else if(jQuery("#chaty_default_state").val() != "open") {
                    jQuery("#iconWidget").css("display", "block");
                    jQuery(".chaty-widget .tooltiptext").css("display","block");
                    jQuery(".chaty-widget").removeClass("hide-arrow");
                } else if(jQuery("#chaty_default_state").val() == "open") {
                    jQuery("#iconWidget").hide();
                    jQuery(".chaty-widget .tooltiptext").hide();
                    jQuery(".chaty-widget").addClass("hide-arrow");
                }
                jQuery(".chaty-widget").removeClass("has-single");
            } else if (jQuery(eClass+':checked').length == 1) {
                if(jQuery("#chaty_default_state").val() == "open" && !jQuery("#cht_close_button").is(":checked")) {
                    jQuery("#iconWidget").css("display","block");
                    jQuery(".chaty-widget .tooltiptext").css("display","block");
                    jQuery(".chaty-widget").removeClass("hide-arrow");
                } else if(jQuery("#chaty_default_state").val() != "open") {
                    jQuery("#iconWidget").css("display","block");
                    jQuery(".chaty-widget .tooltiptext").css("display","block");
                    jQuery(".chaty-widget").removeClass("hide-arrow");
                }
                jQuery(".chaty-widget").addClass("has-single");
            } else if (jQuery(eClass+':checked').length == 0) {
                jQuery("#iconWidget").hide();
                jQuery(".chaty-widget .tooltiptext").hide();
                jQuery(".chaty-widget").addClass("hide-arrow");
                jQuery(".chaty-widget").removeClass("has-single");
            }
            jQuery(".chaty-channels .remove-icon-img").remove();

            if(jQuery("#trigger_on_time").is(":checked")) {
                jQuery("#chaty_trigger_time").attr("readonly", false);
            } else {
                jQuery("#chaty_trigger_time").attr("readonly", true);
            }

            if(jQuery("#chaty_trigger_on_scroll").is(":checked")) {
                jQuery("#chaty_trigger_on_page_scroll").attr("readonly", false);
            } else {
                jQuery("#chaty_trigger_on_page_scroll").attr("readonly", true);
            }


            if(jQuery(".chaty-widget .tooltiptext").text() == "") {
                jQuery(".chaty-widget .tooltiptext").hide();
            } else {
                if(jQuery("#chaty_default_state").val() == "open" && jQuery(eClass+':checked').length > 1) {
                    jQuery(".chaty-widget .tooltiptext").hide();
                } else {
                    jQuery(".chaty-widget .tooltiptext").css("display", "block");
                }
            }

            jQuery(".page-body .chaty-widget").removeClass("vertical").removeClass("horizontal");
            jQuery(".page-body .chaty-widget").addClass(jQuery("#chaty_icons_view").val());
        }

        function getPreviewDesktop() {
            return jQuery('#previewDesktop').attr('checked') === 'checked' ? true : false;
        }

        function changeWidgetIcon() {

            jQuery(document).on('change', '.js-chanel-icon', function () {
                detectIcon();
            });

            function calc(a) {
                var count = {}, res = 0, q;
                for (q = 0; q < a.length; ++q) {
                    count[a[q].dataset.type] = ~~count[a[q].dataset.type] + 1;
                }
                for (q in count) {
                    if (count.hasOwnProperty(q) && count[q] > 1) {
                        res += count[q];
                    }
                }
                return res;
            }


            jQuery(document).on('change', '.js-widget-i', function (ev) {
                if (ev.target.classList.contains('js-upload')) {
                    defaultIcon = jQuery('.file-preview-image').last().parent().html();
                } else {
                    defaultIcon = jQuery('i[data-type=' + ev.target.dataset.type + ']').html()
                }
                detectIcon();
            });
        }

        changeWidgetIcon();

        if (jQuery(".js-widget-i:checked").attr("data-type") !== 'chat-image') {
            defaultIcon = jQuery('i[data-type=' + jQuery(".js-widget-i:checked").attr("data-type") + ']').html();
            detectIcon();
        };
    });

    jQuery(document).ready(function () {

        jQuery(document).on("click", ".chaty-popup-box button, #chaty-intro-popup", function(e){
            e.stopPropagation();
            var nonceVal = jQuery("#chaty_update_popup_status").val();
            $("#chaty-intro-popup").remove();
            $.ajax({
                type: 'POST',
                url: ajaxurl,
                data: {
                    action: 'update_popup_status',
                    nonce: nonceVal
                },
                beforeSend: function (xhr) {

                },
                success: function (res) {

                },
                error: function (xhr, status, error) {

                }
            });
        });

        jQuery(document).on("click", ".chaty-popup-box", function(e){
            e.stopPropagation();
        });

        jQuery(document).on("click", ".remove-chaty-options", function (e) {
            e.preventDefault();
            e.stopPropagation();
            if(confirm("Are you sure you want to delete this widget?")) {
                $.ajax({
                    type: 'POST',
                    url: ajaxurl,
                    data: {
                        action: 'remove_chaty_widget',
                        nonce_code: cht_nonce_ajax.cht_nonce,
                        widget_index: jQuery("#widget_index").val()
                    },
                    beforeSend: function (xhr) {

                    },
                    success: function (res) {
                        window.location = res;
                    },
                    error: function (xhr, status, error) {

                    }
                });
            }
        })

        /* Date: 2019-07-26 */
        var location_href = window.location.href;
        if (window.location.href.indexOf('page=chaty-app&widget=') > -1) {
            jQuery('#toplevel_page_chaty-app .wp-submenu.wp-submenu-wrap li').each(function () {
                var element_href = jQuery(this).find('a').attr('href');
                if (typeof element_href !== 'undefined') {
                    jQuery(this).removeClass('current');
                    if (window.location.href.indexOf(element_href) > -1 && element_href.indexOf('&widget=') > -1) {
                        jQuery(this).addClass('current');
                    }
                }
            });
        }
    });
}(jQuery));

jQuery(window).resize(function () {
    check_for_preview_pos();
});
jQuery(window).scroll(function () {
    check_for_preview_pos();
});
jQuery(document).ready(function () {
    check_for_preview_pos();
});

function check_for_preview_pos() {
    if(jQuery(".chaty-setting-form").length) {
        if(jQuery(window).width() > 1179) {
            var topPos = parseInt(jQuery(".chaty-setting-form").offset().top);
            jQuery(".btn-save-sticky, .chaty-sticky-buttons").css("top", (topPos+58));
            jQuery(".preview").css("top", (topPos+18));
            jQuery(".btn-help").css("top", (topPos+58+145));
            jQuery("a.remove-chaty-widget-sticky").css("top", (topPos+58+145+119));
        } else {
            jQuery(".btn-save-sticky, .chaty-sticky-buttons").attr("style", "");
            jQuery(".preview").attr("style", "");
            jQuery(".btn-help").attr("style", "");
            jQuery("a.remove-chaty-widget-sticky").attr("style", "");
        }
    }

    if (jQuery("#scroll-to-item").length && jQuery("#admin-preview").length) {
        if(jQuery("body").hasClass("has-premio-box")) {
            topPos = jQuery("#scroll-to-item").offset().top - jQuery(window).scrollTop() - 625;
        } else {
            topPos = jQuery("#scroll-to-item").offset().top - jQuery(window).scrollTop() - 485;
        }

        if (topPos < 0) {
            topPos = Math.abs(topPos);
            jQuery("#admin-preview").css("margin-top", ((-1) * topPos) + "px");
        } else {
            jQuery("#admin-preview").css("margin-top", "0");
        }
    }

    if(jQuery(window).height() <= 1180) {
        var totalHeight = 285;
        if(jQuery(window).width() <= 600) {
            totalHeight = 310;
        }
        jQuery(".chaty-sticky-buttons").css("top", ((jQuery(window).height()/2)-(totalHeight/2))+"px");
    }
}

var totalPageOptions = 0;
var pageOptionContent = "";
var totalDateAndTimeOptions = 0;
var dateAndTimeOptionContent = "";
jQuery(document).ready(function () {
    totalPageOptions = parseInt(jQuery(".chaty-page-option").length);
    pageOptionContent = jQuery(".chaty-page-options-html").html();
    jQuery(".chaty-page-options-html").remove();
    totalDateAndTimeOptions = parseInt(jQuery(".chaty-date-time-option").length);
    dateAndTimeOptionContent = jQuery(".chaty-date-and-time-options-html").html();
    jQuery(".chaty-date-and-time-options-html").remove();

    jQuery("#create-rule").click(function () {
        // appendHtml = pageOptionContent.replace(/__count__/g, totalPageOptions, pageOptionContent);
        // totalPageOptions++;
        // jQuery(".chaty-page-options").append(appendHtml);
        // jQuery(".chaty-page-options .chaty-page-option").removeClass("last");
        // jQuery(".chaty-page-options .chaty-page-option:last").addClass("last");
        //
        // if (jQuery("#is_pro_plugin").val() == "0") {
        //     jQuery(".chaty-page-options").find("input").attr("name", "");
        //     jQuery(".chaty-page-options").find("select").attr("name", "");
        //     jQuery(".chaty-page-options").find("input").removeClass("cht-required");
        //     jQuery(".chaty-page-options").find("select").removeClass("cht-required");
        //     jQuery(this).remove();
        // }
        jQuery(".page-options").toggle();
    });

    jQuery("#create-data-and-time-rule").click(function () {
        jQuery(".chaty-data-and-time-rules").toggle();
    });

    jQuery(document).on("change", "#chaty_attention_effect", function(){
        var currentClass = jQuery(this).attr("data-effect");
        if(currentClass != "") {
            jQuery("#iconWidget").removeClass("chaty-animation-"+currentClass);
        }
        jQuery("#iconWidget").removeClass("start-now");
        jQuery("#iconWidget").addClass("chaty-animation-"+jQuery(this).val()).addClass("start-now");
        jQuery(this).attr("data-effect", jQuery(this).val());
    });

    setInterval(function(){
        var currentClass = jQuery("#chaty_attention_effect").attr("data-effect");
        if(currentClass != "") {
            jQuery("#iconWidget").removeClass("chaty-animation-"+currentClass);
            jQuery("#iconWidget").removeClass("start-now");
            setTimeout(function(){
                jQuery("#iconWidget").addClass("chaty-animation-"+jQuery("#chaty_attention_effect").val()).addClass("start-now");
            }, 1000);
        } else {
            jQuery("#chaty_attention_effect").attr("data-effect", jQuery("#chaty_attention_effect").val());
        }
    }, 5000);

    jQuery(document).on("click", ".remove-chaty", function () {
        jQuery(this).closest(".chaty-page-option").remove();
        jQuery(".chaty-page-options .chaty-page-option").removeClass("last");
        jQuery(".chaty-page-options .chaty-page-option:last").addClass("last");
    });

    jQuery(document).on("click", ".remove-page-option", function () {
        jQuery(this).closest(".chaty-date-time-option").remove();
    });

    jQuery("#image-upload-content .custom-control-label").click(function (e) {
        e.stopPropagation();
        jQuery(this).closest(".custom-control").find("input[type=radio]").attr("checked", true);
        jQuery('.js-widget-i').trigger("change");
        return false;
    });
    //jQuery('.chaty-color-field').wpColorPicker({
    //    pick: "Background Color",
    //    target: false,
    //    change: function(event, ui){
    //        chaty_set_bg_color();
    //    }
    //});

    jQuery('.chaty-color-field').spectrum({
        chooseText: "Submit",
        preferredFormat: "hex",
        cancelText: "Cancel",
        showInput: true,
        move: function (color) {
            jQuery(this).val(color.toHexString());
            chaty_set_bg_color();
            change_custom_preview();
        }
    });
    jQuery(".chaty-color-field").change(function () {
        chaty_set_bg_color();
        change_custom_preview();
    });

    jQuery(".remove-chaty-img").on("click", function (e) {
        e.stopPropagation();
    });

    jQuery("#channels-selected-list").sortable({
        placeholder: "ui-chaty-state-hl",
        items: "li:not(#chaty-social-close)",
        update: function (event, ui) {
            set_social_channel_order();
            change_custom_preview();
        }
    });

    jQuery(".close-button-img img, .close-button-img .image-upload").click(function () {
        var image = wp.media({
            title: 'Upload Image',
            // mutiple: true if you want to upload multiple files at once
            multiple: false,
            library: {
                type: 'image',
            }
        }).open()
            .on('select', function (e) {
                var uploaded_image = image.state().get('selection').first();
                imageData = uploaded_image.toJSON();
                jQuery('.close-button-img').addClass("active");
                jQuery('.close-button-img input').val(imageData.id);
                jQuery('.close-button-img img').attr("src", imageData.url);
                change_custom_preview();
            });
    });

    jQuery(".remove-close-img").click(function () {
        default_image = jQuery("#default_image").val();
        jQuery('.close-button-img').removeClass("active");
        jQuery('.close-button-img input').val("");
        jQuery('.close-button-img img').attr("src", default_image);
        change_custom_preview();
    });

    jQuery(document).on("click", ".chaty-widget.click", function(e){
        e.preventDefault();
        // jQuery(".chaty-channels").toggle();
        jQuery(".chaty-widget").toggleClass("active");
    });

    jQuery(document).on('change', '.url-options.cht-required', function (ev) {
        thisVal = jQuery(this).val();
        siteURL = jQuery("#chaty_site_url").val();
        newURL = siteURL;
        if (thisVal == "page_has_url") {
            newURL = siteURL;
        } else if (thisVal == "page_contains") {
            newURL = siteURL + "%s%";
        } else if (thisVal == "page_start_with") {
            newURL = siteURL + "s%";
        } else if (thisVal == "page_end_with") {
            newURL = siteURL + "%s";
        }
        jQuery(this).closest(".url-content").find(".chaty-url").text(newURL);
    });

    check_for_chaty_close_button();
    chaty_set_bg_color();
    change_custom_preview();

    jQuery(".chaty-settings.cls-btn a, .close-btn-set").click(function (e) {
        e.preventDefault();
        jQuery(".cls-btn-settings, .close-btn-set").toggleClass("active");
    });

    /*Default Values*/
    if (jQuery("input[name='cht_position']:checked").length == 0) {
        jQuery("#right-position").attr("checked", true);
        jQuery("input[name='cht_position']:checked").trigger("change");
    }
    if (jQuery("input[name='widget_icon']:checked").length == 0) {
        jQuery("input[name='widget_icon']:first").attr("checked", true);
        jQuery("input[name='widget_icon']:checked").trigger("change");
    }

    /*font family Privew*/
    jQuery('.form-fonts').on( 'change', function() {
        var font_val = jQuery(this).val();
        jQuery('.chaty-google-font').remove();
        if (font_val != "") {
            jQuery('head').append('<link href="https://fonts.googleapis.com/css?family=' + font_val + ':400,600,700" rel="stylesheet" type="text/css" class="chaty-google-font">');
            jQuery('.preview-section-chaty #admin-preview .page-body').css('font-family', font_val);
        } else {
            jQuery('.preview-section-chaty #admin-preview .page-body').attr("style","");
        }
    });
});

jQuery(window).load(function () {
    check_for_chaty_close_button();
    chaty_set_bg_color();
    jQuery(".chaty-page-options .chaty-page-option").removeClass("last");
    jQuery(".chaty-page-options .chaty-page-option:last").addClass("last");

    jQuery('.url-options.cht-required').each(function () {
        jQuery(this).trigger("change");
    });
    var font_val = jQuery('.form-fonts').val();
    jQuery('.chaty-google-font').remove();
    if (font_val != "") {
        jQuery('head').append('<link href="https://fonts.googleapis.com/css?family=' + font_val + ':400,600,700" rel="stylesheet" type="text/css" class="chaty-google-font">');
        jQuery('.preview-section-chaty #admin-preview .page-body').css('font-family', font_val);
    }
    // jQuery("#chaty_default_state").trigger("change");
});

var selectedsocialSlug = "";

function upload_chaty_image(socialSlug) {
    selectedsocialSlug = socialSlug;
    var image = wp.media({
        title: 'Upload Image',
        // mutiple: true if you want to upload multiple files at once
        multiple: false,
        library: {
            type: 'image',
        }
    }).open()
        .on('select', function (e) {
            var uploaded_image = image.state().get('selection').first();
            imageData = uploaded_image.toJSON();
            jQuery('#cht_social_image_' + selectedsocialSlug).val(imageData.id);
            jQuery('.custom-image-' + selectedsocialSlug + " img").attr("src", imageData.url);
            jQuery("#chaty-social-" + selectedsocialSlug + " .channels-selected__item").addClass("img-active");
            change_custom_preview();
        });
}

function toggle_chaty_setting(socId) {
    jQuery("#chaty-social-" + socId).find(".chaty-advance-settings").toggle();
    change_custom_preview();
}

function chaty_set_bg_color() {
    jQuery(".chaty-color-field").each(function () {
        if (jQuery(this).val() != "" && jQuery(this).val() != "#ffffff") {
            if (jQuery(this).closest("li").data("id") != "Linkedin" || (jQuery(this).closest("li").data("id") == "Linkedin" && jQuery(this).val() != "#ffffff")) {
                defaultColor = jQuery(this).val();
                jQuery(this).closest(".channels-selected__item").find(".color-element").css("fill", defaultColor);
                jQuery(this).closest(".channels-selected__item").find(".custom-chaty-image").css("background", defaultColor);
                jQuery(this).closest(".channels-selected__item").find(".facustom-icon").css("background", defaultColor);
            }
        }
    });
    change_custom_preview();
}

function upload_qr_code() {
    var image = wp.media({
        title: 'Upload QR Image',
        multiple: false,
        library: {
            type: 'image',
        }
    }).open()
        .on('select', function (e) {
            var uploaded_image = image.state().get('selection').first();
            imageData = uploaded_image.toJSON();
            jQuery('#upload_qr_code_val').val(imageData.id);
            jQuery('#upload_qr_code img').attr("src", imageData.url);
            jQuery(".remove-qr-code").addClass("active");
            change_custom_preview();
        });
}

function remove_qr_code() {
    jQuery(".remove-qr-code").removeClass("active");
    jQuery('#upload_qr_code_val').val("");
    default_image = jQuery("#default_image").val();
    jQuery('#upload_qr_code img').attr("src", default_image);
    change_custom_preview();
}

function remove_chaty_image(socId) {
    default_image = jQuery("#default_image").val();
    jQuery("#chaty-social-" + socId + " .channels-selected__item").removeClass("img-active");
    jQuery('#cht_social_image_' + socId).val("");
    jQuery('#cht_social_image_src_' + socId).attr("src", default_image);
    change_custom_preview();
}

var baseIcon = '<svg version="1.1" id="ch" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-496 507.7 54 54" style="enable-background:new -496 507.7 54 54;" xml:space="preserve">\n' +
        '                            <style type="text/css">.st0 {fill: #A886CD;}  .st1 {fill: #FFFFFF;}\n' +
        '                        </style><g><circle class="st0" cx="-469" cy="534.7" r="27"/></g><path class="st1" d="M-459.9,523.7h-20.3c-1.9,0-3.4,1.5-3.4,3.4v15.3c0,1.9,1.5,3.4,3.4,3.4h11.4l5.9,4.9c0.2,0.2,0.3,0.2,0.5,0.2 h0.3c0.3-0.2,0.5-0.5,0.5-0.8v-4.2h1.7c1.9,0,3.4-1.5,3.4-3.4v-15.3C-456.5,525.2-458,523.7-459.9,523.7z"/>\n' +
        '                                                    <path class="st0" d="M-477.7,530.5h11.9c0.5,0,0.8,0.4,0.8,0.8l0,0c0,0.5-0.4,0.8-0.8,0.8h-11.9c-0.5,0-0.8-0.4-0.8-0.8l0,0\n' +
        '                            C-478.6,530.8-478.2,530.5-477.7,530.5z"/>\n' +
        '                                                    <path class="st0" d="M-477.7,533.5h7.9c0.5,0,0.8,0.4,0.8,0.8l0,0c0,0.5-0.4,0.8-0.8,0.8h-7.9c-0.5,0-0.8-0.4-0.8-0.8l0,0\n' +
        '                            C-478.6,533.9-478.2,533.5-477.7,533.5z"/>\n' +
        '                        </svg>',
    defaultIcon = '<svg version="1.1" id="ch" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-496 507.7 54 54" style="enable-background:new -496 507.7 54 54;" xml:space="preserve">\n' +
        '                            <style type="text/css">.st0 {fill: #A886CD;}  .st1 {fill: #FFFFFF;}\n' +
        '                        </style><g><circle class="st0" cx="-469" cy="534.7" r="27"/></g><path class="st1" d="M-459.9,523.7h-20.3c-1.9,0-3.4,1.5-3.4,3.4v15.3c0,1.9,1.5,3.4,3.4,3.4h11.4l5.9,4.9c0.2,0.2,0.3,0.2,0.5,0.2 h0.3c0.3-0.2,0.5-0.5,0.5-0.8v-4.2h1.7c1.9,0,3.4-1.5,3.4-3.4v-15.3C-456.5,525.2-458,523.7-459.9,523.7z"/>\n' +
        '                                                    <path class="st0" d="M-477.7,530.5h11.9c0.5,0,0.8,0.4,0.8,0.8l0,0c0,0.5-0.4,0.8-0.8,0.8h-11.9c-0.5,0-0.8-0.4-0.8-0.8l0,0\n' +
        '                            C-478.6,530.8-478.2,530.5-477.7,530.5z"/>\n' +
        '                                                    <path class="st0" d="M-477.7,533.5h7.9c0.5,0,0.8,0.4,0.8,0.8l0,0c0,0.5-0.4,0.8-0.8,0.8h-7.9c-0.5,0-0.8-0.4-0.8-0.8l0,0\n' +
        '                            C-478.6,533.9-478.2,533.5-477.7,533.5z"/>\n' +
        '                        </svg>'
var iconBlock = document.getElementById('iconWidget');

function set_social_channel_order() {
    socialString = [];
    jQuery("#channels-selected-list li").each(function () {
        socialString.push(jQuery(this).attr("data-id"));
    });
    socialString = socialString.join(",");
    jQuery("#cht_numb_slug").val(socialString);
    check_for_chaty_close_button();
}

function check_for_chaty_close_button() {
    if (jQuery("#channels-selected-list > li:not(.chaty-cls-setting)").length >= 2) {
        jQuery("#chaty-social-close").show();
    } else {
        jQuery("#chaty-social-close").hide();
    }
    change_custom_preview();
    var srtString = "";
    jQuery("#channels-selected-list > li").each(function(){
        if(jQuery(this).attr("data-id") != "undefined" && jQuery(this).attr("data-id") != "") {
            srtString += jQuery(this).attr("data-id")+",";
        }
        srtString = srtString.trimRight(",")
    });
    jQuery(".add_slug").val(srtString);
}

function change_custom_preview() {
    var desktop,
        mobile,
        colorSelf = false;
    jQuery("#iconWidget").removeClass("img-p-active");
    if (getChtPreviewDesktop()) {
        if (jQuery('.js-chanel-desktop:checked').length === 0) {
            desktop = false;
        }
        if (jQuery('.js-chanel-desktop:checked').length === 1) {
            desktop = jQuery('.js-chanel-desktop:checked').closest("li").find(".icon.icon-md").html();
            if (jQuery('.js-chanel-desktop:checked').closest(".channels-selected__item").hasClass("img-active")) {
                jQuery("#iconWidget").addClass("img-p-active");
            }
        }
        if (jQuery('.js-chanel-desktop:checked').length > 1) {
            desktop = defaultIcon;
            colorSelf = true;
        }
    } else {
        if (jQuery('.js-chanel-mobile:checked').length === 0) {
            mobile = false;
        }
        if (jQuery('.js-chanel-mobile:checked').length === 1) {
            mobile = jQuery('.js-chanel-mobile:checked').closest("li").find(".icon.icon-md").html();
            if (jQuery('.js-chanel-mobile:checked').closest(".channels-selected__item").hasClass("img-active")) {
                jQuery("#iconWidget").addClass("img-p-active");
            }
        }
        if (jQuery('.js-chanel-mobile:checked').length > 1) {
            mobile = defaultIcon;
            colorSelf = true;
        }
    }


    desktopIcon = desktop;
    mobileIcon = mobile;

    if (getChtPreviewDesktop()) {
        setChtIcon(desktopIcon, colorSelf)
    } else {
        setChtIcon(mobileIcon, colorSelf)
    }
}

function getChtPreviewDesktop() {
    return jQuery('#previewDesktop').attr('checked') === 'checked' ? true : false;
}

function setChtIcon(icon, colorSelf) {
    iconBlock = document.getElementById('iconWidget');
    if (icon) {
        //jQuery('.preview .page .chaty-widget').show();
        iconBlock.innerHTML = icon;
    } else {
        //jQuery('.preview .page .chaty-widget').hide();
        iconBlock.innerHTML = '';
    }
    if (colorSelf) {
        var color = jQuery('.color-picker-custom input').val() ? jQuery('.color-picker-custom input').val() : jQuery('.color-picker-radio input:checked').val();
        jQuery('.preview .page svg circle').css({fill: color});
        jQuery('#chaty-social-close ellipse').attr("fill", color);
    }
    jQuery('.js-widget-i:checked').trigger("change");
}