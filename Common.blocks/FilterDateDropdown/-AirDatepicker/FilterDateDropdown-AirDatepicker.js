$('.FilterDateDropdown-AirDatepicker').each(function(index, el) {

  /**
   * Namespace
   */
  var ThisAirDatepicker = this;

  var AirDatepicker = {
    applyButton: 'применить',
    wrapperForDp: $(ThisAirDatepicker).siblings('.FilterDateDropdown-AirDatepicker'),
    arrivalDate: '',
    dateOfDeparture: '',
  };

  // Datepicker initialization
  $(this).datepicker({
    range: true,
    multipleDates: 2,
    clearButton: true,
    timepicker: false,
    multipleDatesSeparator: ' - ',
    toggleSelected: false,
    dateFormat: 'd M',
    prevHtml: '<i class="material-icons">arrow_back</i>',
    nextHtml: '<i class="material-icons">arrow_forward</i>',
    navTitles: {
      days: 'MM yyyy',
    },
    onSelect: function (formattedDate, date, inst) {

      if ( String(formattedDate) === '') {
        $(ThisAirDatepicker).siblings('.FilterDateDropdown-Dropdown').children('.FilterDateDropdown-Open').text('ДД ММ - ДД ММ'); // This writes the selected date to the dropdown
      } else {
        $(ThisAirDatepicker).siblings('.FilterDateDropdown-Dropdown').children('.FilterDateDropdown-Open').text(formattedDate); // This writes the selected date to the dropdown
        $(ThisAirDatepicker).siblings('.FilterDateDropdown-Dropdown').children('.FilterDateDropdown-InputHidden').val(String(formattedDate));
      }

    },

  });
  $(this).find('.datepicker--buttons').append('<button type="submit" class="datepicker--button" data-action="submit">Применить</button>')
});