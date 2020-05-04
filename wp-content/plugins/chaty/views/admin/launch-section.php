<section class="section">
    <h1 class="section-title">
        <?php esc_attr_e('Launch it!', CHT_OPT);?>
    </h1>

    <div class="form-horizontal">
        <input type="hidden" name="cht_active" value="0"  >
        <div class="form-horizontal__item flex-center">
            <label class="form-horizontal__item-label"><?php esc_attr_e('Active', CHT_OPT);?>:</label>
            <div>
                <label class="switch">
                    <span class="switch__label"><?php esc_attr_e('Off', CHT_OPT);?></span>
                    <?php $cht_active = get_option('cht_active'); ?>
                    <input data-gramm_editor="false" type="checkbox" name="cht_active" value="1" <?php checked($cht_active, 1) ?>>
                    <span class="switch__styled"></span>
                    <span class="switch__label"><?php esc_attr_e('On', CHT_OPT);?></span>
                </label>
            </div>
        </div>
    </div>
    <input type="hidden" name="nonce" value="<?php esc_attr_e(wp_create_nonce("chaty_plugin_nonce")) ?>">
    <div class="text-center">
        <button class="btn-save">
            <?php esc_attr_e('Save Changes', CHT_OPT); ?>
        </button>
    </div>
</section>
