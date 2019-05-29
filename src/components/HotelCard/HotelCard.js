import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'evergreen-ui';
import { toaster } from 'evergreen-ui';
import Moment from 'react-moment';
import { getReviewById, addToFavorites } from '../../services/hotel/hotelService';
import classes from './HotelCard.module.scss';
import Paper from '../../components/UI/Paper/Paper';
import Button from '../../components/UI/Button/Button';
import RateStars from '../../components/RateStars/RateStars';
import Accordion from '../../components/UI/Accordion/Accordion';
import ReviewCard from '../ReviewCard/ReviewCard';
import Link from '../UI/Link/Link';

const openInNewWindow = (e, url) => {
	e.preventDefault();
	window.open(
		window.location.origin + url,
		'_blank',
		'toolbar=0,location=0,menubar=0,scrollbars=yes,resizable=yes,width=600px,height=500px'
	);
};

function HotelCard(props) {
	const { data, token, alwaysShowReviews } = props;
	const [ expanded, setExpanded ] = useState(alwaysShowReviews || false);
	const [ reviews, setReviews ] = useState([]);
	const [ loading, setLoading ] = useState(false);

	const toggleExpanded = async (id) => {
		setLoading(true);
		const response = await getReviewById({ token, id });
		setLoading(false);
		setReviews(response.data);
		setExpanded((curVal) => !curVal);
	};

	const handleAddToFavorites = async (hotel_id) => {
		try {
			const response = await addToFavorites({ token, hotel_id });
			toaster.success(response.data.Message || 'Added to favorites');
		} catch (err) {
			console.log(err.response);
			toaster.danger(err.response.data.detail || err.response.statusText);
		}
	};

	const ReviewsList = reviews.map((review) => <ReviewCard key={review.id} data={review} />);

	const NoReviews = <h3 style={{ marginTop: '1rem' }}> No reviews for this hotel</h3>;

	return (
		<Paper className={classes.container}>
			<div className={classes.mainContent}>
				<div
					className={classes.coverImage}
					style={{
						backgroundImage: `url(${(data.image && data.image.includes('http'))
							? data.image
							: 'http://localhost:8000' + data.image})`
					}}
					alt="hotel cover"
				/>
				<section>
					<Link onClick={(e) => openInNewWindow(e, `/hotel/${data.id}`)} to={`/hotel/${data.id}`} wrapper>
						<h3>{data.name}</h3>
					</Link>
					<span onClick={() => handleAddToFavorites(data.id)} className={classes.favorite}>
						<Icon icon="heart" />
					</span>
					<span className={classes.stars}>
						<RateStars number={data.stars} />
					</span>
					<span className={classes.location}>{`${data.city} - ${data.country}`}</span>
					<p>{data.description}</p>
					<strong>{data.price}€</strong>
					<span className={classes.date}>
						(<Moment format="DD/MM/YYYY HH:mm">{data.date}</Moment>)
					</span>

					{!alwaysShowReviews ? (
						<Button onClick={() => toggleExpanded(data.id)} isLoading={loading}>
							{expanded ? 'Hide reviews' : 'Show reviews'}
						</Button>
					) : null}
				</section>
			</div>

			<Accordion expanded={expanded}>{reviews.length ? ReviewsList : NoReviews}</Accordion>
		</Paper>
	);
}

const mapStateToProps = (state) => {
	return {
		token: state.auth.accessToken
	};
};

export default connect(mapStateToProps)(HotelCard);
