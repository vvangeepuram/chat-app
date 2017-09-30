import React, { Component } from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import './App.css';
import SignUp from "./SignUp";
import Login from "./Login";

class App extends Component {
  render() {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/signup" component={SignUp}/>
            </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
