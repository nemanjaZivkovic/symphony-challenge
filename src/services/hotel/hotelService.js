import axios from '../axiosPreset';

const authHeader = (token) => ({
	headers: {
		Authorization: 'Token ' + token
	}
});

export const getAllHotels = (token) => {
	const url = '/hotel_api/';

	return axios.get(url, authHeader(token));
};

export const getReviewById = ({ token, id }) => {
	const url = '/hotel_api/get_hotel_reviews/' + id;

	return axios.get(url, authHeader(token));
};

export const getHotelDetailsById = ({ token, id }) => {
	const url = '/hotel_api/' + id;

	return axios.get(url, authHeader(token));
};

export const getFavorites = ( token ) => {
	const url = '/favorites/';

	return axios.get(url, authHeader(token));
};

export const addToFavorites = ({ hotel_id, token }) => {
	const url = '/favorites/add_remove';

	const params = {
		hotel_id,
		is_favorite: true
	};
	//const {username, password} = userData;
	return axios.post(url, params, authHeader(token));
};
