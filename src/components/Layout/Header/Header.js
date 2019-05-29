import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import classes from './Header.module.scss';

const Header = (props) => {
	const { appIsLoading, loggedUser } = props;

	return (
		<header className={classes.header}>
			<Link to="/" className={classes.logo}>
				<h1>hotels</h1>
			</Link>

			{!appIsLoading ? (
				<nav>
					{!loggedUser ? (
						<Fragment>
							<NavLink activeClassName={classes.activeLink} to="/sign-up">
								Sign Up
							</NavLink>
							<NavLink activeClassName={classes.activeLink} to="/sign-in">
								Sign In
							</NavLink>
						</Fragment>
					) : (
						<Fragment>
							<NavLink activeClassName={classes.activeLink} to="/dashboard">
								Dashboard
							</NavLink>
							<NavLink activeClassName={classes.activeLink} to="/favorites">
								Favorites
							</NavLink>
							<span>{loggedUser.email}</span>
							<Link to="/sign-out" className={classes.logo}>
								Sign Out
							</Link>
						</Fragment>
					)}
				</nav>
			) : null}
		</header>
	);
};

const mapStateToProps = (state) => {
	return {
		loggedUser: state.user,
		appIsLoading: state.auth.loading
	};
};

export default connect(mapStateToProps)(Header);
