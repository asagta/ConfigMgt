import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './Routes';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import * as serviceWorker from './serviceWorker';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));