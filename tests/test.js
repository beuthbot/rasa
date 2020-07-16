'use strict';
const axios = require('axios')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

const rasa_endpoint = process.env.RASA_ENDPOINT || "http://localhost:5005/model/parse"
const fs = require('fs');
const readline = require('readline');
var questions = [];

async function processLineByLine() {
    const fileStream = fs.createReadStream('test.txt');
    const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });
    for await (const line of rl) {
        questions.push(line)
    }
    console.log(questions)
}

processLineByLine();


function addParagraph(title, value) {
    return "<p><b>" + title + ":</b>  " + value + "</p>"
}


app.get('/', function (req, res) {

    let candidate = req.query.q
    if (candidate) {

        axios
            .post(rasa_endpoint, { "text": candidate })
            .catch(function (error) {
                console.log("error: " + error);
            })
            .then(function (rasaResponse) {
                let content = "<h1>" + candidate + "</h1>";
                content += addParagraph("text", rasaResponse.data.text)
                content += addParagraph("intent", rasaResponse.data.intent.name)
                content += addParagraph("confidence", rasaResponse.data.intent.confidence)
                content += addParagraph("entities", JSON.stringify(rasaResponse.data.entities, null, 4))
                content += addParagraph("all", JSON.stringify(rasaResponse.data, null, 4))
                content += "<p><a href='http://localhost:5010'>Back</a></p>";
                res.send(content);
                res.end();
            })

    } else {
        let content = "<h1>Rasa Tests</h1>";
        for (let i = 0; i < questions.length; i++) {
            let question = questions[i]
            let questionRef = question.replace(" ", "+");
            content += "<p><a href='http://localhost:5010/?q=" + questionRef + "'>" + question + "</a></p>";
        }
        res.send(content)
        res.end()
    }
})

// start server
app.listen(5010, function () {
    console.log("start server rasa tests")
})