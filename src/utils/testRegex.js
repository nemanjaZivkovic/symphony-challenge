const testRegex = (val, rule) => rule.test(val);

const isEmail = (val) =>
	testRegex(
		val,
		/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
	);
const isNumeric = (val) => testRegex(val, /^\d+$/g);

const isNumericDecimal = (val) => testRegex(val, /^\d+(\.)?(\d{0,2})?$/g);

export default { isEmail, isNumeric, isNumericDecimal };
