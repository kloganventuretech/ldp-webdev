/**
 * Created by vtdev on 4/19/16.
 */
function onIntMeasureInput(element, targetName, targetLabelId) {
	var val = element.value;
	var target = document.getElementsByName(targetName)[0];
	if(target.type.toLowerCase() == 'range' && target.max < val) {
		var targetLabel = document.getElementById(targetLabelId);
		target.max = val;
		targetLabel.innerHTML = val;
	}
	target.value = val;
}