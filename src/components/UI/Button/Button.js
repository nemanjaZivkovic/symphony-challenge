import React from 'react';
import { Button as ButtonUI } from 'evergreen-ui';
import classes from './Button.module.scss';
const Button = (props) => {
	const { children, className, ...restOfProps } = props;
	return (
		<ButtonUI {...restOfProps} className={[ classes.button, className ].join(' ')}>
			{children}
		</ButtonUI>
	);
};

export default Button;
