let arrRate = [];
let counter = 0;

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
  jQuery(this).siblings('.RateButton-InputHidden').attr('value', inputVal); // This will be adding the count of chosen of rating's stars

  arrRate[counter] = []; // This will have created the unique array for the every block of rating, that status of rating's stars do not will have been rewritten
  for (let i = 1; i <= 5; i++) {
    /**
     * This will be have remembered the status of all rating's stars,
     * because mouseenter and mouseleave events will have replaced right values.
     */
    arrRate[counter][i] = jQuery(this).parent().find(`.RateButton-StarIcon[data-id=${i}]`).text();
  }
  jQuery(this).parent().attr('data-counter', counter);  // This will have created the unique id for the every block of rating,
  // so that will have restored status of rating's stars for the correctly block
  counter++;
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
  if (counter > 0) {
    for (let j = 0; j < arrRate.length; j++) {
      for (let i = 1; i <= 5; i++) {
        /**
         * This will be have restored the status of all rating's stars,
         * because mouseenter event have replaced right values.
         */
        if (arrRate[j][i] === 'star') {
          jQuery(this).parent(`[data-counter=${j}]`).find(`.RateButton-StarIcon[data-id=${i}]`).text('star');
          jQuery(this).parent(`[data-counter=${j}]`).find(`.RateButton-Star[data-id=${i}]`).addClass('RateButton-Star_active');
        } else {
          jQuery(this).parent(`[data-counter=${j}]`).find(`.RateButton-StarIcon[data-id=${i}]`).text('star_border');
          jQuery(this).parent(`[data-counter=${j}]`).find(`.RateButton-Star[data-id=${i}]`).removeClass('RateButton-Star_active');
        }
      }
    }
  } else  {
    jQuery(this).parent().find(`.RateButton-StarIcon`).text('star_border');
    jQuery(this).parent().find(`.RateButton-Star`).removeClass('RateButton-Star_active');
  }
});


