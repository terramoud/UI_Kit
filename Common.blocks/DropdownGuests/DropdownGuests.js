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
*   <div class="DropdownGuests-QuantityBlock">
*     <input type="text" name="bedrooms" value="3">
*   </div>
* </li>
* <li>
*   <input type="checkbox" name="multiselect_dropdownFacilities" value="beds">
*   <div class="DropdownGuests-QuantityBlock">
*     <input type="text" name="beds" value="2">
*   </div>
* </li>
*
* the option's tag value == input's(type="checkbox") value == input's(type="text") the attribute name
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
    borderBottomLeftRadius: '',
    borderBottomRightRadius: '',
  };


  /**
  * Includes widget multiselect
  */

  $("select").multiselect();

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
      dropdownGuests.borderBottomLeftRadius = $('.DropdownGuests').css('border-bottom-left-radius');
      dropdownGuests.borderBottomRightRadius = $('.DropdownGuests').css('border-bottom-right-radius');
      $('.DropdownGuests').css({
        'border-bottom-left-radius': '0px',
        'border-bottom-right-radius': '0px',
        'border-color': 'rgba(31, 32, 65, 0.5',
      });
    },
    close: function(){
      $('.DropdownGuests').css({
        'border-bottom-left-radius': dropdownGuests.borderBottomLeftRadius,
        'border-bottom-right-radius': dropdownGuests.borderBottomRightRadius,
        'border-color': 'rgba(31, 32, 65, 0.25',
      });
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
  $('.ui-multiselect-checkboxes label[for *= "' + dropdownGuests.id + '-"]').closest('.ui-multiselect-menu').attr('data-dropdown-guests', '');


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
  $('.ui-multiselect-checkboxes label[for *= "' + dropdownGuests.id + '-"]').parents('.ui-multiselect-menu').find('.ui-multiselect-header span:last').text(dropdownGuests.clearButton);

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
                    '<div class="DropdownGuests-QuantityBlock">' +
                      '<button class="DropdownGuests-QuantityIconMinus DropdownGuests-QuantityIconMinus_noActive"> - </button>' +
                      '<input class="DropdownGuests-QuantityNum" type="text" placeholder="0" />' +
                      '<button class="DropdownGuests-QuantityIconPlus"> + </button>' +
                    '</div>'
                  );
  });


  /**
  * This passes to the attribute 'name' the value that was obtained from the widget menu <input> tags
  */
  $('.ui-multiselect-checkboxes label[for *= "' + dropdownGuests.id + '-"]').find('input[type=checkbox]').each(function(index) {
    $(this).siblings('.DropdownGuests-QuantityBlock').children('input').attr('name', $(this).val());
    $(this).siblings('.DropdownGuests-QuantityBlock').children('input').val('0'); // It is fixed the bag that happenes after was being clicked on this input field
  });


  /**
  * This adds additional handlers for the click event. This changes the text of the widget to text when nothing is selected and resets the value of the input field.
  */
  $("label[for *= '" + dropdownGuests.id + "-']").parents('.ui-multiselect-menu').find('.ui-multiselect-none').click(function(event) {
    $('#' + dropdownGuests.id + '_ms span:last').text(dropdownGuests.noneSelectedText);
    $('label[for *= "' + dropdownGuests.id + '-"]').find('.DropdownGuests-QuantityNum').val(0);
    $(this).css('visibility', 'hidden');
    $(this).parents('.ui-multiselect-header').siblings('.ui-multiselect-checkboxes').find('.DropdownGuests-QuantityIconMinus').addClass('DropdownGuests-QuantityIconMinus_noActive');
    //$(this).parents('.ui-multiselect-header').siblings('.ui-multiselect-checkboxes').find('.DropdownGuests-QuantityIconMinus').css('border-color', 'rgba(31, 32, 65, 0.25)');
  });


  /**
  * This events are adding count of selected items in multiselect widget
  */
  $("label[for *= '" + dropdownGuests.id + "-']").find(".DropdownGuests-QuantityIconPlus").click(function(eventObject){
    var targetPlus = $(this).prev();
    targetPlus.val( +targetPlus.val() + 1 ); //This adds the number of selected elements in the “value” attribute of the “input” tag.

    /**
    * It's restoring the clear button
    */
    $(this).parents('.ui-multiselect-menu').find('.ui-multiselect-none').css('visibility', 'inherit');
    $(this).siblings('.DropdownGuests-QuantityIconMinus').removeClass('DropdownGuests-QuantityIconMinus_noActive');

    /**
    * It's get the a unique identifier for every the dropdownGuests widget
    */
    var objectInput = $(this).parent('.DropdownGuests-QuantityBlock').siblings('input');
    var widgetId = objectInput.attr('id');
    var commonSumInputs  = 0;
    widgetId = widgetId.match(/^[^-]+-[^-]+-[^-]+-([^-]+)/i); // defined select attr id by input attr id that located in dropdownmenu

    /**
    * This is couting the common sum all guests for the this dropdown
    */
    $("label[for *= '" + dropdownGuests.id + "-']").find('.DropdownGuests-QuantityNum').each(function(index, el) {
      commonSumInputs += +$(this).val();
    });

    /**
    * This is adding "checked" attribute for is passes "name" attribute for backend
    */
    objectInput.prop('checked', 'checked');

    /**
    * This is changes the end of text in 'widget field'
    */
    var guests = commonSumInputs % 10;
    var manyGuests = commonSumInputs % 100;
    var widgetText = false;
    if (!guests) widgetText = commonSumInputs + ' гостей';
    if (guests == 1 && manyGuests < 11 || guests == 1 && manyGuests > 19) widgetText = commonSumInputs + ' гость';
    if (guests > 1 && guests < 5 && manyGuests < 11 || guests > 1 && guests < 5 && manyGuests > 14) widgetText = commonSumInputs + ' гостя';
    if (guests >= 5 && guests <= 9) widgetText = commonSumInputs + ' гостей';
    if (manyGuests >= 11 && manyGuests <= 14) widgetText = commonSumInputs + ' гостей';

    /**
    * This is changes text in 'widget field'
    */
    $('#' + widgetId[1] + '_ms span:last').text(widgetText);

    targetPlus = widgetId = commonSumInputs = modifiedText = false;
  });


  $("label[for *= '" + dropdownGuests.id + "-']").find(".DropdownGuests-QuantityIconMinus").click(function(eventObject){
    var targetMinus = $(this).next();
    if (targetMinus.val() > 0) {
      targetMinus.val( +targetMinus.val() - 1 );

      /**
      * It's get the a unique identifier for every the dropdownGuests widget
      */
      var objectInput = $(this).parent('.DropdownGuests-QuantityBlock').siblings('input');
      var widgetId = objectInput.attr('id');
      var commonSumInputs  = 0;
      widgetId = widgetId.match(/^[^-]+-[^-]+-[^-]+-([^-]+)/i); // defined select attr id by input attr id that located in dropdownmenu

      /**
      * This is couting the common sum all guests for the this dropdown
      */
      $("label[for *= '" + dropdownGuests.id + "-']").find('.DropdownGuests-QuantityNum').each(function(index, el) {
        commonSumInputs += +$(this).val();
      });

      /**
      * This is adding "checked" attribute for is passes "name" attribute for backend
      */
      if (targetMinus.val() <= 0) {
        objectInput.prop('checked', false);
        $(this).addClass('DropdownGuests-QuantityIconMinus_noActive');
      }

      /**
      * This is changes the end of text in 'widget field'
      */
      var guests = commonSumInputs % 10;
      var manyGuests = commonSumInputs % 100;
      var widgetText = false;
      if (!guests) widgetText = commonSumInputs + ' гостей';
      if (guests == 1 && manyGuests < 11 || guests == 1 && manyGuests > 19) widgetText = commonSumInputs + ' гость';
      if (guests > 1 && guests < 5 && manyGuests < 11 || guests > 1 && guests < 5 && manyGuests > 14) widgetText = commonSumInputs + ' гостя';
      if (guests >= 5 && guests <= 9) widgetText = commonSumInputs + ' гостей';
      if (manyGuests >= 11 && manyGuests <= 14) widgetText = commonSumInputs + ' гостей';

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
        $(this).addClass('DropdownGuests-QuantityIconMinus_noActive');

      } else {

        /**
        * This is changes text in 'widget field'
        */
        $('#' + widgetId[1] + '_ms span:last').text(widgetText);

      }

      targetPlus = widgetId = commonSumInputs = modifiedText = false;
    }
  });

});



