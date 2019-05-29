import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { logoutUser } from '../../../store/actions/authActions';

const SignOut = ({ logoutUser }) => {
	logoutUser();
	return <Redirect to="/" />;
};
const mapDispatchToProps = (dispatch) => {
	return {
		logoutUser: () => dispatch(logoutUser())
	};
};

export default connect(null, mapDispatchToProps)(SignOut);
