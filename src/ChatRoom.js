import React, {Component} from 'react';
import './App.css';
import Header from "./Header";
import {FormControl, FormGroup, Button} from 'react-bootstrap';


class ChatRoom extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newMsg: "",
            messages: [
                  {
                      name: "Test",
                      body: "Test body"
                  },
                  {
                      name: "Test2",
                      body: "Test body 2"
                  }
            ]
        };

    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSendHandler(e) {
        var newMessage = {
          name: "vidya",
          body: this.state.newMessage
        };
        this.state.messages.push(newMessage);
    }


    render() {
        return (
            <div className="App">
                <Header/>
                <div class="container">
                    <div class="row">
                        <div class="col-md-5">
                            <div class="panel panel-primary">
                                <div class="panel-heading">
                                    <span class="glyphicon glyphicon-comment"></span> Chat
                                    <div class="btn-group pull-right">
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
                                    </div>
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
                                    <div class="input-group">
                                        <form>
                                            <FormGroup>
                                                <FormControl
                                                    id="btn-input"
                                                    name="newMsg"
                                                    type="text"
                                                    class="form-control input-sm"
                                                    placeholder="Type your message here..."
                                                    onChange={this.handleChange.bind(this)}
                                                    value={this.state.newMsg}>
                                                </FormControl>
                                                <span class="input-group-btn">
                                                    <Button
                                                        class="btn btn-warning btn-sm"
                                                        onClick={this.onSendHandler.bind(this)}
                                                        id="btn-chat">Send
                                                    </Button>
                                                </span>

                                            </FormGroup>
                                        </form>
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