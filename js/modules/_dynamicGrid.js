//////////////////////////////////////////////////////////
////  Dynamic Grid
//////////////////////////////////////////////////////////



const DynamicGrid = (() => {

  let debug = false;
  let info = { name : 'DynamicGrid', version : '1.0' };

  let tools = new Tools();
  let breakpoints = new Breakpoints();
  let dynamicGrids = {};
  let targets = '.js--data-dynamic-grid';
  let throttled = false;

  //////////////////////////////////////////////////////////
  ////  Get Elements
  //////////////////////////////////////////////////////////

  const getElements = () => {
    return document.querySelectorAll( targets ) || [];
  };

  //////////////////////////////////////////////////////////
  ////  Set Options
  //////////////////////////////////////////////////////////

  const setOptions = ( $customOptions = false ) => {

    let options = {
      itemSelector: '.dynamic-grid__item',
      columnWidth: '.dynamic-grid__item-sizer',
      percentPosition: true,
      horizontalOrder: true,
    };

    if ( $customOptions && (typeof $customOptions == "object") ) {
      options = { ...options, ...$customOptions };
    }

    return options;

  };

  //////////////////////////////////////////////////////////
  ////  Gather Dynamic Grids
  //////////////////////////////////////////////////////////

  const gatherDynamicGrids = () => {

    let dynamicGridsElements = getElements();

    for ( let i = 0; i < dynamicGridsElements.length; i++ ) {

      let element = dynamicGridsElements[i];
      let container = element.querySelector('.dynamic-grid__container') || false;
      let id = element.id || false;
      let options = setOptions();

      if ( id && element && container ) {
        dynamicGrids[id] = {
          container,
          element,
          id,
          options,
        };
      }

    }

  };

  //////////////////////////////////////////////////////////
  ////  Initialize Dynamic Grids
  //////////////////////////////////////////////////////////

  const initDynamicGrids = () => {

    if ( debug ) console.log( 'initDynamicGrids started' );
    for ( let key in dynamicGrids ) {
      initDynamicGridByID( key );
    }
    if ( debug ) console.log( 'initDynamicGrids finished' );

  };

  //////////////////////////////////////////////////////////
  ////  Initialize Dynamic Grid by Element ID
  //////////////////////////////////////////////////////////

  const initDynamicGridByID = ( $id = '' ) => {

    if ( debug ) console.log( 'initDynamicGridByID started' );

    if ( $id ) {
      let target = '#' + $id + ' .dynamic-grid__container';
      let msnry = new Masonry( target, setOptions() );
      msnry.layout();
      dynamicGrids[$id].msnry = msnry;
    }

    if ( debug ) console.log( 'initDynamicGridByID finished' );

  };

  //////////////////////////////////////////////////////////
  ////  Reset Masonry Items
  //////////////////////////////////////////////////////////

  const resetDynamicGridItemsWithTimeout = ( $timeout = 500 ) => {
    setTimeout(function() {
      if ( debug ) console.log(`Waited ${$timeout} before triggering resetDynamicGridItemsWithTimeout()`);
      for ( let key in dynamicGrids ) {
        dynamicGrids[key].msnry.layout();
      }
    }, $timeout );
  };

  //////////////////////////////////////////////////////////
  ////  Public Method | Initialize
  //////////////////////////////////////////////////////////

  const init = () => {

    if ( debug ) console.log( `${info.name}.init() Started` );

    gatherDynamicGrids();
    initDynamicGrids();

    window.addEventListener( 'resize', function(e){
      if ( !throttled ) {
        window.requestAnimationFrame(function() {
          throttled = false;
        });
        throttled = true;
      }
    });

    window.addEventListener( 'DOMContentLoaded', event => {
      resetDynamicGridItemsWithTimeout( 1000 );
    });

    console.log( dynamicGrids );

    if ( debug ) console.log( `${info.name}.init() Finished` );

  };

  //////////////////////////////////////////////////////////
  ////  Returned Methods
  //////////////////////////////////////////////////////////

  return {
    debug,
    dynamicGrids,
    info,
    init,
  };

});
