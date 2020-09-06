jQuery('.radio-buttons__radio-button').each(function () {
  jQuery(this).click(function (event) {
    event.preventDefault();
    if (jQuery(this).attr('checked') === 'checked') {
      // jQuery(this).attr('checked', false);
      // jQuery(this).removeClass('radio-buttons__radio-button_active');
    } else {
      jQuery(this).closest('.radio-buttons').find('.radio-buttons__radio-button').attr('checked', false);
      console.log(jQuery(this).closest('.radio-buttons'));
      jQuery(this).closest('.radio-buttons').find('.radio-buttons__radio-button').removeClass('radio-buttons__radio-button_active');
      jQuery(this).attr('checked', 'checked');
      jQuery(this).addClass('radio-buttons__radio-button_active');
    }
  });
});
