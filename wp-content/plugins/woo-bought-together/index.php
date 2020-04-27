<?php
defined( 'ABSPATH' ) || exit;

if ( ! function_exists( 'activate_plugin' ) ) {
	require_once ABSPATH . 'wp-admin/includes/plugin.php';
}

$old_slug = 'woo-bought-together/index.php';
$new_slug = 'woo-bought-together/wpc-frequently-bought-together.php';

if ( ! is_plugin_active( $new_slug ) ) {
	// activate new slug
	activate_plugin( $new_slug );
	// deactivate old slug
	deactivate_plugins( $old_slug );
}