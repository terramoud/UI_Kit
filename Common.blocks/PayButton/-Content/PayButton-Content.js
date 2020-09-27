jQuery('.PayButton-Content').each(function () {
  jQuery(this).mousedown(function (event) {
    jQuery(this).addClass('PayButton-Content_active');
  });
  jQuery(this).mouseup(function (event) {
    jQuery(this).removeClass('PayButton-Content_active');
  });
  jQuery(this).mouseleave(function (event) {
    jQuery(this).removeClass('PayButton-Content_active');
  });
});
