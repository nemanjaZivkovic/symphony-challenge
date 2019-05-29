import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { toaster } from 'evergreen-ui';
import Button from '../../components/UI/Button/Button';
import Loader from '../../components/UI/Loader/Loader';
import { getHotelDetailsById } from '../../services/hotel/hotelService';
import HotelCard from '../../components/HotelCard/HotelCard';
import classes from './Hotel.module.scss';

function Hotel(props) {
	const { token, history, match } = props;
	const [ hotel, setHotel ] = useState([]);
	const [ loading, setLoading ] = useState(false);

	useEffect(() => {
		// if there is id query string containing id fetch this hotel
		// else route user back to the dashboard
		const queryStringId = match.params.id;
		if (queryStringId) {
			fetchHotel(queryStringId);
		} else {
			history.push('/dashboard');
		}
	}, []);

	const fetchHotel = async (id) => {
		setLoading(true);
		try {
			const response = await getHotelDetailsById({ token, id });

			console.log(response);
			setHotel(response.data);
		} catch (err) {
			console.log(err.response);
			toaster.danger(err.response.data.detail || err.response.statusText);
			history.push('/dashboard');
		} finally {
			setLoading(false);
		}
	};
	return (
		<section className={classes.container}>
			{loading ? <Loader /> : <HotelCard data={hotel} alwaysShowReviews />}
		</section>
	);
}

const mapStateToProps = (state) => {
	return {
		token: state.auth.accessToken
	};
};

export default connect(mapStateToProps)(Hotel);
