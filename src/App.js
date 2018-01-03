import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import AppApi from './utils/AppApi.js';
import Calendar from './components/Calendar.js';
import moment from 'moment';

const day_types = {
  0 : "Fantastic Day",
  1 : "Joyful Day",
  2 : "Average Day",
  3 : "Exhausted Tiring Day",
  4 : "Depressing Day",
  5 : "Flustrated Angerfilled Day",
  6 : "Stressful Frantic Day",
}
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
    var calItems = this.state.data.values.map((row,index)=> {
      return (<Calendar.Item key={index} date={moment(row[0],"D/MM/YYYY")} color={row[1]}></Calendar.Item>)
    });
    for (var i = 0; i < 30; i++) {
      calItems.push(<Calendar.Item key={i+"_blank"} blank></Calendar.Item>)
    }
    return calItems;
  }

  makelegend(){
    var items = [];
    for(var i=0; i < 6; i++){
      items.push(
        <Col md={2} key={i}>
          <Row>
            <Col xs={2}><Calendar.Item color={i}></Calendar.Item></Col>
            <Col xs={10}><p className="cal-legend-text">{day_types[i]}</p></Col>
          </Row>
        </Col>
      );
    }
    return items;
  }

  renderMain(){
    return (
      <div className="container-app">
        <Row>
          <Col md={8}>
            <h1>YearInPixels</h1>
          </Col>
          <Col md={4} className="text-right">
            <h1>{moment().year()}</h1>
          </Col>
        </Row>
        <Calendar data={this.props.data}>
          {this.renderDays()}
        </Calendar>
        <hr/>
        <Row>
          {this.makelegend()}
        </Row>
      </div>
    );
  }

  render() {
    return (this.state.loading ? (
      <h1 className="loader-text">Loading</h1>
    ) : (this.renderMain()));
  }
}

export default App;
