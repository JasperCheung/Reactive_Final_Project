import React, { Component } from 'react';
import axios from 'axios';
import {getUserId} from '../utilities/auth';



class SingleEntry extends Component {
  constructor(props) {

    super(props);
    this.state = { message: 'not loaded',
                   diary_id: this.props.match.params.id,
                   user_id: getUserId()
                 };

  }


  componentDidMount = () => {
    // call single entry


  }

  render = () => {
    return (
      <div>
        Diary Id: {this.state.diary_id}
        User Id: {this.state.user_id}

      </div>
      );
  }
};



export default SingleEntry;
