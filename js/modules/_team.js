//////////////////////////////////////////////////////////
////  Modals
//////////////////////////////////////////////////////////

const Team = (() => {

  let debug = false;
  let info = { name : 'Team', version : '1.0' };

  const triggerModalByTeamID = () => {

    let modal = document.getElementById('team-modal') || false;
    let modalContent = modal.querySelector('.modal__content') || false;

    if ( modalContent ) {
      ( document.querySelectorAll('.js--open-modal.team') || [] ).forEach( button => {
        button.addEventListener('click', ( event ) => {

          console.log( button.dataset );

          let postType = button.dataset.postType || '';
          let postID = button.dataset.postId || '';
          let teamName = button.dataset.teamName || '';
          let teamRole = button.dataset.teamRole || '';
          let teamBio = button.dataset.teamBio || '';
          let teamProfilePicture = button.dataset.teamProfilePicture || '';
          let teamProfilePictureSmall = button.dataset.teamProfilePictureSmall || '';
          let teamProfilePictureWidth = button.dataset.teamProfilePictureWidth || '';
          let teamProfilePictureHeight = button.dataset.teamProfilePictureHeight || '';

          modalContent.innerHTML = `
            <div class="team__photo">
              <img
                class="lazyload lazyload-item lazyload-item--image lazyload-item--inline"
                data-src="${teamProfilePicture}"
                src="${teamProfilePictureSmall}"
                alt="${teamName}"
                title="${teamName}"
                width="${teamProfilePictureWidth}"
                height="${teamProfilePictureHeight}"
              />
            </div>
            <div class="team__details">
              <h3 class="team__name">${teamName}</h3>
              <strong class="team__role">${teamRole}</strong>
              <div class="team__bio rte">${teamBio}</div>
            </div>
          `;

        });
      });
    }

  };

  //////////////////////////////////////////////////////////
  ////  Initialize
  //////////////////////////////////////////////////////////

  const init = () => {

    if ( debug ) console.log( `${info.name}.init() Started` );
    triggerModalByTeamID();
    if ( debug ) console.log( `${info.name}.init() Finished` );

  };

  //////////////////////////////////////////////////////////
  ////  Returned
  //////////////////////////////////////////////////////////

  return {
    info,
    init,
  };

});
