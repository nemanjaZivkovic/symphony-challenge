import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toaster } from 'evergreen-ui';
import { useFormInput } from '../../../customHooks/formInput';
import { isFormValid } from '../../../utils/formValidator';
import Paper from '../../../components/UI/Paper/Paper';
import Button from '../../../components/UI/Button/Button';
import { TextInput } from '../../../components/UI/Input/Input';
import classes from './SignIn.module.scss';
import { login } from '../../../services/auth/authService';
import * as actions from '../../../store/actions/authActions';
import { Link } from 'react-router-dom';
// ICONS
import showIconBox from './../../../assets/images/show-icon.png';

const SignIn = (props) => {
	const { authSignInSuccess } = props;
	const [ submitting, setSubmitting ] = useState(false);
	const [ showPassword, setShowPassword ] = useState(false);

	const username = useFormInput({
		name: 'username',
		rules: { required: true }
	});
	const password = useFormInput({
		name: 'password',
		rules: { required: true, minLength: 6 }
	});

	const togglePass = () => {
		setShowPassword((latestVal) => !latestVal);
	};

	const showIcon = (
		<i className={classes.iconWrapper} onClick={togglePass}>
			<img alt="show icon" src={showIconBox} />
		</i>
	);

	const formValid = isFormValid([ username, password ]);

	const collectFormData = () => ({
		username: username.value,
		password: password.value
	});

	const onSubmitHandle = (e) => {
		e.preventDefault();
		if (formValid) {
			setSubmitting(true);
			login(collectFormData())
				.then((resp) => {
					console.log(resp);
					const { token, ...user } = resp.data;
					authSignInSuccess(token, user);
				})
				.catch((err) => {
					console.log(err.response);
					const errData = err.response.data;

					if (errData.hasOwnProperty('non_field_errors')) {
						toaster.danger(errData.non_field_errors || err.response.statusText);
					}
				})
				.finally(() => {
					setSubmitting(false);
				});
		}
	};

	return (
		<section className={classes.container}>
			<Paper className={classes.paper}>
				<h1>Hello</h1>
				<p>Sign into your Account</p>
				<form className={classes.form} onSubmit={onSubmitHandle}>
					<TextInput label="username" {...username} />

					<TextInput
						type={showPassword ? 'text' : 'password'}
						label="password"
						icon={showIcon}
						{...password}
					/>

					<Button type="submit" disabled={!formValid} isLoading={submitting}>
						sign in
					</Button>
				</form>
			</Paper>
			<p>
				Don’t have an account? <Link to="/sign-up">Register now</Link>
			</p>
		</section>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		authSignInSuccess: (token, userData) => dispatch(actions.authSignIn(token, userData))
	};
};

export default connect(null, mapDispatchToProps)(SignIn);
