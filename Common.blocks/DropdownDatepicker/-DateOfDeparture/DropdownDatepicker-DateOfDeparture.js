$('div.DropdownDatepicker-DateOfDeparture').each(function(index, el) {

  /**
   * Namespace
   */
  var cloneThis = this;

  var DropdownDpDateOfDeparture = {
    applyButton: 'применить',
    arrivalDateElem: $('div.DropdownDatepicker-ArrivalDate'),
    wrapperForDp: $('div.DropdownDatepicker-ArrivalDate').siblings('.DropdownDatepicker-AirDatepicker'),
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