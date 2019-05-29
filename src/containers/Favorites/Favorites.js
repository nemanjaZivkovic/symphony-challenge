import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { toaster } from 'evergreen-ui';
import Button from '../../components/UI/Button/Button';
import Loader from '../../components/UI/Loader/Loader';
import { getFavorites } from '../../services/hotel/hotelService';
import HotelCard from '../../components/HotelCard/HotelCard';
import classes from './Favorites.module.scss';

function Favorites(props) {
	const { token, history, match } = props;
	const [ hotels, setHotels ] = useState([]);
	const [ loading, setLoading ] = useState(false);

	useEffect(() => {
		// on initial load fetch the favorites
		fetchFavoritesHotel();
	},[]);

	const fetchFavoritesHotel = async () => {
		setLoading(true);
		try {
			const response = await getFavorites( token);
			console.log(response);
			setHotels(response.data);
		} catch (err) {
			console.log(err.response);
			toaster.danger(err.response.data.detail || err.response.statusText);
		} finally {
			setLoading(false);
		}
	};

	const hotelsList = hotels.map((hotel) => <HotelCard key={hotel.id} data={hotel} alwaysShowReviews />);
	return (
		<section className={classes.container}>
			{loading ? <Loader /> : hotelsList}
		</section>
	);
}

const mapStateToProps = (state) => {
	return {
		token: state.auth.accessToken
	};
};

export default connect(mapStateToProps)(Favorites);
