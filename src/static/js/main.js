let $           =   require('jquery'),
    Calories    =   require('./calories'),
    CoverAnim   =   require('./cover-anim');


if ($('body').hasClass('calories')) {
  Calories.calories();
}

if ($('body').hasClass('cover-anim')) {
  CoverAnim.init();
}
