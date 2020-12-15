import React, {Component} from 'react';
import axios from 'axios';
import {getUserId} from '../utilities/auth';
import {getToday, convertToArr,showDate} from '../utilities/time';
import qs from 'qs';
import './Home.css';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user_id: getUserId(),
      title: '',
      content:'',
      entries: []
    };
  }

  getAllEntries = () =>{
    axios.get("/api/getAllEntries")
      .then(res => res.data)
      .then(res => {
        this.setState({entries: convertToArr(res)});
        console.log(this.state.entries);
      });
  }

  deleteEntryCall = (id) => {
    return axios({
      method: 'delete',
      url: '/api/deleteEntry',
      data: qs.stringify({
        id: id
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    });
  }

  componentDidMount = () => {
    this.getAllEntries();

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
    }).then((res)=>{
      this.getAllEntries();
    });
  }

  handleEdit = (id) =>{
   window.location = `/edit-entry/${id}`;
  }

  handleDelete = (index,id) =>{
    console.log(index,id);
    let deleteE = this.state.entries;
    deleteE.splice(index,1);
    this.setState({entries:deleteE});
    console.log(deleteE);
    this.deleteEntryCall(id);


  }

  render() {
    return (

      <div className="Courier">
        <h1 className='Courier'>
          Home: {getToday()}
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
                  className='home-content'
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
        <h1> Your Diaries </h1>
        {this.state.entries.map((entry,index) => (
          <div className='entry-card' key={index}>
            <div>
              {showDate(entry.timeCreated)}
            </div>
            <a href={`entry/${entry.id}`}>{entry.title}
            </a>
            <div style={{"display":"flex"}}>
              <div style={{"marginRight":"10px"}} onClick={() => this.handleEdit(entry["id"])}>edit </div>
              <div onClick={() => this.handleDelete(index, entry["id"])}> delete </div>
            </div>
          </div>
        ))}

      </div>
    );
  }
}





export default Home;
