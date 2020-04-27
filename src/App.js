import React from 'react';
import { Router } from '@reach/router'
import About from './pages/About/About'
import Contact from './pages/Contact.jsx'
import Portfolio from './pages/Portfolio.jsx'
import Blog from './pages/Blog.jsx'
import Home from './pages/Home.jsx'
import ResponsiveNavigation from './components/ResponsiveNavigation'
import logo from './Logo.png';
import './App.css';

function App() {
	const navLinks = [
		{
			text: 'Home',
			path: '/',
			icon: 'ion-ios-home'
		},
		{
			text: 'Marketplace',
			path: '/Marketplace',
			icon: 'ion-ios-cart'
		},
		{
			text: 'Contact',
			path: '/contact',
			icon: 'ion-ios-megaphone'
		},
		{
			text: 'About',
			path: '/about',
			icon: 'ion-ios-business'
		},
		{
			text: 'Login',
			path: '/Login',
		},
		
	]

	return (
		<div className="App">
			<ResponsiveNavigation
				navLinks={ navLinks }
				logo={ logo }
				background="#95C4B1"
				hoverBackground="#ddd"
				linkColor="#fff"
			/>
			<Router>
				<Contact path="/contact" />
				<Home path="/home" />
				<About path="/about" />
			</Router>
		</div>
	);
}
export default App;
