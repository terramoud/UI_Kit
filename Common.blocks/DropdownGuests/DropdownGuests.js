/** 
* Namespace
*/
var dropdownGuests = {
  widgetClass: '.DropdownGuests',
  id:  $('select.DropdownGuests').attr('id'),
};
/** 
* Includs widget multiselect 
*/
$(dropdownGuests.widgetClass).multiselect({
  showCheckAll: false,
  buttonWidth: 'auto',
  noneSelectedText: 'Сколько гостей',
  open: function(){
    $('.ui-multiselect-checkboxes').css('height', 'auto');
  },
  //classes: 'InputBlock_Color_Dark75 InputBlock_MrBot_19px InputBlock_LetterSpacing_0px InputBlock_PdTop_11px InputBlock_Appearan_none InputBlock_Width_265px Dropdown',
  selectedList: 1,
  selectedText: function(numChecked, numTotal, checkedItems){
    console.log(this.$inputs);
    this.$button[0].children[0].children[0].outerHTML = '<i class="material-icons">expand_more</i>';
    var sumValInput = 0;

    this.$inputs.map(function() { 
      /** 
      * This adds the number of selected items before name of the this item in widget field
      */
      var valInputNumber = $(this).siblings('.QuantityBlock').children('input').val();
      sumValInput += +valInputNumber;
/*      if (!valInputNumber) {
        valInputNumber = "0";
      } else {
        valInputNumber += " ";
      }*/      
    }).get();

    value = sumValInput + ' Гостей';

    return value;
  },
});


/** 
* This are adding styles for widget dropdown
*/
$(dropdownGuests.widgetClass).each(function(index, el) {
  $(this).next().addClass( $(this).attr('class') );
});


/** 
* Creating custom buttons instead of default buttons in <input type="number"> 
*/
$('.ui-multiselect-checkboxes label[for *= "' + dropdownGuests.id + '"]').each(function(index, el) {
  $(this).append('<div class="QuantityBlock">' +
                  '<button class="QuantityBlock__IconMinus"> - </button>' +
                  '<input class="QuantityBlock__Num" type="text" placeholder="0" />' +
                  '<button class="QuantityBlock__IconPlus"> + </button>' +
                 '</div>');
});

/** 
* This passes to the attribute 'name' the value that was obtained from the widget menu <input> tags
*/
$('.ui-multiselect-checkboxes input[type=checkbox]').each(function(index) {
  $(this).siblings('.QuantityBlock').children('input').attr('name', $(this).val());
});

/** 
* This events are adding count of selected items in multiselect widget
*/
$("label[for *= '" + dropdownGuests.id + "'] .QuantityBlock__IconPlus").click(function(eventObject){ 
  var targetPlus = $(this).prev();
  targetPlus.val( +targetPlus.val() + 1 ); //This adds the number of selected elements in the “value” attribute of the “input” tag.

  /** 
  * This is changes text in 'widget field' the by adding number of selected elements using a regular expression
  */
  var objectInput = $(this).parent('.QuantityBlock').siblings('input');
  var widgetId = objectInput.attr('id');

  /** 
  * This is adding "checked" attribute for is passes "name" attribute for backend
  */
  if (objectInput.attr('checked') === 'checked') {
    objectInput.removeAttr('checked');
  } else {
    objectInput.attr('checked', 'checked');
  }

  widgetId = widgetId.match(/^[^-]+-[^-]+-[^-]+-([^-]+)/i); // defined select attr id by input attr id that located in dropdownmenu
  
  var commonSumInputs  = 0;

  $(this).parents('ul').find('input[type="text"]').map(function(index, elem) {
    commonSumInputs += +$(this).val();
  })

  $('#' + widgetId[1] + '_ms span:last').text(commonSumInputs + ' Гостей');
  targetPlus = widgetId = commonSumInputs = modifiedText = false;

});

$("label[for *= '" + dropdownGuests.id + "'] .QuantityBlock__IconMinus").click(function(eventObject){
  var targetMinus = $(this).next();
  if (targetMinus.val() > 0) {
    targetMinus.val( +targetMinus.val() - 1 );

    /** 
    * This is changes text in 'widget field' the by adding number of selected elements using a regular expression
    */
    var objectInput = $(this).parent('.QuantityBlock').siblings('input');
    var widgetId = objectInput.attr('id');

    if (objectInput.attr('checked') === 'checked') {
      objectInput.removeAttr('checked');
    } else {
      objectInput.attr('checked', 'checked');
    }

    widgetId = widgetId.match(/^[^-]+-[^-]+-[^-]+-([^-]+)/i); // defined select attr id by input attr id that located in dropdownmenu
  
    var commonSumInputs  = 0;

    $(this).parents('ul').find('input[type="text"]').map(function(index, elem) {
      commonSumInputs += +$(this).val();
    })

    $('#' + widgetId[1] + '_ms span:last').text(commonSumInputs + ' Гостей');
    targetMinus = widgetId = commonSumInputs = modifiedText = false;
  }
});