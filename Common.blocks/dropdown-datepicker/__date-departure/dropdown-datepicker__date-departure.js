$('div.dropdown-datepicker__date-departure').each(function(index, el) {

  /**
   * Namespace
   */
  var cloneThis = this;

  var DropdownDpDateOfDeparture = {
    applyButton: 'применить',
    arrivalDateElem: $('div.dropdown-datepicker___arrival-date'),
    wrapperForDp: $('div.dropdown-datepicker___arrival-date').siblings('.dropdown-datepicker__air-datepicker'),
  };

  /**
   * This event is showing or hiding the block containing the Datepicker
   */
  $(cloneThis).click(function(eventObject){

    if( DropdownDpDateOfDeparture.wrapperForDp.css('display') == 'none' ){
      DropdownDpDateOfDeparture.wrapperForDp.css('display', 'block');
    } else {
      DropdownDpDateOfDeparture.wrapperForDp.css('display', 'none');
    }

  });

});