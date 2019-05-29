import React from 'react';
import Header from './Header/Header';
import './Layout.scss';

const Layout = (props) => {
	return (
		<div className="app">
			<Header/>
			<section>
				{/* <aside>aside</aside> */}
				<main>{props.children}</main>
			</section>
			{/* <footer>footer</footer> */}
		</div>
	);
};

export default Layout;
