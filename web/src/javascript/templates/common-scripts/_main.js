/**
 * Created by vtdev on 4/7/16.
 */
// Note: openSidebar function is declared in the HTML of the page (header)
jQuery(function () {

	setupErrorMessages();



	initSelect2();

	handleDataDownload();

	enableTooltips();

	scrollToTaskIfSpecified();

	setupExpandCollapse();

	deserialzeBS();

	setupCharts();

	navHighlight();

	setupCustomDropdowns();

	setupFlipCards();

	$('form.miwt-form').each(function (idx, form) {
		//noinspection JSUnusedGlobalSymbols
		form.submit_options = {
			preProcessNode: function (data) {
				destroySelect2(document.getElementById(data.refid));
				return data.content;
			},
			postProcessNode: function (data) {
				$.each(data, function (idx, ctx) {
					initSelect2(ctx);
					handleDataDownload(ctx);
					enableTooltips(ctx);
					setupExpandCollapse(ctx);
					deserialzeBS();
					setupCharts(ctx);
					navHighlight();
					setupCustomDropdowns(ctx);
					setupFlipCards(ctx);
					if($(ctx).hasClass('message-container') || $(ctx).find('.message-container').length > 0)
						errorMessageCleanup();
					setTimeout(function () {
						setupErrorMessages(ctx);
					}, 1);
				});
			},
			postUpdate: function () {
				$(this).trigger('vs:miwt-post-update');
			}
		};
	});

	(function (w) {
		var $body = $("#body-wrapper");
		if ($body.length === 0) return;
		// Track left-menu last click
		$("[data-lastprop]").each(function(idx, el){
			var $el = $(el);
			var data = {
				"prop" : $el.data("lastprop"),
				"url" : $el.data("lasturl")
			};
			$el.click(data, function(evt){
				var $target = $(evt.target || evt.toElement), $li = $target.closest('li.mi'),
					options={"type":"POST"}, prop = evt.data.prop, cn = $li[0].className;
				options.url = evt.data.url;
				options.data = {};
				options.data[prop]=cn;
				$.ajax(options);
			});
		});
	})(window);

	$('button.add-tracking-metric').click(function(){
		$(this).tooltip('hide');
	});

});