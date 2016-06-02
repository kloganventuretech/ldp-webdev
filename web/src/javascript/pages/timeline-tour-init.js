/**
 * Created by vtdev on 5/23/16.
 */

$(function () {

	function launchTourIfNecessary() {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', '/ws/user-info');
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				var userInfo = JSON.parse(xhr.responseText);
				if (userInfo.toured["executive-decision-maker"] === false) {
					// Initialize the tour
					//noinspection JSUnresolvedVariable
					timelineTour.init();

					// Start the tour
					//noinspection JSUnresolvedVariable
					timelineTour.start(true);

					$('body').on('click', '.popover-navigation > button', function () {
						userInfo.toured["executive-decision-maker"] = true;
						xhr.onreadystatechange = null;
						xhr.open('post', '/ws/user-info');
						xhr.send(JSON.stringify(userInfo));
					});
				} else if (userInfo.toured["executive-sponsor"] === false) {
					// Initialize the tour
					//noinspection JSUnresolvedVariable
					timelineTour.init();

					// Start the tour
					//noinspection JSUnresolvedVariable
					timelineTour.start(true);

					$('body').on('click', '.popover-navigation > button', function () {
						userInfo.toured["executive-sponsor"] = true;
						xhr.onreadystatechange = null;
						xhr.open('post', '/ws/user-info');
						xhr.send(JSON.stringify(userInfo));
					});

				} else if (userInfo.toured["participant"] === false) {
					// Initialize the tour
					//noinspection JSUnresolvedVariable
					timelineTour.init();

					// Start the tour
					//noinspection JSUnresolvedVariable
					timelineTour.start(true);

					$('body').on('click', '.popover-navigation > button', function () {
						userInfo.toured["participant"] = true;
						xhr.onreadystatechange = null;
						xhr.open('post', '/ws/user-info');
						xhr.send(JSON.stringify(userInfo));
					});
				}
			}
		};

		xhr.send();

	}

	// Instance the Participant tour
	//noinspection LongLine
	var timelineTour = new Tour({
		steps: [
			{
				element: ".timeline-ui",
				title: "Your Plan",
				content: "Chronological, configured development plan timeline. Default view is the current timeline.",
				placement: "top"
			},
			{
				element: "span.select-year",
				title: "Dropdown Menu",
				content: "Use this menu to select the year shown.",
				placement: "left"
			},
			{
				element: "button.past",
				title: "See Past Activities",
				content: "Click here to see past development activities."
			},
			{
				element: "button.future",
				title: "See Future Activities",
				content: "Click here to see future development activities."
			},
			{
				element: "#action-item-mgt",
				title: "Your Action Items",
				content: "Activities or assignments for you to complete.",
				placement: "top"
			},
			{
				element: "div.overdue-btn",
				title: "Overdue",
				content: "These action items have not been completed and their due date has passed.",
				placement: "left"
			},
			{
				element: "div.active-btn",
				title: "In Progress",
				content: "These action items have been assigned with an upcoming due date.",
				placement: "left"
			}/*,
			{
				// Automatically go to Timeline page
				path: function() {
					var goToTimeline = "/participant/timeline" + location.pathname.substring("/participant/goals".length);
					location.href = goToTimeline;
				}
			}*/
		],
		storage: false,
		backdrop: true,
		backdropPadding: 5
	});

	launchTourIfNecessary(timelineTour);

});