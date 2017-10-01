import React, {Component} from 'react';
import './App.css';
import './Chat.css';
import Header from "./Header";
import {Form, FormControl, FormGroup, Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import './Login';

var firebase = require('firebase');


class ChatRoom extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newMsg: "",
            messages: []
        };

    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSendHandler(e) {
        if (!this.state.newMsg) {
            return;
        }
        var newMessage = {
          name: "vidya",
          body: this.state.newMsg
        };
        this.state.messages.push(newMessage);
        this.forceUpdate();
        this.setState({"newMsg": ""});
    }


    render() {
        return (
            <div className="App">
                <Header/>
                <div class="container">
                    <div class="row">
                        <div>
                            <div class="panel panel-primary">
                                <div class="panel-heading">
                                    <span class="glyphicon glyphicon-comment"></span> Chat
                                    {/*<div class="btn-group pull-right">
                                        <button type="button" class="btn btn-default btn-xs dropdown-toggle"
                                                data-toggle="dropdown">
                                            <span class="glyphicon glyphicon-chevron-down"></span>
                                        </button>
                                        <ul class="dropdown-menu slidedown">
                                            <li><a href="http://www.jquery2dotnet.com"><span
                                                class="glyphicon glyphicon-refresh">
                                            </span>Refresh</a></li>
                                            <li><a href="http://www.jquery2dotnet.com"><span
                                                class="glyphicon glyphicon-ok-sign">
                                            </span>Available</a></li>
                                            <li><a href="http://www.jquery2dotnet.com"><span
                                                class="glyphicon glyphicon-remove">
                                            </span>Busy</a></li>
                                            <li><a href="http://www.jquery2dotnet.com"><span
                                                class="glyphicon glyphicon-time"></span>
                                                Away</a></li>
                                            <li class="divider"></li>
                                            <li><a href="http://www.jquery2dotnet.com"><span
                                                class="glyphicon glyphicon-off"></span>
                                                Sign Out</a></li>
                                        </ul>
                                    </div>*/}
                                </div>
                                <div class="panel-body">
                                    <ul class="chat">
                                        {this.state.messages.map(message => {
                                            return(<li class="left clearfix">
                                            <span class="chat-img pull-left">
                                                <img src="http://placehold.it/50/55C1E7/fff&text=U" alt="User Avatar"
                                                     class="img-circle"/>
                                            </span>
                                                <div class="chat-body clearfix">
                                                    <div class="header">
                                                        <strong class="primary-font">{message.name}</strong>
                                                        <small class="pull-right text-muted">
                                                            <span class="glyphicon glyphicon-time"></span>{message.time}
                                                        </small>
                                                    </div>
                                                    <p>
                                                        {message.body}
                                                    </p>
                                                </div>
                                            </li>);

                                        })}
                                    </ul>
                                </div>
                                <div class="panel-footer">
                                    <div>
                                        <Form inline>
                                                <FormControl
                                                    id="btn-input"
                                                    name="newMsg"
                                                    type="text"
                                                    placeholder="Type your message here..."
                                                    onChange={this.handleChange.bind(this)}
                                                    value={this.state.newMsg}>
                                                </FormControl>
                                                    <Button
                                                        bsStyle="success"
                                                        onClick={this.onSendHandler.bind(this)}
                                                        id="btn-chat">Send
                                                    </Button>

                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChatRoom;