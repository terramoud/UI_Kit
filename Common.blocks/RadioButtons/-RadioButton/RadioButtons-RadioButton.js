jQuery('.RadioButtons-RadioButton').each(function () {
  jQuery(this).click(function (event) {
    event.preventDefault();
    if (jQuery(this).attr('checked') === 'checked') {
      // jQuery(this).attr('checked', false);
      // jQuery(this).removeClass('RadioButtons-RadioButton_active');
    } else {
      jQuery(this).closest('.RadioButtons').find('.RadioButtons-RadioButton').attr('checked', false);
      jQuery(this).closest('.RadioButtons').find('.RadioButtons-RadioButton').removeClass('RadioButtons-RadioButton_active');
      jQuery(this).attr('checked', 'checked');
      jQuery(this).addClass('RadioButtons-RadioButton_active');
    }
  });
});

