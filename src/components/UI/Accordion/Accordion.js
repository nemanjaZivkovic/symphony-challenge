import React from 'react';
import classes from './Accordion.module.scss';
function Accordion({ expanded = true, className, children, ...props }) {
	const collapsedClass = !expanded ? classes['accordion--collapsed'] : '';
	return (
		<div className={[ classes.accordion, collapsedClass, className ].join(' ')} {...props}>
			{children}
		</div>
	);
}

export default React.memo(Accordion);
