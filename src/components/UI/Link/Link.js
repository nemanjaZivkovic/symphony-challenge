import React from 'react';
import { Link as LinkRouter, NavLink } from 'react-router-dom';
import classes from './Link.module.scss';
function Link({ children, className, wrapper, navlink, ...props }) {
	const wrapperClass = wrapper ? classes['link--wrapper'] : '';
	const LinkComponent = navlink ? NavLink : LinkRouter;
	return (
		<LinkComponent className={[ classes.link, wrapperClass, className ].join(' ')} {...props}>
			{children}
		</LinkComponent>
	);
}

export default Link;
