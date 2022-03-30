//////////////////////////////////////////////////////////
////  Logo
//////////////////////////////////////////////////////////

const Logo = (() => {

  let debug = false;
  let info = { name : 'Logo', version : '1.22' };

  let tools = new Tools();

  //////////////////////////////////////////////////////////
  ////  Get Characters
  //////////////////////////////////////////////////////////

  const getCharacters = () => {
    return document.querySelectorAll('.logo-character') || [];
  };

  const fadeInCharacters = () => {

    let chars = getCharacters();
    let sequence = [];

    if ( debug ) console.log( 'fadeInCharacters started!' );
    if ( debug ) console.log( chars );

    chars.forEach( char => {

      let duration = 200;
      let loop = 0;

      if ( 'logo--vr' === char.id ) {
        duration = 300;
        loop = 3;
      }

      sequence.push({
        e: char,
        p: {
          opacity: 1,
        },
        o: {
          duration: duration,
          loop: loop
        }
      });

    });

    Velocity.RunSequence(sequence);

    if ( debug ) console.log( 'fadeInCharacters started! end' );

  };

  //////////////////////////////////////////////////////////
  ////  Init
  //////////////////////////////////////////////////////////

  const init = ( $options = false ) => {
    if ( debug ) console.log( `${info.name}.init() Started v.${info.version}` );
    setTimeout( fadeInCharacters, 500 );
    if ( debug ) console.log( `${info.name}.init() Finished` );
  };

  //////////////////////////////////////////////////////////
  ////  Returned
  //////////////////////////////////////////////////////////

  return {
    debug,
    info,
    init
  };

});
