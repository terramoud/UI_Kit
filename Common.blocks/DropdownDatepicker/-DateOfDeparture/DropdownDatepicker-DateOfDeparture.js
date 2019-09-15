var idDropdownDatepickerDateOfDeparture  = 0;

$('button.DropdownDatepicker-DateOfDeparture').each(function(index, el) {

  /**
   * Namespace
   */
  var cloneThis = this;
  $(cloneThis).attr('data-id', idDropdownDatepickerDateOfDeparture++);
  var DropdownDpDateOfDeparture = {
    applyButton: 'применить',
    arrivalDateElem: $('button.DropdownDatepicker-ArrivalDate[data-id=' + $(cloneThis).attr('data-id') + ']'),
    wrapperForDp: $('button.DropdownDatepicker-ArrivalDate[data-id=' + $(cloneThis).attr('data-id') + ']').siblings('.DropdownDatepicker-WrapperForDatepicker'),
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