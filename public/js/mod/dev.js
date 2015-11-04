// Generated by CoffeeScript 1.9.3

/*
For '/mod/dev'

Handles general game dev viewing.

Dependencies:
	jQuery
 */

(function() {
  var FADE_TIME, dtSettings, refresh;

  FADE_TIME = 100;

  dtSettings = {
    order: [[0, 'asc']],
    aLengthMenu: [[25, 50, 75, -1], [25, 50, 75, "All"]],
    iDisplayLength: 25,
    autoWidth: true
  };

  $(document).ready(function() {
    return refresh();
  });

  refresh = function() {
    return $('.dataTable').DataTable(dtSettings);
  };

}).call(this);
