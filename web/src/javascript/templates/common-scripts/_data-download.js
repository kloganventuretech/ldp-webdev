/**
 * Created by vtdev on 4/7/16.
 */
function handleDataDownload(ctx) {
	var $ctx = $(ctx || document);
	$ctx.find("[data-download]").each(function (idx, el) {
		el.setAttribute("download", "");
	});
	if(!!ctx && ctx.hasAttribute("[data-download]")) ctx.setAttribute("download", "");
}