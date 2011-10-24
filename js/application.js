$(document).ready(function() {
  var jqTeamContainer = $("section[role=team]");
  jqTeamContainer.find("ul.grid a").click(function (evt) {
    evt.preventDefault();
    var personClass = this.href.replace(/^.*?#/, '');
    if (jqTeamContainer.hasClass(personClass)) {
      jqTeamContainer.removeClass();
    }
    else {
      jqTeamContainer.removeClass().addClass(personClass);
    }
  });
});
