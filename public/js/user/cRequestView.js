// Generated by CoffeeScript 1.9.3

/*
	For /user/cRequestView
	
	Users:
		- comment
		- delete (if creator)
	Mods:
		- comment
		- set status
		- delete any
 */

(function() {
  var LOADING_GIF, loadComments;

  LOADING_GIF = '<div class="icon-loading"></div>';

  loadComments = function($commentCont, crId) {
    console.log('Loading comments for crId ' + crId);
    $commentCont.empty();
    $commentCont.append(LOADING_GIF);
    return $.ajax({
      type: 'POST',
      url: '/user/cRequestView_commentGet',
      data: JSON.stringify({
        crId: crId
      }),
      contentType: 'application/json',
      success: function(res) {
        var com, html, i, len, ref;
        $commentCont.empty();
        if (res.success) {
          if (res.body.comments.length > 0) {
            console.log(JSON.stringify(res.body.comments, void 0, 2));
            html = '';
            ref = res.body.comments;
            for (i = 0, len = ref.length; i < len; i++) {
              com = ref[i];
              html += '<div class="cr-comment">' + '<span class="cr-comment-user">' + com.userName + '</span> - ' + '<span class="cr-comment-date">' + com.createdAt + '</span>' + '<br><span class="cr-comment-text">' + com.text + '</span>' + '</div>';
            }
            $commentCont.html(html);
            return $commentCont.parent().children('.cr-submitComment').children('.formResult').empty();
          } else {
            return $commentCont.append('<p class="text-center">No comments</p>');
          }
        } else {
          console.log(res.body);
          $commentCont.append('<p class="text-center">Error retrieving comments: ' + res.body.error + '</p>');
        }
      },
      error: function() {
        $commentCont.empty();
        $commentCont.append('<p class="text-center">Error retrieving comments</p>');
      }
    });
  };

  $('.cr-header').click(function() {
    var $content, $icon, crId;
    $icon = $(this).find('.glyphicon');
    if ($icon.hasClass('glyphicon-menu-right')) {
      $icon.removeClass('glyphicon-menu-right');
      $icon.addClass('glyphicon-menu-down');
    } else if ($icon.hasClass('glyphicon-menu-down')) {
      $icon.removeClass('glyphicon-menu-down');
      $icon.addClass('glyphicon-menu-right');
    }
    $content = $(this).parent().children('.cr-content');
    $content.toggle();
    if ($content.is(':visible')) {
      crId = parseInt($content.attr('data-crId'));
      return loadComments($content.find('.cr-comment-container'), crId);
    }
  });

  $('.cr-submitComment').submit(function(e) {
    var $comment, $commentCont, $content, $formResult, $submit, crId, formData;
    e.preventDefault();
    $comment = $(this).find('textarea[name="newComment"]');
    $content = $(this).closest('.cr-content');
    $formResult = $(this).children('.formResult');
    $submit = $(this).find('button[type="submit"]');
    $commentCont = $(this).parent().children('.cr-comment-container');
    crId = parseInt($content.attr('data-crId'));
    $formResult.empty();
    formData = {
      comment: $comment.val().trim(),
      crId: crId
    };
    $comment.prop('disabled', true);
    if (formData.comment == null) {
      $submit.shakeIt();
      $comment.prop('disabled', false);
    } else {
      $submit.text('Sending...');
      console.log('DATA= ' + JSON.stringify(formData, void 0, 2));
      $.ajax({
        type: 'POST',
        url: '/user/cRequestView_commentCreate',
        data: JSON.stringify(formData),
        contentType: 'application/json',
        success: function(res) {
          if (res.success) {
            $formResult.html('<p>Comment added!</p>');
            $submit.text('Send');
            $comment.val('');
            loadComments($commentCont, crId);
            return $comment.prop('disabled', false);
          } else {
            $formResult.html('<p>Error sending comment: ' + res.body.error + '</p>');
            $submit.text('Send');
            $comment.prop('disabled', false);
          }
        },
        error: function() {
          $formResult.html('<p>Error sending comment!</p>');
          $submit.text('Send');
          $comment.prop('disabled', false);
        }
      });
    }
  });

}).call(this);
