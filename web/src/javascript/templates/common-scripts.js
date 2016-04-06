
// Note: openSidebar function is declared in the HTML of the page (header)


jQuery(function () {

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

	setupErrorMessages();

//    sidebar toggle

	function responsiveView() {
		var wSize = $(window).width();
		//noinspection JSUnresolvedVariable - defined in HTML document
		if (sessionStorage[SIDE_BAR_OPEN] === undefined)
			openSidebar(!(wSize <= 768));
	}

	$(window).on('load', responsiveView);
	$('.fa-bars').click(function () {
		var $body = $("#body-wrapper"),
			open = !$body.hasClass("sidebar-open");
		openSidebar(open);
	});


	/*const*/
	var SELECT2_INIT = "select2-init";

// select2
	function initSelect2(ctx) {
		var $select = $(ctx || document).find('select');
		if($select.length === 0 && !!ctx && ctx.nodeName.toLowerCase() == 'select') $select = $(ctx);
		if ($select.length && !($select.closest('.cke_dialog').length || $select.closest('tr[data-dnd-source-def]').length)) {

			//noinspection JSUnresolvedVariable
			var $result = $select
				.select2({
					minimumResultsForSearch: 10,
					dropdownAutoWidth: true,
					width: 'resolve'
				})
				.addClass(SELECT2_INIT)
				.filter('[data-features~="watch"]');
			if (window.miwt) {
				//noinspection JSUnresolvedVariable
				$result.on('change', miwt.observerFormSubmit);
			}
		}
	}

	function destroySelect2(ctx) {
		if(!ctx) return;
		var $select = $(ctx);
		if (!$select.hasClass(SELECT2_INIT)) {
			$select = $select.find('select').filter('.' + SELECT2_INIT);
		}

		if ($select.length) {
			$select.removeClass(SELECT2_INIT).select2('destroy');
		}
	}

	initSelect2();

	function handleDataDownload(ctx) {
		var $ctx = $(ctx || document);
		$ctx.find("[data-download]").each(function (idx, el) {
			el.setAttribute("download", "");
		});
		if(!!ctx && ctx.hasAttribute("[data-download]")) ctx.setAttribute("download", "");
	}

	handleDataDownload();

	function switchSupport(ctx) {
		var $ctx = $(ctx || document);
		$ctx.find("input[type=checkbox]").each(function (idx, el) {
			if (!el.id)
				return;
			var otherInput = el.form['_t' + el.id];
			if (!otherInput || otherInput.hasAttribute('data-switchon'))
				return;
			otherInput.setAttribute("data-switchon", el.checked);
			el.addEventListener('change', function () {
				otherInput.setAttribute("data-switchon", this.checked);
			});
		});
	}


	function enableTooltips(ctx) {
		var $ctx = !!ctx ? $(ctx.parentNode || document) : $(ctx || document);
		
		$ctx.find(".tooltips").each(function (idx, el) {
			var $el = $(el);
			if ($el.hasClass("menu-component")) {
				$el.find("a[title]").tooltip();
			} else {
				$el.tooltip();
			}
		});
		$ctx.find('[data-toggle="tooltip"]').tooltip();
		$ctx.find('[data-toggle="popover"]').popover({
			trigger: 'hover'
		});

	}

	enableTooltips();

	function addTLExpanded(id) {
		var myArrayJSON = sessionStorage["tl-expanded"], myArray;
		if(myArrayJSON) myArray = JSON.parse(myArrayJSON);
		if(!myArray) myArray = [];
		myArray = myArray.filter(function (el) {return el != id;});
		myArray.push(id);
		sessionStorage["tl-expanded"] = JSON.stringify(myArray);
	}
	function removeTLExpanded(id) {
		var myArrayJSON = sessionStorage["tl-expanded"], myArray;
		if(myArrayJSON) myArray = JSON.parse(myArrayJSON);
		if(!myArray) myArray = [];
		myArray = myArray.filter(function (el) {return el != id;});
		sessionStorage["tl-expanded"] = JSON.stringify(myArray);
	}
	var PLUS_CLASS = 'fa-plus-circle';
	var MINUS_CLASS = 'fa-minus-circle';
	function registerActivityToggle(idx, element) {
		var $element = $(element);
		if($element.data("registerActivityToggle")){
			return;
		}
		$element.data("registerActivityToggle", "true");
		var $target = $($element.data('target'));
		$target.on('show.bs.collapse', function onShow(){
			$element.removeClass('collapsed').addClass('expanded');
			$element.find('i').removeClass(PLUS_CLASS).addClass(MINUS_CLASS);
			addTLExpanded($target.attr("id"));
		});
		$target.on('hide.bs.collapse', function onHide(){
			$element.removeClass('expanded').addClass('collapsed');
			$element.find('i').removeClass(MINUS_CLASS).addClass(PLUS_CLASS);
			removeTLExpanded($target.attr("id"));
		});
	}
	function setupExpandCollapse(ctx) {
		var $ctx = !!ctx ? $(ctx.parentNode || document) : $(ctx || document);
		$ctx.find('[data-toggle="collapse"]').each(registerActivityToggle);
	}

	setupExpandCollapse();

	function deserialzeBS() {
		var $ctx = $(document);
		var myArrayJSON = sessionStorage["tl-expanded"], myArray;
		if(myArrayJSON) myArray = JSON.parse(myArrayJSON);
		if(!myArray || myArray.length === 0)
			return;
		// FIXME : loop over array and add classname "in"
		for (var i = 0, id; id = myArray[i]; i++) {
			var $found = $ctx.find("#" + id);
			if($found.length > 0) {
				// One-shot?
				//myArray = myArray.filter(function (el) {return el != id;});
				//i--;
				if(!$found.hasClass("in")) {
					$found.trigger('show.bs.collapse');
					$found.addClass("in");
				}
			}
		}
		sessionStorage["tl-expanded"] = JSON.stringify(myArray);
	}

	deserialzeBS();

	function setupCharts(ctx) {
		var $ctx = !!ctx ? $(ctx.parentNode || document) : $(ctx || document);
		$ctx.find('[data-chart-type]').each(function(idx, target) {
			//noinspection JSUnresolvedVariable
			if(!target.chart) {
				setupChart(target);
			}
		});
	}

	function setupChart(target) {
		var CHART_TYPES = function chartTypesInit() {
			var gauge = {
				name: "gauge",
				isLegendSupported: false,
				createChart: function setupGauge(canvas, data, options) {
					canvas.setAttribute("height", "200");
					canvas.setAttribute("width", "200");
					//noinspection JSUnresolvedFunction
					var chart = new Donut(canvas).setOptions(options);
					//noinspection JSUnresolvedVariable
					chart.maxValue = data.maxVal;
					chart.animationSpeed = 32;
					//noinspection JSUnresolvedVariable
					chart.set(data.currVal);
					return chart;
				}
			};
			var pie = {
				name: "pie",
				isLegendSupported: true,
				createChart: function setupPie(canvas, data, options) {
					var canvasContext = canvas.getContext('2d');
					canvas.setAttribute("height", "150");
					canvas.setAttribute("width", "150");
					//noinspection JSUnresolvedFunction
					return new Chart(canvasContext).Pie(data, options);
				}
			};
			var line = {
				name: "line",
				isLegendSupported: true,
				createChart: function setupLine(canvas, data, options) {
					var canvasContext = canvas.getContext('2d');
					canvas.setAttribute("height", "200");
					canvas.setAttribute("width", "300");
					//noinspection JSUnresolvedFunction
					return new Chart(canvasContext).Line(data, options);
				}
			};
			var bar = {
				name: "bar",
				isLegendSupported: true,
				createChart: function setupBar(canvas, data, options) {
					var canvasContext = canvas.getContext('2d');
					canvas.setAttribute("height", "200");
					canvas.setAttribute("width", "300");
					//noinspection JSUnresolvedFunction
					return new Chart(canvasContext).Bar(data, options);
				}
			};
			var radar = {
				name: "radar",
				isLegendSupported: true,
				createChart: function setupRadar(canvas, data, options) {
					var canvasContext = canvas.getContext('2d');
					canvas.setAttribute("height", "325");
					canvas.setAttribute("width", "400");
					//noinspection JSUnresolvedFunction
					return new Chart(canvasContext).Radar(data, options);
				}
			};
			var polarArea = {
				name: "polar-area",
				isLegendSupported: true,
				createChart: function setupPolarArea(canvas, data, options) {
					var canvasContext = canvas.getContext('2d');
					canvas.setAttribute("height", "325");
					canvas.setAttribute("width", "400");
					//noinspection JSUnresolvedFunction
					return new Chart(canvasContext).PolarArea(data, options);
				}
			};
			var types = [ gauge, pie, line, bar, radar, polarArea];

			function getChartType(typeStr) {
				var chartType = null;
				//noinspection JSUnusedLocalSymbols
				types.forEach(function(curr, idx, arr) {
					if(chartType == null && curr.name.toLowerCase() == typeStr.toLowerCase()) {
						chartType = curr;
					}
				});
				return chartType;
			}

			return {
				getType: getChartType
			};
		}();
		var options = JSON.parse(target.getAttribute("data-chart"));
		var data = JSON.parse(target.getAttribute("data-data"));
		var chartType = CHART_TYPES.getType(target.getAttribute("data-chart-type"));
		var includeLegend = target.getAttribute("data-include-legend").toLowerCase() == "true";
		var canvases = target.getElementsByTagName("canvas");
		for(var i = 0; i < canvases.length; i++) {
			target.removeChild(canvases[i]);
		}
		var canvas = document.createElement("canvas");
		target.appendChild(canvas);
		if(chartType != null) {
			target.chart = chartType.createChart(canvas, data, options);
			if (target.chart && includeLegend && chartType.isLegendSupported) {
				var legends = target.getElementsByClassName("chart-legend");
				var legend = null;
				if (legends.length == 0) {
					legend = document.createElement("div");
					legend.className = "chart-legend";
					target.appendChild(legend);
				}
				else {
					legend = legends[0];
				}
				//noinspection JSUnresolvedFunction
				legend.innerHTML = target.chart.generateLegend();
			}
		}
	}

	setupCharts();

	$('form.miwt-form').each(function (idx, form) {
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
		w.addEventListener("orientationchange", function () {
			if (w.orientation === 0)
				openSidebar(false);
		}, false);
		//noinspection JSUnresolvedVariable - defined in HTML document
		if (w.orientation && w.orientation === 0 && sessionStorage[SIDE_BAR_CLOSED] === undefined) {
			openSidebar(false);
		}
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


});