$('.dropdown-datepicker__air-datepicker').each(function(index, el) {

  /**
   * Namespace
   */
  var ThisAirDatepicker = this;

  var AirDatepicker = {
    applyButton: 'применить',
    wrapperForDp: $(ThisAirDatepicker).siblings('.dropdown-datepicker__air-datepicker'),
    arrivalDate: '',
    dateOfDeparture: '',
  };

  // Datepicker initialization
  $(this).datepicker({
    range: true,
    multipleDates: 2,
    clearButton: true,
    timepicker: false,
    toggleSelected: false,
    prevHtml: '<i class="material-icons">arrow_back</i>',
    nextHtml: '<i class="material-icons">arrow_forward</i>',
    navTitles: {
      days: 'MM yyyy',
    },
    onSelect: function (formattedDate, date, inst) {
      var arrayDate = formattedDate.split(","); // This creates an array from the string the selected of dates
      AirDatepicker.arrivalDate = arrayDate[0];
      AirDatepicker.dateOfDeparture = arrayDate[arrayDate.length - 1];
      console.log( AirDatepicker.arrivalDate);

      if ( String(arrayDate) === '') {
        $(ThisAirDatepicker).siblings('.dropdown-datepicker__arrival-date').children('.dropdown-datepicker__open').text('ДД.ММ.ГГГГ'); // This writes the selected date to the dropdown
        $(ThisAirDatepicker).parent('.dropdown-datepicker__wrapper-dropdown').next().find('.dropdown-datepicker__open').text('ДД.ММ.ГГГГ');
      } else {
        $(ThisAirDatepicker).siblings('.dropdown-datepicker__arrival-date').children('.dropdown-datepicker__open').text(AirDatepicker.arrivalDate); // This writes the selected date to the dropdown
        $(ThisAirDatepicker).siblings('.dropdown-datepicker__arrival-date').children('.dropdown-datepicker__input-hidden').val(AirDatepicker.arrivalDate);
        $(ThisAirDatepicker).parent('.dropdown-datepicker__wrapper-dropdown').next().find('.dropdown-datepicker__open').text(AirDatepicker.dateOfDeparture);
        $(ThisAirDatepicker).parent('.dropdown-datepicker__wrapper-dropdown').next().find('.dropdown-datepicker__input-hidden').val(AirDatepicker.dateOfDeparture);
      }

    },

  });
  $(this).find('.datepicker--buttons').append('<button type="submit" class="datepicker--button" data-action="submit">Применить</button>')
});