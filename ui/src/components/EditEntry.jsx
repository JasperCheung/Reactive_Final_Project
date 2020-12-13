import React, { Component } from 'react';
import axios from 'axios';
import {getUserId} from '../utilities/auth';
import {getToday} from '../utilities/time';
import qs from 'qs';
import Spinner from '../utilities/Spinner';

class EditEntry extends Component {
  constructor(props) {

    super(props);
    this.state = {
      user_id: getUserId(),
      entry_id: this.props.match.params.id,
      content:'',
      loading: true,
      success: false,
    };

  }

  handleSubmit = (e) => {
    e.preventDefault();
    return axios({
      method: 'post',
      url: '/api/updateEntry',
      data: qs.stringify({
        content: this.state.content,
        id: this.state.entry_id
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }).then(window.location = '/home');


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

  componentDidMount = () => {
    console.log("Edit Entry Mounted");
    axios.get(`/api/getEntry/${this.props.match.params.id}`)
      .then(res => res.data)
      .then(res => {
        console.log(res);
        this.setState({
          loading: false,
          content: res['content'],
          success: res['success'],
          title: res['title']
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({

          loading:false,
          success: false,
        });


      });
  }


  render = () => {
    if (this.state.loading) return  <Spinner />;
    else{
      if(this.state.success === false){
        return (<h1> ERROR</h1>);
      }else{

      return (

        <div className='Courier'>
          <h1>
            Today's Date: {getToday()}
          </h1>
          <div className='NewEntryForm'>
            <form id='contact-form' onSubmit={this.handleSubmit} noValidate>
              <div className='row'>
                <div className='col-6' style={{margin:'auto'}}>
                  <div
                    name='title'
                    className='title-dv'
                    placeholder='Title'
                    style={{width:"900px",fontSize: "25px", textAlign:"center",margin:'auto'}}


                  >{this.state.title}</div>
                </div>
                <div className='col-6'>
                  <textarea
                    rows='5'
                    name='content'
                    value={this.state.content}
                    className='content-form'
                    onChange={this.handleChange}
                    noValidate
                    style={{width:"900px",fontSize: "16px"}}
                  ></textarea>
                </div>
              </div>
              <button className='button' type='submit'>
                Edit
              </button>
            </form>
          </div>

        </div>);

      }
    }
  }
};



export default EditEntry;
