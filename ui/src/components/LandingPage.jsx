import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import bookLogo from '../images/book.png';

class LandingPage extends Component {
  render() {
    return (
      <div>
        <h1>Diary App</h1>
        <img width="400" height="400" src={bookLogo} alt="Notebook"/>
        <br/>
        <Link to="/login" className="button">Get Started</Link>
      </div>
    );
  }
}

export default LandingPage;
