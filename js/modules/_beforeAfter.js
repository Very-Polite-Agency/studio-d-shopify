//////////////////////////////////////////////////////////
////  Before & After
//////////////////////////////////////////////////////////

const BeforeAfter = (() => {

  let debug = false;
  let info = { name : 'BeforeAfter', version : '1.0' };

  let tools = new Tools();
  let throttled = false;


  //////////////////////////////////////////////////////////
  ////  Get Sliders
  //////////////////////////////////////////////////////////

  const getSliders = () => {
    return document.querySelectorAll('.before-after__slider') || [];
  }

  //////////////////////////////////////////////////////////
  ////  Set After Image Width
  //////////////////////////////////////////////////////////

  const setAfterImageWidth = ( $slider = false, $width = 50 ) => {
    if ( $slider && $width ) {
      let afterImage = $slider.closest('.before-after').querySelector('.before-after__after-image') || false;
      afterImage.style.width = ( $width + '%' );
    }
  };

  //////////////////////////////////////////////////////////
  ////  Set Slider Control Height
  //////////////////////////////////////////////////////////

  const setSliderControlHeight = () => {

    let sliderControlHeightOffset = 18;

    ( document.querySelectorAll('.noUi-handle') || [] ).forEach( sliderControl => {

      let containerHeight = sliderControl.closest('.before-after__main').offsetHeight || 100;
      sliderControl.style.height = containerHeight + ( sliderControlHeightOffset * 2 ) + 'px';
      sliderControl.style.top = -sliderControlHeightOffset + 'px';

    });
  }

  //////////////////////////////////////////////////////////
  ////  Update Slider Position
  //////////////////////////////////////////////////////////

  const updateSliderPosition = () => {

    let sliders = getSliders();

    sliders.forEach( slider => {

      let thisSlider = noUiSlider.create( slider, {
        start: 50,
        behaviour: 'tap',
        connect: [ false, true ],
        keyboardSupport: true,        // Default true
        keyboardDefaultStep: 5,       // Default 10
        keyboardPageMultiplier: 5,   // Default 5
        range: {
          'min': 0,
          'max': 100
        }
      });

      thisSlider.on('update', function ( values, handle, unencoded, tap, positions, noUiSlider ) {
        let position = positions[0];
        setAfterImageWidth( slider, position );
      });

    });

  };

  //////////////////////////////////////////////////////////
  ////  Init
  //////////////////////////////////////////////////////////

  const init = ( $options = false ) => {

    if ( debug ) console.log( `${info.name}.init() v.${info.version} Started` );

    updateSliderPosition();
    setSliderControlHeight();

     window.addEventListener('resize', function(e){
      if ( !throttled ) {
        window.requestAnimationFrame(function() {
          setSliderControlHeight();
          throttled = false;
        });
        throttled = true;
      }
    });

    window.addEventListener( 'DOMContentLoaded', event => {
      setTimeout(function() {
        setSliderControlHeight();
      }, 500 );
    });

    if ( debug ) console.log( `${info.name}.init() Finished` );

  };

  //////////////////////////////////////////////////////////
  ////  Returned
  //////////////////////////////////////////////////////////

  return {
    debug,
    info,
    init,
  };

});


