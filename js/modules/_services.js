//////////////////////////////////////////////////////////
////  Services
//////////////////////////////////////////////////////////

const Services = (() => {

  let debug = false;
  let info = { name : 'Services', version : '1.0' };

  //////////////////////////////////////////////////////////
  ////  Toggle Modal Visibility
  //////////////////////////////////////////////////////////

  const toggleServiceDetails = () => {

    ( document.querySelectorAll( '.services__list-item:not([disabled])' ) || [] ).forEach( item => {
      item.addEventListener( 'click', () => {

        let index = item.dataset.index || '';
        let container = item.closest( '.services__main' ) || false;
        let detail = container.querySelector( '.services__details-item[data-index="' + index + '"]' ) || false;

        ( container.querySelectorAll( '.services__list-item, .services__details-item' ) || [] ).forEach( item => {
          item.classList.remove('active');
        });

        ( container.querySelectorAll( '.services__list-item[data-index="' + index + '"], .services__details-item[data-index="' + index + '"]' ) || [] ).forEach( item => {
          item.classList.add('active');
        });

      });
    });

  };

  //////////////////////////////////////////////////////////
  ////  Initialize
  //////////////////////////////////////////////////////////

  const init = () => {
    toggleServiceDetails();
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
