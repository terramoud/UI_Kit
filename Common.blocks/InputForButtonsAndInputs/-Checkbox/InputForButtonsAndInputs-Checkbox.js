jQuery('.InputForButtonsAndInputs-Checkbox').each(function () {
  jQuery(this).click(function (event) {
    event.preventDefault();
    if (jQuery(this).attr('checked') === 'checked') {
      jQuery(this).attr('checked', false);
      jQuery(this).removeClass('checkArrow');
    } else {
      jQuery(this).attr('checked', 'checked');
      jQuery(this).addClass('checkArrow');
    }
  });
});
