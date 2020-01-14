jQuery(document).ready(function(){
  let now = new Date();
  let year = now.getFullYear();
  let month = ((+now.getMonth() + 1) < 10) ? `0${+now.getMonth() + 1}` : (+now.getMonth() + 1);
  let day = (+now.getDate() < 10) ? `0${+now.getDate()}` : +now.getDate();
  jQuery('.InputField').each(function () {
    if (jQuery(this).attr('data-type') === 'date') {
      jQuery(this).inputmask({
        alias: 'datetime',
        min: '01/01/1917',
        max: `${day}/${month}/${year}`,
        inputFormat: 'dd.mm.yyyy',
        placeholder: 'ДД.ММ.ГГГГ',
        "clearIncomplete": true,
      });
    }
    jQuery(this).hover(function () {
      addActive(this);
    }, function () {
      removeActive(this);
    });
    jQuery(this).focus(function () {addActive(this)});
    jQuery(this).blur(function () {removeActive(this)});
  });
});

function addActive(thisObj) {
  jQuery(thisObj).addClass('InputField_active');
}

function removeActive(thisObj) {
  jQuery(thisObj).removeClass('InputField_active');
}


