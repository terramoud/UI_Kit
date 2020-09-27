jQuery('.Button-GhostBtn').each(function () {
  jQuery(this).mousedown(function (event) {
    jQuery(this).addClass('Button-GhostBtn_active');
  });
  jQuery(this).mouseup(function (event) {
    jQuery(this).removeClass('Button-GhostBtn_active');
  });
  jQuery(this).mouseleave(function (event) {
    jQuery(this).removeClass('Button-GhostBtn_active');
  });
});
