require('./__header/checkbox-list__header.js');
require('./__icon/checkbox-list__icon.js');
require('./__expandable/checkbox-list__expandable.js');

jQuery('.checkbox-list').each(function () {
  jQuery(this).find('.checkbox-list__header_theme_expandable').click(function (event) {
    event.preventDefault();
    if (jQuery(this).siblings('.checkbox-list__expandable').hasClass('checkbox-list__expandable_active')) {
      jQuery(this).siblings('.checkbox-list__expandable').removeClass('checkbox-list__expandable_active');
      jQuery(this).find('i').text('expand_more');
    } else {
      jQuery(this).siblings('.checkbox-list__expandable').addClass('checkbox-list__expandable_active');
      jQuery(this).find('i').text('expand_less');
    }
  });
})

require('./__list-wrapper/checkbox-list__list-wrapper.js');