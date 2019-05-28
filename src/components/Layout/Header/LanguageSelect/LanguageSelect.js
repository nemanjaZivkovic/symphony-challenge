import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { languageSet } from '../../../../store/actions/languageActions';
import Button from '../../../UI/Button/Button';
import classes from './LanguageSelect.module.scss';

const languages = [ 'GB', 'US' ];

function LanguageSelect(props) {
	const { selectedLanguage, setLanguage, disabledChange } = props;
	const buttonSelected = (lang) => (selectedLanguage === lang ? 'attention' : 'regular');
	const clickHandler = (lang) => (e) => setLanguage(lang);

	return (
		<div className={classes.languageSelect}>
			{languages.map((lang) => (
				<Button
					key={lang}
					disabled={disabledChange}
					onClick={clickHandler(lang)}
					variant={buttonSelected(lang)}
				>
					{lang}
				</Button>
			))}
		</div>
	);
}

const mapStateToProps = (state) => ({
	selectedLanguage: state.selectedLanguage,
	disabledChange: state.disabledChangeLanguage
});

const mapDispatchToProps = (dispatch) => ({
	setLanguage: (langCode) => dispatch(languageSet(langCode))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LanguageSelect));
