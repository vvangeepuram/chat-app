import React, { Component } from 'react';
import {FormControl, FormGroup, Button} from 'react-bootstrap';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    getEmailValidationState() {
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(this.state.email) ? "success" : "error";
    }

    getPasswordValidationState() {
        const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return reg.test(this.state.password) ? "success" : "error";
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Chat Application</h1>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
        </header>
          <form>
              <FormGroup
                validationState={this.getEmailValidationState()}>
                  <FormControl
                      id="email"
                      name="email"
                      type="text"
                      value={this.state.email}
                      onChange={this.handleChange}
                      placeholder="email">

                  </FormControl>
              </FormGroup>
              <FormGroup
                validationState={this.getPasswordValidationState()}>
                  <FormControl
                      name="password"
                      type="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      placeholder="password">

                  </FormControl>
              </FormGroup>
              <FormGroup>
                  <Button bsStyle="success" bsSize="large">Login</Button>
              </FormGroup>
              <p>New User? <a onClick={this.handleChange}> Signup</a></p>
          </form>
      </div>
    );
  }
}

export default App;
