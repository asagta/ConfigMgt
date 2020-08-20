import React, { Component } from 'react';
import './App.css'

class Splash extends Component {
  render() { 
    return (<div className="modal" style={{display:this.props.vis}}>
    <center><div className="loader"></div></center> 
    <center><div style={{color:'white',fontSize:'25px',marginTop:'3%'}}>Loading... Pls Wait... Patience is Gold</div></center> 
    </div>);
  }
}

export default Splash;