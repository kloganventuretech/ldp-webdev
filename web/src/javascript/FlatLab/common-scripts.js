/*---LEFT BAR ACCORDION----*/
$(function() {
	$('#nav-accordion ul.menu').dcAccordion({
		eventType: 'click',
		autoClose: true,
		saveState: true,
		disableLink: true,
		speed: 'slow',
		showCount: false,
		autoExpand: true
	});
});

// right slidebar
$(function(){
 $.slidebars();
});

jQuery(function () {

//    sidebar dropdown menu auto scrolling

	jQuery('#nav-accordion .mi-parent > div .mil').click(function () {
		var o = ($(this).offset());
		diff = 250 - o.top;
		if(diff>0)
			$("#nav-accordion").scrollTo("-="+Math.abs(diff),500);
		else
			$("#nav-accordion").scrollTo("+="+Math.abs(diff),500);
	});

//    sidebar toggle

	function responsiveView() {
		var wSize = $(window).width();
		if (wSize <= 768) {
			$('#body-wrapper').addClass('sidebar-closed');
		}
		else{
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
	$("#nav-accordion").niceScroll({styler:"fb",cursorcolor:"#e8403f", cursorwidth: '3', cursorborderradius: '10px', background: '#404040', spacebarenabled:false, cursorborder: ''});

	$("html").niceScroll({styler:"fb",cursorcolor:"#e8403f", cursorwidth: '6', cursorborderradius: '10px', background: '#404040', spacebarenabled:false,  cursorborder: '', zindex: '1000'});

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



// custom bar chart

	if ($(".custom-bar-chart")) {
		$(".bar").each(function () {
			var i = $(this).find(".value").html();
			$(this).find(".value").html("");
			$(this).find(".value").animate({
				height: i
			}, 2000)
		})
	}


	$('form.miwt-form').each(function(idx, el) {
		var form = el;
		form._ldp_cleanup = [];
		form.submit_options = {
			preProcessNode: function(data){
				if(data.refid.indexOf('container') >=0){
					var parent = $('#' + data.refid).parent();
					this._ldp_cleanup.push(parent);
					parent.addClass("miwt-pre-update")
				}
				return data.content;
			},
			postProcessNode: function(data){
				if(data.node.id.indexOf('container') >=0){
					var parent = $(data.node).parent();
					this._ldp_cleanup.push(parent);
					parent.addClass("miwt-post-update")
				}
			},
			postUpdate: function(data){

				var me = this;
				setTimeout(function(){
					me._ldp_cleanup.forEach(function (el) {
						el.removeClass('miwt-pre-update').removeClass('miwt-post-update');
					});
				}, 250)

			}
		};
	});


});