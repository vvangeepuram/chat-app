import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import registerServiceWorker from './registerServiceWorker';

var firebase = require("firebase");
var config = {
    apiKey: "AIzaSyCVFrRrDCWwn-G9JZP4RRmXejh3ujgyX9w",
    authDomain: "chat-app-c0800.firebaseapp.com",
    databaseURL: "https://chat-app-c0800.firebaseio.com",
    projectId: "chat-app-c0800",
    storageBucket: "",
    messagingSenderId: "721219999146"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
