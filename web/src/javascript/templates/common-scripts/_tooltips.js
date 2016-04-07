/**
 * Created by vtdev on 4/7/16.
 */
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