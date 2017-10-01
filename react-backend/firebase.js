var firebase = require('firebase');


var createUser = function(name, email, password, callback) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
       var ref = firebase.database().ref("user/" + user.uid).set({
           name: name,
           email: email
        });
       callback();

    }, err => {
        var errorCode = err.code;
        var errorMessage = err.message;
        callback(errorMessage);
    });

};

exports.createUser = createUser;