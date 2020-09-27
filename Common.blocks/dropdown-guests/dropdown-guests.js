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
 *   <div class="dropdown-guests__quantity-block">
 *     <input type="text" name="bedrooms" value="3">
 *   </div>
 * </li>
 * <li>
 *   <input type="checkbox" name="multiselect_dropdownFacilities" value="beds">
 *   <div class="dropdown-guests__quantity-block">
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


$('select.dropdown-guests').each(function(index, el) {


  /**
   * Namespace
   */
  var cloneThis = this;
  var dropdownGuests = {
    widgetClass: '.dropdown-guests',
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
      dropdownGuests.borderBottomLeftRadius = $('.dropdown-guests').css('border-bottom-left-radius');
      dropdownGuests.borderBottomRightRadius = $('.dropdown-guests').css('border-bottom-right-radius');
      $('.dropdown-guests').css({
        'border-bottom-left-radius': '0px',
        'border-bottom-right-radius': '0px',
        'border-color': 'rgba(31, 32, 65, 0.5',
      });
    },
    close: function(){
      $('.dropdown-guests').css({
        'border-bottom-left-radius': dropdownGuests.borderBottomLeftRadius,
        'border-bottom-right-radius': dropdownGuests.borderBottomRightRadius,
        'border-color': 'rgba(31, 32, 65, 0.25',
      });
    },
  });


  /**
   * it is swapping multiselect header
   */
  let obj = $('.ui-multiselect-checkboxes label[for *= "' + dropdownGuests.id + '-"]');
  var header = obj.parents('.ui-multiselect-menu').children('.ui-multiselect-header').detach();
  obj.parents('.ui-multiselect-menu').append(header);


  /**
   * it is removing unnecessary items from the header
   */
  obj.parents('.ui-multiselect-menu').find('li.ui-multiselect-close').remove();
  obj.closest('.ui-multiselect-menu').attr('data-dropdown-guests', '');


  /**
   * it swapps default buttons
   */
  var replacedButton = obj.parents('.ui-multiselect-menu').find('.ui-multiselect-header li:first').detach();
  obj.parents('.ui-multiselect-menu').find('.ui-multiselect-header .ui-helper-reset').append(replacedButton);


  /**
   *  it is creating the apply button instead the default button and this delete the handlers of events
   */
  obj.parents('.ui-multiselect-menu').find('.ui-multiselect-header li:last').html(function(indx, oldHtml) {
    return '<button class="ui-multiselect-apply" type="submit" form="form1" value="Submit">' + dropdownGuests.applyButton + '</button>'
  });
  obj.parents('.ui-multiselect-menu').find('.ui-multiselect-header span:last').text(dropdownGuests.clearButton);

  /**
   * This are adding styles for widget dropdowns
   */
  $('#' + dropdownGuests.id).each(function(index, el) {
    $(this).next().addClass( $(this).attr('class') );
  });


  /**
   * Creating custom buttons instead of default buttons in <input type="text">
   */
  obj.each(function(index, el) {
    $(this).append(
      '<div class="dropdown-guests__quantity-block">' +
      '<button class="dropdown-guests__quantity-icon-minus dropdown-guests__quantity-icon-minus_no-active"> - </button>' +
      '<input class="dropdown-guests__quantity-num" type="text" placeholder="0" />' +
      '<button class="dropdown-guests__quantity-icon-plus"> + </button>' +
      '</div>'
    );
  });


  /**
   * This passes to the attribute 'name' the value that was obtained from the widget menu <input> tags
   */
  obj.find('input[type=checkbox]').each(function(index) {
    $(this).siblings('.dropdown-guests__quantity-block').children('input').attr('name', $(this).val());
    $(this).siblings('.dropdown-guests__quantity-block').children('input').val('0'); // It is fixed the bag that happenes after was being clicked on this input field
  });


  /**
   * This adds additional handlers for the click event. This changes the text of the widget to text when nothing is selected and resets the value of the input field.
   */
  let labelObj = $("label[for *= '" + dropdownGuests.id + "-']");

  labelObj.parents('.ui-multiselect-menu').find('.ui-multiselect-none').click(function(event) {
    $('#' + dropdownGuests.id + '_ms span:last').text(dropdownGuests.noneSelectedText);
    labelObj.find('.dropdown-guests__quantity-num').val(0);
    $(this).css('visibility', 'hidden');
    $(this).parents('.ui-multiselect-header').siblings('.ui-multiselect-checkboxes').find('.dropdown-guests__quantity-icon-minus').addClass('dropdown-guests__quantity-icon-minus_no-active');
    //$(this).parents('.ui-multiselect-header').siblings('.ui-multiselect-checkboxes').find('.dropdown-guests__quantity-icon-minus').css('border-color', 'rgba(31, 32, 65, 0.25)');
  });


  /**
   * This events are adding count of selected items in multiselect widget
   */
  labelObj.find(".dropdown-guests__quantity-icon-plus").click(function(eventObject){
    var targetPlus = $(this).prev();
    targetPlus.val( +targetPlus.val() + 1 ); //This adds the number of selected elements in the “value” attribute of the “input” tag.

    /**
     * It's restoring the clear button
     */
    $(this).parents('.ui-multiselect-menu').find('.ui-multiselect-none').css('visibility', 'inherit');
    $(this).siblings('.dropdown-guests__quantity-icon-minus').removeClass('dropdown-guests__quantity-icon-minus_no-active');

    /**
     * It's get the a unique identifier for every the dropdownGuests widget
     */
    var objectInput = $(this).parent('.dropdown-guests__quantity-block').siblings('input');
    var widgetId = objectInput.attr('id');
    var commonSumInputs  = 0;
    widgetId = widgetId.match(/^[^-]+-[^-]+-[^-]+-([^-]+)/i); // defined select attr id by input attr id that located in dropdownmenu

    /**
     * This is couting the common sum all guests for the this dropdown
     */
    labelObj.find('.dropdown-guests__quantity-num').each(function(index, el) {
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


  labelObj.find(".dropdown-guests__quantity-icon-minus").click(function(eventObject){
    var targetMinus = $(this).next();
    if (targetMinus.val() > 0) {
      targetMinus.val( +targetMinus.val() - 1 );

      /**
       * It's get the a unique identifier for every the dropdownGuests widget
       */
      var objectInput = $(this).parent('.dropdown-guests__quantity-block').siblings('input');
      var widgetId = objectInput.attr('id');
      var commonSumInputs  = 0;
      widgetId = widgetId.match(/^[^-]+-[^-]+-[^-]+-([^-]+)/i); // defined select attr id by input attr id that located in dropdownmenu

      /**
       * This is couting the common sum all guests for the this dropdown
       */
      labelObj.find('.dropdown-guests__quantity-num').each(function(index, el) {
        commonSumInputs += +$(this).val();
      });

      /**
       * This is adding "checked" attribute for is passes "name" attribute for backend
       */
      if (targetMinus.val() <= 0) {
        objectInput.prop('checked', false);
        $(this).addClass('dropdown-guests__quantity-icon-minus_no-active');
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
        $(this).addClass('dropdown-guests__quantity-icon-minus_no-active');

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



