/**
* Timeline javascript
* @requires jquery
* @requires bootstrap
* @author Alan Holt (aholt@venturetech.net)
* @since 1/15/16 10:54 AM
*/
function registerActivityToggle(idx, element) {
    var $element = $(element);
    var $target = $($element.data('target'));
    $target.on('show.bs.collapse', function onShow(){
        $element.removeClass('collapsed').addClass('expanded');
        $element.find('i').removeClass('fa-plus').addClass('fa-minus');
    });
    $target.on('hide.bs.collapse', function onHide(){
        $element.removeClass('expanded').addClass('collapsed');
        $element.find('i').removeClass('fa-minus').addClass('fa-plus');
    });
}
$('.expand-collapse-activity').each(registerActivityToggle);