var express = require('express');
var router = express.Router();
var firebase = require('../firebase');

/* GET home page. */

router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });

});

router.post('/createUser', (req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    console.log(name, email, password, req.body);
    firebase.createUser(name, email, password, err => {
        if (err) {
            res.json({
                "success": false,
                "message": err
            });
        } else {
            res.json({
                "success": true
            });
        }

    })
})

module.exports = router;
