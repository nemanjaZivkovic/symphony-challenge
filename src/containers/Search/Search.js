import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import WindowSizeListener from 'react-window-size-listener';
import { getHeadlinesByCountry } from '../../services/newsService';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import GridList from '../../components/UI/GridList/GridList';
import Button from '../../components/UI/Button/Button';
import { useFormInput } from '../../customHooks/formInput';
import SearchIcon from '../../assets/icons/search-512.png';
import Loader from '../../components/UI/Loader/Loader';
import classes from './Search.module.scss';

const countryLabels = [ { value: 'GB', label: 'Great Britain' }, { value: 'US', label: 'United States' } ];

// check query params for "q" (query). So if a user wants to bookmark or share his search "q" will store his search term
const params = new URLSearchParams(window.location.search);
const queryParam = params.get('q');

function Search(props) {
	const { selectedLanguage, history } = props;
	const [ articles, setArticles ] = useState(null);
	const [ iconOnly, setIconOnly ] = useState(false);
	const [ loading, setLoading ] = useState(false);

	const queryInput = useFormInput({
		defaultValue: queryParam || '',
		rules: { minLength: 2, maxLength: 20, required: true }
	});

	const isSubmittable = !loading && queryInput.value.trim() && !queryInput.error;

	// initial load check for "q" query param, if there is any (maybe user bookmarked search res or got shared search link) fetch those articles
	useEffect(() => {
		if (queryParam) {
			fetchCategories(queryParam);
		}
	}, []);

	// observe language change
	useEffect(
		() => {
			if (isSubmittable) {
				fetchCategories(queryInput.value);
			}
		},
		[ selectedLanguage ]
	);

	const setQueryParam = (term) => {
		history.push(`/search?q=${term.trim()}`);
	};

	function fetchCategories(term) {
		setLoading(true);
		getHeadlinesByCountry({ countryCode: selectedLanguage, term }).then((resp) => resp.json()).then((resp) => {
			setArticles(resp.articles);
			setLoading(false);
			if (resp.status === 'error') {
				queryInput.setError(resp.message);
			} else {
				setQueryParam(term);
			}
		});
	}

	const submitHandle = (e) => {
		e.preventDefault();

		if (isSubmittable) {
			fetchCategories(queryInput.value);
		}
	};

	const Articles = () => {
		let content;
		if (articles && articles.length) {
			content = (
				<GridList className={classes.articles}>
					{articles.map((article, index) => <ArticleCard key={index} data={article} hoverZoom />)}
				</GridList>
			);
		} else if (articles && queryInput.touched) {
			content = (
				<div className={classes.noResults}>
					no results
					<span>:(</span>
					Try something else?
				</div>
			);
		} else {
			content = null;
		}
		return content;
	};

	const Search = <img src={SearchIcon} alt="search" />;

	const countryName = countryLabels.find((country) => selectedLanguage === country.value).label;

	return (
		<div className={classes.container}>
			<h1>Search top news from {countryName}:</h1>
			<form onSubmit={submitHandle}>
				<input autoFocus type="search" placeholder="What would you like to know" {...queryInput} />
				<Button className={classes.query} disabled={!isSubmittable}>
					{iconOnly ? null : 'search'}
					{Search}
					<WindowSizeListener
						onResize={({ windowWidth }) => {
							setIconOnly(windowWidth < 750 ? true : false);
						}}
					/>
				</Button>
				<span className={classes.error}>{queryInput.error}</span>
			</form>
			{loading ? <Loader/> : Articles()}
		</div>
	);
}

const mapStateToProps = (state) => ({
	selectedLanguage: state.selectedLanguage
});

export default connect(mapStateToProps)(Search);
