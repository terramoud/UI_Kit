require('./_active/checkbox_active.js');

jQuery('.checkbox').each(function () {
  jQuery(this).click(function (event) {
    event.preventDefault();
    if (jQuery(this).attr('checked') === 'checked') {
      jQuery(this).attr('checked', false);
      jQuery(this).removeClass('checkbox_active');
    } else {
      jQuery(this).attr('checked', 'checked');
      jQuery(this).addClass('checkbox_active');
    }
  });
});

