<?php
$days = array(
    "0" => "Everyday of week",
    "1" => "Sunday",
    "2" => "Monday",
    "3" => "Tuesday",
    "4" => "Wednesday",
    "5" => "Thursday",
    "6" => "Friday",
    "7" => "Saturday",
    "8" => "Sunday to Thursday",
    "9" => "Monday to Friday",
    "10" => "Weekend",
)
?>

<section class="section">
    <h1 class="section-title">
        <strong><?php esc_attr_e('Step', CHT_OPT);?> 3:</strong> <?php esc_attr_e('Triggers and targeting', CHT_OPT);?>
    </h1>

    <div class="form-horizontal">
        <div class="form-horizontal__item flex-center">
            <label class="form-horizontal__item-label" for="chaty_icons_view"><?php esc_attr_e('Icons view', CHT_OPT);?>:</label>
            <div>
                <?php
                $modes = array(
                    "vertical" => "Vertical mode",
                    "horizontal" => "Horizontal mode"
                );
                $mode = get_option('chaty_icons_view');
                $mode = empty($mode)?"vertical":$mode;
                ?>
                <select name="chaty_icons_view" id="chaty_icons_view" class="chaty-select">
                    <?php foreach ($modes as $key => $value): ?>
                        <option value="<?php echo esc_attr($key); ?>" <?php selected($mode, $key); ?>><?php echo esc_attr($value); ?></option>
                    <?php endforeach; ?>
                </select>
            </div>
        </div>

        <div class="form-horizontal__item flex-center">
            <label class="form-horizontal__item-label"><?php esc_attr_e('Default state', CHT_OPT);?>:</label>
            <div>
                <?php
                $states = array(
                    "click" => "Click to open",
                    "hover" => "Hover to open",
                    "open" => "Opened by default"
                );
                $state = get_option('chaty_default_state');
                $state = empty($state)?"click":$state;
                ?>
                <select name="chaty_default_state" id="chaty_default_state" class="chaty-select">
                    <?php foreach ($states as $key => $value): ?>
                        <option value="<?php echo esc_attr($key); ?>" <?php selected($state, $key); ?>><?php echo esc_attr($value); ?></option>
                    <?php endforeach; ?>
                </select>
            </div>
        </div>
        <div class="form-horizontal__item flex-center hide-show-button <?php echo esc_attr($state=="open"?"active":"") ?>" >
            <label class="form-horizontal__item-label"><?php esc_attr_e('Show close button', CHT_OPT);?>:</label>
            <div>
                <label class="switch">
                    <span class="switch__label"><?php esc_attr_e('Off', CHT_OPT);?></span>
                    <?php $close_button = get_option('cht_close_button'); ?>
                    <?php $close_button = empty($close_button)?"yes":$close_button; ?>
                    <input type="hidden" name="cht_close_button" value="no" >
                    <input data-gramm_editor="false" type="checkbox" id="cht_close_button" name="cht_close_button" value="yes" <?php checked($close_button, "yes") ?> >
                    <span class="switch__styled"></span>
                    <span class="switch__label"><?php esc_attr_e('On', CHT_OPT);?></span>
                </label>
            </div>
        </div>
        <div class="form-horizontal__item">
            <label class="form-horizontal__item-label"><?php esc_attr_e('Trigger', CHT_OPT);?>:</label>
            <div class="trigger-block">
                <?php $checked = get_option('chaty_trigger_on_time') ?>
                <?php $time = get_option('chaty_trigger_time'); ?>
                <?php $time = empty($time)?"0":$time; ?>
                <?php $checked = empty($checked)?"yes":$checked; ?>
                <input type="hidden" name="chaty_trigger_on_time" value="no" >
                <div class="trigger-option-block">
                    <label class="chaty-switch" for="trigger_on_time">
                        <input type="checkbox" name="chaty_trigger_on_time" id="trigger_on_time" value="yes" <?php checked($checked, "yes") ?> >
                        <div class="chaty-slider round"></div>
                        Time Delay
                    </label>
                    <div class="trigger-block-input">
                        Display after <input type="number" id="chaty_trigger_time" name="chaty_trigger_time" value="<?php echo esc_attr($time) ?>"> seconds on the page
                    </div>
                </div>
                <?php $checked = get_option('chaty_trigger_on_exit') ?>
                <?php $time = get_option('chaty_trigger_on_exit'); ?>
                <?php $time = empty($time)?"0":$time; ?>
                <?php $checked = empty($checked)?"no":$checked; ?>
                <div class="trigger-option-block">
                    <input type="hidden" name="chaty_trigger_on_exit" value="no" >
                    <label class="chaty-switch" for="chaty_trigger_on_exit">
                        <input type="checkbox" name="chaty_trigger_on_exit" id="chaty_trigger_on_exit" value="yes" <?php checked($checked, "yes") ?> >
                        <div class="chaty-slider round"></div>
                        Exit intent
                    </label>
                    <div class="trigger-block-input">
                        Display when visitor is about to leave the page
                    </div>
                </div>
                <?php $checked = get_option('chaty_trigger_on_scroll') ?>
                <?php $time = get_option('chaty_trigger_on_page_scroll'); ?>
                <?php $time = empty($time)?"0":$time; ?>
                <?php $checked = empty($checked)?"no":$checked; ?>
                <div class="trigger-option-block">
                    <input type="hidden" name="chaty_trigger_on_scroll" value="no" >
                    <label class="chaty-switch" for="chaty_trigger_on_scroll">
                        <input type="checkbox" name="chaty_trigger_on_scroll" id="chaty_trigger_on_scroll" value="yes" <?php checked($checked, "yes") ?> >
                        <div class="chaty-slider round"></div>
                        Page Scroll
                    </label>
                    <div class="trigger-block-input">
                        Display after <input type="number" id="chaty_trigger_on_page_scroll" name="chaty_trigger_on_page_scroll" value="<?php echo esc_attr($time) ?>"> % on page
                    </div>
                </div>
            </div>
        </div>
        <div class="form-horizontal__item flex-center" id="scroll-to-item">
            <label class="form-horizontal__item-label">
                <span class="header-tooltip">
                    <span class="header-tooltip-text text-center">Display the widget on specific days and hours based on your opening days and hours</span>
                    <span class="dashicons dashicons-editor-help"></span>
                </span>
                <?php esc_attr_e('Days and hours', CHT_OPT);?>:</label>
            <div class="chaty-option-box">
                <div class="chaty-page-options" id="chaty-page-options">
                    <div class="chaty-data-and-time-rules ">
                        <div class="chaty-date-time-option first last" data-index="__count__">
                            <div class="date-time-content">
                                <div class="day-select">
                                    <select class="cht-free-required" id="url_shown_on___count___option">
                                        <?php foreach ($days as $key=>$value) { ?>
                                            <option value="<?php echo esc_attr($key) ?>"><?php echo esc_attr($value) ?></option>
                                        <?php } ?>
                                    </select>
                                </div>
                                <div class="day-label">
                                    From
                                </div>
                                <div class="day-time">
                                    <input type="text" class="cht-free-required time-picker" value=""  id="start_time___count__" />
                                </div>
                                <div class="day-label">
                                    To
                                </div>
                                <div class="day-time">
                                    <input type="text" class="cht-free-required time-picker" value="" id="end_time___count__" />
                                </div>
                                <div class="day-label">
                                    <span class="gmt-data">GMT</span>
                                </div>
                                <div class="day-time">
                                    <select class="cht-free-required gmt-data" id="url_shown_on___count___option">
                                        <?php for($i=12; $i>=-12;$i--) { ?>
                                            <option <?php selected($i, 0) ?> value="<?php echo esc_attr($i) ?>"><?php echo esc_attr($i>0?"+":"").esc_attr($i) ?></option>
                                        <?php } ?>
                                    </select>
                                </div>
                                <div class="day-buttons">
                                    <a class="remove-page-option" href="javascript:;">
                                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="15.6301" height="2.24494" rx="1.12247" transform="translate(2.26764 0.0615997) rotate(45)" fill="white"></rect>
                                            <rect width="15.6301" height="2.24494" rx="1.12247" transform="translate(13.3198 1.649) rotate(135)" fill="white"></rect>
                                        </svg>
                                    </a>
                                </div>
                                <div class="clear"></div>
                            </div>
                            <div class="clear"></div>
                            <?php if(!$this->is_pro()) { ?>
                                <div class="chaty-pro-feature">
                                    <a target="_blank" href="<?php echo esc_url($this->getUpgradeMenuItemUrl()) ?>">
                                        <?php esc_attr_e('Upgrade to Pro', CHT_OPT); ?>
                                    </a>
                                </div>
                            <?php } ?>
                        </div>
                    </div>
                </div>
                <a href="javascript:;" class="create-rule" id="create-data-and-time-rule">Add Rule</a>
            </div>
        </div>

        <div class="form-horizontal__item" id="custom-rules">
            <label class="form-horizontal__item-label">
                <span class="header-tooltip">
                    <span class="header-tooltip-text text-center">Show or don't show the widget on specific pages. You can use rules like contains, exact match, starts with, and ends with</span>
                    <span class="dashicons dashicons-editor-help"></span>
                </span>
                Show on pages:</label>
            <div class="chaty-option-box">
                <div class="page-options">
                    <div class="chaty-page-option">
                        <div class="url-content">
                            <div class="url-select">
                                <select class="cht-free-required" id="url_shown_on___count___option">
                                    <option value="show_on">Show on</option>
                                    <option value="not_show_on">Don't show on</option>
                                </select>
                            </div>
                            <div class="url-option">
                                <select class="url-options cht-free-required" id="url_rules___count___option">
                                    <option selected="selected" disabled value="">Select Rule</option>
                                </select>
                            </div>
                            <div class="url-box">
                                <span class='chaty-url'><?php echo esc_url(site_url("/")); ?></span>
                            </div>
                            <div class="url-values">
                                <input type="text" class="cht-free-required" value="" id="url_rules___count___value" />
                            </div>
                            <div class="url-buttons">
                                <a class="remove-chaty" href="javascript:;">
                                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="15.6301" height="2.24494" rx="1.12247" transform="translate(2.26764 0.0615997) rotate(45)" fill="white"></rect>
                                        <rect width="15.6301" height="2.24494" rx="1.12247" transform="translate(13.3198 1.649) rotate(135)" fill="white"></rect>
                                    </svg>
                                </a>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="clear"></div>
                    </div>
                    <div class="chaty-pro-feature">
                        <a target="_blank" href="<?php echo esc_url($this->getUpgradeMenuItemUrl());?>">
                            <?php esc_attr_e('Upgrade to Pro', CHT_OPT);?>
                        </a>
                    </div>
                </div>
                <a href="javascript:;" class="create-rule" id="create-rule">Add Rule</a>
            </div>
        </div>

        <div class="form-horizontal__item">
            <label class="form-horizontal__item-label">
                <span class="header-tooltip">
                    <span class="header-tooltip-text text-center">Target your widget to specific countries. You can create different widgets for different countries</span>
                    <span class="dashicons dashicons-editor-help"></span>
                </span>
                Country targeting:</label>
            <div class="country-option-box">
                <div class="country-list-box">
                    <select class="country-list chaty-select">
                        <option value="">All Countries</option>
                    </select>
                </div>
                <div class="chaty-pro-feature">
                    <a target="_blank" href="<?php echo esc_url($this->getUpgradeMenuItemUrl());?>">
                        <?php esc_attr_e('Upgrade to Pro', CHT_OPT);?>
                    </a>
                </div>
            </div>
        </div>

        <div class="form-horizontal__item">
            <label class="form-horizontal__item-label">Custom CSS:</label>
            <div class="country-option-box">
                <div class="country-list-box">
                    <textarea class="custom-css"></textarea>
                </div>
                <div class="chaty-pro-feature">
                    <a target="_blank" href="<?php echo esc_url($this->getUpgradeMenuItemUrl());?>">
                        <?php esc_attr_e('Upgrade to Pro', CHT_OPT);?>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <input type="hidden" name="chaty_updated_on" value="<?php echo time(); ?>">
</section>