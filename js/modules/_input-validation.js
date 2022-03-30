//////////////////////////////////////////////////////////
////  Forms
//////////////////////////////////////////////////////////

const Forms = (() => {

	let debug = false;
	let info = { name : 'Forms', version : 1.0 };

  //////////////////////////////////////////////////////////
	////  Advanced Upload Available
	//////////////////////////////////////////////////////////

  var advancedUploadAvailable = function() {
    var div = document.createElement('div');
    return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
  }();

  //////////////////////////////////////////////////////////
	////  Main
	//////////////////////////////////////////////////////////

	const main = () => {

    if ( debug ) {
      console.log( '[forms() ] Init' );
    }

    let requiredResults = {};
    let formData = false;
    let uploadedFiles = false;
    let uploadedFileSize = 0;
    let elements = {
      form: '.js--validate-me',
      submit: '.js--validate-me button[type="submit"]',
      message: {
        default: '.js--validate-me .form__message .default',
        summary: '.js--validate-me .form__message .summary',
        success: '.js--validate-me .form__message .success',
        errors: {
          fileSize: '.js--validate-me .form__message .error--file-size',
          formOverview: '.js--validate-me .form__message .error--form-overview',
          tooManyFiles: '.js--validate-me .form__message .error--too-many-files'
        }
      }
    };

    //////////////////////////////////////////////////////////
  	////  If Drag and Drop Available
  	//////////////////////////////////////////////////////////

    if ( advancedUploadAvailable && !Browser.isMobileDevice() ) {

      $('input[name="file"]').attr('tabindex', '-1');

    	$( elements.form ).addClass('form--has-advanced-upload has-advanced-upload');
      $( elements.message.default ).addClass('active');

      $( elements.form ).on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
      })
      .on('dragover dragenter', function(e) {
        $( elements.form ).addClass('is-dragover');
        e.originalEvent.dataTransfer.dropEffect = 'copy';
      })
      .on('dragleave dragend drop', function(e) {
        $( elements.form ).removeClass('is-dragover');
      })
      .on('drop', function(e) {

        uploadedFiles = e.originalEvent.dataTransfer.files;
        uploadedFileSize = (uploadedFiles[0].size/(1e+6)).toFixed(2);

        // hide default message
        $(elements.message.default).removeClass('active');

        // show file summary
        $(elements.message.summary).html( uploadedFiles[0].name + ' (' + uploadedFileSize + 'mb)').show();

        if ( uploadedFiles.length > 1 ) {
          $(elements.message.errors.tooManyFiles).show();
        } else {
          $(elements.message.errors.tooManyFiles).hide();
        }

        if ( uploadedFileSize > 10 ) {
          $(elements.message.errors.fileSize).show();
        } else {
          $(elements.message.errors.fileSize).hide();
        }

      });

  	} else {

    	$('input[name="file"]').on('change', function(e){

      	uploadedFiles = e.currentTarget.files;
        uploadedFileSize = (uploadedFiles[0].size/(1e+6)).toFixed(2);

        if ( uploadedFileSize > 10 ) {
          $(this).val('');
          $(elements.message.errors.fileSize).show();
        } else {
          $(elements.message.errors.fileSize).hide();
        }

      });

  	}

  	//////////////////////////////////////////////////////////
  	////  Form On Submit
  	//////////////////////////////////////////////////////////

    $( elements.submit ).on('click', function(event){

      event.preventDefault();

      let thisForm = $(this).closest('form');
      formData = new FormData( thisForm[0] );
      let thisAction = thisForm.attr('action');
      let requiredFields = thisForm.find('.required');
      let submitThisForm = true;

      $( requiredFields ).each(function(){

        let thisField = $(this);
        let thisValue = thisField.val();
        let thisFieldName = thisField.attr('name');
        let thisFieldElementType = thisField.prop('nodeName');
        let isValid = false;

        console.log( [ thisFieldName, thisFieldElementType, thisValue, isValid ] );

        isValid = validateThis( thisField, thisValue, thisFieldElementType );

        if ( isValid ) {
          // hide error messages
          thisField.closest('.form__field').removeClass('error');
        } else {
          // show error messages
          thisField.closest('.form__field').addClass('error');
        }

        requiredResults[thisFieldName] = { valid: isValid, value: thisValue };

      });

      // check required results for at least one false value
      // if false value found, do not submit form
      $.each( requiredResults, function( key, field ) {
        if ( field.valid == false ) {
          submitThisForm = false;
          return false;
        }
      });

      // check to see if advanced upload has items
      // check to see if file is correct size
      // only add first item in FileList object if correct size
      // prevent form from submitting if file oversized
      if ( uploadedFiles.length && formData ) {
        $.each( uploadedFiles, function( key, file ) {
          if ( key == 0 ) {
            var fileSize = (file.size/(1e+6)).toFixed(2);
            if ( fileSize > 10 ) {
              $(elements.message.errors.fileSize).show();
              submitThisForm = false;
            } else {
              $(elements.message.errors.fileSize).hide();
              formData.set( "file", file, file.name );
            }
          } else {
            return false;
          }
        });
      }

      if ( submitThisForm ) {

        console.log( 'FORM IS SUPER VALID' );
        console.log( requiredResults );

        // hide form overview error message
        $(elements.message.errors.formOverview).hide();

        // fade in loading screen
        thisForm.find('.form__loading').css({ 'z-index': 1000 }).delay(250).fadeIn(350, function(){});

        // submit form via ajax
        $.ajax({

          url: thisAction,
          type: 'POST',
          data: formData,
          dataType: "json",
          processData: false,
          contentType: false,
          success: function ( data, textStatus, jqXHR ) {

            // reset form data
            // reset reqiored fields
            // reset advanced uploaded files
            thisForm[0].reset();
            requiredResults = {};
            uploadedFiles = false;

            // show default messsage, if advanced upload available
            if ( advancedUploadAvailable && !Browser.isMobileDevice() ) {
              $(elements.message.default).addClass('active');
            }
            // empty file summary and hide it
            $(elements.message.summary).empty().hide();

            setTimeout(function(){

              // fade out loading screen
              thisForm.find('.form__loading').fadeOut(750, function(){

                setTimeout(function(){

                  thisForm.find('.form__content').fadeOut(750, function(){

                    setTimeout(function(){

                      thisForm.find('.form__thank-you').fadeIn(1500, function(){});

                    }, 500); // end of fade in thank you

                  });

                }, 350); // end of fade out content

              }).delay(250).css({ 'z-index' : '-9999' }); // end of fade out loading screen

            }, 350);

          },
          error: function ( jqXHR, textStatus, errorThrown ) {

            console.log( [ jqXHR, textStatus, errorThrown ] );
            thisForm.find( '.form__message--results' ).html( "<strong>" + errorThrown + "</strong>" );

          }

        });

      } else {

        // show form overview error message
        $(elements.message.errors.formOverview).show();

      }

    });

    //////////////////////////////////////////////////////////
    ////  Validate This
    //////////////////////////////////////////////////////////

    function validateThis( $field, $value, $elementType ) {

      let result = false;

      console.log( $field );

      switch ( $elementType ) {
        case 'INPUT':

          let type = $field.attr('type');

          switch ( type ) {
            case 'email':
              if ( validator.isEmail( $value ) ) {
            	  result = true;
          	  }
              break;
            case 'radio':

              console.log( 'radio' );
              console.log( $field );

              break;
            case 'tel':
              if ( validator.isMobilePhone( $value ) ) {
            	  result = true;
          	  }
              break;
            case 'text':
              if ( ! validator.isEmpty( $value ) ) {
            	  result = true;
          	  }
              break;
          }

          break;
        case 'TEXTAREA':
          if ( ! validator.isEmpty( $value ) ) {
            result = true;
          }
          break;
      }

      return result;

    }

    if ( debug ) {
      console.log( '[forms() ] End' );
    }

	};


	//////////////////////////////////////////////////////////
	////  Initialize
	//////////////////////////////////////////////////////////

	const init = () => {
  	main();
	};

	//////////////////////////////////////////////////////////
	////  Returned Methods
	//////////////////////////////////////////////////////////

	return {
		info,
		init,
	};

});
