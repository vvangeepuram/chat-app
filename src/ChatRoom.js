import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './Chat.css';
import Header from "./Header";
import {Form, FormControl, Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import './Login';
var firebase = require("firebase");



class ChatRoom extends Component {

    constructor(props) {
        super(props);
        this.messagesRef = firebase.database().ref('chats/defaults');
        this.state = {
            newMsg: "",
            messages: []

        };

    }

    getMessages() {

        this.messagesRef.on('value', (snapshot) => {
            let messages = snapshot.val();
            let newMessages = [];
            for(let messageKey in messages) {
                newMessages.push({
                    name: messages[messageKey].name,
                    body: messages[messageKey].body,
                });
            }
            this.setState({messages: newMessages});
            this.scrollToBottom();
        });


    }

    scrollToBottom() {
        const node = ReactDOM.findDOMNode(this.refs.messagesEnd);
        if (node) {
            node.scrollIntoView({behavior: "smooth"});
        }
    }

    componentDidMount() {
        this.getMessages();
        this.messagesRef.on('child_added', snapshot => {
            let message = snapshot.val();
            this.state.messages.push(message);
            this.forceUpdate();
            this.scrollToBottom();
        });
    }



    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSendHandler(e) {
        if (!this.state.newMsg) {
            return;
        }
        var newMessage = {
          name: firebase.auth().currentUser.displayName,
          body: this.state.newMsg
        };
        firebase.database().ref("chats/defaults").push(newMessage);
        this.setState({"newMsg": ""});
        e.preventDefault();
        this.scrollToBottom();
    }


    render() {
        return firebase.auth().currentUser ? (
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
                                        <div style={{ float:"left", clear: "both" }}
                                             ref="messagesEnd">
                                        </div>
                                    </ul>
                                </div>
                                <div class="panel-footer">
                                    <div>
                                        <Form inline style={{width:"100%"}}>
                                                <FormControl
                                                    id="btn-input"
                                                    style={{width:"80%"}}
                                                    name="newMsg"
                                                    type="text"
                                                    placeholder="Type your message here..."
                                                    onChange={this.handleChange.bind(this)}
                                                    value={this.state.newMsg}>
                                                </FormControl>
                                                    <Button
                                                        bsStyle="success"
                                                        type="submit"
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
        ) : (<Redirect to="/"/>);
    }
}

export default ChatRoom;