import React from 'react';
import classes from './GridList.module.scss';

function List({ children, className, ...props }) {
	return (
		<div className={[ classes.ListBase, className ].join(' ')} {...props}>
			{children}
		</div>
	);
}

export default List;