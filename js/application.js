$(document).ready(function() {
  var jqTeamContainer = $("section[role=team]");
  $("section[role='team'] ul.grid a").click(function (evt) {
    evt.preventDefault();
    jqTeamContainer.removeClass().addClass(this.href.replace(/^.*?#/, ''));
  });
});
