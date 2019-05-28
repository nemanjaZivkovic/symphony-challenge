import React, { useState } from 'react';
import WindowSizeListener from 'react-window-size-listener';
import Link from '../../UI/Link/Link';
import LanguageSelect from './LanguageSelect/LanguageSelect';
import SearchIcon from '../../../assets/icons/search-512.png';
import classes from './Header.module.scss';

function Header() {
	const [ iconOnly, setIconOnly ] = useState(false);
	const Search = <img src={SearchIcon} alt="search" />;
	return (
		<header className={classes.header}>
			<WindowSizeListener
				onResize={({ windowWidth }) => {
					setIconOnly(windowWidth < 470 ? true : false);
				}}
			/>
			<ul>
				<li>
					<Link navlink={true} activeClassName={classes.activeLink} to="/top-news">
						top news
					</Link>
				</li>
				<li>
					<Link navlink={true} activeClassName={classes.activeLink} to="/categories">
						categories
					</Link>
				</li>
				<li>
					<Link navlink={true} activeClassName={classes.activeLink} to="/search">
						{iconOnly ? Search : 'search'}
					</Link>
				</li>
			</ul>

			<LanguageSelect />
		</header>
	);
}

export default Header;
