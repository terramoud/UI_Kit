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
$('select.DropdownGuests').each(function(index, el) {


  /** 
  * Namespace
  */
  var cloneThis = this;
  var dropdownGuests = {
    widgetClass: '.DropdownGuests',
    id:  $(cloneThis).attr('id'),
    noneSelectedText: 'Сколько гостей',
    applyButton: 'применить',
    clearButton: 'очистить',
  };
  

  /** 
  * Includs widget multiselect 
  */
  $('#' + dropdownGuests.id).multiselect({
    create: function(argument) {

      /** 
      * it is creating the expand more arrow instead the default arrow
      */
      $(this).next().find('.ui-multiselect-open').prepend('<i class="material-icons">expand_more</i>').children('.ui-icon').remove();

    },

    click: function(event, ui){ // it is deleting the click handler for the widget, now we can will be creating the custom handler
      return false; 
    },

    buttonWidth: 'auto',
    noneSelectedText: dropdownGuests.noneSelectedText,
    open: function(){
      $('.ui-multiselect-checkboxes').css('height', 'auto');
    },
  });


  /** 
  * it is swapping multiselect header
  */
  var header = $('.ui-multiselect-checkboxes label[for *= "' + dropdownGuests.id + '-"]').parents('.ui-multiselect-menu').children('.ui-multiselect-header').detach();
  $('.ui-multiselect-checkboxes label[for *= "' + dropdownGuests.id + '-"]').parents('.ui-multiselect-menu').append(header);


  /** 
  * it is removing unnecessary items from the header
  */
  $('.ui-multiselect-checkboxes label[for *= "' + dropdownGuests.id + '-"]').parents('.ui-multiselect-menu').find('li.ui-multiselect-close').remove();


  /** 
  * it swapps default buttons   
  */
  var replacedButton = $('.ui-multiselect-checkboxes label[for *= "' + dropdownGuests.id + '-"]').parents('.ui-multiselect-menu').find('.ui-multiselect-header li:first').detach();
  $('.ui-multiselect-checkboxes label[for *= "' + dropdownGuests.id + '-"]').parents('.ui-multiselect-menu').find('.ui-multiselect-header .ui-helper-reset').append(replacedButton);


  /** 
  *  it is creating the apply button instead the default button and this delete the handlers of events
  */
  $('.ui-multiselect-checkboxes label[for *= "' + dropdownGuests.id + '-"]').parents('.ui-multiselect-menu').find('.ui-multiselect-header li:last').html(function(indx, oldHtml) {
    return '<button class="ui-multiselect-apply" type="submit" form="form1" value="Submit">' + dropdownGuests.applyButton + '</button>'
  });


  /** 
  * This are adding styles for widget dropdowns
  */
  $('#' + dropdownGuests.id).each(function(index, el) {
    $(this).next().addClass( $(this).attr('class') );
  });


  /** 
  * Creating custom buttons instead of default buttons in <input type="text"> 
  */
  $('.ui-multiselect-checkboxes label[for *= "' + dropdownGuests.id + '-"]').each(function(index, el) {
    $(this).append(
                      '<div class="QuantityBlock">' +
                        '<button class="QuantityBlock__IconMinus"> - </button>' +
                        '<input class="QuantityBlock__Num" type="text" placeholder="0" />' +
                        '<button class="QuantityBlock__IconPlus"> + </button>' +
                      '</div>'
                    );
  });


  /** 
  * This passes to the attribute 'name' the value that was obtained from the widget menu <input> tags
  */
  $('.ui-multiselect-checkboxes label[for *= "' + dropdownGuests.id + '-"]').find('input[type=checkbox]').each(function(index) {
    $(this).siblings('.QuantityBlock').children('input').attr('name', $(this).val());
    $(this).siblings('.QuantityBlock').children('input').val('0'); // It is fixed the bag that happenes after was being clicked on this input field
  });


  /** 
  * This adds additional handlers for the click event. This changes the text of the widget to text when nothing is selected and resets the value of the input field.
  */
  $("label[for *= '" + dropdownGuests.id + "-']").parents('.ui-multiselect-menu').find('.ui-multiselect-none').click(function(event) {
    $('#' + dropdownGuests.id + '_ms span:last').text(dropdownGuests.noneSelectedText);
    $('label[for *= "' + dropdownGuests.id + '-"]').find('.QuantityBlock__Num').val(0);
    $(this).css('visibility', 'hidden');
  });


  /** 
  * This events are adding count of selected items in multiselect widget
  */
  $("label[for *= '" + dropdownGuests.id + "-']").find(".QuantityBlock__IconPlus").click(function(eventObject){ 
    var targetPlus = $(this).prev();
    targetPlus.val( +targetPlus.val() + 1 ); //This adds the number of selected elements in the “value” attribute of the “input” tag.

    /** 
    * It's restoring the clear button
    */
    $(this).parents('.ui-multiselect-menu').find('.ui-multiselect-none').css('visibility', 'inherit');

    /** 
    * It's get the a unique identifier for every the dropdownGuests widget
    */
    var objectInput = $(this).parent('.QuantityBlock').siblings('input');
    var widgetId = objectInput.attr('id');
    var commonSumInputs  = 0;
    widgetId = widgetId.match(/^[^-]+-[^-]+-[^-]+-([^-]+)/i); // defined select attr id by input attr id that located in dropdownmenu
    
    $("label[for *= '" + dropdownGuests.id + "-']").find('.QuantityBlock__Num').each(function(index, el) {
      commonSumInputs += +$(this).val();
    });

    /** 
    * This is adding "checked" attribute for is passes "name" attribute for backend
    */
    objectInput.prop('checked', 'checked');

    /** 
    * This is changes text in 'widget field'
    */
    $('#' + widgetId[1] + '_ms span:last').text(commonSumInputs + ' Гостей');

    targetPlus = widgetId = commonSumInputs = modifiedText = false;
  });


  $("label[for *= '" + dropdownGuests.id + "-']").find(".QuantityBlock__IconMinus").click(function(eventObject){
    var targetMinus = $(this).next();
    if (targetMinus.val() > 0) {
      targetMinus.val( +targetMinus.val() - 1 );

      /** 
      * It's get the a unique identifier for every the dropdownGuests widget
      */
      var objectInput = $(this).parent('.QuantityBlock').siblings('input');
      var widgetId = objectInput.attr('id');
      var commonSumInputs  = 0;
      widgetId = widgetId.match(/^[^-]+-[^-]+-[^-]+-([^-]+)/i); // defined select attr id by input attr id that located in dropdownmenu
      
      $("label[for *= '" + dropdownGuests.id + "-']").find('.QuantityBlock__Num').each(function(index, el) {
        commonSumInputs += +$(this).val();
      });

      /** 
      * This is adding "checked" attribute for is passes "name" attribute for backend
      */
      if (targetMinus.val() <= 0) {
        objectInput.prop('checked', false);
      }


      if (commonSumInputs <= 0) {

        /** 
        * This changes the text of the widget to text when nothing is selected and resets the value of the input field. 
        */
        $('.ui-multiselect-checkboxes input[type=checkbox]').prop('checked', false);
        $('#' + widgetId[1] + '_ms span:last').text(dropdownGuests.noneSelectedText);

        /** 
        * It's restoring the clear button
        */
        $(this).parents('.ui-multiselect-menu').find('.ui-multiselect-none').css('visibility', 'hidden');

      } else {

        /** 
        * This is changes text in 'widget field'
        */
        $('#' + widgetId[1] + '_ms span:last').text(commonSumInputs + ' Гостей');

      }

      targetPlus = widgetId = commonSumInputs = modifiedText = false;
    }
  });

});
  // очистить применить нужно сделать
