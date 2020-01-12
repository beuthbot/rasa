var express = require('express');
var router = express.Router();
var request = require('request');


/* GET home page. */
router.post('/', function (req, res, next) {
    request.post({
        headers: { 'content-type': 'application/json' },
        url: 'http://rasa:5005/model/parse',
        body: '{"text": "' + req.body['text'] + '" }'
    },
        function (error, response, body) {
            b = JSON.parse(response.body);
            console.log(b['intent']);
            res.send(b['intent']);
        })
});

module.exports = router;
