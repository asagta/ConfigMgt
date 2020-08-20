import React from 'react';
import logo from './logo.svg';
import Routes from './Routes';
import './App.css';
import { withRouter } from 'react-router-dom'

 class App extends React.Component {
  constructor(props)
  {super(props);}
  render()
  {
    console.log(this.props);
    return (<Routes/>);
  }
}

export default App;
