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
					myParticipantTour.init();

					// Start the tour
					//noinspection JSUnresolvedVariable
					myParticipantTour.start(true);

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

	// Instance the EDM tour
	//noinspection LongLine
	var myParticipantTour = new Tour({
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
				element: ".top-menu li.link.client-participant-listing",
				title: "My Participants",
				content: "Click here at anytime to return back to your participant listing.",
				placement: "left"
			},
			{
				element: ".search-results",
				title: "Your participants",
				content: "All participants that are assigned to you will be listed here.",
				placement: "top"
			},
			{
				element: ".search-results tr.first a.plan-link",
				title: "View a Participant",
				content: "Click the process name associated with each participant to view their Timeline, Goals" +
				", Profile and Resources. To continue the tour, click the highlighted process name.",
				placement: "bottom"
			}
		],
		storage: false,
		backdrop: true,
		backdropPadding: 5
	});

	launchTourIfNecessary(myParticipantTour);

});