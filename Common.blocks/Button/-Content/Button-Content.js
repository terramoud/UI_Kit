jQuery('.Button-Content').each(function () {
  jQuery(this).mousedown(function (event) {
    jQuery(this).addClass('Button-Content_active');
  });
  jQuery(this).mouseup(function (event) {
    jQuery(this).removeClass('Button-Content_active');
  });
  jQuery(this).mouseleave(function (event) {
    jQuery(this).removeClass('Button-Content_active');
  });
});
