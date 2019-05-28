import React, { useState } from 'react';
import Button from '../UI/Button/Button';
import Link from '../../components/UI/Link/Link';
import ConditionalTruncate from '../ConditionalTruncate/ConditionalTruncate';
import { isMobile } from 'react-device-detect';
import classes from './ArticleCard.module.scss';

function ArticleCard(props) {
	const { data, hoverZoom = false, className } = props;
	const [ hovering, setHovering ] = useState(false);
	const imgStyle = { backgroundImage: `url(${data.urlToImage})` };

	const mouseEnterHandler = () => {
		setHovering(true);
	};

	const mouseLeaveHandler = () => {
		setHovering(false);
	};

	const zoomStyle = hoverZoom && !isMobile ? '' : classes['no-zoom'];
	const moreButtonStyle = isMobile ? classes['no-more-transition'] : '';

	return (
		<Link
			to={{
				pathname: `/article`,
				state: data
			}}
			wrapper={true}
		>
			<article
				className={[ classes.card, zoomStyle, className ].join(' ')}
				onMouseEnter={mouseEnterHandler}
				onMouseLeave={mouseLeaveHandler}
			>
				{/* Image */}
				<div className={classes.image} style={imgStyle} />
				{/* Title */}
				<div className={classes.title}>
					<ConditionalTruncate condition={!hovering} lines={2}>
						{data.title}
					</ConditionalTruncate>
				</div>
				{/* Description */}
				<div className={classes.description}>
					<ConditionalTruncate condition={!hovering} lines={2}>
						{data.description}
					</ConditionalTruncate>
					<Button className={[classes.moreCta, moreButtonStyle].join(' ')}>
						more <span>></span>
					</Button>
				</div>
			</article>
		</Link>
	);
}

export default ArticleCard;
