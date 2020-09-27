jQuery('.CheckboxList').each(function () {
  jQuery(this).find('.CheckboxList-Header_expandable').click(function (event) {
    event.preventDefault();
    if (jQuery(this).siblings('.CheckboxList-ExpandableCnt').hasClass('CheckboxList-ExpandableCnt_active')) {
      jQuery(this).siblings('.CheckboxList-ExpandableCnt').removeClass('CheckboxList-ExpandableCnt_active');
      jQuery(this).find('i').text('expand_more');
    } else {
      jQuery(this).siblings('.CheckboxList-ExpandableCnt').addClass('CheckboxList-ExpandableCnt_active');
      jQuery(this).find('i').text('expand_less');
    }
  });
})
