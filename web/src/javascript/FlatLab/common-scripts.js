
// Note: openSidebar function is declared in the HTML of the page (header)


jQuery(function () {



//    sidebar toggle

	function responsiveView() {
		var wSize = $(window).width();
		if (sessionStorage[SIDE_BAR_OPEN] === undefined)
			openSidebar(!(wSize <= 768));
	}

	$(window).on('load', responsiveView);
	$('.fa-bars').click(function () {
		var $body = $("#body-wrapper"),
			open = !$body.hasClass("sidebar-open");
		openSidebar(open);
	});


	/*const*/
	var SELECT2_INIT = "select2-init";

// select2
	function initSelect2(ctx) {
		var $select = $(ctx || document).find('select');
		if ($select.length && !($select.closest('.cke_dialog').length || $select.closest('tr[data-dnd-source-def]').length)) {

			//noinspection JSUnresolvedVariable
			var $result = $select
				.select2({
					minimumResultsForSearch: 10,
					dropdownAutoWidth: true,
					width: 'resolve'
				})
				.addClass(SELECT2_INIT)
				.filter('[data-features~="watch"]');
			if (window.miwt)
				$result.on('change', miwt.observerFormSubmit);
		}
	}

	function destroySelect2(ctx) {
		var $select = $(ctx || document);
		if (!$select.hasClass(SELECT2_INIT)) {
			$select = $select.find('select').filter('.' + SELECT2_INIT);
		}

		if ($select.length) {
			$select.removeClass(SELECT2_INIT).select2('destroy');
		}
	}

	initSelect2();

	function handleDataDownload(ctx) {
		var $ctx = $(ctx || document);
		$ctx.find("[data-download]").each(function (idx, el) {
			el.setAttribute("download", "");
		});
	}

	handleDataDownload();

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


	function enableTooltips(ctx) {
		var $ctx = $(ctx || document);
		$ctx.find(".tooltips").each(function (idx, el) {
			var $el = $(el);
			if ($el.hasClass("menu-component")) {
				$el.find("a[title]").tooltip();
			} else {
				$el.tooltip();
			}
		});
		$ctx.find('[data-toggle="tooltip"]').tooltip();
		$ctx.find('[data-toggle="popover"]').popover({
			trigger: 'hover'
		});

	}

	enableTooltips();

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
		var $ctx = $(ctx || document);
		$ctx.find('[data-toggle="collapse"]').each(registerActivityToggle);
	}

	setupExpandCollapse();

	function deserialzeBS()
	{
		var $ctx = $(document);
		var myArrayJSON = sessionStorage["tl-expanded"], myArray;
		if(myArrayJSON) myArray = JSON.parse(myArrayJSON);
		if(!myArray || myArray.length === 0)
			return;
		// FIXME : loop over array and add classname "in"
		for (var i = 0, id; id = myArray[i]; i++) {
			var $found = $ctx.find("#" + id);
			if($found.length > 0) {
				// One-shot?
				//myArray = myArray.filter(function (el) {return el != id;});
				//i--;
				if(!$found.hasClass("in")) {
					$found.trigger('show.bs.collapse');
					$found.addClass("in");
				}
			}
		}
		sessionStorage["tl-expanded"] = JSON.stringify(myArray);
	}

	deserialzeBS();

	$('form.miwt-form').each(function (idx, form) {
		form.submit_options = {
			preProcessNode: function (data) {
				destroySelect2(document.getElementById(data.refid));
				return data.content;
			},
			postProcessNode: function (data) {
				$.each(data, function (idx, d) {
					initSelect2(d.node);
					handleDataDownload(d.node);
					enableTooltips(d.node);
					setupExpandCollapse(d.node);
					deserialzeBS();
				});
			},
			postUpdate: function () {
				$(this).trigger('vs:miwt-post-update');
			}
		};
	});

	(function (w) {
		var $body = $("#body-wrapper");
		if ($body.length === 0) return;
		w.addEventListener("orientationchange", function () {
			if (w.orientation === 0)
				openSidebar(false);
		}, false);
		if (w.orientation && w.orientation === 0 && sessionStorage[SIDE_BAR_CLOSED] === undefined) {
			openSidebar(false);
		}
	})(window);


});