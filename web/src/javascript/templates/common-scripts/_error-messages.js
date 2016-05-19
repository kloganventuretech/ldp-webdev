/**
 * Created by vtdev on 4/7/16.
 */
var CN_HAS_ERROR = "has-error";

function errorMessageCleanup(){
	$("." + CN_HAS_ERROR).each(function (idx, el) {
		var $el = $(el);
		$el.removeClass(CN_HAS_ERROR);
		$el.find('.error-message').remove();
	});
}

function setupErrorMessages(ctx){
	var $ctx = $(ctx || document), first;
	var $mc = $ctx.hasClass('message-container') ? $ctx : $ctx.find('.message-container');
	if($mc.length === 0)
		return;
	$mc.find('.error [data-source]').each(function (idx, el) {
		var $el = $(el), id = $el.data('source');
		var $prop = $('#' + id);
		if($prop.length === 0)
			return;
		if($prop.prop('tagName').toLowerCase() != 'div') {
			$prop.wrap("<span></span>");
			$prop.parent().addClass(CN_HAS_ERROR);
			$prop.parent().append('<span class="error-message"><span class="error-text">' + $el.text() + '</span></span>');
			if(!first) {
				first = $prop;
			}
		} else {
			$prop.addClass(CN_HAS_ERROR);
			$prop.append('<div class="error-message"><span class="error-text">' + $el.text() + '</span></div>');
			if(!first) {
				first = $prop;
			}
		}
		$el.parent().remove();
	});
	if(!!first && first.length > 0) {
		$mc.append('<div class="message error"><span class="brief">Please review the errors below</span></div>');
		//noinspection JSUnresolvedFunction - defined in MIWT util.js
		first.get(0).scrollIntoView();
	}

	// if($mc.children().length === 0)
	// 	$mc.addClass('empty');
}