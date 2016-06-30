/**
 * Created by aholt on 6/29/16.
 */
function setupCustomDropdowns(ctx) {
    var $ctx = !!ctx ? $(ctx.parentNode || document) : $(ctx || document);
    $ctx.find('.dropdown [data-background-image]').each(function(idx, target) {
        var backgroundurl = target.getAttribute('data-background-image');
        var styleString = ';overflow: hidden;'
        + 'text-indent: -75rem;'
        + 'white-space: nowrap;'
        + 'margin-left: 7px;'
        + 'width: 7rem;'
        + 'display: inline-block;'
        + 'vertical-align: middle;'
        + 'font-size: 2rem;'
        + 'color: #2e2e2e;'
        + 'text-transform: uppercase;'
        + 'background: url(' + backgroundurl + ') 0 0/auto 100% no-repeat;';
        target.style.cssText += styleString;
    });
}