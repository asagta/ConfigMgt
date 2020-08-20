import React from 'react'
import App2 from './App2';
import MainPage from './MainPage';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

const Routes = () => (
   <Router history={browserHistory}>
    <Route path = "configmgt" component = {App2}></Route>
    <Route key="mpage" path = "mainpage" component = {MainPage}></Route>
   </Router>
)
export default Routes