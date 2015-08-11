$(document).on('ready', function() {

	/**
	 * This function, will validate Student Name
	 */
	$('.sname').keyup(function() {
	    // wrapping Student Name into $this
	    var $this = $( this );
	    
	    // Username Validation
	    if( !$this.val() ) { // if there's no value inside of the Name Field
	        $this.controlMessage('Name is Required', 'error');
	        return false;
	    } else if( !$this.val().match(/^[A-Za-z ]*$/) ) { // if the value contains special characters or numbers
	    	$this.controlMessage('Only Letters', 'error');
	        return false;
	    } else if( $this.val() !== "" ) {
	        $this.controlMessage(); // if the user type again, hide message
	    }

	});

	/**
	 * This function, will validate Student ID
	 */
	$('.sid').keyup(function() {
		// wrapping Student ID into $this
		var $this = $( this );

		if(!$this.val()) { // if there's no value inside of the ID Field
	    	$this.controlMessage('ID is Required', 'error');
	        return false;
	    } else if( !$this.val().match(/^[0-9]*$/) ) { // if the value containes special characters or letters
	    	$this.controlMessage('Enter Only Numbers', 'error');
	    	return false;
	    } else if( $this.val() !== "" ) {
	    	$this.controlMessage(); // if the user type again, hide message
	    }
	});

	/**
	 * This function, will validate Student Email
	 */
	$('.semail').keyup(function() {
		// wrapping Student ID into $this
		var $this = $( this );
		var $parent = $this.parent('.form-group');

		// console.log($this);
		// console.log($parent);

		if(!$this.val()) { // if there's no value inside of the Email
	    	$this.controlMessage( 'Enter Email', 'error');
	        return false;
	    } else if( !$this.val().match(/^[A-Za-z0-9_.-]*[A-Za-z0-9][A-Za-z0-9_.-]*$/) ) { // if the value contains Spaces
	    	$this.controlMessage('No Spaces', 'error');
	    	return false;
	    } else if ( $this.val() !== "" ) { // if the user type again, hide message
	    	$this.controlMessage(); 
	    }
	});

	/**
	 * This function, will validate Student PhoneNumber
	 */
	$('.sphone').keyup(function() {
		// wrapping Student ID into $this
		var $this = $( this );

		if(!$this.val()) { // if there's no value inside of the Phone Number
	    	$this.controlMessage('Enter Phone Number', 'error');
	        return false;
	    } else if( !$this.val().match(/^[0-9]*$/) ) { // if the value contains Spaces
	    	$this.controlMessage('Only Numbers and no spaces', 'error');
	    	return false;
	    } else if ( $this.val() !== "" ) {
	    	$this.controlMessage(); // if the user type again, hide message
	    }
	});

	/**
	 * This function, will validate Student Comments
	 * The comment textarea is specific for 300 characters 
	 * 
	 */
	$('.comment').keyup(function () {
		var max = 300;
		// hold the value length
		var len = $(this).val().length;
		if (len >= max) {
			$('.comments-prompt').text(' you have reached the limit');
		} else {
			var char = max - len;
			$('.comments-prompt').text(char + ' characters left');
		}
	});

	$('#std-office:checkbox[name=office365]:checked').each(function() {
        var result = $(this).val();
		return result;
    });

    $('#tech-request:checkbox[name=technicalRequest]:checked').each(function() {
        var result = $(this).val();
		return result;
    });

    $('#lrc-request:checkbox[name=lrcRequest]:checked').each(function() {
        var result = $(this).val();
		return result;
    });



	$('#print').on('click', function() {
		window.print();
	});
	// $('.submitButton').click(function() {
	// 	window.open('details.html');
	// });

	/**
	 * Passing three arguments 
	 * $formControl: will receive the parent field of the $this which in this case is #sname
	 * message: is defined on the keyup function and receives the message there
	 * cls: is the class we are going to add to then show the message, we will add this class
	 * on the showMessage function as a parameter.
	 * Basically, we are telling the function to look over $formControl and find the class
	 * with the name '.error-message' and add a new class called 'error' and apply the message there.
	 */
	

});
