'use strict';

var woobtTimeout = null;

jQuery(document).ready(function($) {
  woobt_settings();

  // options page
  woobt_options();

  $('select[name="_woobt_change_price"]').on('change', function() {
    woobt_options();
  });

  // set optional
  $('#woobt_custom_qty').on('click', function() {
    if ($(this).is(':checked')) {
      $('.woobt_tr_show_if_custom_qty').show();
      $('.woobt_tr_hide_if_custom_qty').hide();
    } else {
      $('.woobt_tr_show_if_custom_qty').hide();
      $('.woobt_tr_hide_if_custom_qty').show();
    }
  });

  // search input
  $('#woobt_keyword').keyup(function() {
    if ($('#woobt_keyword').val() != '') {
      $('#woobt_loading').show();

      if (woobtTimeout != null) {
        clearTimeout(woobtTimeout);
      }

      woobtTimeout = setTimeout(woobt_ajax_get_data, 300);

      return false;
    }
  });

  // actions on search result items
  $('#woobt_results').on('click', 'li', function() {
    $(this).children('span.remove').html('×');
    $('#woobt_selected ul').append($(this));
    $('#woobt_results').hide();
    $('#woobt_keyword').val('');
    woobt_get_ids();
    woobt_arrange();

    return false;
  });

  // change qty of each item
  $('#woobt_selected').on('keyup change click', 'input', function() {
    woobt_get_ids();

    return false;
  });

  // actions on selected items
  $('#woobt_selected').on('click', 'span.remove', function() {
    $(this).parent().remove();
    woobt_get_ids();

    return false;
  });

  // hide search result box if click outside
  $(document).on('click', function(e) {
    if ($(e.target).closest($('#woobt_results')).length == 0) {
      $('#woobt_results').hide();
    }
  });

  // arrange
  woobt_arrange();

  $(document).on('woobtDragEndEvent', function() {
    woobt_get_ids();
  });
});

function woobt_settings() {
  // hide search result box by default
  jQuery('#woobt_results').hide();
  jQuery('#woobt_loading').hide();

  // show or hide limit
  if (jQuery('#woobt_custom_qty').is(':checked')) {
    jQuery('.woobt_tr_show_if_custom_qty').show();
    jQuery('.woobt_tr_hide_if_custom_qty').hide();
  } else {
    jQuery('.woobt_tr_show_if_custom_qty').hide();
    jQuery('.woobt_tr_hide_if_custom_qty').show();
  }
}

function woobt_options() {
  if (jQuery('select[name="_woobt_change_price"]').val() == 'yes_custom') {
    jQuery('input[name="_woobt_change_price_custom"]').show();
  } else {
    jQuery('input[name="_woobt_change_price_custom"]').hide();
  }
}

function woobt_arrange() {
  jQuery('#woobt_selected li').arrangeable({
    dragEndEvent: 'woobtDragEndEvent',
    dragSelector: '.move',
  });
}

function woobt_get_ids() {
  var woobt_ids = new Array();

  jQuery('#woobt_selected li').each(function() {
    if (!jQuery(this).hasClass('woobt_default')) {
      woobt_ids.push(jQuery(this).attr('data-id') + '/' +
          jQuery(this).find('.price input').val() + '/' +
          jQuery(this).find('.qty input').val());
    }
  });

  if (woobt_ids.length > 0) {
    jQuery('#woobt_ids').val(woobt_ids.join(','));
  } else {
    jQuery('#woobt_ids').val('');
  }
}

function woobt_ajax_get_data() {
  // ajax search product
  woobtTimeout = null;

  var data = {
    action: 'woobt_get_search_results',
    woobt_keyword: jQuery('#woobt_keyword').val(),
    woobt_id: jQuery('#woobt_id').val(),
    woobt_ids: jQuery('#woobt_ids').val(),
  };

  jQuery.post(ajaxurl, data, function(response) {
    jQuery('#woobt_results').show();
    jQuery('#woobt_results').html(response);
    jQuery('#woobt_loading').hide();
  });
}