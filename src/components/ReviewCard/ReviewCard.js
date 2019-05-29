import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'evergreen-ui';
import classes from './ReviewCard.module.scss';
import Paper from '../../components/UI/Paper/Paper';

function ReviewCard(props) {
	const { data } = props;

	return (
		<Paper className={classes.container}>
			<Icon className={classes.coverImage} icon="user" />
			<div className={classes.mainContent}>
				<section>
					<h3>{`${data.author.first_name} ${data.author.last_name}`}</h3>
					<span className={[ classes.reaction, data.positive ? classes['reaction--good'] : '' ].join(' ')}>
						<Icon icon={data.positive ? 'thumbs-up' : 'thumbs-down'} />
					</span>
					<p>{data.message}</p>
				</section>
			</div>
		</Paper>
	);
}

const mapStateToProps = (state) => {
	return {
		token: state.auth.accessToken
	};
};

export default connect(mapStateToProps)(ReviewCard);
