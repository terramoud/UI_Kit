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
*   <div class="DropdownFacilities-QuantityBlock">
*     <input type="text" name="bedrooms" value="3">
*   </div>
* </li>
* <li>
*   <input type="checkbox" name="multiselect_dropdownFacilities" value="beds">
*   <div class="DropdownFacilities-QuantityBlock">
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


jQuery('select.DropdownFacilities').each(function () {
  /**
   * Namespace
   */
  var cloneThis = this;
  var dropdownFacilities = {
    widgetClass: '.DropdownFacilities',
    id:  $(cloneThis).attr('id'),
  };


  /**
   * Includs widget multiselect
   */
  $('#'+dropdownFacilities.id).multiselect({
    header: false,
    showCheckAll: false,
    buttonWidth: 'auto',
    noneSelectedText: 'Выберите удобства',
    create: function(argument) {

      /**
       * it is creating the expand more arrow instead the default arrow
       */
      $(this).next().find('.ui-multiselect-open').prepend('<i class="material-icons">expand_more</i>').children('.ui-icon').remove();
      $(this).next().find('.ui-multiselect-open').addClass('DropdownFacilities-Icon');
      $(this).next().find('span:last').addClass('DropdownFacilities-WidgetText');
    },

    open: function(){
      $('.ui-multiselect-checkboxes').css('height', 'auto');
      let widgetBtn = document.getElementById($(this).next().attr('id'));
      let widgetBtnDOMRect = widgetBtn.getBoundingClientRect();
      let widgetMenu = document.querySelector('[data-ui-multiselect-menu-id=' + dropdownFacilities.id + ']');
      let widgetMenuDOMRect = widgetMenu.getBoundingClientRect();
      if (widgetBtnDOMRect.top > widgetMenuDOMRect.top) {
        jQuery('[data-ui-multiselect-menu-id=' + dropdownFacilities.id + ']').css({
          'border-top-left-radius': '4px',
          'border-top-right-radius': '4px',
          'border-bottom-left-radius': '0px',
          'border-bottom-right-radius': '0px',
          'border-top-width': '1px',
          'border-bottom-width': '0px',
        });
        jQuery(this).next().css({
          'border-top-left-radius': '0px',
          'border-top-right-radius': '0px',
          'border-bottom-left-radius': '4px',
          'border-bottom-right-radius': '4px',
        });
      } else {
        jQuery('[data-ui-multiselect-menu-id=' + dropdownFacilities.id + ']').css({
          'border-top-left-radius': '0px',
          'border-top-right-radius': '0px',
          'border-bottom-left-radius': '4px',
          'border-bottom-right-radius': '4px',
          'border-top-width': '0px',
          'border-bottom-width': '1px',
        });
        jQuery(this).next().css({
          'border-top-left-radius': '4px',
          'border-top-right-radius': '4px',
          'border-bottom-left-radius': '0px',
          'border-bottom-right-radius': '0px',
        });
      }
    },

    close: function(){
      jQuery(this).next().css({
        'border-top-left-radius': '4px',
        'border-top-right-radius': '4px',
        'border-bottom-left-radius': '0px',
        'border-bottom-right-radius': '0px',
      });
    },

    click: function(event, ui){
      return false;
    },

    selectedList: 2,

    selectedText: function(numChecked, numTotal, checkedItems){
      value = this.$inputs.filter(':checked').map(function() {
        /**
         * This adds the number of selected items before name of the this item in widget field
         */
        var valInputNumber = $(this).siblings('.DropdownFacilities-QuantityBlock').children('input').val();
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
   * This are adding styles for widget DropdownFacilities
   */
  $('#'+dropdownFacilities.id).each(function(index, el) {
    $(this).next().addClass( $(this).attr('class') );
  });


  /**
   * Creating custom buttons instead of default buttons in <input type="number">
   */
  $('.ui-multiselect-checkboxes label[for *= "' + dropdownFacilities.id + '"]').each(function(index, el) {
    $(this).append('<div class="DropdownFacilities-QuantityBlock">' +
                     '<button class="DropdownFacilities-QuantityIconMinus DropdownFacilities-QuantityIconMinus_noActive"> - </button>' +
                     '<input class="DropdownFacilities-QuantityNum" type="text" placeholder="0" />' +
                     '<button class="DropdownFacilities-QuantityIconPlus"> + </button>' +
                   '</div>');
  });

  /**
   * Creating custom attributes to make it easier to select the right items
   */
  jQuery("label[for *= '" + dropdownFacilities.id + "']").attr('data-id', dropdownFacilities.id);
  jQuery("label[data-id=" + dropdownFacilities.id + "]").closest('.ui-multiselect-menu').attr('data-dropdown-facilities', '');
  jQuery("label[data-id=" + dropdownFacilities.id + "]").closest('.ui-multiselect-menu').attr('data-ui-multiselect-menu-id', dropdownFacilities.id);

  /**
   * This passes to the attribute 'name' the value that was obtained from the widget menu <input> tags
   */
  $('.ui-multiselect-checkboxes input[type=checkbox]').each(function(index) {
    $(this).siblings('.DropdownFacilities-QuantityBlock').children('input').attr('name', $(this).val());
    $(this).siblings('.DropdownFacilities-QuantityBlock').children('input').val('0'); // It is fixed the bag that happenes after was being clicked on this input field
  });


  function declensionOfWords(numFacilities, words) {
    /**
     * This is changes the end of text in 'widget field'
     */
    var facilities = numFacilities % 10;
    var manyFacilities = numFacilities % 100;
    if (facilities      == 1 && manyFacilities <  11 || facilities     == 1 && manyFacilities > 19) return words[1];
    if (facilities       > 1 && facilities     <  5  && manyFacilities < 11 || facilities     > 1   && facilities     <  5 && manyFacilities > 14) return words[2];
    if (facilities      == 0 || facilities     >= 5  && facilities     <= 9 || manyFacilities >= 11 && manyFacilities <= 14) return words[0];
  }

  /**
   * This events are adding count of selected items in multiselect widget
   */
  $("label[data-id=" + dropdownFacilities.id + "] .DropdownFacilities-QuantityIconPlus").click(function(eventObject){
    var targetPlus = $(this).prev();
    targetPlus.val( +targetPlus.val() + 1 ); //This adds the number of selected elements in the “value” attribute of the “input” tag.
    $(this).siblings('.DropdownFacilities-QuantityIconMinus').removeClass('DropdownFacilities-QuantityIconMinus_noActive');
    $(this).parent('.DropdownFacilities-QuantityBlock').siblings('input').prop('checked', 'checked');


    /**
     * This is changes text in 'widget field' the by adding number of selected elements using a regular expression
     */
    var widgetId = $(this).parent('.DropdownFacilities-QuantityBlock').siblings('input').attr('id');
    widgetId = widgetId.match(/^[^-]+-[^-]+-[^-]+-([^-]+)/i);

    var InputNameAttr = targetPlus.attr('name');
    var optionsContent = $('#' + widgetId[1] + ' option[value='+InputNameAttr+']').text(); // getting the contents of the <option> tag by the value of the "name" attribute of clicked element
    let optionsDeclension = $('#' + widgetId[1] + ' option[value='+InputNameAttr+']').attr('data-option-declension');
    var dropDownText = $('#' + widgetId[1] + '_ms span:last').text();

    /**
     * This clears the text string to convert it to an array
     */
    optionsDeclension = optionsDeclension.replace(/"/gi, '')
      .replace('[', '')
      .replace(']', '')
      .split(',');

    /**
     * It is finding numbers until the first space in the 'widget field' depending on what inputs is checked
     */
    //var regular = new RegExp('\\d+ ' + optionsContent.substr(0, optionsContent.length-4) + '[^\\d\\s\.\,]*', 'i');
    var regularArray = [];
    for (let i = 0; i < optionsDeclension.length; i++) {
      regularArray[i] = new RegExp('\\d+ ' + optionsDeclension[i], 'i');
    }
    let modifiedText = '';
    let numFacilities = 0;
    jQuery("label[data-id=" + dropdownFacilities.id + "] .DropdownFacilities-QuantityNum").each(function () {
      if (+jQuery(this).val() !== 0) numFacilities++;
    });

    /**
     * This is changes the end of text in 'widget field'
     */
    optionsContent = declensionOfWords(+targetPlus.val(), optionsDeclension);

    if (dropDownText === 'Выберите удобства') {
      modifiedText = targetPlus.val() + ' ' + optionsContent;
    } else {
      let regular = regularArray[0];
      for (let i = 0; i < regularArray.length; i++) {
        if (dropDownText.match(regularArray[i]) !== null) regular = regularArray[i];
      }
      if (dropDownText.search(regular) === -1) {
        if (numFacilities <= 2) {
          modifiedText = `${dropDownText}, ${targetPlus.val()} ${optionsContent}...`;
        } else {
          modifiedText = dropDownText;
        }
      } else {
        let regular = false;
        for (let i = 0; i < regularArray.length; i++) {
          if (dropDownText.match(regularArray[i]) !== null) regular = regularArray[i];
        }
        /**
         * It is replacing numbers until the first space in the 'widget field' on the number of selected elements
         */
        modifiedText = dropDownText.replace(regular, targetPlus.val() + ' ' + optionsContent);
      }
    }

    /**
     * This is changes text in 'widget field'
     */
    $('#' + widgetId[1] + '_ms span:last').text(modifiedText);
  });


  /**
   * This events are adding count of selected items in multiselect widget
   */
  $("label[data-id=" + dropdownFacilities.id + "] .DropdownFacilities-QuantityIconMinus").click(function(eventObject){
    var targetMinus = $(this).next();
    if (targetMinus.val() > 0) {
      targetMinus.val( +targetMinus.val() - 1 );

      /**
       * This is adding no active modifier for button
       */
      if (targetMinus.val() <= 0) {
        $(this).addClass('DropdownFacilities-QuantityIconMinus_noActive');
        $(this).closest('.DropdownFacilities-QuantityBlock').siblings('input').prop('checked', false);
      }

      /**
       * This is changes text in 'widget field' the by adding number of selected elements using a regular expression
       */
      var widgetId = $(this).parent('.DropdownFacilities-QuantityBlock').siblings('input').attr('id');
      widgetId = widgetId.match(/^[^-]+-[^-]+-[^-]+-([^-]+)/i);

      var InputNameAttr = targetMinus.attr('name');
      var optionsContent = $('#' + widgetId[1] + ' option[value='+InputNameAttr+']').text(); // Getting the contents of the <option> tag by the value of the "name" attribute of clicked element
      let optionsDeclension = $('#' + widgetId[1] + ' option[value='+InputNameAttr+']').attr('data-option-declension');
      var dropDownText = $('#' + widgetId[1] + '_ms span:last').text(); // Text in 'widget field'

      optionsDeclension = optionsDeclension.replace(/"/gi, '')
                                           .replace('[', '')
                                           .replace(']', '')
                                           .split(',');

      var regularArray = [];
      for (let i = 0; i < optionsDeclension.length; i++) {
        regularArray[i] = new RegExp('\\d+ ' + optionsDeclension[i], 'i');
      }
      let nameCheckedFacilities = '';
      let nameCheckedFacilitiesArray = [];
      let numCheckedFacilitiesArray = [];
      let modifiedText = '';
      let numFacilities = 0;

      jQuery("label[data-id=" + dropdownFacilities.id + "] .DropdownFacilities-QuantityNum").each(function () {
        if (+jQuery(this).val() !== 0) numFacilities++; // Number of checked options
      });

      if (numFacilities === 0 && targetMinus.val() <= 0) modifiedText = 'Выберите удобства';
      if (numFacilities  >  0 && targetMinus.val() <= 0) {
        /**
         * This is creating array of have been selected the option tags and their the values, and paste only first two of the selected facilities in the 'widget field'
         */
        jQuery("label[data-id=" + dropdownFacilities.id + "] .DropdownFacilities-QuantityNum").each(function () {
          if (+jQuery(this).val() !== 0) {
            let selectedOptionsDeclension = jQuery('option[value='+jQuery(this).attr('name')+']').attr('data-option-declension');
            selectedOptionsDeclension = selectedOptionsDeclension.replace(/"/gi, '')
                                                                 .replace('[', '')
                                                                 .replace(']', '')
                                                                 .split(',');

            nameCheckedFacilitiesArray.push(declensionOfWords(+jQuery(this).val(), selectedOptionsDeclension));
            numCheckedFacilitiesArray.push(jQuery(this).val());
          }
        });

        /**
         * This is sets up the text in 'widget field from have been selected option tags'
         */
        if (numCheckedFacilitiesArray.length === 1) modifiedText = `${numCheckedFacilitiesArray[0]} ${nameCheckedFacilitiesArray[0]}`;
        if (numCheckedFacilitiesArray.length  >  1) modifiedText = `${numCheckedFacilitiesArray[0]} ${nameCheckedFacilitiesArray[0]}, ${numCheckedFacilitiesArray[1]} ${nameCheckedFacilitiesArray[1]}...`;

      }
      if (numFacilities === 0 && targetMinus.val() >  0) modifiedText = 'Выберите удобства';
      if (numFacilities  >  0 && targetMinus.val() >  0) {
        /**
         * This is changes the end of text in 'widget field'
         */
        let regular = false;
        for (let i = 0; i < regularArray.length; i++) {
          let result = dropDownText.match(regularArray[i]);
          if (result !== null) regular = regularArray[i];
        }
        optionsContent = declensionOfWords(+targetMinus.val(), optionsDeclension);
        /**
         * When the number of facilities is more than two dropDown text does not contain the value of the third or more of facilities and,
         * thus, it will be just modifiedText == dropDownText, because the method 'replace' won't find nothing by regular expression
         */
        modifiedText = dropDownText.replace( regular, targetMinus.val() + ' ' + optionsContent );
      }

      $('#' + widgetId[1] + '_ms span:last').text(modifiedText);
    }
  });
});
