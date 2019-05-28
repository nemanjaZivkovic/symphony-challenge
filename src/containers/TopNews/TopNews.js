import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getHeadlinesByCountry } from '../../services/newsService';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import GridList from '../../components/UI/GridList/GridList';
import Loader from '../../components/UI/Loader/Loader';
import classes from './TopNews.module.scss';

const countryLabels = [ { value: 'GB', label: 'Great Britain' }, { value: 'US', label: 'United States' } ];

function TopNews(props) {
	const { selectedLanguage } = props;
	const [ articles, setArticles ] = useState([]);
	const [ loading, setLoading ] = useState(true);

	useEffect(
		() => {
			setLoading(true);
			getHeadlinesByCountry({ countryCode: selectedLanguage }).then((resp) => resp.json()).then((resp) => {
				setLoading(false);
				setArticles(resp.articles);
			});
		},
		[ selectedLanguage ]
	);

	const Articles = (
		<GridList className={classes.articles}>
			{articles.map((article, index) => <ArticleCard key={index} data={article} hoverZoom />)}
		</GridList>
	);

	const countryName = countryLabels.find((country) => selectedLanguage === country.value).label;

	return loading ? (
		<Loader/>
	) : (
		<div className={classes.container}>
			<h1>Top news from {countryName}:</h1>
			{Articles}
		</div>
	);
}

const mapStateToProps = (state) => ({
	selectedLanguage: state.selectedLanguage
});

export default connect(mapStateToProps)(TopNews);
