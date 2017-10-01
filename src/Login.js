import React, { Component } from 'react';
import {FormControl, FormGroup, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './App.css';
import './Header.js';
import Header from "./Header";
var firebase = require("firebase");

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    getEmailValidationState() {
        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(this.state.email) ? "success" : "error";
    }

    getPasswordValidationState() {
        const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return reg.test(this.state.password) ? "success" : "error";
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmitHandler(e) {
        var LoginUser = function(email, password, callback) {

            firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
               /*this.context.user = firebase.auth().currentUser{
                  this.context.email = this.state.email;
                  this.context.password = this.state.password;
                   //send them to chat
                   <ChatRoom/>

                }*/
            }, err => {
                alert ("Please try agin");
                // Show the login page again
            });
        }
    }


    render() {

        return (
            <div className="App">
                <Header/>
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
                        <Button bsStyle="success"onClick={this.onSubmitHandler.bind(this)} bsSize="large">Login</Button>
                    </FormGroup>
                    <p>New User? <Link to="/signup"> Signup</Link></p>
                </form>
            </div>
        );
    }
}

export default Login;
