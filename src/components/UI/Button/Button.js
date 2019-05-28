import React from 'react';
import classes from './Button.module.scss';
const variants = [ 'minimal', 'attention' ];
function Button({ variant = 'regular', children, className, ...props }) {
	let variantClass;

	switch (variant) {
		case 'regular':
			variantClass = classes['button--regular'];
			break;
		case 'minimal':
			break;
		case 'attention':
			variantClass = classes['button--attention'];
			break;
		default:
			console.warn(`Choose one of the provided button variants: ${variants.join(', ')}`);
	}
	return (
		<button className={[ classes.button, variantClass, className ].join(' ')} {...props}>
			{children}
		</button>
	);
}

export default Button;
