/**
 * Provides javascript functionality for remembering the user's last selected item in a carousel.  In addition to the normal
 * Bootstrap carousel API, the HTML just needs to set data attributes 'carousel-id' on the main carousel element and a
 * 'carousel-index' on each item.
 *
 * @requires jquery
 * @author Ken Logan (klogan@venturetech.net)
 */

jQuery(function () {
    $(".carousel").each(function() {
        var persistentId = $(this).data('carousel-id');
        if(persistentId) {
            $( this ).on('slid.bs.carousel', function (e) {
                var itemIdx = e.relatedTarget.getAttribute('data-carousel-index');
                localStorage.setItem(persistentId, itemIdx);
            });

            var storedIdx = localStorage.getItem(persistentId);
            if(storedIdx && Number(storedIdx)) {
                $( this ).carousel(Number(storedIdx));
            }
        }
    });
});
