jQuery('.RangeSlider-Slider').each(function () {
  $(this).slider({
    range: true,
    min: 0,
    max: 15000,
    values: [ 5000, 10000 ],
    slide: function( event, ui ) {
      let firstVal = addSpaceBetweenNum(ui.values[ 0 ]);
      let lastVal = addSpaceBetweenNum(ui.values[ 1 ]);
      jQuery(this).closest('.RangeSlider').find('.RangeSlider-Range[data-amount]').val(`${firstVal}₽ - ${lastVal}₽`);
    }
  });
  let firstVal = addSpaceBetweenNum(jQuery(this).slider( "values", 0 ));
  let lastVal = addSpaceBetweenNum(jQuery(this).slider( "values", 1 ));
  jQuery(this).closest('.RangeSlider').find('.RangeSlider-Range[data-amount]').val(`${firstVal}₽ - ${lastVal}₽`);
});

function addSpaceBetweenNum(str) { // Add space between thousandth parts of number
  let arr = String(str).split('');
  for (let i = arr.length-4; i >= 0; i-=3) {
    arr[i] = `${arr[i]} `;
  }
  str = arr.join('');
  return str;
}
