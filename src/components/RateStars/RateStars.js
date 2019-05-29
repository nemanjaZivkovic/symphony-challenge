import React from 'react';
import StarIcon from '../../assets/icons/star_full_icon.svg';
import StarEmptyIcon from '../../assets/icons/star_empty_icon.svg';
import classes from './RateStars.module.scss';
function RateStars({ number, max = 5 }) {
	let Stars = [];
	for (var index = 0; index < max; index++) {
		let currentStar;
		if (index < number) {
			currentStar = <img src={StarIcon} key={index} alt="filled star" />;
		} else {
			currentStar = <img src={StarEmptyIcon} key={index} alt="empty star" />;
		}

		Stars.push(currentStar);
	}
	return <div className={classes.container}>{Stars}</div>;
}

export default RateStars;
