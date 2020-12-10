import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/Home';
import Diary from './components/Diary';
import Login from './components/Login';
import Logout from './components/Logout';

import LandingPage from './components/LandingPage';
import Cookies from 'js-cookie';

import { isAuthenticated } from './utilities/auth';
import { AuthenticatedRoute } from './components/AuthenticatedRoute';



import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

Cookies.set('test', "COOKIE");

let nav;
if (isAuthenticated()) {
  nav = (
    <nav>
      <div>
        <Link to="/">Landing Page</Link>
      </div>
      <div>
        <Link to="/logout">Logout</Link>
      </div>
    </nav>
    );
} else {
  nav = (
    <nav>
      <div>
        <Link to="/">Landing Page</Link>
      </div>
      <div>
        <Link to="/login">Login / Register</Link>
      </div>
    </nav>
    );
}



const routing = (

  <Router>
    {nav}
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/logout" component={Logout} />
    <AuthenticatedRoute exact path = "/home" component={Home} />
    <AuthenticatedRoute exact path="/diary/:id" component={Diary} />
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
