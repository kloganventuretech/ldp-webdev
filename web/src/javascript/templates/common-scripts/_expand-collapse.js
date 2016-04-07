/**
 * Created by vtdev on 4/7/16.
 */
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