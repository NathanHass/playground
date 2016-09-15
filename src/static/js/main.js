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
            var r = 20*Math.random() + 20;
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


    window.onload = function() { init() };
})();
