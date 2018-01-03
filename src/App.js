import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import AppApi from './utils/AppApi.js';
import Calendar from './components/Calendar.js';
import EventView from './components/EventView.js';
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
      data : {},
      EventViewActive : false,
      currentItem : undefined
    }
    this.handleItem = this.handleItem.bind(this);
    this.dismissHandler = this.dismissHandler.bind(this);
  }

  componentDidMount(){
    AppApi.getSheet().then((response)=>{
      this.setState({
        loading : false,
        data : response.data
      })
    });
  }

  handleItem(row){
    if(row[1]){
      this.setState({
        EventViewActive : true,
        currentItem : row
      })
    }
  }

  dismissHandler(){
    this.setState({
      EventViewActive : false
    });
  }

  renderDays(){
    var calItems = this.state.data.values.map((row,index)=> {
      return (<Calendar.Item data={row} onClick={() => this.handleItem(row)} key={index} date={moment(row[0],"D/MM/YYYY")} color={row[1]}></Calendar.Item>)
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
      <div>
        <div className={"container-app "+(this.state.EventViewActive ? "background-blur":"")}>
          <Row>
            <Col md={10}>
              <h2>YearInPixels</h2>
            </Col>
            <Col md={2} className="text-right">
              <h2>{moment().year()}</h2>
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
        <EventView parent={this} dismissHandler={this.dismissHandler} active={this.state.EventViewActive} data={this.state.currentItem}/>
      </div>
    );
  }

  render() {
    return (this.state.loading ? (
      <div className={"event-view"}><h1 className="loader-text">Loading...</h1></div>
    ) : (this.renderMain()));
  }
}

export default App;
