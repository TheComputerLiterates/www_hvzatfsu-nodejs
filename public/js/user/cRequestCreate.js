// Generated by CoffeeScript 1.9.3

/*
	For /user/cRequestCreate
	
	Handles form submission + mission option display
 */

(function() {
  var $gSelect, $mSelect, DEBUG_MODE, FORM_ERROR_CLASS, FORM_ID, FORM_RESULT_CLASS, POST_URL, RESULT_MESSAGES, displayEnd, endInError, endInSuccess, validateForm;

  FORM_ID = '#cRequestCreateForm';

  FORM_RESULT_CLASS = '.formResult';

  FORM_ERROR_CLASS = '.formError';

  POST_URL = '/user/cRequestCreate';

  DEBUG_MODE = false;

  RESULT_MESSAGES = {
    successTitle: 'Clarification request created!',
    successSubtitle: '<a href="/user/cRequestView">Return</a>',
    errorTitle: '<b>An unexpected error has occured:</b> ',
    errorSubtitle: 'Refresh this page and try resubmitting.'
  };

  $(FORM_ID).submit(function(e) {
    var formData, formValid;
    e.preventDefault();
    formData = {
      subject: $("input[name='subject']").val().trim(),
      description: $("textarea[name='description']").val().trim(),
      personal: $('input[type="radio"][name="personal"]:checked').val() === 'true',
      gameId: $('select[name="gameId"]').val(),
      missionId: $('select[name="missionId"]').val()
    };
    formData.gameId = isNaN(formData.gameId) ? void 0 : parseInt(formData.gameId);
    formData.missionId = isNaN(formData.missionId) ? void 0 : parseInt(formData.missionId);
    formValid = validateForm(formData);
    if (formValid !== true) {
      $('label[for=' + formValid["for"] + ']').addClass('hasInputError');
      $(FORM_ERROR_CLASS).text(formValid.msg);
      $('[name=' + formValid["for"] + ']').change(function() {
        $('label[for=' + $(this).attr('name') + ']').removeClass('hasInputError');
        return $(FORM_ERROR_CLASS).text("");
      });
      $('#submit').shakeIt();
    } else {
      $('#submit').text('Submitting...');
      console.log('DATA= ' + JSON.stringify(formData, void 0, 2));
      $.ajax({
        type: 'POST',
        url: POST_URL,
        data: JSON.stringify(formData),
        contentType: 'application/json',
        success: function(res) {
          if (res.success) {
            return endInSuccess();
          } else {
            endInError(res.body.error);
          }
        },
        error: function() {
          endInError();
        }
      });
    }
  });

  validateForm = function(fd) {
    if (!fd.subject) {
      return {
        "for": 'subject',
        msg: 'Missing subject!'
      };
    } else if (!fd.description) {
      return {
        "for": 'description',
        msg: 'Missing description!'
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
      return displayEnd(RESULT_MESSAGES.errorTitle + msg, RESULT_MESSAGES.errorSubtitle);
    });
  };

  endInSuccess = function() {
    var sub;
    sub = $('#submit');
    sub.fadeOut(500, function() {
      sub.text('Success!');
      sub.attr('disabled', 'true');
      sub.fadeIn(500, function() {});
      return displayEnd(RESULT_MESSAGES.successTitle, RESULT_MESSAGES.successSubtitle);
    });
  };

  displayEnd = function(header, subtext) {
    var $newMsg;
    if (!DEBUG_MODE) {
      $(FORM_ID + ' input').attr('disabled', 'disabled');
      $(FORM_ID + ' checkbox').attr('disabled', 'disabled');
      $(FORM_ID + ' select').attr('disabled', 'disabled');
      $(FORM_ID).fadeTo(1000, 0, function() {
        var $newMsg;
        $newMsg = $("<div id='endDisplay'><h3>" + header + "</h3><h4>" + subtext + "</h4>");
        $newMsg.appendTo($(FORM_RESULT_CLASS)).fadeIn(1000, function() {
          return $("html, body").animate({
            scrollTop: 0
          }, 500);
        });
      });
    } else {
      $newMsg = $("<div id='endDisplay'><h3>" + header + "</h3><h4>" + subtext + "</h4>");
      $newMsg.appendTo($(FORM_RESULT_CLASS)).fadeIn(1000, function() {
        return $("html, body").animate({
          scrollTop: 0
        }, 500);
      });
      $('#submit').removeAttr('disabled').text('Retry');
    }
  };

   //CREDIT: http://stackoverflow.com/questions/4398966/how-can-i-hide-select-options-with-javascript-cross-browser
(function($){

    $.fn.extend({detachOptions: function(o) {
        var s = this;
        return s.each(function(){
            var d = s.data('selectOptions') || [];
            s.find(o).each(function() {
                d.push($(this).detach());
            });
            s.data('selectOptions', d);
        });
    }, attachOptions: function(o) {
        var s = this;
        return s.each(function(){
            var d = s.data('selectOptions') || [];
            for (var i in d) {
                if (d[i].is(o)) {
                    s.append(d[i]);
                    //console.log(d[i]);
                    // TODO: remove option from data array
                }
            }
        });
    }});   

})(jQuery);
;

  $gSelect = $('select[name="gameId"]');

  $mSelect = $('select[name="missionId"]');

  $mSelect.detachOptions('[for="missionId"]');

  $mSelect.attachOptions('[for="missionId"][value="None"]');

  $mSelect.val('None');

  $gSelect.on('change', function() {
    var gameId;
    gameId = this.value;
    $mSelect.detachOptions('[for="missionId"]');
    $mSelect.attachOptions('[for="missionId"][value="None"]');
    if (isNaN(gameId)) {
      $mSelect.attr('disabled', 'disabled');
    } else {
      $mSelect.removeAttr('disabled');
      $mSelect.attachOptions('[for="missionId"][data-gameId="' + gameId + '"]');
    }
    return $mSelect.val('None');
  });

}).call(this);
