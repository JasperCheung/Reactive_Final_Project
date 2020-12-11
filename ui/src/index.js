import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/Home';
import SingleEntry from './components/SingleEntry';
import NewEntry from './components/NewEntry';
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
        <Link to="/new-entry"> New Entry</Link>
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
    <AuthenticatedRoute exact path="/entry/:id" component={SingleEntry} />
    <AuthenticatedRoute exact path="/new-entry" component={NewEntry} />
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
