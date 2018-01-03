import React, { Component } from 'react';
import axios from 'axios';

export default class InstagramImage extends Component {
    constructor(props){
      super(props);
      this.state = {
        url : undefined
      }
    }

    componentWillReceiveProps(props){
      this.setState({
        data : props.data,
        img : props.img,
        url : undefined
      });
      if(props.img){
        this.getIGImage(props.img).then((response) => {
          this.setState({
            url : response.data.thumbnail_url
          })
          console.log(this.state.url);
        });
      };
    }

    getIGImage(img_url){
      return axios({
        method: 'get',
        url: 'https://api.instagram.com/oembed/',
        params: {
          url: img_url,
        }
      });
    }
    
    render() {
      if (this.state.url) {
          return (<img alt={this.props.alt} src={this.state.url} className={"insta-image"}/>);
      }else {
          return (<p>Loading image...</p>);
      }
    }
}