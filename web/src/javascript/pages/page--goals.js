/**
	 * Created by vtdev on 5/18/16.
 */
jQuery(function () {

	//$('.printpage').prependTo('.alignment');

	if ($('.goal-viewer-wrapper').length > 0) {
		$('.printpage').prependTo('.tab-container');
	} else {
		$('.printpage').hide();
	}

});