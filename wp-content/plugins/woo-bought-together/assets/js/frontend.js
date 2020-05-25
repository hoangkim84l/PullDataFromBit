'use strict';

jQuery(document).ready(function($) {
  if (!$('.woobt-wrap').length) {
    return;
  }

  $('.woobt-wrap').each(function() {
    woobt_init($(this));
  });
});

jQuery(document).on('woosq_loaded', function() {
  woobt_init(jQuery('#woosq-popup').find('.woobt-wrap'));
});

jQuery(document).on('found_variation', function(e, t) {
  var $wrap = jQuery(e['target']).closest('.summary').find('.woobt-wrap');
  var $products = jQuery(e['target']).
      closest('.summary').
      find('.woobt-products');

  $products.attr('data-product-id', t['variation_id']);
  $products.attr('data-product-sku', t['sku']);
  $products.attr('data-product-price', t['display_price']);

  woobt_init($wrap);
});

jQuery(document).on('reset_data', function(e) {
  var $wrap = jQuery(e['target']).closest('.summary').find('.woobt-wrap');
  var $products = jQuery(e['target']).
      closest('.summary').
      find('.woobt-products');

  $products.attr('data-product-id', 0);
  $products.attr('data-product-price', 0);
  $products.attr('data-product-sku', $products.attr('data-product-o-sku'));

  woobt_init($wrap);
});

jQuery(document).on('woovr_selected', function(e, selected, variations) {
  var $wrap = variations.closest('.summary').find('.woobt-wrap');
  var $products = variations.closest('.summary').find('.woobt-products');
  var id = selected.attr('data-id');
  var price = selected.attr('data-price');
  var purchasable = selected.attr('data-purchasable');

  if (purchasable === 'yes') {
    $products.attr('data-product-id', id);
    $products.attr('data-product-price', price);
  } else {
    $products.attr('data-product-id', 0);
    $products.attr('data-product-price', 0);
    $products.attr('data-product-sku', $products.attr('data-product-o-sku'));
  }

  woobt_init($wrap);
});

jQuery(document).on('click touch', '.single_add_to_cart_button', function(e) {
  if (jQuery(this).hasClass('woobt-disabled')) {
    e.preventDefault();
  }
});

jQuery(document).on('change', '.woobt-checkbox', function() {
  var $wrap = jQuery(this).closest('.woobt-wrap');

  woobt_init($wrap);
});

jQuery(document).on('change keyup mouseup', '.woobt-this-qty', function() {
  var this_val = jQuery(this).val();

  jQuery(this).
      closest('.summary').
      find('form.cart .quantity .qty').
      val(this_val).
      trigger('change');
});

jQuery(document).on('change keyup mouseup', '.woobt-qty', function() {
  var $this = jQuery(this);
  var $wrap = $this.closest('.woobt-wrap');
  var $product = $this.closest('.woobt-product');
  var $checkbox = $product.find('.woobt-checkbox');
  var this_val = parseFloat($this.val());

  if ($checkbox.prop('checked')) {
    var this_min = parseFloat($this.attr('min'));
    var this_max = parseFloat($this.attr('max'));

    if (this_val < this_min) {
      $this.val(this_min);
    }

    if (this_val > this_max) {
      $this.val(this_max);
    }

    $product.attr('data-qty', $this.val());

    woobt_init($wrap);
  }
});

jQuery(document).on('change', 'form.cart .qty', function() {
  var $this = jQuery(this);
  var qty = parseFloat($this.val());

  if ($this.hasClass('woobt-qty')) {
    return;
  }

  if (!$this.closest('form.cart').find('.woobt-ids').length) {
    return;
  }

  var wrap_id = $this.closest('form.cart').find('.woobt-ids').attr('data-id');
  var $wrap = jQuery('.woobt-wrap-' + wrap_id);
  var $products = $wrap.find('.woobt-products');
  var optional = $products.attr('data-optional');
  var sync_qty = $products.attr('data-sync-qty');

  if ((optional !== 'on') && (sync_qty === 'on')) {
    $products.find('.woobt-product-together').each(function() {
      var _qty = parseFloat(jQuery(this).attr('data-qty-ori')) * qty;
      jQuery(this).attr('data-qty', _qty);
      jQuery(this).find('.woobt-qty-num .woobt-qty').html(_qty);
    });
  }

  woobt_init($wrap);
});

function woobt_init($wrap) {
  var wrap_id = $wrap.attr('data-id');

  if (wrap_id !== undefined && parseInt(wrap_id) > 0) {
    var container = woobt_get_container(wrap_id);
    var $container = jQuery(container);

    woobt_check_ready($container);
    woobt_calc_price($container);
    woobt_save_ids($container);

    if (woobt_vars.counter !== 'hide') {
      woobt_update_count($container);
    }
  }
}

function woobt_check_ready($wrap) {
  var $products = $wrap.find('.woobt-products');
  var $alert = $wrap.find('.woobt-alert');
  var $ids = $wrap.find('.woobt-ids');
  var $btn = $wrap.find('.single_add_to_cart_button');
  var is_selection = false;
  var selection_name = '';
  var optional = $products.attr('data-optional');

  if ((
      optional === 'on'
  ) && (
      $products.find('.woobt-product-this').length > 0
  )) {
    jQuery('form.cart > .quantity').hide();
    jQuery('form.cart .woocommerce-variation-add-to-cart > .quantity').hide();
  }

  if ((woobt_vars.position === 'before') &&
      ($products.attr('data-product-type') === 'variable') &&
      ($products.attr('data-variables') === 'no' ||
          woobt_vars.variation_selector === 'wpc_radio')) {
    $products.closest('.woobt-wrap').insertAfter($ids);
    $products.find('.woobt-qty').removeClass('qty');
  }

  $products.find('.woobt-product-together').each(function() {
    var $this = jQuery(this);
    var _checked = $this.find('.woobt-checkbox').prop('checked');
    var _id = parseInt($this.attr('data-id'));

    if (!_checked) {
      $this.addClass('woobt-hide');
    } else {
      $this.removeClass('woobt-hide');
    }

    if (_checked && (_id == 0)) {
      is_selection = true;

      if (selection_name === '') {
        selection_name = $this.attr('data-name');
      }
    }
  });

  if (is_selection) {
    $btn.addClass('woobt-disabled woobt-selection');
    $alert.html(woobt_vars.alert_selection.replace('[name]',
        '<strong>' + selection_name + '</strong>')).
        slideDown();
  } else {
    $btn.removeClass('woobt-disabled woobt-selection');
    $alert.html('').slideUp();
  }
}

function woobt_calc_price($wrap) {
  var $products = $wrap.find('.woobt-products');
  var $total = $wrap.find('.woobt-total');
  var $btn = $wrap.find('.single_add_to_cart_button');
  var count = 0, total = 0;
  var total_html = '';
  var discount = parseFloat($products.attr('data-discount'));
  var ori_price = parseFloat($products.attr('data-product-price'));
  var ori_qty = parseFloat($btn.closest('form.cart').find('input.qty').val());
  var total_ori = ori_price * ori_qty;
  var price_selector = '.summary > .price';
  var show_price = $products.attr('data-show-price');
  var fix = Math.pow(10, Number(woobt_vars.price_decimals) + 1);

  if ((woobt_vars.change_price === 'yes_custom') &&
      (woobt_vars.price_selector != null) &&
      (woobt_vars.price_selector !== '')) {
    price_selector = woobt_vars.price_selector;
  }

  $products.find('.woobt-product-together').each(function() {
    var $this = jQuery(this);
    var _checked = $this.find('.woobt-checkbox').prop('checked');
    var _id = parseInt($this.attr('data-id'));
    var _qty = parseFloat($this.attr('data-qty'));
    var _price = $this.attr('data-price');
    var _price_ori = $this.attr('data-price-ori');
    var _total_ori = 0, _total = 0;

    if ((_qty > 0) && (_id > 0)) {
      _total_ori = _qty * _price_ori;

      if (isNaN(_price)) {
        //is percent
        _total = _total_ori * parseFloat(_price) / 100;
      } else {
        _total = _qty * _price;
      }

      if (show_price === 'total') {
        $this.find('.woobt-price-ori').hide();
        $this.find('.woobt-price-new').
            html(woobt_price_html(_total_ori, _total)).
            show();
      }

      //calc total
      if (_checked) {
        count++;
        total += _total;
      }
    }
  });

  total = Math.round(total * fix) / fix;

  if (count > 0) {
    total_html = woobt_format_price(total);
    $total.html(woobt_vars.total_price_text + ' ' + total_html).
        slideDown();

    if (isNaN(discount)) {
      discount = 0;
    }

    total_ori = total_ori * (100 - discount) / 100 + total;

    // this product
    $products.find('.woobt-product-this .woobt-price-ori').hide();
    $products.find('.woobt-product-this .woobt-price-new').show();
  } else {
    $total.html('').slideUp();

    // this product
    $products.find('.woobt-product-this .woobt-price-ori').show();
    $products.find('.woobt-product-this .woobt-price-new').hide();
  }

  // change the main price
  if (woobt_vars.change_price !== 'no') {
    if (parseInt($products.attr('data-product-id')) > 0) {
      jQuery(price_selector).html(woobt_format_price(total_ori));
    } else {
      jQuery(price_selector).
          html($products.attr('data-product-price-html'));
    }
  }

  jQuery(document).trigger('woobt_calc_price', [total, total_html]);

  $wrap.find('.woobt-wrap').attr('data-total', total);
}

function woobt_save_ids($wrap) {
  var $products = $wrap.find('.woobt-products');
  var $ids = $wrap.find('.woobt-ids');
  var woobt_items = new Array();

  $products.find('.woobt-product-together').each(function() {
    var $this = jQuery(this);
    var _checked = $this.find('.woobt-checkbox').prop('checked');
    var _id = parseInt($this.attr('data-id'));
    var _qty = parseFloat($this.attr('data-qty'));
    var _price = $this.attr('data-price');

    if (_checked && (_qty > 0) && (_id > 0)) {
      woobt_items.push(_id + '/' + _price + '/' + _qty);
    }
  });

  if (woobt_items.length > 0) {
    $ids.val(woobt_items.join(','));
  } else {
    $ids.val('');
  }
}

function woobt_update_count($wrap) {
  var $products = $wrap.find('.woobt-products');
  var $btn = $wrap.find('.single_add_to_cart_button');
  var qty = 0;
  var num = 1;

  $products.find('.woobt-product-together').each(function() {
    var $this = jQuery(this);
    var _checked = $this.find('.woobt-checkbox').prop('checked');
    var _id = parseInt($this.attr('data-id'));
    var _qty = parseFloat($this.attr('data-qty'));

    if (_checked && (_qty > 0) && (_id > 0)) {
      qty += _qty;
      num++;
    }
  });

  if ($btn.closest('form.cart').find('input.qty').length) {
    qty += parseFloat(
        $btn.closest('form.cart').find('input.qty').val());
  }

  if (num > 1) {
    if (woobt_vars.counter === 'individual') {
      $btn.text(woobt_vars.add_to_cart + ' (' + num + ')');
    } else {
      $btn.text(woobt_vars.add_to_cart + ' (' + qty + ')');
    }
  } else {
    $btn.text(woobt_vars.add_to_cart);
  }

  jQuery(document.body).trigger('woobt_update_count', [num, qty]);
}

function woobt_format_money(number, places, symbol, thousand, decimal) {
  number = number || 0;
  places = !isNaN(places = Math.abs(places)) ? places : 2;
  symbol = symbol !== undefined ? symbol : '$';
  thousand = thousand !== undefined ? thousand : ',';
  decimal = decimal !== undefined ? decimal : '.';
  var negative = number < 0 ? '-' : '',
      i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + '',
      j = 0;
  if (i.length > 3) {
    j = i.length % 3;
  }
  return symbol + negative + (
      j ? i.substr(0, j) + thousand : ''
  ) + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + (
      places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : ''
  );
}

function woobt_format_price(total) {
  var total_html = '<span class="woocommerce-Price-amount amount">';
  var total_formatted = woobt_format_money(total, woobt_vars.price_decimals,
      '', woobt_vars.price_thousand_separator,
      woobt_vars.price_decimal_separator);

  switch (woobt_vars.price_format) {
    case '%1$s%2$s':
      //left
      total_html += '<span class="woocommerce-Price-currencySymbol">' +
          woobt_vars.currency_symbol + '</span>' + total_formatted;
      break;
    case '%1$s %2$s':
      //left with space
      total_html += '<span class="woocommerce-Price-currencySymbol">' +
          woobt_vars.currency_symbol + '</span> ' + total_formatted;
      break;
    case '%2$s%1$s':
      //right
      total_html += total_formatted +
          '<span class="woocommerce-Price-currencySymbol">' +
          woobt_vars.currency_symbol + '</span>';
      break;
    case '%2$s %1$s':
      //right with space
      total_html += total_formatted +
          ' <span class="woocommerce-Price-currencySymbol">' +
          woobt_vars.currency_symbol + '</span>';
      break;
    default:
      //default
      total_html += '<span class="woocommerce-Price-currencySymbol">' +
          woobt_vars.currency_symbol + '</span> ' + total_formatted;
  }

  total_html += '</span>';

  return total_html;
}

function woobt_price_html(regular_price, sale_price) {
  var price_html = '';

  if (sale_price < regular_price) {
    price_html = '<del>' + woobt_format_price(regular_price) +
        '</del> <ins>' +
        woobt_format_price(sale_price) + '</ins>';
  } else {
    price_html = woobt_format_price(regular_price);
  }

  return price_html;
}

function woobt_get_container(id) {
  if (jQuery('#product-' + id).length) {
    return '#product-' + id;
  }

  if (jQuery('.product.post-' + id).length) {
    return '.product.post-' + id;
  }

  return 'body.single-product';
}