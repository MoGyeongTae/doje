import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Header from './components/shared-components/Header';
import Footer from './components/shared-components/Footer';
import NoMatch from './components/shared-components/NoMatch';

import Board from './components/Board/Board';
import Add from './components/Board/Add';
import Modify from './components/Board/Modify';

import Register from "./components/Register/Register";
import Login from './components/Login/Login'


import Main from './components/Main/Main';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/board/:idx" component={Board} />
            <Route path="/modify/:idx" component={Modify} />
            <Route path="/add" component={Add} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route component={NoMatch} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
