import axios from 'axios';

// default api request settings
export default axios.create({
	//baseURL: 'https://gosalads.bridgewaterlabs.com/api'
	baseURL: 'http://localhost:8000'
});
