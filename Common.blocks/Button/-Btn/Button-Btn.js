jQuery('.Button-Btn').each(function () {
  jQuery(this).mousedown(function (event) {
    jQuery(this).addClass('Button-Btn_active');
  });
  jQuery(this).mouseup(function (event) {
    jQuery(this).removeClass('Button-Btn_active');
  });
  jQuery(this).mouseleave(function (event) {
    jQuery(this).removeClass('Button-Btn_active');
  });
});
