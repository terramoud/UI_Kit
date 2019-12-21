jQuery('.RadioButtons-RadioButton').each(function () {
  jQuery(this).click(function (event) {
    event.preventDefault();
    if (jQuery(this).attr('checked') === 'checked') {
      jQuery(this).attr('checked', false);
      jQuery(this).removeClass('customRadioButton');
    } else {
      jQuery('.RadioButtons-RadioButton').attr('checked', false);
      jQuery('.RadioButtons-RadioButton').removeClass('customRadioButton');
      jQuery(this).attr('checked', 'checked');
      jQuery(this).addClass('customRadioButton');
    }
  });
});

