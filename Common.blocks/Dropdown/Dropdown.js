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
*   <div class="Dropdown-QuantityBlock">
*     <input type="text" name="bedrooms" value="3">
*   </div>
* </li>
* <li>
*   <input type="checkbox" name="multiselect_dropdownFacilities" value="beds">
*   <div class="Dropdown-QuantityBlock">
*     <input type="text" name="beds" value="2">
*   </div>
* </li>
* 
* option's value == input's(type="checkbox") value == input's(type="text") the attribute name
* 
* output:
*   multiselect_dropdownFacilities == ['bedrooms', 'beds']
*   bedrooms == "3"
*   beds == "2"
*/


/** 
* Namespace
*/
var dropdown = {
  widgetClass: '.Dropdown',
  id:  $('select.Dropdown').attr('id'),
};


/** 
* Includs widget multiselect 
*/
$(dropdown.widgetClass).multiselect({
  header: false,
  showCheckAll: false,
  buttonWidth: 'auto',
  noneSelectedText: 'Выберите удобства',
  create: function(argument) {

    /** 
    * it is creating the expand more arrow instead the default arrow
    */
    $(this).next().find('.ui-multiselect-open').prepend('<i class="material-icons">expand_more</i>').children('.ui-icon').remove();
  },

  open: function(){
    $('.ui-multiselect-checkboxes').css('height', 'auto');
  },
  selectedList: 2,

	selectedText: function(numChecked, numTotal, checkedItems){
    value = this.$inputs.filter(':checked').map(function() { 
      /** 
      * This adds the number of selected items before name of the this item in widget field
      */
      var valInputNumber = $(this).siblings('.Dropdown-QuantityBlock').children('input').val();
      if (!valInputNumber) {
        valInputNumber = "2 ";
      } else {
        valInputNumber += " ";
      }

      return $(this).next().text().replace(/\n$/, '').replace(/^/, valInputNumber); 

    }).get().join( this.options.selectedListSeparator);

    /** 
    * This adds "..." to the end of the string that locate in widget field
    */
    if (numChecked >= 2) {
      var str = value.match( /^[^,]+, \d+ [^,]+/i );
      value = str[0] + '...';
    }

    return value;
	},
});


/** 
* This are adding styles for widget dropdown
*/
$(dropdown.widgetClass).each(function(index, el) {
  $(this).next().addClass( $(this).attr('class') );
});


/** 
* Creating custom buttons instead of default buttons in <input type="number"> 
*/
$('.ui-multiselect-checkboxes label[for *= "' + dropdown.id + '"]').each(function(index, el) {
  $(this).append('<div class="Dropdown-QuantityBlock">' +
                  '<button class="Dropdown-QuantityIconMinus Dropdown-QuantityIconMinus_noActive"> - </button>' +
                  '<input class="Dropdown-QuantityNum" type="text" placeholder="0" />' +
                  '<button class="Dropdown-QuantityIconPlus"> + </button>' +
                 '</div>')
  .find('span').addClass('cursorPointer');
});


/** 
* This passes to the attribute 'name' the value that was obtained from the widget menu <input> tags
*/
$('.ui-multiselect-checkboxes input[type=checkbox]').each(function(index) {
  $(this).siblings('.Dropdown-QuantityBlock').children('input').attr('name', $(this).val());
  $(this).siblings('.Dropdown-QuantityBlock').children('input').val('0'); // It is fixed the bag that happenes after was being clicked on this input field

});


/** 
* This events are adding count of selected items in multiselect widget
*/
$("label[for *= '" + dropdown.id + "'] .Dropdown-QuantityIconPlus").click(function(eventObject){ 
  var targetPlus = $(this).prev();
  targetPlus.val( +targetPlus.val() + 1 ); //This adds the number of selected elements in the “value” attribute of the “input” tag.
  $(this).siblings('.Dropdown-QuantityIconMinus').removeClass('Dropdown-QuantityIconMinus_noActive');

  /** 
  * This is changes text in 'widget field' the by adding number of selected elements using a regular expression
  */
  var widgetId = $(this).parent('.Dropdown-QuantityBlock').siblings('input').attr('id');
  widgetId = widgetId.match(/^[^-]+-[^-]+-[^-]+-([^-]+)/i);

  var InputNameAttr = targetPlus.attr('name');
  var optionsContent = $('#' + widgetId[1] + ' option[value='+InputNameAttr+']').text(); // getting the contents of the <option> tag by the value of the "name" attribute of clicked element
  var dropDownText = $('#' + widgetId[1] + '_ms span:last').text();
  
  /** 
  * It is finding numbers untill the first space in the 'widget field' depending on what inputs is checked
  */
  var regular = new RegExp('\\d+ ' + optionsContent, 'i');

  /** 
  * It is replaceing numbers untill the first space in the 'widget field on the number of selected elements
  */
  var modifiedText = dropDownText.replace( regular, targetPlus.val() + ' ' + optionsContent );

  /** 
  * This is changes text in 'widget field'
  */
  $('#' + widgetId[1] + '_ms span:last').text(modifiedText);
  targetPlus = widgetId = InputNameAttr = optionsContent = dropDownText =  regular = modifiedText = false;
});


/** 
* This events are adding count of selected items in multiselect widget 
*/
$("label[for *= '" + dropdown.id + "'] .Dropdown-QuantityIconMinus").click(function(eventObject){
  var targetMinus = $(this).next();
  if (targetMinus.val() > 0) {
    targetMinus.val( +targetMinus.val() - 1 );

    /** 
    * This is adding no active modifier for button
    */
    if (targetMinus.val() <= 0) {
      $(this).addClass('Dropdown-QuantityIconMinus_noActive');
    }

    /** 
    * This is changes text in 'widget field' the by adding number of selected elements using a regular expression
    */
    var widgetId = $(this).parent('.Dropdown-QuantityBlock').siblings('input').attr('id');
    widgetId = widgetId.match(/^[^-]+-[^-]+-[^-]+-([^-]+)/i);

    var InputNameAttr = targetMinus.attr('name');
    var optionsContent = $('#' + widgetId[1] + ' option[value='+InputNameAttr+']').text(); // getting the contents of the <option> tag by the value of the "name" attribute of clicked element
    var dropDownText = $('#' + widgetId[1] + '_ms span:last').text();
    
    var regular = new RegExp('\\d+ ' + optionsContent, 'i');
    var modifiedText = dropDownText.replace( regular, targetMinus.val() + ' ' + optionsContent );
    
    $('#' + widgetId[1] + '_ms span:last').text(modifiedText);
     targetMinus = widgetId = InputNameAttr = optionsContent = dropDownText =  regular = modifiedText = false;
  }
});
