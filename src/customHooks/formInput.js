import { useState } from 'react';
import testRegex from '../utils/testRegex';

export const useFormInput = (props) => {
	const { name, rules, defaultValue, onChange } = props;
	const [ value, setValue ] = useState(defaultValue || '');
	const [ touched, setTouched ] = useState(defaultValue ? true : false);
	const [ error, setError ] = useState('');

	const inputChangeHandler = (e) => {
		setValue(e.target.value);
		setTouched(true);
		// remove the error message on change
		setError('');
		// trigger onChange callback if we passed one trough props
		if (onChange) {
			onChange(e.target.value);
		}
	};

	const inputBlurHandler = (event) => {
		//console.log('Input blur handler', event.target.value);
		validateInput();
	};

	const validateInput = () => {
		let errorMessage = '';

		if (rules) {
			const { required, minLength, maxLength, email } = rules;

			if (required && value === '') {
				errorMessage = 'This field is required';
			} else if (minLength && value.length < minLength) {
				errorMessage = `Enter at least ${rules.minLength} characters`;
			} else if (maxLength && value.length > maxLength) {
				errorMessage = `${rules.maxLength} characters is the maximum`;
			} else if (email && !testRegex.isEmail(value)) {
				errorMessage = 'Please enter a valid email';
			}
		}
		// continue adding any custom validation rules here

		setError(errorMessage);
	};

	return {
		name,
		value,
		touched,
		error,
		rules,
		onChange: inputChangeHandler,
		onBlur: inputBlurHandler,
		setValue,
		setError
	};
};
