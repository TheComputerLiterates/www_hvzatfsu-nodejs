// Generated by CoffeeScript 1.9.3

/*
	For /signup form page

	Dependencies:
		JQeury
		CryptoJS
 */

(function() {
  var FORM_ERROR_CLASS, FORM_ID, FORM_RESULT_CLASS, displayEnd, endInError, endInSuccess, validateForm;

  FORM_ID = '#loginForm';

  FORM_RESULT_CLASS = '.formResult';

  FORM_ERROR_CLASS = '.formError';

  $(FORM_ID).submit(function(e) {
    var formData, formValid;
    e.preventDefault();
    formData = {
      email: $("input[name='email']").val().trim(),
      password: $("input[name='password']").val().trim()
    };
    formValid = validateForm(formData);
    if (formValid !== true) {
      $('label[for=' + formValid["for"] + ']').addClass('hasInputError');
      $(FORM_ERROR_CLASS).text(formValid.msg);
      if (formValid["for"] === 'year') {
        $('select[name=' + formValid["for"] + ']').change(function() {
          $('label[for=' + $(this).attr('name') + ']').removeClass('hasInputError');
          return $(FORM_ERROR_CLASS).text("");
        });
      } else {
        $('input[name=' + formValid["for"] + ']').change(function() {
          $('label[for=' + $(this).attr('name') + ']').removeClass('hasInputError');
          return $(FORM_ERROR_CLASS).text("");
        });
      }
      $('#submit').shakeIt();
    } else {
      $('#submit').text('Submitting...');
      $.ajax({
        type: 'POST',
        url: '/login',
        data: JSON.stringify(formData),
        contentType: 'application/json',
        success: function(res) {
          if (res.success) {
            return endInSuccess();
          } else {
            endInError(res.msg);
          }
        },
        error: function() {
          endInError('Check your internet connection and try again.');
        }
      });
    }
  });

  validateForm = function(fd) {
    if (!fd.email) {
      return {
        "for": 'email',
        msg: 'Missing email!'
      };
    } else if (!fd.password) {
      return {
        "for": 'password',
        msg: 'Missing password!'
      };
    }
    return true;
  };

  endInError = function(msg) {
    var sub;
    sub = $('#submit');
    sub.fadeOut(500, function() {
      sub.text('Error!');
      sub.attr('disabled', 'true');
      sub.fadeIn(500, function() {});
      return displayEnd('<b>Error!</b>', msg, false);
    });
  };

  endInSuccess = function() {
    var sub;
    sub = $('#submit');
    sub.fadeOut(500, function() {
      sub.text('Success!');
      sub.attr('disabled', 'true');
      sub.fadeIn(500, function() {});
      return displayEnd('Login successful!', 'Redirecting...', true);
    });
  };

  displayEnd = function(header, subtext, hide) {
    var $newMsg;
    $(FORM_RESULT_CLASS).empty();
    $newMsg = $("<div id='endDisplay'><h3>" + header + "</h3><h4>" + subtext + "</h4>");
    $newMsg.appendTo($(FORM_RESULT_CLASS)).fadeIn(1000, function() {
      return $("html, body").animate({
        scrollTop: 0
      }, 500);
    });
    if (hide) {
      $(FORM_ID + ' input').attr('disabled', 'disabled');
      $(FORM_ID + ' checkbox').attr('disabled', 'disabled');
      $(FORM_ID + ' select').attr('disabled', 'disabled');
      $(FORM_ID + ' button').attr('disabled', 'disabled');
      $(FORM_ID).fadeTo(1000, 0, function() {
        return window.location.replace('/user/');
      });
    } else {
      $('#submit').removeAttr('disabled').text('Submit');
    }
  };

}).call(this);
