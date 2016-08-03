/**
 * Created by aholt on 8/3/16.
 */
function setupFlipCard(idx, element) {
    var $element = $(element);
    if($element.data('setup')){
        return;
    }
    $element.click(function onClick(){
        $(this).toggleClass('flipped');
    });
    $element.data('setup', 'true');
}

function setupFlipCards(ctx) {
    var $ctx = !!ctx ? $(ctx.parentNode || document) : $(ctx || document);
    $ctx.find('.flip-card').each(setupFlipCard);
}