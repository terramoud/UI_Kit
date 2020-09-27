$('.filter-datepicker__air-datepicker').each(function(index, el) {

  /**
   * Namespace
   */
  var ThisAirDatepicker = this;

  var AirDatepicker = {
    applyButton: 'применить',
    wrapperForDp: $(ThisAirDatepicker).siblings('.filter-datepicker__air-datepicker'),
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
        $(ThisAirDatepicker).siblings('.filter-datepicker__dropdown').children('.filter-datepicker__open').text('ДД ММ - ДД ММ'); // This writes the selected date to the dropdown
      } else {
        $(ThisAirDatepicker).siblings('.filter-datepicker__dropdown').children('.filter-datepicker__open').text(formattedDate); // This writes the selected date to the dropdown
        $(ThisAirDatepicker).siblings('.filter-datepicker__dropdown').children('.filter-datepicker__input-hidden').val(String(formattedDate));
      }

    },

  });
  $(this).find('.datepicker--buttons').append('<button type="submit" class="datepicker--button" data-action="submit">Применить</button>')
});