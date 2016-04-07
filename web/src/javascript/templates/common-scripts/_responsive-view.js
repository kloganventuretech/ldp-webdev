/**
 * Created by vtdev on 4/7/16.
 */
function responsiveView() {
	var wSize = $(window).width();
	//noinspection JSUnresolvedVariable - defined in HTML document
	if (sessionStorage[SIDE_BAR_OPEN] === undefined)
		openSidebar(!(wSize <= 768));
}