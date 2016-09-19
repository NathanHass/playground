let $           =   require('jquery'),
    Calories    =   require('./calories'),
    CoverAnim   =   require('./cover-anim'),
    Swiper      =   require('swiper');


if ($('body').hasClass('calories')) {
  Calories.calories();
}

if ($('body').hasClass('cover-anim')) {
  CoverAnim.init();
}


(function(){
    var stage, textStage, form, input;
    var circles, textPixels, textFormed;
    var blobWidth, blobHeight;
    var colors = ['#EAE3D1', '#EAE3D1', '#EAE3D1','#EAE3D1', '#D4342A', '#D4342A'];

    function init() {
        initStages();
        initCircles();
        animate();
    }

    // Init Canvas
    function initStages() {
        blobWidth = window.innerWidth / 2 - 100;
        blobHeight = blobWidth * 1.1;


        stage = new createjs.Stage("stage");
        stage.canvas.width = blobWidth;
        stage.canvas.height =  blobHeight;
    }

    function initText() {
        text = new createjs.Text("t", "80px 'Source Sans Pro'", "#eee");
        text.textAlign = 'center';
        text.x = 300;
    }

    function initCircles() {
        circles = [];
        for(var i=0; i<30; i++) {
            var circle = new createjs.Shape();
            var r = blobWidth / 25 *Math.random() * 2;
            var x = blobHeight*Math.random();
            var y = blobWidth*Math.random();
            var color = colors[Math.floor(i%colors.length)];
            var alpha = 1;
            circle.alpha = alpha;
            circle.radius = r;
            circle.graphics.beginFill(color).drawCircle(0, 0, r);
            circle.x = x;
            circle.y = y;
            circles.push(circle);
            stage.addChild(circle);
            circle.movement = 'float';
            tweenCircle(circle);
        }
    }


    // animating circles
    function animate() {
        stage.update();
        requestAnimationFrame(animate);
    }

    function tweenCircle(c, dir) {
        if(c.tween) c.tween.kill();
        if(dir == 'in') {
            c.tween = TweenLite.to(c, 0.4, {x: c.originX, y: c.originY, ease:Quad.easeInOut, alpha: 1, radius: 5, scaleX: 0.4, scaleY: 0.4, onComplete: function() {
                c.movement = 'jiggle';
                tweenCircle(c);
            }});
        } else if(dir == 'out') {
            c.tween = TweenLite.to(c, 0.8, {x: blobWidth*Math.random(), y: blobHeight*Math.random(), ease:Quad.easeInOut, alpha: 1, scaleX: 1, scaleY: 1, onComplete: function() {
                c.movement = 'float';
                tweenCircle(c);
            }});
        } else {
            if(c.movement == 'float') {
                c.tween = TweenLite.to(c, 5 + Math.random()*3.5, {x: c.x + -100+Math.random()*200, y: c.y + -100+Math.random()*200, ease:Quad.easeInOut, alpha: 1,
                    onComplete: function() {
                        tweenCircle(c);
                    }});
            } else {
                c.tween = TweenLite.to(c, 0.05, {x: c.originX + Math.random()*3, y: c.originY + Math.random()*3, ease:Quad.easeInOut,
                    onComplete: function() {
                        tweenCircle(c);
                    }});
            }
        }
    }

    if ($('body').hasClass('cover-anim')) {
      window.onload = function() { init(); };
    }
})();



(function(){
  let controller = new ScrollMagic.Controller();

  if ($('body').hasClass('phone-test')) {

    let wHeight = $(window).height();
    let topOffset = -100;
    let iphoneScreenHeight = $('.iphone__inner__image').height();
    let iphoneHeight = $('.phone--1').height();
    // let topOffset = wHeight / 2 - 100;
    let introHeight = $('.section-block--black').height();
    // debugger;
    $('.section-block--black').css({
      'min-height': `${wHeight - iphoneHeight  + iphoneScreenHeight * .75 + 200 + 200 }px`
    });

    $('.section-block--white').css({
      'min-height': `${$('.phone__mod--2').height() + $('.trigger-mod').height() }px`
    });
    // debugger;
    $(function () { // wait for document ready
      // build scene
      let tween = TweenMax.to(".phone__mod--1 .iphone__inner__image", 1, {className: "+=phone__inner-bottom"});

      let scene = new ScrollMagic.Scene({triggerElement: "#trigger1", triggerHook: "onLeave", duration: iphoneScreenHeight + introHeight })
              .setPin(".phone__group")
              // .addIndicators({name: "1 (duration: 300)"}) // add indicators (requires plugin)
              .addTo(controller)
              .offset(topOffset);

      let scene2 = new ScrollMagic.Scene({triggerElement: "#trigger1", triggerHook: "onLeave", duration: iphoneScreenHeight  *.75 })
              // .addIndicators({name: "1 (duration: 300)"}) // add indicators (requires plugin)
              .addTo(controller)
              .offset(topOffset)
              .setTween(tween)
              .on('enter', function() {
                $('.phone__group').removeClass('show-phones')
              })
              .on('leave', function(event) {
                console.log(event.state);
                if (event.state === "AFTER") {
                  $('.phone__group').addClass('show-phones');
                }
              });

      let scene3 = new ScrollMagic.Scene({triggerElement: "#trigger2", triggerHook: "onLeave"})
              .addTo(controller)
              .setClassToggle(".iphone__inner__image--2", "js-step-two");
      let scene4 = new ScrollMagic.Scene({triggerElement: "#trigger3", triggerHook: "onLeave"})
              .addTo(controller)
              .setClassToggle(".iphone__inner__image--2", "js-step-three");

      let scene5 = new ScrollMagic.Scene({triggerElement: "#trigger4", triggerHook: "onLeave"})
              .addTo(controller)
              // .setClassToggle(".phone__mod--2", "js-not-fixed");
              .on("enter", function() {
                $(".phone__mod--2").css({
                  'top': `${$('.trigger-mod').height() - 75}px`,
                  'position': 'absolute'
                })
              })
              .on("leave", function() {
                $(".phone__mod--2").css({
                  'top': `100px`,
                  'position': 'fixed'
                })
              });
    });
    }
})();


(function(){

  if ($('body').hasClass('cover-scroll')) {

    let controller = new ScrollMagic.Controller();
    // let spaceTextTween = TweenMax.to(".spaceman-text-mod", 1, {className: "+=spaceman-text-mod--fade"});
    let spacemanTween = TweenMax.to(".spaceman-img", 1, {className: "+=spaceman-img--fade"});

    new ScrollMagic.Scene({triggerElement: "#space-trigger", triggerHook: "onEnter", duration: "200%"})
        .addTo(controller)
        .offset(150)
        // .setTween(spaceTextTween)
        .setTween(spacemanTween);

    $('.fade-in').each(function(index, elem) {
      new ScrollMagic.Scene({triggerElement: elem})
          .addTo(controller)
          .setClassToggle(elem, "fade-in--visible");
    });
  }
})();
