jQuery('.LikeButton-Label').each(function () {
  jQuery(this).click(function (event) {
    event.preventDefault();
    if (jQuery(this).find('.LikeButton-Icon').text() === 'favorite') {
      jQuery(this).find('.LikeButton-Icon').text('favorite_border');
      jQuery(this).find('.LikeButton-Icon').removeClass('LikeButton-Icon_active');
      let numLikes = Number(jQuery(this).find('.LikeButton-NumberLikes').text());
      if (typeof numLikes === 'number') if (numLikes > 0) jQuery(this).find('.LikeButton-NumberLikes').text(numLikes - 1);
      jQuery(this).find('.LikeButton-NumberLikes').removeClass('LikeButton-NumberLikes_active');
    } else {
      jQuery(this).find('.LikeButton-Icon').text('favorite');
      jQuery(this).find('.LikeButton-Icon').addClass('LikeButton-Icon_active');
      let numLikes = Number(jQuery(this).find('.LikeButton-NumberLikes').text());
      jQuery(this).find('.LikeButton-NumberLikes').text(+numLikes + 1);
      jQuery(this).find('.LikeButton-NumberLikes').addClass('LikeButton-NumberLikes_active');
    }
  });
});
