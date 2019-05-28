import React from 'react';
import classes from './Loader.module.scss';
function Loader() {
	return (
		<div className={classes['lds-ellipsis']}>
			<div />
			<div />
			<div />
			<div />
		</div>
	);
}

export default Loader;
