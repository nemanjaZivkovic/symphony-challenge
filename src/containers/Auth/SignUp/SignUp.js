import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toaster } from 'evergreen-ui';
import { useFormInput } from '../../../customHooks/formInput';
import { isFormValid } from '../../../utils/formValidator';
import Paper from '../../../components/UI/Paper/Paper';
import Button from '../../../components/UI/Button/Button';
import { TextInput } from '../../../components/UI/Input/Input';
import classes from './SignUp.module.scss';
import { register } from '../../../services/auth/authService';
import * as actions from '../../../store/actions/authActions';
import { Link } from 'react-router-dom';
// ICONS
import showIconBox from './../../../assets/images/show-icon.png';

const SignIn = (props) => {
	const { authSignInSuccess, history } = props;
	const [ submitting, setSubmitting ] = useState(false);
	const [ showPassword, setShowPassword ] = useState(false);

	const first_name = useFormInput({
		name: 'username',
		rules: { required: true }
	});

	const last_name = useFormInput({
		name: 'username',
		rules: { required: true }
	});

	const username = useFormInput({
		name: 'username',
		rules: { required: true }
	});

	const password = useFormInput({
		name: 'password',
		rules: { required: true, minLength: 6 }
	});

	const email = useFormInput({
		name: 'email',
		rules: { required: true, email: true }
	});

	const togglePass = () => {
		setShowPassword((latestVal) => !latestVal);
	};

	const showIcon = (
		<i className={classes.iconWrapper} onClick={togglePass}>
			<img alt="show icon" src={showIconBox} />
		</i>
	);

	const formValid = isFormValid([ first_name, last_name, username, password, email ]);

	const collectFormData = () => ({
		first_name: first_name.value,
		last_name: last_name.value,
		username: username.value,
		email: email.value,
		password: password.value
	});

	const onSubmitHandle = (e) => {
		e.preventDefault();
		if (formValid) {
			setSubmitting(true);
			register(collectFormData())
				.then((resp) => {
					console.log(resp);
					history.push('/sign-in');
				})
				.catch((err) => {
					console.log(err.response);
					const errData = err.response.data;

					// @TODO check with backend in which format the error messages will be
					if (errData.hasOwnProperty('message')) {
						toaster.danger(errData.message || err.response.statusText);
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
				<h1>Welcome</h1>
				<p>Create your account</p>
				<form className={classes.form} onSubmit={onSubmitHandle}>
					<TextInput label="first name" {...first_name} />
					<TextInput label="last Name" {...last_name} />
					<TextInput label="username" {...username} />

					<TextInput label="email" {...email} />

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
				Allready have an account? <Link to="/sign-in">Sign in</Link>
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
