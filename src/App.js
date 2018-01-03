import React, { Component } from 'react';
import AppApi from './utils/AppApi.js';
import Calendar from './components/Calendar.js';
import moment from 'moment';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading : true,
      data : {}
    }
  }

  componentDidMount(){
    AppApi.getSheet().then((response)=>{
      this.setState({
        loading : false,
        data : response.data
      })
    });
  }

  renderDays(){
    return this.state.data.values.map((row,index)=> {
      return (<Calendar.Item key={index} date={moment(row[0],"D/MM/YYYY")} color={row[1]}></Calendar.Item>)
    });
  }
  renderMain(){
    return (
      <div className="container">
        <h1>YearInPixels</h1>
        <Calendar>
          {this.renderDays()}
        </Calendar>
      </div>
    );
  }

  render() {
    return (this.state.loading ? (<h1>Loading</h1>) : (this.renderMain()));
  }
}

export default App;
