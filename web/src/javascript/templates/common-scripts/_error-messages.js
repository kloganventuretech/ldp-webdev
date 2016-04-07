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
		if(!first) first = el;
		var $el = $(el), id = $el.data('source');
		var $prop = $('#' + id);
		if($prop.length === 0)
			return;
		$prop.addClass(CN_HAS_ERROR);
		$prop.append('<div class="error-message"><span class="error-text">' + $el.text() + '</span></div>');
		$el.parent().remove();
	});
	if(!!first) {
		$mc.append('<div class="message error"><span class="brief">Please review the errors below</span></div>');
		//noinspection JSUnresolvedFunction - defined in MIWT util.js
		first.scrollIntoViewIfNeeded(true);
	}

	// if($mc.children().length === 0)
	// 	$mc.addClass('empty');
}