/**
 * Created by vtdev on 4/7/16.
 */
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