var $ = require('jquery');

module.exports = {


  init : function() {

    $('.cover-shape').mouseover( function() {
     $(this).toggleClass('hidden');
    });
    $('.cover-shape').click( function() {
      $(this).toggleClass('hidden');
    });
    console.log('cover anim');
  }

};
