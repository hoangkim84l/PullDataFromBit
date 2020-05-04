<?php

namespace CHT\frontend;

use CHT\admin\CHT_Admin_Base;
use CHT\admin\CHT_Social_Icons;

$admin_base = CHT_ADMIN_INC . '/class-admin-base.php';
require_once($admin_base);

$social_icons = CHT_ADMIN_INC . '/class-social-icons.php';
require_once($social_icons);

class CHT_Frontend extends CHT_Admin_Base
{
    public $widget_number;
    /**
     * CHT_Frontend constructor.
     */
    public function __construct()
    {
        $this->socials = CHT_Social_Icons::get_instance()->get_icons_list();
        if (wp_doing_ajax()) {
            add_action('wp_ajax_choose_social', array($this, 'choose_social_handler'));
            add_action('wp_ajax_get_chaty_settings', array($this, 'get_chaty_settings'));     // return setting for a social media in html
        }
        add_action('wp_head', array($this, 'insert_widget'));
    }

    public function get_chaty_settings() {
        $slug = filter_input(INPUT_POST, 'social', FILTER_SANITIZE_STRING);
        $channel = filter_input(INPUT_POST, 'channel', FILTER_SANITIZE_STRING);
        $status = 0;
        $data = array();
        if(!empty($slug)) {
            foreach ($this->socials as $social) {
                if ($social['slug'] == $slug) {
                    break;
                }
            }
            if (!empty($social)) {
                $status = 1;
                $data = $social;
//                echo "<pre>"; print_r($social); echo "</pre>";
                $data['help'] = "";
                $data['help_text'] = "";
                $data['help_link'] = "";
                if((isset($social['help']) && !empty($social['help'])) || isset($social['help_link'])) {
                    $data['help_title'] = isset($social['help_title'])?$social['help_title']:"Doesn't work?";
                    $data['help_text'] = isset($social['help'])?$social['help']:"";
                    if(isset($data['help_link']) && !empty($data['help_link'])) {
                        $data['help_link'] = $data['help_link'];
                    } else {
                        $data['help_title'] = $data['help_title'];
                    }
                }
            }
        }
        $response = array();
        $response['data'] = $data;
        $response['status'] = $status;
        $response['channel'] = $channel;
        echo json_encode($response);
        die;
    }

    /* function choose_social_handler start */
    public function choose_social_handler()
    {
        check_ajax_referer('cht_nonce_ajax', 'nonce_code');
        $slug = filter_input(INPUT_POST, 'social', FILTER_SANITIZE_STRING);

        if (!is_null($slug) && !empty($slug)) {
            foreach ($this->socials as $social) {
                if ($social['slug'] == $slug) {
                    break;
                }
            }
            if (!$social) {
                return;                                     // return if social media setting not found
            }

            $widget_index = filter_input(INPUT_POST, 'widget_index', FILTER_SANITIZE_STRING);

            $value = get_option('cht_social'.$widget_index.'_' . $slug);   // get setting for media if already saved

            if (empty($value)) {                                        // Initialize default values if not found
                $value = [
                    'value' => '',
                    'is_mobile' => 'checked',
                    'is_desktop' => 'checked',
                    'image_id' => '',
                    'title' => $social['title'],
                    'bg_color' => "",
                ];
            }
            if(!isset($value['bg_color']) || empty($value['bg_color'])) {
                $value['bg_color'] = $social['color'];                  // Initialize background color value if not exists. 2.1.0 change
            }
            if(!isset($value['image_id'])) {
                $value['image_id'] = '';                                // Initialize custom image id if not exists. 2.1.0 change
            }
            if(!isset($value['title']) || $value['title'] == "") {
                $value['title'] = $social['title'];                     // Initialize title if not exists. 2.1.0 change
            }
            if(!isset($value['fa_icon'])) {
                $value['fa_icon'] = "";                     // Initialize title if not exists. 2.1.0 change
            }
            $imageId = $value['image_id'];
            $imageUrl = "";
            $status = 0;
            if(!empty($imageId)) {
                $imageUrl = wp_get_attachment_image_src($imageId, "full")[0];                       // get custom image URL if exists
                $status = 1;
            }
            if($imageUrl == "") {
                $imageUrl = plugin_dir_url("")."chaty/admin/assets/images/chaty-default.png";   // Initialize with default image if custom image is not exists
                $status = 0;
                $imageId = "";
            }
            $color = "";
            if(!empty($value['bg_color'])) {
                $color = "background-color: ".$value['bg_color'];                                   // set background color of icon it it is exists
            }
            if($social['slug'] == "Whatsapp"){
                $val = $value['value'];
                $val = str_replace("+","", $val);
                $value['value'] = $val;
            } else if($social['slug'] == "Facebook_Messenger"){
                $val = $value['value'];
                $val = str_replace("facebook.com","m.me", $val);                                    // Replace facebook.com with m.me version 2.0.1 change
                $val = str_replace("www.","", $val);                                                // Replace www. with blank version 2.0.1 change
                $value['value'] = $val;

                $val = trim($val, "/");
                $val_array = explode("/", $val);
                $total = count($val_array)-1;
                $last_value = $val_array[$total];
                $last_value = explode("-", $last_value);
                $total_text = count($last_value)-1;
                $total_text = $last_value[$total_text];

                if(is_numeric($total_text)) {
                    $val_array[$total] = $total_text;
                    $value['value'] = implode("/", $val_array);
                }
            }
            $value['value'] = esc_attr__(wp_unslash($value['value']));
            $value['title'] = esc_attr__(wp_unslash($value['title']));

            $svg_icon = $social['svg'];

            $help_title = "";
            $help_text = "";
            $help_link = "";

            if((isset($social['help']) && !empty($social['help'])) || isset($social['help_link'])) {
                $help_title = isset($social['help_title'])?$social['help_title']:"Doesn't work?";
                $help_text = isset($social['help'])?$social['help']:"";
                if(isset($social['help_link']) && !empty($social['help_link'])) {
                    $help_link = $data['help_link'];
                }
            }

            $channel_type = "";
            $placeholder = $social['example'];
            if($social['slug'] == "Link" || $social['slug'] == "Custom_Link") {
                if (isset($value['channel_type'])) {
                    $channel_type = esc_attr__(wp_unslash($value['channel_type']));
                }

                if(!empty($channel_type)) {
                    foreach($this->socials as $icon) {
                        if($icon['slug'] == $channel_type) {
                            $svg_icon = $icon['svg'];

                            $placeholder = $icon['example'];

                            if((isset($icon['help']) && !empty($icon['help'])) || isset($icon['help_link'])) {
                                $help_title = isset($icon['help_title'])?$icon['help_title']:"Doesn't work?";
                                $help_text = isset($icon['help'])?$icon['help']:"";
                                if(isset($icon['help_link']) && !empty($icon['help_link'])) {
                                    $help_link = $data['help_link'];
                                }
                            }
                        }
                    }
                }
            }
            if(empty($channel_type)) {
                $channel_type = $social['slug'];
            }
            ob_start();
            ?>
            <!-- Social media setting box: start -->
            <li data-id="<?php echo esc_attr($social['slug']) ?>" class="chaty-channel" data-channel="<?php echo esc_attr($channel_type) ?>" id="chaty-social-<?php echo esc_attr($social['slug']) ?>">
                <div class="channels-selected__item <?php esc_attr_e(($status)?"img-active":"") ?> <?php esc_attr_e(($this->is_pro()) ? 'pro' : 'free'); ?> 1 available">
                    <div class="chaty-default-settings">
                        <div class="move-icon">
                            <img src="<?php echo esc_url(plugin_dir_url("")."/chaty/admin/assets/images/move-icon.png") ?>">
                        </div>
                        <div class="icon icon-md active" data-title="<?php esc_attr_e($value['title']); ?>">
                                    <span style="" class="custom-chaty-image custom-image-<?php echo esc_attr($social['slug']) ?>" id="image_data_<?php echo esc_attr($social['slug']) ?>">
                                        <img src="<?php echo esc_url($imageUrl) ?>" />
                                        <span onclick="remove_chaty_image('<?php echo esc_attr($social['slug']) ?>')" class="remove-icon-img"></span>
                                    </span>
                                        <span class="default-chaty-icon <?php echo (isset($value['fa_icon'])&&!empty($value['fa_icon']))?"has-fa-icon":"" ?> custom-icon-<?php echo esc_attr($social['slug']) ?> default_image_<?php echo esc_attr($social['slug']) ?>" >
                                        <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <?php echo $svg_icon; ?>
                                        </svg>
                                        <span class="facustom-icon" style="background-color: <?php echo esc_attr($value['bg_color']) ?>"><i class="<?php echo esc_attr($value['fa_icon']) ?>"></i></span>
                                    </span>
                        </div>

                        <!-- Social Media input  -->
                        <div class="channels__input-box">
                            <input placeholder="<?php esc_attr_e($placeholder); ?>" type="text" class="channels__input" name="cht_social_<?php echo esc_attr($social['slug']); ?>[value]" value="<?php esc_attr_e(wp_unslash($value['value'])); ?>" data-gramm_editor="false" id="<?php echo esc_attr($social['slug']); ?>" />
                        </div>
                        <div class="channels__device-box">
                            <?php
                            $slug =  esc_attr__($this->del_space($social['slug']));
                            $slug = str_replace(' ', '_', $slug);
                            $is_desktop = isset($value['is_desktop']) ? $value['is_desktop'] : '';
                            $is_mobile = isset($value['is_mobile']) ? $value['is_mobile'] : '';
                            ?>
                            <!-- setting for desktop -->
                            <label class="channels__view" for="<?php echo esc_attr($slug); ?>Desktop">
                                <input type="checkbox" id="<?php echo esc_attr($slug); ?>Desktop" class="channels__view-check js-chanel-icon js-chanel-desktop" data-type="<?php echo str_replace(' ', '_', strtolower(esc_attr__($this->del_space($social['slug'])))); ?>" name="cht_social_<?php echo esc_attr($social['slug']); ?>[is_desktop]" value="checked" data-gramm_editor="false" <?php esc_attr_e($is_desktop) ?> />
                                <span class="channels__view-txt">Desktop</label>
                            </label>

                            <!-- setting for mobile -->
                            <label class="channels__view" for="<?php echo esc_attr($slug); ?>Mobile">
                                <input type="checkbox" id="<?php echo esc_attr($slug); ?>Mobile" class="channels__view-check js-chanel-icon js-chanel-mobile" data-type="<?php echo str_replace(' ', '_', strtolower(esc_attr__($this->del_space($social['slug'])))); ?>" name="cht_social_<?php echo esc_attr($social['slug']); ?>[is_mobile]" value="checked" data-gramm_editor="false" <?php esc_attr_e($is_mobile) ?> >
                                <span class="channels__view-txt">Mobile</span>
                            </label>
                        </div>

                        <!-- button for advance setting -->
                        <div class="chaty-settings" onclick="toggle_chaty_setting('<?php echo esc_attr($social['slug']); ?>')">
                            <a href="javascript:;"><span class="dashicons dashicons-admin-generic"></span></a>
                        </div>

                        <!-- example for social media -->
                        <div class="input-example">
                            <?php esc_attr_e('For example', CHT_OPT); ?>:
                                        <span class="inline-box channel-example">
                                            <?php if($social['slug'] == "Poptin") { ?>
                                                <br/>
                                            <?php } ?>
                                            <?php esc_attr_e($placeholder); ?>
                                        </span>
                        </div>

                        <!-- checking for extra help message for social media -->
                        <div class="help-section">
                            <?php if((isset($social['help']) && !empty($social['help'])) || isset($social['help_link'])) { ?>
                                <div class="viber-help">
                                    <?php if(isset($help_link) && !empty($help_link)) { ?>
                                        <a class="help-link" href="<?php echo esc_url($help_link) ?>" target="_blank"><?php esc_attr_e($help_title); ?></a>
                                    <?php } else if(isset($help_text) && !empty($help_text)) { ?>
                                        <span class="help-text"><?php echo $help_text; ?></span>
                                        <span class="help-title"><?php esc_attr_e($help_title); ?></span>
                                    <?php } ?>
                                </div>
                            <?php } ?>
                        </div>
                    </div>
                    <!-- advance setting fields: start -->
                    <?php $class_name = !$this->is_pro()?"not-is-pro":""; ?>
                    <div class="chaty-advance-settings <?php esc_attr_e($class_name); ?>">
                        <!-- Settings for custom icon and color -->
                        <div class="chaty-setting-col">
                            <label>Icon Appearance</label>
                            <div>
                                <!-- input for custom color -->
                                <input type="text" name="cht_social_<?php echo esc_attr($social['slug']); ?>[bg_color]" class="chaty-color-field" value="<?php esc_attr_e($value['bg_color']) ?>" />

                                <!-- button to upload custom image -->
                                <?php if($this->is_pro()) { ?>
                                    <a onclick="upload_chaty_image('<?php echo esc_attr($social['slug']); ?>')" href="javascript:;" class="upload-chaty-icon"><span class="dashicons dashicons-upload"></span> Custom Image</a>

                                    <!-- hidden input value for image -->
                                    <input id="cht_social_image_<?php echo esc_attr($social['slug']); ?>" type="hidden" name="cht_social_<?php echo esc_attr($social['slug']); ?>[image_id]" value="<?php esc_attr_e($imageId) ?>" />
                                <?php } else { ?>
                                    <div class="pro-features upload-image">
                                        <div class="pro-item">
                                            <a target="_blank" href="<?php echo esc_url($this->getUpgradeMenuItemUrl());?>" class="upload-chaty-icon"><span class="dashicons dashicons-upload"></span> Custom Image</a>
                                        </div>
                                        <div class="pro-button">
                                            <a target="_blank" href="<?php echo esc_url($this->getUpgradeMenuItemUrl());?>"><?php esc_attr_e('Activate your key', CHT_OPT);?></a>
                                        </div>
                                    </div>
                                <?php } ?>
                            </div>
                        </div>
                        <div class="clear clearfix"></div>

                        <?php if($social['slug'] == "Link" || $social['slug'] == "Custom_Link") {
                            $channel_type = "";
                            if(isset($value['channel_type'])) {
                                $channel_type = esc_attr__(wp_unslash($value['channel_type']));
                            }
                            $socials = $this->socials;
                            ?>
                            <div class="chaty-setting-col">
                                <label>Channel type</label>
                                <div>
                                    <!-- input for custom title -->
                                    <select class="channel-select-input" name="cht_social_<?php echo esc_attr($social['slug']); ?>[channel_type]" value="<?php esc_attr_e($value['channel_type']) ?>">
                                        <option value="<?php echo esc_attr($social['slug']) ?>">Custom channel</option>
                                        <?php foreach ($socials as $social_icon) {
                                            $selected = ($social_icon['slug'] == $channel_type)?"selected":"";
                                            if ($social_icon['slug'] != 'Custom_Link' && $social_icon['slug'] != 'Link') { ?>
                                                <option <?php echo esc_attr($selected) ?> value="<?php echo esc_attr($social_icon['slug']) ?>"><?php echo esc_attr($social_icon['title']) ?></option>
                                            <?php }
                                        }?>
                                    </select>
                                </div>
                            </div>
                            <div class="clear clearfix"></div>
                        <?php } ?>

                        <?php if($this->is_pro()) { ?>
                            <!-- Settings for custom title -->
                            <div class="chaty-setting-col">
                                <label>On Hover Text</label>
                                <div>
                                    <!-- input for custom title -->
                                    <input type="text" class="chaty-title" name="cht_social_<?php echo esc_attr($social['slug']); ?>[title]" value="<?php esc_attr_e($value['title']) ?>">
                                </div>
                            </div>
                            <div class="clear clearfix"></div>
                            <div class="Whatsapp-settings advanced-settings">
                                <!-- advance setting for Whatsapp -->
                                <div class="clear clearfix"></div>
                                <div class="chaty-setting-col">
                                    <label>Pre Set Message</label>
                                    <div>
                                        <?php $pre_set_message = isset($value['pre_set_message'])?$value['pre_set_message']:""; ?>
                                        <input id="cht_social_message_<?php echo esc_attr($social['slug']); ?>" type="text" name="cht_social_<?php echo esc_attr($social['slug']); ?>[pre_set_message]" value="<?php esc_attr_e($pre_set_message) ?>" >
                                    </div>
                                </div>
                            </div>
                            <div class="Email-settings advanced-settings">
                                <!-- advance setting for Email -->
                                <div class="clear clearfix"></div>
                                <div class="chaty-setting-col">
                                    <label>Mail Subject</label>
                                    <div>
                                        <?php $mail_subject = isset($value['mail_subject'])?$value['mail_subject']:""; ?>
                                        <input id="cht_social_message_<?php echo esc_attr($social['slug']); ?>" type="text" name="cht_social_<?php echo esc_attr($social['slug']); ?>[mail_subject]" value="<?php esc_attr_e($mail_subject) ?>" >
                                    </div>
                                </div>
                            </div>
                            <div class="WeChat-settings advanced-settings">
                                <!-- advance setting for WeChat -->
                                <?php
                                $qr_code = isset($value['qr_code'])?$value['qr_code']:"";                               // Initialize QR code value if not exists. 2.1.0 change
                                $imageUrl = "";
                                $status = 0;
                                if($qr_code != "") {
                                    $imageUrl = wp_get_attachment_image_src($qr_code, "full")[0];                       // get custom Image URL if exists
                                }
                                if($imageUrl == "") {
                                    $imageUrl = plugin_dir_url("")."chaty/admin/assets/images/chaty-default.png";   // Initialize with default image URL if URL is not exists
                                } else {
                                    $status = 1;
                                }
                                ?>
                                <div class="clear clearfix"></div>
                                <div class="chaty-setting-col">
                                    <label>Upload QR Code</label>
                                    <div>
                                        <!-- Button to upload QR Code image -->
                                        <a class="cht-upload-image <?php esc_attr_e(($status)?"active":"") ?>" id="upload_qr_code" href="javascript:;" onclick="upload_qr_code('<?php echo esc_attr($social['slug']); ?>')">
                                            <img id="cht_social_image_src_<?php echo esc_attr($social['slug']); ?>" src="<?php echo esc_url($imageUrl) ?>" alt="<?php esc_attr_e($value['title']) ?>">
                                            <span class="dashicons dashicons-upload"></span>
                                        </a>

                                        <!-- Button to remove QR Code image -->
                                        <a href="javascript:;" class="remove-qr-code remove-qr-code-<?php echo esc_attr($social['slug']); ?> <?php esc_attr_e(($status)?"active":"") ?>" onclick="remove_qr_code('<?php echo esc_attr($social['slug']); ?>')"><span class="dashicons dashicons-no-alt"></span></a>

                                        <!-- input hidden field for QR Code -->
                                        <input id="upload_qr_code_val-<?php echo esc_attr($social['slug']); ?>" type="hidden" name="cht_social_<?php echo esc_attr($social['slug']); ?>[qr_code]" value="<?php esc_attr_e($qr_code) ?>" >
                                    </div>
                                </div>
                            </div>
                            <div class="Link-settings Custom_Link-settings advanced-settings">
                                <?php $is_checked = (!isset($value['new_window']) || $value['new_window'] == 1)?1:0; ?>
                                <!-- Advance setting for Custom Link -->
                                <div class="clear clearfix"></div>
                                <div class="chaty-setting-col">
                                    <label >Open In a New Tab</label>
                                    <div>
                                        <input type="hidden" name="cht_social_<?php echo esc_attr($social['slug']); ?>[new_window]" value="0" >
                                        <label class="channels__view" for="cht_social_window_<?php echo esc_attr($social['slug']); ?>">
                                            <input id="cht_social_window_<?php echo esc_attr($social['slug']); ?>" type="checkbox" class="channels__view-check" name="cht_social_<?php echo esc_attr($social['slug']); ?>[new_window]" value="1" <?php checked($is_checked, 1) ?> >
                                            <span class="channels__view-txt">&nbsp;</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="Linkedin-settings advanced-settings">
                                <?php $is_checked = isset($value['link_type'])?$value['link_type']:"personal"; ?>
                                <!-- Advance setting for Custom Link -->
                                <div class="clear clearfix"></div>
                                <div class="chaty-setting-col">
                                    <label >LinkedIn</label>
                                    <div>
                                        <label>
                                            <input type="radio" <?php checked($is_checked, "personal") ?> name="cht_social_<?php echo esc_attr($social['slug']); ?>[link_type]" value="personal">
                                            Personal
                                        </label>
                                        <label>
                                            <input type="radio" <?php checked($is_checked, "company") ?> name="cht_social_<?php echo esc_attr($social['slug']); ?>[link_type]" value="company">
                                            Company
                                        </label>
                                    </div>
                                </div>
                            </div>
                        <?php } else { ?>
                            <div class="clear clearfix"></div>
                            <div class="chaty-setting-col">
                                <label>On Hover Text</label>
                                <div>
                                    <input type="text" class="chaty-title" name="cht_social_<?php echo esc_attr($social['slug']); ?>[title]" value="<?php esc_attr_e($value['title']) ?>">
                                </div>
                            </div>
                            <div class="clear clearfix"></div>
                            <div class="Whatsapp-settings advanced-settings">
                                <?php $pre_set_message = isset($value['pre_set_message'])?$value['pre_set_message']:""; ?>
                                <div class="clear clearfix"></div>
                                <div class="chaty-setting-col">
                                    <label>Pre Set Message</label>
                                    <div>
                                        <div class="pro-features">
                                            <div class="pro-item">
                                                <input disabled id="cht_social_message_<?php echo esc_attr($social['slug']); ?>" type="text" name="" value="<?php esc_attr_e($pre_set_message) ?>" >
                                            </div>
                                            <div class="pro-button">
                                                <a target="_blank" href="<?php echo esc_url($this->getUpgradeMenuItemUrl());?>"><?php esc_attr_e('Upgrade to Pro', CHT_OPT);?></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="Email-settings advanced-settings">
                                <div class="clear clearfix"></div>
                                <div class="chaty-setting-col">
                                    <label>Mail Subject</label>
                                    <div>
                                        <div class="pro-features">
                                            <div class="pro-item">
                                                <input disabled id="cht_social_message_<?php echo esc_attr($social['slug']); ?>" type="text" name="" value="" >
                                            </div>
                                            <div class="pro-button">
                                                <a target="_blank" href="<?php echo esc_url($this->getUpgradeMenuItemUrl());?>"><?php esc_attr_e('Upgrade to Pro', CHT_OPT);?></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="WeChat-settings advanced-settings">
                                <div class="clear clearfix"></div>
                                <div class="chaty-setting-col">
                                    <label>Upload QR Code</label>
                                    <div>
                                        <a target="_blank" class="cht-upload-image-pro" id="upload_qr_code" href="<?php echo esc_url($this->getUpgradeMenuItemUrl());?>" >
                                            <span class="dashicons dashicons-upload"></span>
                                        </a>
                                        <a target="_blank" href="<?php echo esc_url($this->getUpgradeMenuItemUrl());?>"><?php esc_attr_e('Upgrade to Pro', CHT_OPT);?></a>
                                    </div>
                                </div>
                            </div>
                            <div class="Link-settings Custom_Link-settings advanced-settings">
                                <?php $is_checked = 1; ?>
                                <div class="clear clearfix"></div>
                                <div class="chaty-setting-col">
                                    <label >Open In a New Tab</label>
                                    <div>
                                        <input type="hidden" name="cht_social_<?php echo esc_attr($social['slug']); ?>[new_window]" value="0" >
                                        <label class="channels__view" for="cht_social_window_<?php echo esc_attr($social['slug']); ?>">
                                            <input id="cht_social_window_<?php echo esc_attr($social['slug']); ?>" type="checkbox" class="channels__view-check" name="cht_social_<?php echo esc_attr($social['slug']); ?>[new_window]" value="1" checked >
                                            <span class="channels__view-txt">&nbsp;</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="Linkedin-settings advanced-settings">
                                <?php $is_checked = "personal"; ?>
                                <!-- Advance setting for Custom Link -->
                                <div class="clear clearfix"></div>
                                <div class="chaty-setting-col">
                                    <label >LinkedIn</label>
                                    <div>
                                        <label>
                                            <input type="radio" <?php checked($is_checked, "personal") ?> name="cht_social_<?php echo esc_attr($social['slug']); ?>[link_type]" value="personal">
                                            Personal
                                        </label>
                                        <label>
                                            <input type="radio" <?php checked($is_checked, "company") ?> name="cht_social_<?php echo esc_attr($social['slug']); ?>[link_type]" value="company">
                                            Company
                                        </label>
                                    </div>
                                </div>
                            </div>
                        <?php } ?>
                    </div>
                    <!-- advance setting fields: end -->


                    <!-- remove social media setting button: start -->
                    <button type="button" class="btn-cancel" data-social="<?php echo esc_attr($social['slug']); ?>">
                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="15.6301" height="2.24494" rx="1.12247" transform="translate(2.26764 0.0615997) rotate(45)" fill="white"/>
                            <rect width="15.6301" height="2.24494" rx="1.12247" transform="translate(13.3198 1.649) rotate(135)" fill="white"/>
                        </svg>
                    </button>
                    <!-- remove social media setting button: end -->
                </div>
            </li>
            <!-- Social media setting box: end -->
            <?php
            $html = ob_get_clean();
            echo json_encode($html);
        }
        wp_die();
    }
    /* function choose_social_handler end */

    /* get social media list for front end widget */
    public function get_social_icon_list()
    {
        $social = get_option('cht_numb_slug'.$this->widget_number); // get saved social media list
        $social = explode(",", $social);

        $arr = array();
        foreach ($social as $key_soc):
            foreach ($this->socials as $key => $social) :       // compare with Default Social media list
                if ($social['slug'] != $key_soc) {
                    continue;                                   // return if slug is not equal
                }
                $value = get_option('cht_social'.$this->widget_number.'_' . $social['slug']);   //  get saved settings for button
                if ($value) {
                    if (!empty($value['value'])) {
                        $slug = strtolower($social['slug']);
                        $url = "";
                        $mobile_url = "";
                        $desktop_target = "";
                        $mobile_target = "";
                        $qr_code_image = "";

                        $channel_type = $slug;

                        $svg_icon = $social['svg'];
                        if($slug == "link" || $slug == "custom_link") {
                            if(isset($value['channel_type']) && !empty($value['channel_type'])) {
                                $channel_type = $value['channel_type'];

                                foreach($this->socials as $icon) {
                                    if($icon['slug'] == $channel_type) {
                                        $svg_icon = $icon['svg'];
                                    }
                                }
                            }
                        }

                        $channel_type = strtolower($channel_type);

                        if($channel_type == "Viber") {
                            /* Viber change to exclude + from number for desktop */
                            $val = $value['value'];
                            $fc = substr($val, 0, 1);
                            if($fc == "+") {
                                $length = -1*(strlen($val)-1);
                                $val = substr($val, $length);
                            }
                            if(!wp_is_mobile()) {
                                /* Viber change to include + from number for mobile */
                                $val = "+".$val;
                            }
                        } else if($channel_type == "Whatsapp") {
                            /* Whatspp change to exclude + from phone number */
                            $val = $value['value'];
                            $val = str_replace("+","", $val);
                        } else if($channel_type == "Facebook_Messenger") {
                            /* Facebook change to change URL from facebook.com to m.me version 2.1.0 change */
                            $val = $value['value'];
                            $val = str_replace("facebook.com","m.me", $val);
                            /* Facebook change to remove www. from URL. version 2.1.0 change */
                            $val = str_replace("www.","", $val);

                            $val = trim($val, "/");
                            $val_array = explode("/", $val);
                            $total = count($val_array)-1;
                            $last_value = $val_array[$total];
                            $last_value = explode("-", $last_value);
                            $total_text = count($last_value)-1;
                            $total_text = $last_value[$total_text];

                            if(is_numeric($total_text)) {
                                $val_array[$total] = $total_text;
                                $val = implode("/", $val_array);
                            }
                        } else {
                            $val = $value['value'];
                        }
                        if(!isset($value['title']) || empty($value['title'])) {
                            $value['title'] = $social['title'];         // Initialize title with default title if not exists. version 2.1.0 change
                        }
                        $image_url = "";

                        /* get custom image URL if uploaded. version 2.1.0 change */
                        if(isset($value['image_id']) && !empty($value['image_id'])) {
                            $image_id = $value['image_id'];
                            if(!empty($image_id)) {
                                $image_data = wp_get_attachment_image_src($image_id, "full");
                                if(!empty($image_data) && is_array($image_data)) {
                                    $image_url = $image_data[0];
                                }
                            }
                        }

                        /* get custom icon background color if exists. version 2.1.0 change */
                        if(!isset($value['bg_color']) || empty($value['bg_color'])) {
                            $value['bg_color'] = '';
                        }
                        if($channel_type == "whatsapp") {
                            /* setting for Whatsapp URL */
                            $val = str_replace("+","",$val);
                            $url = "https://web.whatsapp.com/send?phone=".$val;
                            $mobile_url = "https://wa.me/".$val;
                            // https://wa.me/$number?text=$test
                            if(isset($value['pre_set_message']) && !empty($value['pre_set_message'])) {
                                $url .= "&text=".urlencode($value['pre_set_message']);
                                $mobile_url .= "?text=".urlencode($value['pre_set_message']);
                            }
                            if(wp_is_mobile()) {
                                $mobile_target = "";
                            } else {
                                $desktop_target = "_blank";
                            }
                        } else if($channel_type == "phone") {
                            /* setting for Phone */
                            $url = "tel: ".$val;
                        } else if($channel_type == "sms") {
                            /* setting for SMS */
                            $url = "sms:".$val;
                        } else if($channel_type == "telegram") {
                            /* setting for Telegram */
                            $url = "https://telegram.me/".$val;
                            $desktop_target = "_blank";
                            $mobile_target = "_blank";
                        } else if($channel_type == "line" || $channel_type == "google_maps" || $channel_type == "poptin" || $channel_type == "waze" ) {
                            /* setting for Line, Google Map, Link, Poptin, Waze, Custom Link */
                            $url = esc_url($val);
                            $desktop_target = "_blank";
                            $mobile_target = "_blank";
                        } else if($channel_type == "link" || $channel_type == "custom_link") {
                            $url = $val;
                            $is_exist = strpos($val, "javascript");
                            if($is_exist != "") {
                                $url = esc_url($val);
                            } else {
                                if($channel_type == "custom_link" || $channel_type == "link") {
                                    $desktop_target = (isset($value['new_window']) && $value['new_window'] == 0)?"":"_blank";
                                    $mobile_target = (isset($value['new_window']) && $value['new_window'] == 0)?"":"_blank";
                                }
                            }
                        }else if($channel_type == "wechat") {
                            /* setting for WeChat */
                            $url = "javascript:;";
                            $value['title'] .= ": ".$val;
                            $qr_code = isset($value['qr_code'])?$value['qr_code']:"";
                            if(!empty($qr_code)) {
                                $image_data = wp_get_attachment_image_src($qr_code, "full");
                                if(!empty($image_data) && is_array($image_data)) {
                                    $qr_code_image = $image_data[0];
                                }
                            }
                        } else if($channel_type == "viber") {
                            /* setting for Viber */
                            $url = $val;
                        } else if($channel_type == "snapchat") {
                            /* setting for SnapChat */
                            $url = "https://www.snapchat.com/add/".$val;
                            $desktop_target = "_blank";
                            $mobile_target = "_blank";
                        } else if($channel_type == "waze") {
                            /* setting for Waze */
                            $url = "javascript:;";
                            $value['title'] .= ": ".$val;
                        } else if($channel_type == "vkontakte") {
                            /* setting for vkontakte */
                            $url = "https://vk.me/".$val;
                            $desktop_target = "_blank";
                            $mobile_target = "_blank";
                        } else if($channel_type == "skype") {
                            /* setting for Skype */
                            $url = "skype:".$val."?chat";
                        } else if($channel_type == "email") {
                            /* setting for Email */
                            $url = "mailto:".$val;
                            $mail_subject = (isset($value['mail_subject']) && !empty($value['mail_subject']))?$value['mail_subject']:"";
                            if($mail_subject != "") {
                                $url .= "?subject=".urlencode($mail_subject);
                            }
                        } else if($channel_type == "facebook_messenger") {
                            /* setting for facebook URL */
                            $url = esc_url($val);
                            $url = str_replace("http:", "https:", $url);
                            if(wp_is_mobile()) {
                                $mobile_target = "";
                            } else {
                                $desktop_target = "_blank";
                            }
                        } else if($channel_type == "twitter") {
                            /* setting for Twitter */
                            $url = "https://twitter.com/".$val;
                            $desktop_target = "_blank";
                            $mobile_target = "_blank";
                        } else if($channel_type == "instagram") {
                            /* setting for Instagram */
                            $url = "https://www.instagram.com/".$val;
                            $desktop_target = "_blank";
                            $mobile_target = "_blank";
                        } else if($channel_type == "linkedin") {
                            /* setting for Linkedin */
                            $link_type = !isset($value['link_type']) || $value['link_type'] == "company"?"company":"personal";
                            if($link_type == "personal") {
                                $url = "https://www.linkedin.com/in/".$val;
                            } else {
                                $url = "https://www.linkedin.com/company/".$val;
                            }
                            $desktop_target = "_blank";
                            $mobile_target = "_blank";
                        }

                        /* Instagram checking for custom color */
                        if($channel_type == "instagram" && $value['bg_color'] == "#ffffff") {
                            $value['bg_color'] = "";
                        }

                        $svg = trim(preg_replace('/\s\s+/', '', $svg_icon));

                        $is_mobile = isset($value['is_mobile']) ? 1 : 0;
                        $is_desktop = isset($value['is_desktop']) ? 1 : 0;

                        if(empty($mobile_url)) {
                            $mobile_url = $url;
                        }

                        $svg = '<svg class="ico_d" width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(0deg);">'.$svg.'</svg>';

                        $data = array(
                            'val' => esc_attr__(wp_unslash($val)),
                            'default_icon' => $svg,
                            'bg_color' => $value['bg_color'],
                            'title' => esc_attr__(wp_unslash($value['title'])),
                            'img_url' => esc_url($image_url),
                            'social_channel' => $slug,
                            'channel_type' => $channel_type,
                            'href_url' => $url,
                            'desktop_target' => $desktop_target,
                            'mobile_target' => $mobile_target,
                            'qr_code_image' => esc_url($qr_code_image),
                            'channel' => $social['slug'],
                            'is_mobile' => $is_mobile,
                            'is_desktop' => $is_desktop,
                            'mobile_url' => $mobile_url,
                            "has_font" => 0
                        );
                        $arr[] = $data;
                    }
                }
            endforeach;
        endforeach;
        return $arr;
    }

    public function insert_widget()
    {
        if ($this->canInsertWidget()):
            include_once CHT_DIR . '/views/widget.php';
        endif;
    }

    private function canInsertWidget()
    {
        return get_option('cht_active') && $this->checkChannels();
    }

    private function checkChannels()
    {
        $social = explode(",", get_option('cht_numb_slug'));
        $res = false;
        foreach ($social as $name) {
            $value = get_option('cht_social_' . strtolower($name));
            $res = $res || !empty($value['value']);
        }
        return $res;
    }
}

return new CHT_Frontend();
