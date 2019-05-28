//const newsApiKey = '77a115023a164b7d91c2c3d59419502b';
const newsApiKey = '9f554f4652d14136a42ac4b384ed3be8';

export const getHeadlinesByCountry = ({ countryCode, category, term, pageSize }) => {
	const categoryParam = category ? `&category=${category}` : '';
	const termParam = term ? `&q=${term}` : '';
	const pageSizeParam = pageSize ? `&pageSize=${pageSize}` : '';
	const url = `https://newsapi.org/v2/top-headlines?country=${countryCode}${categoryParam}${termParam}${pageSizeParam}&apiKey=${newsApiKey}`;
	const req = new Request(url);
	return fetch(req);
};
