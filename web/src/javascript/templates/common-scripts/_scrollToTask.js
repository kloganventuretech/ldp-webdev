/**
 * Created by vtdev on 4/26/16.
 */
function getUrlParameter(param) {
	var sPageURL = decodeURIComponent(window.location.search.substring(1)),
		sURLVariables = sPageURL.split('&'),
		sParamName,
		i;
	for(i = 0; i < sURLVariables.length; i++) {
		sParamName = sURLVariables[i].split('=');
		if(sParamName[0] == param) {
			return sParamName[1] === undefined ? true : sParamName[1];
		}
	}
}

function scrollToTaskIfSpecified() {
	var $ctx = $(document);
	var scrollTo = getUrlParameter('scroll-to-task');
	if(scrollTo) {
		var $target = $ctx.find('[data-task-id="' + scrollTo + '"]').closest('article');
		addTLExpanded($target.find('[data-advanced-collapse-id]').attr('data-advanced-collapse-id'));
		var scrollToElement = $target.get(0);
		setTimeout(function(){
			scrollToElement.scrollIntoViewIfNeeded(true);
		}, 50);
	}
}