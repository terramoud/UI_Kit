$("#filesB").multiselect({
  showCheckAll: false,
  buttonWidth: null,
  noneSelectedText: ' ',
  classes: 'InputBlock__InputField InputBlock_Width_265px InputBlock_Appearan_none InputBlock_PdTop_11px InputBlock_LetterSpacing_0px InputBlock_MrBot_19px InputBlock_Color_Dark75',
	selectedList: 2,
  //listbox: 10,
	options: { noneSelectedText: null,},
	selectedText: function(numChecked, numTotal, checkedItems){
    value = this.$inputs.filter(':checked').map(function() { return $(this).next().text().replace(/\n$/, '') }).get().join( this.options.selectedListSeparator);
    if (numChecked >= 2) {
      var str = value.match( /(^[^,]+,[^,]+)/i );
      value = str[0] + '...';
    }
    this.$button[0].children[0].children[0].outerHTML = '<i class="material-icons">expand_more</i>'; 
                 
    return value;
	},
});

$('.ui-multiselect-checkboxes label')
.append('<div class="quantity-block">' +
          '<button class="quantity-arrow-minus"> - </button>' +
          '<input class="quantity-num" type="number"  />' +
          '<button class="quantity-arrow-plus"> + </button>' +
        '</div>');

//console.log($('input[name=multiselect_filesB]'));
$('.ui-multiselect-checkboxes input[type=checkbox]').each(function(index) {
  console.log($(this));
  $(this).siblings('.quantity-block').children('input').attr('name', $(this).val());
});

$(".quantity-arrow-plus").click(function(eventObject){
  var targetPlus = $(this).prev();
  targetPlus.val( +targetPlus.val() + 1 );
  
});

$(".quantity-arrow-minus").click(function(eventObject){
  var targetMinus = $(this).next();
  if (targetMinus.val() > 0) {
    targetMinus.val( +targetMinus.val() - 1 );
    }
});