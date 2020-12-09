import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/Home';
import Diary from './components/Diary';
import Login from './components/Login';
import Cookies from 'js-cookie';



import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

Cookies.set('test', "COOKIE");
const routing = (
 
  <Router>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    
    <Route exact path="/Diary" component={Diary} />
    
  </Router>
  
);

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
