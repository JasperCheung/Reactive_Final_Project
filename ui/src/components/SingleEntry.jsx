import React, { Component } from 'react';
import axios from 'axios';
import {getUserId} from '../utilities/auth';
import {showDate} from '../utilities/time';
import Spinner from '../utilities/Spinner';



class SingleEntry extends Component {
  constructor(props) {

    super(props);
    this.state = {
      loading: true,
      entry_id: this.props.match.params.id,
      user_id: getUserId(),
      content: "",
      date: "",
      title: "",
      success: false,
    };
  }


  componentDidMount = () => {
    console.log("Single Entry Mounted");
    axios.get(`/api/getEntry/${this.props.match.params.id}`)
      .then(res => res.data)
      .then(res => {
        console.log(res);
        this.setState({
          loading: false,
          content: res['content'],
          date: res['timeCreated'],
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
      }
      else{
        return (
          <div className='Courier' >
            <h1>
              Last Updated: {showDate(this.state.date)}
            </h1>
            <div className='NewEntryForm'>

              <div className='row'>
                <div className='col-6' style={{margin:'auto'}}>
                  <div
                    name='title'

                    className='title-dv'
                    placeholder='Title'
                    style={{width:"900px",fontSize: "25px", textAlign:"center",margin:'auto'}}


                  > {this.state.title} </div>
                </div>

                <div className='col-6'>
                  <div
                    name='content'
                    className='content'
                    noValidate
                    style={{width:"900px",fontSize: "16px"}}
                  >
                    {this.state.content}
                  </div>
                </div>
              </div>


            </div>


          </div>
        );
      }
    }
  }
};



export default SingleEntry;
