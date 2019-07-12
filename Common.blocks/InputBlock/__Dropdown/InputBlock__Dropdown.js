$("#filesB").multiselect({
  showCheckAll: false,
  buttonWidth: null,
  noneSelectedText: ' ',
  classes: 'InputBlock__InputField InputBlock_Width_265px InputBlock_Appearan_none InputBlock_PdTop_11px InputBlock_LetterSpacing_0px InputBlock_MrBot_19px InputBlock_Color_Dark75',
	selectedList: 2,
	selectedText: function(numChecked, numTotal, checkedItems){
    this.$button[0].children[0].children[0].outerHTML = '<i class="material-icons">expand_more</i>'; 
    value = this.$inputs.filter(':checked').map(function() { 

      var valInputNumber = $(this).siblings('.quantity-block').children('input').val();
      if (!valInputNumber) {
        valInputNumber = "0 ";
      } else {
        valInputNumber += " ";
      }
      return $(this).next().text().replace(/\n$/, '').replace(/^/, valInputNumber); 

    }).get().join( this.options.selectedListSeparator);

    if (numChecked >= 2) {
      var str = value.match( /(^[^,]+,[^,]+)/i );
      value = str[0] + '...';
    }

    return value;
	},
});

$('.ui-multiselect-checkboxes label')
.append('<div class="quantity-block">' +
          '<button class="quantity-arrow-minus"> - </button>' +
          '<input class="quantity-num" type="number"  />' +
          '<button class="quantity-arrow-plus"> + </button>' +
        '</div>');

$('.ui-multiselect-checkboxes input[type=checkbox]').each(function(index) {
  $(this).siblings('.quantity-block').children('input').attr('name', $(this).val());
});

$(".quantity-arrow-plus").click(function(eventObject){
  var targetPlus = $(this).prev();
  targetPlus.val( +targetPlus.val() + 1 );

  var InputNameAttr = targetPlus.attr('name');
  var optinsContent = $('#filesB option[value='+InputNameAttr+']').text();
  var dropDownText = $('.ui-multiselect span:last').text();
  var regular = new RegExp('\\d+ ' + optinsContent, 'i');
  var modifiedText = dropDownText.replace( regular, targetPlus.val() + ' ' + optinsContent );
  $('.ui-multiselect span:last').text(modifiedText);
});

$(".quantity-arrow-minus").click(function(eventObject){
  var targetMinus = $(this).next();
  if (targetMinus.val() > 0) {
    targetMinus.val( +targetMinus.val() - 1 );

    var InputNameAttr = targetMinus.attr('name');
    var optinsContent = $('#filesB option[value='+InputNameAttr+']').text();
    var dropDownText = $('.ui-multiselect span:last').text();
    var regular = new RegExp('\\d+ ' + optinsContent, 'i');
    var modifiedText = dropDownText.replace( regular, targetMinus.val() + ' ' + optinsContent );
    $('.ui-multiselect span:last').text(modifiedText);
  }
});