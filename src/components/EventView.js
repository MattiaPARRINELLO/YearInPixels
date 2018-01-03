import React, { Component } from 'react';
import moment from 'moment';
import InstagramImage from './InstagramImage.js';

class EventView extends Component {
    constructor(props){
      super(props);
      this.state = {
        active : false,
        data : [],
        date : undefined
      }
    }

    componentWillReceiveProps(props){
      this.setState({
        active : props.active,
        data : props.data,
        date : moment(props.data[0],"D/MM/YYYY")
      });
    }
    
    render() {
      return (
        <div className={"event-view "+ ( !this.state.active ? "hide" : "" )}>
          <div className={"event-view-container"}>
            <a onClick={this.props.dismissHandler} className={"float-right"}>
              <i className="fa fa-times fa-2x" aria-hidden="true"></i>
            </a>
            <h3>{moment(this.state.date).format("dddd, MMMM Do YYYY")}</h3>
            <p>{this.state.data[2]}</p>
            <div className="text-center">
              {this.state.data[3] ? <InstagramImage alt="IG" img={this.state.data[3]}/> : []}
            </div>
          </div>
        </div>
      )
    }
}

export default EventView;