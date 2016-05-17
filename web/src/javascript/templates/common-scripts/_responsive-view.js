/**
 * Created by vtdev on 4/7/16.
 */
function responsiveView() {
	var wSize = $(window).width();
	// https://ldp-qa-admin.venturetech.net/config/cms/page?ws.evt=pe.cb.836
	//noinspection JSUnresolvedVariable - SIDE_BAR_OPEN defined in HTML document
	if (sessionStorage[SIDE_BAR_OPEN] === undefined)
		openSidebar(!(wSize <= 768));
}

jQuery(function(){
	var w = window, $w = $(w);
	$w.on('load', responsiveView);
	$('.fa-bars').click(function () {
		var $body = $("#body-wrapper"),
			open = !$body.hasClass("sidebar-open");
		openSidebar(open);
	});

	var $body = $("#body-wrapper");
	if ($body.length === 0) return;
	w.addEventListener("orientationchange", function () {
		if (w.orientation === 0)
			openSidebar(false);
	}, false);
	// https://ldp-qa-admin.venturetech.net/config/cms/page?ws.evt=pe.cb.836
	//noinspection JSUnresolvedVariable - SIDE_BAR_OPEN defined in HTML document
	if (w.orientation && w.orientation === 0 && sessionStorage[SIDE_BAR_CLOSED] === undefined) {
		openSidebar(false);
	}
	//noinspection JSUnresolvedVariable
	if ($w.width() < 600 && sessionStorage[SIDE_BAR_CLOSED] === undefined) {
		openSidebar(false);
	}
});