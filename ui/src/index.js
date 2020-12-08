import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Diary from './Diary';


import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

const routing = (
 
    <Router>

      <Route exact path="/" component={App} />
      <Route exact path="/Diary" component={Diary} />
      
    </Router>
  
);

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
