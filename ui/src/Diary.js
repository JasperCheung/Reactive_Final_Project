import React, { Component } from 'react';


class Diary extends Component {
  constructor(props) {
    super(props);
    this.state = { message: 'not loaded'};
  }



  componentDidMount = () => {
    fetch('api/summary')
      .then(response => response.json())
      .then(data =>{ console.log(data);
                     this.setState({
                       message: "hi"
                     });
                   });
  }
  render = () => {
    return (
      <div>
        {this.state.message}
      </div>
      );
  }
};



export default Diary;
