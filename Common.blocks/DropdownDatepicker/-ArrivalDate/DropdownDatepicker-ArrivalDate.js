var idDropdownDatepickerArrivalDate  = 0;

$('button.DropdownDatepicker-ArrivalDate').each(function(index, el) {


  /**
   * Namespace
   */
  var cloneThis = this;
  $(cloneThis).attr('data-id', idDropdownDatepickerArrivalDate++);
  var DropdownDpArrivalDate = {
    applyButton: 'применить',
    wrapperForDp: $(cloneThis).siblings('.DropdownDatepicker-WrapperForDatepicker'),
  };


  /**
   * This event is showing or hiding the block containing the Datepicker
   */
  $(cloneThis).click(function(eventObject){

    if( DropdownDpArrivalDate.wrapperForDp.css('display') == 'none' ){
      DropdownDpArrivalDate.wrapperForDp.css('display','block');
    } else {
      DropdownDpArrivalDate.wrapperForDp.css('display','none');
    }

  });


  // Datepicker initialization
  DropdownDpArrivalDate.wrapperForDp.datepicker({
    range: true,
    multipleDates: 2,
    clearButton: true,
    timepicker: false,
    onSelect: function (formattedDate, date, inst) {
      var arrayDate = formattedDate.split(","); // This creates an array from the string the selected of dates
      $(cloneThis).data( {'arrivalDate': arrayDate[0], 'dateOfDeparture': arrayDate[arrayDate.length-1]} );
      $(cloneThis).children('.DropdownDatepicker-Open').text( $(cloneThis).data('arrivalDate') ); // This writes the selected date to the dropdown
      $('button.DropdownDatepicker-DateOfDeparture[data-id=' + $(cloneThis).attr('data-id') + ']').children('.DropdownDatepicker-Open').text( $(cloneThis).data('dateOfDeparture') );
    }
  });

});