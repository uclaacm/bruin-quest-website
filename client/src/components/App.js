import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from '../hoc/auth';
// pages for this product
import LandingPage from './views/LandingPage/LandingPage.js';
import LoginPage from './views/LoginPage/LoginPage.js';
import RegisterPage from './views/RegisterPage/RegisterPage.js';
import ScoreboardPage from './views/ScoreboardPage/ScoreboardPage.js';
import MapPage from './views/MapPage/MapPage.js';
import GeneralAreaPage from './views/GeneralAreaPage/GeneralAreaPage.js';
import AdminPage from './views/AdminPage/AdminPage.js';
import PuzzlePage from './views/PuzzlePage/PuzzlePage.js';
import NavBar from './views/NavBar/NavBar';
import NotFound from './views/NotFound/NotFound.js';

// null   Anyone Can go inside
// true   only logged in user can go inside
// false  logged in user can't go inside

function App() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<NavBar />
			<div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
				<Switch>
					<Route exact path="/" component={Auth(LandingPage, null)} />
					<Route exact path="/login" component={Auth(LoginPage, false)} />
					<Route exact path="/register" component={Auth(RegisterPage, false)} />
					<Route
						exact
						path="/scoreboard"
						component={Auth(ScoreboardPage, true)}
					/>
					<Route exact path="/map" component={Auth(MapPage, true)} />
					<Route
						exact
						path="/area/:id"
						component={Auth(GeneralAreaPage, true)}
					/>
					<Route exact path="/admin" component={Auth(AdminPage, true, true)} />
					<Route exact path="/puzzle/:id" component={Auth(PuzzlePage, true)} />
					<Route component={Auth(NotFound, true)} />
				</Switch>
			</div>
		</Suspense>
	);
}

export default App;
