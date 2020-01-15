function addActive(thisObj) {
  jQuery(thisObj).addClass('SubscrTxField-InputField_active');
}

function removeActive(thisObj) {
  jQuery(thisObj).removeClass('SubscrTxField-InputField_active');
}

jQuery('.SubscrTxField').each(function () {
  jQuery(this).children('.SubscrTxField-InputField').hover(function () {
    addActive(this);
  }, function () {
    removeActive(this);
  });
  jQuery(this).children('.SubscrTxField-InputField').focus(function () { addActive(this) });
  jQuery(this).children('.SubscrTxField-InputField').blur(function () { removeActive(this) });
});




jQuery(this).hover(function () {
  addActive(this);
}, function () {
  removeActive(this);
});
jQuery(this).focus(function () { addActive(this) });
jQuery(this).blur(function () { removeActive(this) });
