import axios from '../axiosPreset';

export const register = (userData) => {
	const url = '/register/';
	//const { name, email, password, company_id, address_id } = userData;
	return axios.post(url, userData);
};

export const login = (userData) => {
	const url = '/api-token-auth';
	//const {username, password} = userData;
	return axios.post(url, userData);
};
