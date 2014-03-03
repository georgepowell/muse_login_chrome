chrome.storage.local.get(['stored_username', 'stored_password', 'stored_autofill', 'stored_autosubmit'], function (result) {
	if (result.stored_autofill) {
		// Fill in values on page from saved login details
		$("#username").val(result.stored_username);
		$("#password").val(result.stored_password);

        // If the login has failed, a 'message' pops up in the DOM letting the user know the login failed, 
        // we check for this with $("#msg").length === 0 and don't autosubmit if the message exists.
        // This avoids trying the login again and again with incorrect data.
		if (result.stored_autosubmit && $("#msg").length === 0) {
			// Click the login button!
			$(".btn-submit").click();
		}
	}
});