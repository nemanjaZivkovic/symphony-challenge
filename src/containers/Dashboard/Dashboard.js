import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toaster } from 'evergreen-ui';
import Button from '../../components/UI/Button/Button';
import { getAllHotels } from '../../services/hotel/hotelService';
import HotelCard from '../../components/HotelCard/HotelCard';
import classes from './Dashboard.module.scss';

function Dashboard(props) {
	const { token } = props;
	const [ hotels, setHotels ] = useState([]);
	const [ loading, setLoading ] = useState(false);

	const fetchHotels = async () => {
		setLoading(true);
		try {
			const response = await getAllHotels(token);

			console.log(response);
			setHotels(response.data);
		} catch (err) {
			console.log(err.response);
			toaster.danger(err.response.data.detail || err.response.statusText);
		} finally {
			setLoading(false);
		}
	};
	return (
		<section className={classes.container}>
			<Button isLoading={loading} onClick={fetchHotels}>
				Load Hotels
			</Button>
			{hotels.map((hotel) => <HotelCard key={hotel.id} data={hotel} />)}
		</section>
	);
}

const mapStateToProps = (state) => {
	return {
		token: state.auth.accessToken
	};
};

export default connect(mapStateToProps)(Dashboard);
