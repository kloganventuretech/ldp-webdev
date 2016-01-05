/*---LEFT BAR ACCORDION----*/
$(function () {
	try {
		$('#nav-accordion').find('ul.menu').dcAccordion({
			eventType: 'click',
			autoClose: true,
			saveState: true,
			disableLink: true,
			speed: 'slow',
			showCount: false,
			autoExpand: true
		});
	}catch(e){}
});

// right slidebar
/*$(function () {
	$.slidebars();
});*/

jQuery(function () {

//    sidebar dropdown menu auto scrolling

	jQuery('#nav-accordion').find('.mi-parent > div .mil').click(function () {
		var o = ($(this).offset());
		diff = 250 - o.top;
		if (diff > 0)
			$("#nav-accordion").scrollTo("-=" + Math.abs(diff), 500);
		else
			$("#nav-accordion").scrollTo("+=" + Math.abs(diff), 500);
	});

//    sidebar toggle

	function responsiveView() {
		var wSize = $(window).width();
		if (wSize <= 768) {
			$('#body-wrapper').addClass('sidebar-closed');
		}
		else {
			$('#body-wrapper').addClass('sidebar-open');
		}
	}

	$(window).on('load', responsiveView);
	$('.fa-bars').click(function () {
		var $body = $("#body-wrapper");
		if ($body.hasClass("sidebar-open")) {
			$body.addClass("sidebar-closed");
			$body.removeClass("sidebar-open");
		} else {
			$body.removeClass("sidebar-closed");
			$body.addClass("sidebar-open");
		}
	});

// custom scrollbar
/*
	$("#nav-accordion").niceScroll({
		styler: "fb",
		cursorcolor: "#e8403f",
		cursorwidth: '3',
		cursorborderradius: '10px',
		background: '#404040',
		spacebarenabled: false,
		cursorborder: ''
	});

	$("html").niceScroll({
		styler: "fb",
		cursorcolor: "#e8403f",
		cursorwidth: '6',
		cursorborderradius: '10px',
		background: '#404040',
		spacebarenabled: false,
		cursorborder: '',
		zindex: '1000'
	});
*/

// widget tools

	jQuery('.panel .tools .fa-chevron-down').click(function () {
		var el = jQuery(this).parents(".panel").children(".panel-body");
		if (jQuery(this).hasClass("fa-chevron-down")) {
			jQuery(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
			el.slideUp(200);
		} else {
			jQuery(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
			el.slideDown(200);
		}
	});

	jQuery('.panel .tools .fa-times').click(function () {
		jQuery(this).parents(".panel").parent().remove();
	});


//    tool tips

	$('.tooltips').tooltip();

//    popovers

	$('.popovers').popover();

	/*const*/
	var SELECT2_INIT = "select2-init";

// select2
	function initSelect2(ctx) {
		var $select = $(ctx || document).find('select');
		if ($select.length && !($select.closest('.cke_dialog').length || $select.closest('tr[data-dnd-source-def]').length)) {

			//noinspection JSUnresolvedVariable
			$select
				.select2({minimumResultsForSearch: 10})
				.addClass(SELECT2_INIT)
				.filter('[data-features~="watch"]')
				.on('change', miwt.observerFormSubmit);
		}
	}
	function destroySelect2(ctx){
		var $select = $(ctx || document);
		if (!$select.hasClass(SELECT2_INIT)) {
			$select = $select.find('select').filter('.' + SELECT2_INIT);
		}

		if ($select.length) {
			$select.removeClass(SELECT2_INIT).select2('destroy');
		}
	}

	initSelect2();

	function handleDataDownload(ctx){
		var $ctx = $(ctx || document);
		$ctx.find("[data-download]").each(function (idx, el) {
			el.setAttribute("download", "");
		});
	}

	handleDataDownload();


	$('form.miwt-form').each(function (idx, form) {
		form.submit_options = {
			preProcessNode: function (data) {
				destroySelect2(document.getElementById(data.refid));
				return data.content;
			},
			postProcessNode: function (data) {
				$.each(data, function(idx, d) {
					initSelect2(d.node);
					handleDataDownload(d.node);
				});
			},
			postUpdate: function () {
				$(this).trigger('vs:miwt-post-update');
			}
		};
	});


});