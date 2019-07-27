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
var noneSelectedText = 'Сколько гостей';
$(dropdownGuests.widgetClass).multiselect({
  click: function(event, ui){ // чтобы при нажатии только на плюс и минус могли выбартьсЯ оттрибуты
    //console.log("dfsfgdfg");
    return false; 
  },
  showCheckAll: false,
  buttonWidth: 'auto',
  noneSelectedText: noneSelectedText,
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

  //$(this).children('input').attr('type', 'hidden');

  $(this).append('<div class="QuantityBlock">' +
                '<button class="QuantityBlock__IconMinus"> - </button>' +
                '<input class="QuantityBlock__Num" type="text" placeholder="0" />' +
                '<button class="QuantityBlock__IconPlus"> + </button>' +
               '</div>');

 /* var $elem = $(this).parent('li').data(  ); // оригинал элемента с закрепленным за ним массивом
  var $clone = $(this).parent('li').clone() // создадим копию элемента
    .data($elem);
  var thisParentUl = $(this).parents('ul');
  $(this).parent('li').remove();
  thisParentUl.append($clone);
*/



});

/** 
* This passes to the attribute 'name' the value that was obtained from the widget menu <input> tags
*/
$('.ui-multiselect-checkboxes input[type=checkbox]').each(function(index) {
  $(this).siblings('.QuantityBlock').children('input').attr('name', $(this).val());
  $(this).siblings('.QuantityBlock').children('input').val('0'); // чтоьы не вылезало поле инпукта сбоку при клике
});

/** 
* This events are adding count of selected items in multiselect widget
*/
$("label[for *= '" + dropdownGuests.id + "']").find(".QuantityBlock__IconPlus").click(function(eventObject){ 
  var targetPlus = $(this).prev();
  targetPlus.val( +targetPlus.val() + 1 ); //This adds the number of selected elements in the “value” attribute of the “input” tag.

  /** 
  * This is changes text in 'widget field' the by adding number of selected elements using a regular expression
  */
  var objectInput = $(this).parent('.QuantityBlock').siblings('input');
  var widgetId = objectInput.attr('id');
  var commonSumInputs  = 0;
  widgetId = widgetId.match(/^[^-]+-[^-]+-[^-]+-([^-]+)/i); // defined select attr id by input attr id that located in dropdownmenu
  
  $('.QuantityBlock__Num').each(function(index, el) {
    commonSumInputs += +$(this).val();
  });

  /** 
  * This is adding "checked" attribute for is passes "name" attribute for backend
  */

  objectInput.prop('checked', 'checked');
  console.log("+" + objectInput[0].checked );
  $('#' + widgetId[1] + '_ms span:last').text(commonSumInputs + ' Гостей');

/*  if (commonSumInputs <= 0) {
    $('.ui-multiselect-checkboxes input[type=checkbox]').prop('checked', false);
    console.log('remove all+ checked');
  } else {
    objectInput.prop('checked', 'checked');
    console.log("+" + objectInput[0].checked );
    $('#' + widgetId[1] + '_ms span:last').text(commonSumInputs + ' Гостей');
  }*/

  targetPlus = widgetId = commonSumInputs = modifiedText = false;

  /**
  * For backend developers:)
  *
  * <select name="dropdownFacilities" multiple='multiple'>
  *   <option value="bedrooms"></option>
  *   <option value="beds"></option>
  *
  * jQuery UI dropdown's inputs: for name attr adding prefix "multiselect_"
  * <li>
  *   <input type="checkbox" name="multiselect_dropdownFacilities" value="bedrooms">
  *   <div class="QuantityBlock">
  *     <input type="text" name="bedrooms" value="3">
  *   </div>
  * </li>
  * <li>
  *   <input type="checkbox" name="multiselect_dropdownFacilities" value="beds">
  *   <div class="QuantityBlock">
  *     <input type="text" name="beds" value="2">
  *   </div>
  * </li>
  * 
  * option's value == input's(type="checkbox") value == input's(type="text") attribute name
  * 
  * output:
  *   multiselect_dropdownFacilities == ['bedrooms', 'beds']
  *   bedrooms == "3"
  *   beds == "2"
  */
});

$("label[for *= '" + dropdownGuests.id + "']").find(".QuantityBlock__IconMinus").click(function(eventObject){
  var targetMinus = $(this).next();
  if (targetMinus.val() > 0) {
    targetMinus.val( +targetMinus.val() - 1 );

    /** 
    * This is changes text in 'widget field' the by adding number of selected elements using a regular expression
    */
    var objectInput = $(this).parent('.QuantityBlock').siblings('input');
    var widgetId = objectInput.attr('id');
    var commonSumInputs  = 0;
    widgetId = widgetId.match(/^[^-]+-[^-]+-[^-]+-([^-]+)/i); // defined select attr id by input attr id that located in dropdownmenu
    
    $('.QuantityBlock__Num').each(function(index, el) {
      commonSumInputs += +$(this).val();
    });

    /** 
    * This is adding "checked" attribute for is passes "name" attribute for backend
    */
    if (targetMinus.val() <= 0) {
      objectInput.prop('checked', false);
      console.log('remove 1 checked');
      console.log( objectInput[0].checked );
    }

    if (commonSumInputs <= 0) {
      $('.ui-multiselect-checkboxes input[type=checkbox]').prop('checked', false);
      console.log('remove all checked');
      $('#' + widgetId[1] + '_ms span:last').text(noneSelectedText);
    } else {
      console.log( objectInput[0].checked );
      $('#' + widgetId[1] + '_ms span:last').text(commonSumInputs + ' Гостей');
    }

    targetPlus = widgetId = commonSumInputs = modifiedText = false;
  }


});

// очистить применить нужно сделать
/*
удалить логи
написать коменты к коду
*/