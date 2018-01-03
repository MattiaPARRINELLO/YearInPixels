import React, { Component } from 'react';
import axios from 'axios';

export default class InstagramImage extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : props.data,
            img : props.img,
            url : undefined
        }
    }

    componentDidMount(){
        this.cacheOrGet();
    }

    componentWillReceiveProps(props){
        this.setState({
            data : props.data,
            img : props.img,
            url : undefined
        });

        this.cacheOrGet();
    }

    cacheOrGet(){
        var cache = localStorage.getItem("ig_" + this.state.img);
        if(!cache && this.state.img){
            this.getIGImage(this.state.img).then((response) => {
                this.setState({
                    url : response.data.thumbnail_url
                })
                localStorage.setItem("ig_" + this.state.img, response.data.thumbnail_url);
            });
        }else{
            this.setState({
                url : cache
            })  
        }
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