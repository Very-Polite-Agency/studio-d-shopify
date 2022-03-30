//////////////////////////////////////////////////////////
////  Project Filter
//////////////////////////////////////////////////////////

const ProjectFilter = (() => {

  let debug = false;
  let info = { name : 'ProjectFilter', version : '1.0' };
  let baseURL = '';
  let container = false;
  let queryArgs = {};
  let queryString = '';

  //////////////////////////////////////////////////////////
  ////  Apply All Filters
  //////////////////////////////////////////////////////////

  const applyAllFilters = () => {
    ( document.querySelectorAll('.project-filters__form') || [] ).forEach( form => {

      baseURL = form.dataset.baseUrl || '';
      queryString = '';

      //////////////////////////////////////////////////////////
      ////  Gather Checked Inputs
      //////////////////////////////////////////////////////////

      ( form.querySelectorAll('.project-filters__input') || [] ).forEach( input => {

        let taxonomy = input.name;
        let slug = input.value;
        let checked = input.checked;

        if ( checked ) {
          if ( queryArgs.hasOwnProperty(taxonomy) ) {
            queryArgs[taxonomy] = [ ...new Set([...queryArgs[taxonomy],...[slug]]) ];
          } else {
            queryArgs[taxonomy] = [ slug ];
          }
        }

      });

      //////////////////////////////////////////////////////////
      ////  Gather Select Values
      //////////////////////////////////////////////////////////

      ( form.querySelectorAll('.project-filters__select') || [] ).forEach( select => {

        let name = select.name;
        let value = select.value;
        if ( value ) {
          queryArgs[name] = [ value ];
        }

      });

      //////////////////////////////////////////////////////////
      ////  Build Query String
      //////////////////////////////////////////////////////////

      for ( const key in queryArgs ) {
        if ( queryArgs[key].length ) {
          queryString += ( queryString.length ? '&' : '?' ) + key + '=';
          queryArgs[key].forEach( (option, index) => {
            queryString += ( index > 0 ? ',' : '' ) + option;
          });
        }
      }

      //////////////////////////////////////////////////////////
      ////  Action the Query!
      //////////////////////////////////////////////////////////

      window.location.href = baseURL + queryString;

    });
  };

  //////////////////////////////////////////////////////////
  ////  Clear All Filters
  //////////////////////////////////////////////////////////

  const clearAllFilters = () => {

    ( document.querySelectorAll('.project-filters .button.clear') || [] ).forEach( button => {
      button.addEventListener('click', ( event ) => {

        // Empty queryArgs obj
        for (const key in queryArgs) {
          delete queryArgs[key];
        }

        // Reset queryString
        queryString = '';

        // Uncheck all form inputs
        ( document.querySelectorAll('.project-filters .project-filters__input') || [] ).forEach( input => {
          input.checked = false;
        });

        if ( debug ) console.log( 'cleared! ::', queryArgs, queryString );

      });
    });

  };

  //////////////////////////////////////////////////////////
  ////  Toggle Filters
  //////////////////////////////////////////////////////////

  const toggleFilters = () => {



    ( document.querySelectorAll('.project-filters .project-filters__input') || [] ).forEach( input => {
      input.addEventListener('click', ( event ) => {

        let slug = input.value;
        let taxonomy = input.name;
        let checked = input.checked;

        if ( checked ) {
          if ( queryArgs.hasOwnProperty(taxonomy) ) {
            queryArgs[taxonomy] = [ ...new Set([...queryArgs[taxonomy],...[slug]]) ];
          } else {
            queryArgs[taxonomy] = [ slug ];
          }
        } else {
          if ( queryArgs.hasOwnProperty(taxonomy) ) {
            queryArgs[taxonomy] = queryArgs[taxonomy].filter( e => e !== slug );
          }
        }

      });
    });

  };

  //////////////////////////////////////////////////////////
  ////  Filter Projects
  //////////////////////////////////////////////////////////

  const filterProjects = () => {

    ( document.querySelectorAll('.project-filters .project-filters__select') || [] ).forEach( select => {
      select.addEventListener('change', ( event ) => {
        applyAllFilters();
      });
    });

    ( document.querySelectorAll('.project-filters .button.apply') || [] ).forEach( button => {
      button.addEventListener('click', ( event ) => {
        applyAllFilters();
      });
    });

  }

  //////////////////////////////////////////////////////////
  ////  Initialize
  //////////////////////////////////////////////////////////

  const init = () => {
    clearAllFilters();
    // toggleFilters();
    filterProjects();
  };

  //////////////////////////////////////////////////////////
  ////  Returned
  //////////////////////////////////////////////////////////

  return {
    debug,
    info,
    init,
    queryArgs,
    queryString,
  };

});
