/**
 * Created by vtdev on 4/7/16.
 */
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