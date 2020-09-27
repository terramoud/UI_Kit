jQuery('.ExpandableCheckboxList-Header').each(function () {
  jQuery(this).click(function (event) {
    event.preventDefault();
    if (jQuery(this).siblings('.ExpandableCheckboxList-List').css('display') === 'block') {
      jQuery(this).siblings('.ExpandableCheckboxList-List').css('display', 'none');
      jQuery(this).find('i').text('expand_more');
    } else {
      jQuery(this).siblings('.ExpandableCheckboxList-List').css('display', 'block');
      jQuery(this).find('i').text('expand_less');
    }
  });
})
