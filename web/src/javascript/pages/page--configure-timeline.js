$(function () {
	if(document.body.scrollTop === 0) {
		var el = $('.participant-timeline-configurator')[0];
		el.style.top = el.offsetHeight;
	}
	$(window).scroll(function(){
		var st = document.body.scrollTop;
		var $el = $('.participant-timeline-configurator'), el = $el[0];
		if(st > 150) {
			$el.addClass('scrolled');
			delete el.style.top;
			delete el.style.marginTop;
		} else {
			$el.removeClass('scrolled');
			if(st > 0) {
				el.style.marginTop = "-" + st + "px";
			} else {
				el.style.top = el.offsetHeight;
				delete el.style.marginTop;
			}
		}
	});
});