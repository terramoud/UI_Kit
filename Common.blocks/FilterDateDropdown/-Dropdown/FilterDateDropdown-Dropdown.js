$('div.FilterDateDropdown-Dropdown').each(function(index, el) {


  /**
   * Namespace
   */
  var cloneThis = this;

  var FilterDateDropdown = {
    applyButton: 'применить',
    wrapperForDp: $(cloneThis).siblings(".FilterDateDropdown-air-datepicker"),
  };


  /**
   * This event is showing or hiding the block containing the Datepicker
   */
  $(cloneThis).click(function(eventObject){

    if( FilterDateDropdown.wrapperForDp.css('display') == 'none' ){
      FilterDateDropdown.wrapperForDp.css('display','block');
    } else {
      FilterDateDropdown.wrapperForDp.css('display','none');
    }

  });

});