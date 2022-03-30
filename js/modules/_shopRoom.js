//////////////////////////////////////////////////////////
////  Shop the Room
//////////////////////////////////////////////////////////

const ShopRoom = (() => {

  let debug = false;
  let info = { name : 'ShopRoom', version : '1.0' };

  let tools = new Tools();
  let throttled = false;
  let shopBaseURL = 'https://optimilife.com';
  let sampleProductHandles = [
    'vanilla-vegan-protein-with-mushrooms',
    'mindful-lions-main-mushroom-supplement',
    'optimi-formulation-mushroom-supplement',
  ];

  //////////////////////////////////////////////////////////
  ////  Get Shopify Product
  //////////////////////////////////////////////////////////

  const getShopifyProductByHandle = ( $handle = '' ) => {
    let endpoint = shopBaseURL + '/products/' + $handle + '.js';
    return axios.get( endpoint ).then( response => response.data );
  }

  //////////////////////////////////////////////////////////
  ////  Render Shopify Products
  //////////////////////////////////////////////////////////

  const renderShopifyProducts = () => {
    ( document.querySelectorAll('.shop-room') || [] ).forEach( shopRoomFeature => {
      ( shopRoomFeature.querySelectorAll('.shop-room__product-marker') || [] ).forEach( ( productMarker, index ) => {

        let productHandle = productMarker.dataset.productHandle || '';

        if ( 0 === index ) {
          getShopifyProductByHandle( productHandle ).then( data => {
            renderProduct( data, shopRoomFeature );
            updateProductMarkerActiveState( productMarker, shopRoomFeature );
          }).catch( err => {
            console.log( 'getShopifyProductByHandle', 'first', err )
          });
        }

        productMarker.addEventListener( 'click', e => {
          getShopifyProductByHandle( productHandle ).then( data => {
            renderProduct( data, shopRoomFeature );
            updateProductMarkerActiveState( productMarker, shopRoomFeature );
          }).catch( err => {
            console.log( 'getShopifyProductByHandle', 'click', err )
          });
        });

        productMarker.addEventListener( 'mouseenter', e => {
          getShopifyProductByHandle( productHandle ).then( data => {
            renderProduct( data, shopRoomFeature );
            updateProductMarkerActiveState( productMarker, shopRoomFeature );
          }).catch( err => {
            console.log( 'getShopifyProductByHandle', 'mouseenter', err )
          });
        });

      });
    });
  };

  //////////////////////////////////////////////////////////
  ////  Render Product
  //////////////////////////////////////////////////////////

  const renderProduct = ( $product = {}, $shopRoomFeature = false ) => {

    if ( debug ) console.log( 'renderProduct', $product );

    let {
      title = '',
      price = '',
      url = '',
      type = '',
      featured_image: image = '',
    } = $product;

    if ( debug ) console.log({ title, url, type, image, price });

    if ( $shopRoomFeature ) {

      let shopRoomElements = {
        image: $shopRoomFeature.querySelector( '.shop-room__product-image img' ) || false,
        title: $shopRoomFeature.querySelector( '.shop-room__product-title' ) || false,
        type: $shopRoomFeature.querySelector( '.shop-room__product-type' ) || false,
        price: $shopRoomFeature.querySelector( '.shop-room__product-price' ) || false,
        link: $shopRoomFeature.querySelectorAll( '.shop-room__product-link' ) || [],
      };

      for ( const key in shopRoomElements ) {
        switch( key ) {
          case 'image':
            shopRoomElements[key].setAttribute( 'data-src', image );
            break;
          case 'price':
            shopRoomElements[key].innerHTML = '$' + (price/100).toFixed(2);
            break;
          case 'title':
            shopRoomElements[key].innerHTML = title;
            break;
          case 'type':
            shopRoomElements[key].innerHTML = type;
            break;
          case 'link':
            shopRoomElements[key].forEach( link => {
              link.setAttribute( 'href', shopBaseURL + url );
            });
            break;
        }
      }

    }

  }

  //////////////////////////////////////////////////////////
  ////  Update Product Marker Active State
  //////////////////////////////////////////////////////////

  const updateProductMarkerActiveState = ( $productMarker = false, $shopRoomFeature = false ) => {
    if ( $productMarker && $shopRoomFeature ) {
      ( $shopRoomFeature.querySelectorAll('.shop-room__product-marker') || [] ).forEach( productMarker => {
        productMarker.classList.remove('active');
      });
      $productMarker.classList.add('active');
    }
  };

  //////////////////////////////////////////////////////////
  ////  Init
  //////////////////////////////////////////////////////////

  const init = ( $options = false ) => {

    if ( debug ) console.log( `${info.name}.init() v.${info.version} Started` );

    renderShopifyProducts();

    window.addEventListener('resize', function(e){
      if ( !throttled ) {
        window.requestAnimationFrame(function() {
          throttled = false;
        });
        throttled = true;
      }
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


