/**
 * Created by vtdev on 4/7/16.
 */
function deserialzeBS() {
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
			$found.click();
		}
	}
	sessionStorage["tl-expanded"] = JSON.stringify(myArray);
}