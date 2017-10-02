import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Header from "./Header";
import {FormControl, FormGroup, Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';

var firebase = require("firebase");


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            redirectToChatRoom: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    getNameValidationState() {
        return this.state.name.length > 0 ? "success" : "error";
    }


    getEmailValidationState() {
        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(this.state.email) ? "success" : "error";
    }

    getPasswordValidationState() {
        const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return reg.test(this.state.password) ? "success" : "error";
    }

    getConfirmPasswordValidationState() {
        return (this.getPasswordValidationState() === "success" && this.state.confirmPassword === this.state.password) ?
            "success" : "error";
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmitHandler(e) {
        if (this.getNameValidationState() === "success" && this.getPasswordValidationState() === "success" &&
            this.getEmailValidationState() === "success" && this.getConfirmPasswordValidationState() === "success") {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(user => {
                user.updateProfile({
                    displayName: this.state.name
                })
            }, err => {
                alert("error");
            });

        }
        this.setState({redirectToChatRoom: true});
    }



    render() {

        return (
            <div className="App">
                <Header/>
                <form>
                    <FormGroup
                        validationState={this.getNameValidationState()}>
                        <FormControl
                            id="name"
                            name="name"
                            type="text"
                            value={this.state.name}
                            onChange={this.handleChange}
                            placeholder="name">

                        </FormControl>
                    </FormGroup>
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
                    <FormGroup
                        validationState={this.getConfirmPasswordValidationState()}>
                        <FormControl
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            placeholder="confirmPassword">

                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <Button bsStyle="success" onClick={this.onSubmitHandler.bind(this)}
                                bsSize="large">Signup</Button>
                    </FormGroup>
                    <p> Already have an account? <Link to="/">Login</Link></p>
                </form>
                {this.state.redirectToChatRoom && <Redirect to="/chatroom"/>}
            </div>

        )
    }
}

export default SignUp;