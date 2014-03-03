$(document).ready( function() {
  
  // Loads stored preferences and login details
  chrome.storage.local.get(['stored_username', 'stored_password', 'stored_autofill', 'stored_autosubmit'], function (result) {
      $("#username").val(result.stored_username);
      $("#password").val(result.stored_password);
      $("#auto_submit_checkbox").prop('checked', result.stored_autosubmit);
      $("#auto_fill_checkbox").prop('checked', result.stored_autofill);

      var is_checked = $('#auto_fill_checkbox').prop('checked');
      setCheckStates(is_checked);

      saved();
  });

  var details_changed = function (event) {
    $("#save").text(":O   Save")
    $("#save").css('font-weight', 'bold');
    // Detect 'return' key press and save
    if(event.keyCode == 13) {
      $("#save").click();
    }
  }

  $('#username').keyup(details_changed);
  $('#password').keyup(details_changed);

  // Save state when checkbox.checked changes
  $('#auto_fill_checkbox').change(function() {
      var is_checked = $('#auto_fill_checkbox').prop('checked');
      chrome.storage.local.set({ 'stored_autofill': is_checked }, function() { });
      setCheckStates(is_checked); // recalculate enabled/disabled state of checkbox
  });

  $('#auto_submit_checkbox').change(function() {
      var is_checked = $('#auto_submit_checkbox').prop('checked');
      chrome.storage.local.set({ 'stored_autosubmit': is_checked }, function() { });
  });

  // Save button click.
  // We save the given username and password locally
  // Password is stored OFFLINE but is unencrypted.
  $("#save").click(function() {
    var user_string = $("#username").val();
    var pass_string = $("#password").val();

    if (!user_string || !pass_string) { return; }

    chrome.storage.local.set({'stored_username': user_string, 'stored_password': pass_string}, function() {
      saved();
    });
  });
});

function saved() {
  $("#save").text(":)   Saved")
  $("#save").css('font-weight', 'normal');  
}

function setCheckStates(is_checked) {
  if (is_checked) {
    $('#auto_submit_checkbox').prop('disabled', false);
  }
  else {
    $('#auto_submit_checkbox').prop('disabled', true);
  }
}