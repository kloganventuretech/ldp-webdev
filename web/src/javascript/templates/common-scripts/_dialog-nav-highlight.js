/**
 * Created by vtdev on 4/7/16.
 */
function navHighlight() {

	$('div.window.dialog .activity-configurer').scroll(function(event) {

		//Highlight nav on scroll / click
		var scrollPos = $(document).scrollTop();
		$('section.toc .task-label a').each(function () {
			var currLink = $(this);
			var currLinkParent = $(currLink).parent();
			var refElement = $(currLink.attr("href"));
			if (refElement.position().top - 280 <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
				$('section.toc .task-label a').removeClass("active");
				currLinkParent.addClass("active");
			}
			else{
				currLinkParent.removeClass("active");
			}
		});

	});

	//smoothscroll
	$('section.toc .engagement .task-label a').click( function (e) {

		$('a').each(function () {
			$(this).removeClass('active');
		});
		$(this).addClass('active');

	});

}