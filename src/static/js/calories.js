var $ = require('jquery');

module.exports = {


  calories : function() {

    // data
    let foodData =  {
                  'bigMac' : {
                    'cal': 563,
                    'singleUnit': 'Big Mac',
                    'pluralUnit': 'Big Macs'
                  },
                  'grape' : {
                    'cal': 2.4,
                    'singleUnit': 'Grape',
                    'pluralUnit': 'Grapes'
                  },
                  'steak' : {
                    'cal': 1222.2,
                    'singleUnit': 'Pound of Steak',
                    'pluralUnit': 'Pounds of Steak'
                  },
                  'hersheysKiss' : {
                    'cal': 22,
                    'singleUnit': 'Hersheys Kiss',
                    'pluralUnit': 'Hersheys Kisses'
                  },
                  'butter' : {
                    'cal': 810,
                    'singleUnit': 'Stick of Butter',
                    'pluralUnit': 'Sticks of butter'
                  }
                };


    function calcRatio(num, ratio) {
      return Math.round((num / ratio) * 100) / 100;
    }

    // return food quantity
    function returnFoodQuant() {
      let $select = $('#food-select');
      let activeFood = $select.val();
      let cal = $('#cal-form__input').val();

      cal = calcRatio(cal, foodData[activeFood].cal);

      $('#food-count__number').text(cal);

      if (foodData === 1) {
        $('#food-count__unit').text(foodData[activeFood].singleUnit);
      } else {
        $('#food-count__unit').text(foodData[activeFood].pluralUnit);
      }
    };


    function buildSelectMenu() {
      let $select = $('#food-select');

      $.each(foodData,function(key, value) {
          $select.append('<option value=' + key + '>' + value.pluralUnit + '</option>');
        });
    };

    //
    function init() {
      buildSelectMenu();
    }

    // on submit
    $('#cal-form').submit(function(e) {
      e.preventDefault();
      returnFoodQuant();
    });

    // init
    init();


  }

};
