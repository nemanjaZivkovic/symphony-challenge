import axios from '../axiosPreset';

// @TODO api endpoint for fetching user is not yet done WIP
export const getUser = (token) => {
	const url = '/profile';

	const config = {
		headers: {
			Authorization: 'Token ' + token
		}
	};

	return axios.get(url, config);
};