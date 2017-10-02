var firebase = require('firebase');


var createUser = function(name, email, password, callback) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
        user.updateProfile({
            displayName: name
        });
       callback();

    }, err => {
        var errorCode = err.code;
        var errorMessage = err.message;
        callback(errorMessage);
    });

};

exports.createUser = createUser;