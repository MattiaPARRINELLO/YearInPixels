import React, { Component } from 'react';
import moment from 'moment';

class Calendar extends Component {    
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
          date : props.date,
          isToday : props.date ? moment().isSame(props.date,'day') : false,
          blank : props.blank
      }
    }  
    
    render() {
      return (
        <div className={(this.props.blank ? "cal-blank ": "cal-item")+" "+(this.state.isToday ? "cal-outline":"")+" cal-color-"+this.props.color}>{this.props.children}</div>
      )
    }
}

Calendar.Item = CalendarItem;


export default Calendar;