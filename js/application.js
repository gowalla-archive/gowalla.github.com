$(document).ready(function() {
	$("a[href=#team-ak]").click(showAK);
	$("a[href=#team-jc]").click(showJC);
	$("a[href=#team-apd]").click(showAD);
	$("a[href=#team-am]").click(showAM);
	$("a[href=#team-mt]").click(showMT);
	$("a[href=#team-rs]").click(showRS);
	$("a[href=#team-kl]").click(showKL);
	$("a[href=#team-sco]").click(showSco);
	$("a[href=#team-soop]").click(showSoop);
	$("a[href=#team-bf]").click(showBF);
	$("a[href=#team-pm]").click(showPM);
	$("a[href=#team-tp]").click(showTP);
	$("a[href=#team-dy]").click(showDY);
});

function showAK() {
	$("section[role=team]").removeClass();
	$("section[role=team]").addClass("team-ak");
	return false;
}

function showJC() {
	$("section[role=team]").removeClass();
	$("section[role=team]").addClass("team-jc");
	return false;
}

function showAD() {
	$("section[role=team]").removeClass();
	$("section[role=team]").addClass("team-apd");
	return false;
}

function showAM() {
	$("section[role=team]").removeClass();
	$("section[role=team]").addClass("team-am");
	return false;
}

function showMT() {
	$("section[role=team]").removeClass();
	$("section[role=team]").addClass("team-mt");
	return false;
}

function showRS() {
	$("section[role=team]").removeClass();
	$("section[role=team]").addClass("team-rs");
	return false;
}

function showKL() {
	$("section[role=team]").removeClass();
	$("section[role=team]").addClass("team-kl");
	return false;
}

function showSco() {
	$("section[role=team]").removeClass();
	$("section[role=team]").addClass("team-sco");
	return false;
}

function showSoop() {
	$("section[role=team]").removeClass();
	$("section[role=team]").addClass("team-soop");
	return false;
}

function showBF() {
	$("section[role=team]").removeClass();
	$("section[role=team]").addClass("team-bf");
	return false;
}

function showPM() {
	$("section[role=team]").removeClass();
	$("section[role=team]").addClass("team-pm");
	return false;
}

function showTP() {
	$("section[role=team]").removeClass();
	$("section[role=team]").addClass("team-tp");
	return false;
}

function showDY() {
	$("section[role=team]").removeClass();
	$("section[role=team]").addClass("team-dy");
	return false;
}