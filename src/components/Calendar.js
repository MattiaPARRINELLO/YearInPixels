import React, { Component } from 'react';
import moment from 'moment';

class Calendar extends Component {
    constructor(props){
      super(props);
    }  
    
    render() {
      return (
        <div className="cal-container">{this.props.children}</div>
      )
    }
}

class CalendarItem extends Component {
    constructor(props){
      super(props);
      this.state = {
          color : props.color,
          date : props.date
      }
    }  
    
    render() {
      return (
        <div className={"cal-item "+(moment().isSame(this.state.date,'day') ? "cal-outline":"")+" cal-color-"+this.props.color}>{this.props.children}</div>
      )
    }
}

Calendar.Item = CalendarItem;


export default Calendar;