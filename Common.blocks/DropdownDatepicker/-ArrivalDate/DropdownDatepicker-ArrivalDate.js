$('div.DropdownDatepicker-ArrivalDate').each(function(index, el) {


  /**
   * Namespace
   */
  var cloneThis = this;

  var DropdownDpArrivalDate = {
    applyButton: 'применить',
    wrapperForDp: $(cloneThis).siblings(".DropdownDatepicker-AirDatepicker"),
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

});