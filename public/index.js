
Element.Properties.transform = {

    set: function(transform){
      var property = 'transform';
          if(Browser.chrome) property = 'WebkitTransform';
          if(Browser.firefox)  property = 'MozTransform';
          if(Browser.opera) property = 'OTransform';
          
          this.style[property] = transform;
          this.store('transform', transform);
      },
  
      get: function(){
          return this.retrieve('transform', '');
      }
  
  };
  
  Element.implement({
  
      setTransform: function(value){
          return this.set('transform', value);
      },
  
      getTransform: function(){
          return this.get('transform');
      }
  
  });
  
  $(window).addEvent('domready', function()
  {
      var $hourWrap = $$('.hour-wrap');
      var $hourFront = $hourWrap.getElement('div.front');
      var $hourBack = $hourWrap.getElement('div.back')
      var $hourTop = $hourWrap.getElement('div.digit-top');
      var $hourBottom = $hourWrap.getElement('div.digit-bottom .front');
  
      var $minWrap = $$('.min-wrap');
      var $minFront = $minWrap.getElement('div.front');
      var $minBack = $minWrap.getElement('div.back');
      var $minTop = $minWrap.getElement('div.digit-top');
      var $minBottom = $minWrap.getElement('div.digit-bottom .front');
  
      var currentHour = 0;
      var currentMin = 0;
  
      var setClock = function()
      {
          var time = new Date();
          var hour = time.getHours();
          var min = time.getMinutes();
  
          if(currentHour != hour)
          {
              currentHour = hour;
              var hourText = hour;
              var meridiem = '';
              
  
              var $meridiem = new Element('div', {'class':'meridiem', 'text':meridiem});
  
              // make el to sit behind the top digit
              var $newHourTop = new Element('div', {class: 'digit-top', html: $hourTop.get('html'), style: 'z-index:1;'})
              var $newHourFront = $newHourTop.getElement('div.front');
              var $newHourBack = $newHourTop.getElement('div.back');
  
              $newHourFront.set('text', hourText);
              $hourWrap.adopt($newHourTop);
  
              // start the animation
              $hourFront.setTransform('rotateX(180deg)');
              $hourBack.setTransform('rotateX(0deg)');
  
              $hourBack.setStyle('zIndex', 40);
  
              // set the hour back
              $hourBack.set('text', hourText);
              $hourBack.adopt($meridiem);
  
              (function()
              {
                  $hourTop.destroy();
                  $hourFront.destroy();
                  $hourBack.destroy();
  
                  $hourTop = $newHourTop;
                  $hourFront = $newHourFront;
                  $hourBack = $newHourBack;
  
                  $hourTop.setStyle('zIndex', 10);
                  $hourBottom.set('text', hourText);
                  $hourBottom.adopt($meridiem)
              }).delay(800);
          }
  
          if(currentMin != min)
          {
              currentMin = min;
              var minText = min < 10 ? '0'+min : min;
  
              // make el to sit behind the top digit
              var $newMinTop = new Element('div', {class: 'digit-top', html: $minTop.get('html'), style: 'z-index:1;'})
              var $newMinFront = $newMinTop.getElement('div.front');
              var $newMinBack = $newMinTop.getElement('div.back');
  
              $newMinFront.set('text', minText);
              $minWrap.adopt($newMinTop);
  
              // start the animation
              $minFront.setTransform('rotateX(180deg)');
              $minBack.setTransform('rotateX(0deg)');
              $minBack.setStyle('zIndex', 40);
  
              // set the min back
              $minBack.set('text', minText);
  
              (function()
              {
                  $minTop.destroy();
                  $minFront.destroy();
                  $minBack.destroy();
  
                  $minTop = $newMinTop;
                  $minFront = $newMinFront;
                  $minBack = $newMinBack;
  
                  $minTop.setStyle('zIndex', 10);
                  $minBottom.set('text', minText);
              }).delay(800);
          }
  
          //$hourEls.set('text', hour);
          
      }
  
      setClock.periodical(1000);
  });

setInterval(() => {
    document.body.style.backgroundImage = `url('https://picsum.photos/800/600?${(new Date()).getTime()}')`;
}, 1000*60*5);

function shutdown() {
    console.log("here");
    fetch("http://localhost:8000/shutdown", {method: "POST"}).then(r => r.json()).then(r => console.log(r));
}