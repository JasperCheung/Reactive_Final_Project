import React, { Component } from 'react';
import axios from 'axios';
import {getUserId} from '../utilities/auth';
import {getToday} from '../utilities/time';
import qs from 'qs';





class NewEntry extends Component {
  constructor(props) {

    super(props);
    this.state = {
      user_id: getUserId(),
      title: '',
      content:'',
    };

  }

  handleSubmit = (e) => {
    e.preventDefault();
    return axios({
      method: 'post',
      url: '/api/createEntry',
      data: qs.stringify({
        title: this.state.title,
        content: this.state.content,
        uid: this.state.user_id
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }).then(window.location = '/home');
    console.log(this.state.title);
    console.log(this.state.content);


  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    switch (name) {
    case 'title':
      this.setState({title:value});

      break;
    case 'content':
      this.setState({content:value});
      break;
    default:
      break;
    }
  };



  render = () => {
    return (
      <div className='noScroll'>
        <h1>
          Today's Date: {getToday()}
        </h1>
        <div className='NewEntryForm'>
          <form id='contact-form' onSubmit={this.handleSubmit} noValidate>
            <div className='row'>
              <div className='col-6'>
                <input
                  type='text'
                  name='title'
                  value={this.state.title}
                  className='name-form'
                  onChange={this.handleChange}
                  placeholder='Title'
                  style={{width:"900px",fontSize: "25px"}}
                  noValidate
                ></input>

              </div>

              <div className='col-6'>
                <textarea
                  rows='5'
                  name='content'
                  value={this.state.message}
                  className='content-form'
                  onChange={this.handleChange}
                  placeholder='Today I ...'
                  noValidate
                  style={{width:"900px",fontSize: "16px"}}
                ></textarea>
              </div>
            </div>
            <button className='button' type='submit'>
              Submit
            </button>
          </form>
        </div>

      </div>
    );
  }
};



export default NewEntry;
