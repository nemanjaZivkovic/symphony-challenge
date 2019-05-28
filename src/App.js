import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import TopNews from './containers/TopNews/TopNews';
import Search from './containers/Search/Search';

function App(props) {
  const {history} = props;
	
	// as this is single page application we need to 'manually' scroll to top on each route change
  history.listen(()=> window.scrollTo(0, 0));
  
	return (
		<Layout>
			<Switch>
				<Route path="/top-news" component={TopNews} />
				<Route path="/search" component={Search} />
				<Redirect to="/top-news" />
			</Switch>
		</Layout>
	);
}

export default withRouter(App);
