export const isFormValid = (inputs) => {
	for (var i = 0; i < inputs.length; i++) {
		var currInput = inputs[i];
		if (currInput.error || (!currInput.touched && currInput.rules)) {
			//console.log(`Input ${currInput.name} is false`, currInput);
			return false;
		}
	}

	return true;
};
