let arrRate = [];

jQuery('.RateButton-Star').click(function (event) {
  event.preventDefault();
  if (jQuery(this).hasClass('RateButton-Star_active')) {
    let numberStars = +jQuery(this).attr('data-id') + 1;
    for (let i = numberStars; i <= 5; i++) { // This will be handling the status of all rating's stars
      /**
       * This will be removing the active status of do not chosen rating's stars
       */
      jQuery(this).parent().find(`.RateButton-StarIcon[data-id=${i}]`).text('star_border');
      jQuery(this).parent().find(`.RateButton-Star[data-id=${i}]`).removeClass('RateButton-Star_active');
    }
  } else {
    let numberStars = +jQuery(this).attr('data-id');
    for (let i = 1; i <= numberStars; i++) {
      /**
       * This will be adding the active status of chosen of rating's stars
       */
      jQuery(this).parent().find(`.RateButton-StarIcon[data-id=${i}]`).text('star');
      jQuery(this).parent().find(`.RateButton-Star[data-id=${i}]`).addClass('RateButton-Star_active');
    }
  }

  let inputVal = +jQuery(this).attr('data-id');
  jQuery(this).find('.RateButton-InputHidden').attr('value', inputVal); // This will be adding the count of chosen of rating's stars

  for (let i = 1; i <= 5; i++) {
    /**
     * This will be have remembered the status of all rating's stars,
     * because mouseenter and mouseleave events will have replaced right values.
     */
    arrRate[i] = jQuery(this).parent().find(`.RateButton-StarIcon[data-id=${i}]`).text();
  }
}).mouseenter(function (event) {
  event.preventDefault();
  if (jQuery(this).hasClass('RateButton-Star_active')) {
    let numberStars = +jQuery(this).attr('data-id') + 1;
    for (let i = numberStars; i <= 5; i++) {
      /**
       * This will be removing the active status of do not chosen rating's stars, when mouseenter event will happen
       */
      jQuery(this).parent().find(`.RateButton-StarIcon[data-id=${i}]`).text('star_border');
      jQuery(this).parent().find(`.RateButton-Star[data-id=${i}]`).removeClass('RateButton-Star_active');
    }
  } else {
    let numberStars = +jQuery(this).attr('data-id');
    for (let i = 1; i <= numberStars; i++) {
      /**
       * This will be adding the active status of chosen of rating's stars, when mouseenter event will happen
       */
      jQuery(this).parent().find(`.RateButton-StarIcon[data-id=${i}]`).text('star');
      jQuery(this).parent().find(`.RateButton-Star[data-id=${i}]`).addClass('RateButton-Star_active');
    }
  }
}).mouseleave(function (event) {
  event.preventDefault();
  for (let i = 1; i <= 5; i++) {
    /**
     * This will be have restored the status of all rating's stars,
     * because mouseenter event have replaced right values.
     */
    if (arrRate[i] === 'star') {
      jQuery(this).parent().find(`.RateButton-StarIcon[data-id=${i}]`).text('star');
      jQuery(this).parent().find(`.RateButton-Star[data-id=${i}]`).addClass('RateButton-Star_active');
    } else {
      jQuery(this).parent().find(`.RateButton-StarIcon[data-id=${i}]`).text('star_border');
      jQuery(this).parent().find(`.RateButton-Star[data-id=${i}]`).removeClass('RateButton-Star_active');
    }
  }
});


