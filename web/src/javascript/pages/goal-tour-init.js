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
				if (userInfo.toured["participant"] === false) {
					// Initialize the tour
					//noinspection JSUnresolvedVariable
					goalTour.init();

					// Start the tour
					//noinspection JSUnresolvedVariable
					goalTour.start(true);

					$('body').on('click', '.popover-navigation > button', function () {
						userInfo.toured["participant"] = true;
						xhr.onreadystatechange = null;
						xhr.open('post', '/ws/user-info');
						xhr.send(JSON.stringify(userInfo));
					});
				}

				if (userInfo.toured["executive-decision-maker"] === false) {
					// Initialize the tour
					//noinspection JSUnresolvedVariable
					goalTour.init();

					// Start the tour
					//noinspection JSUnresolvedVariable
					goalTour.start(true);

					$('body').on('click', '.popover-navigation > button', function () {
						userInfo.toured["executive-decision-maker"] = true;
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
	var goalTour = new Tour({
		steps: [
			{
				element: ".dropdown.profile",
				title: "Your profile",
				content: "Click the image to access your profile or logout of the platform.",
				placement: "left"
			},
			{
				element: ".top-menu li.link.resources",
				title: "Resource Library",
				content: "Click here to view resources available to all LR Success Path members.",
				placement: "left"
			},
			{
				element: ".sidebar-toggle-box .fa-bars",
				title: "Menu Toggle",
				content: "Click here to collapse the side navigation to icons only, or expand it to view the entire navigation.",
				placement: "right"
			},
			/*{
				element: ".goals-viewer .persistence-actions button.configure",
				title: "Configure Goals",
				content: "Click here to set up new goals or configure existing goals.",
				placement: "bottom"
			},
			{
				element: ".goals-viewer .persistence-actions button.completed-goals-toggle",
				title: "Completed Goals",
				content: "Completed goals aren't shown on the dashboard by default. Use this button to toggle" +
				"between showing or hiding completed goals",
				placement: "bottom"
			},
			{
				element: ".tab-container .tab-items .personal",
				title: "Organizational Goals",
				content: "Click here to view and update Personal Goals.",
				placement: "bottom"
			},
			{
				element: ".tab-container .tab-items .leadership",
				title: "Organizational Goals",
				content: "Click here to view and update Leadership Goals.",
				placement: "bottom"
			},
			{
				element: ".tab-container .tab-items .organizational",
				title: "Organizational Goals",
				content: "Click here to view and update Organizational Goals.",
				placement: "bottom"
			},*/
			{
				element: ".lr-participant-menu .goals",
				title: "Goals",
				content: "Click here to view, configure and update your goals"
			},
			{
				element: ".lr-participant-menu .timeline-nav",
				title: "Timeline",
				content: "Click here to view the timeline - a path of all activities."
			},
			{
				element: ".lr-participant-menu .profile",
				title: "Profile",
				content: "Click here to see your profile."
			},
			{
				element: ".lr-participant-menu .resources",
				title: "Resources",
				content: "Click here to see helpful resources that are assigned to you."
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

	launchTourIfNecessary(goalTour);

});