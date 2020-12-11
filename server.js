const express = require("express");
const app = express();
const path = require("path");
const fetch = require("node-fetch");
require("dotenv").config();
const grammarToken = process.env.GRAMMAR_API_KEY

const PORT = process.env.PORT || 8000; 

app.use(express.static("dist"));

app.get("/", (request, res) => {
    res.sendFile(path.join(__dirname, "./dist/index.html"));
})

app.listen(PORT, () => {
    console.log(__dirname);
    console.log(`listening on ${PORT}`);
});

app.post('/grammarcheck', (req, res) => {
    // console.log(req.query.text)
    fetch(`https://grammarbot.p.rapidapi.com/check?text=${req.query.text}`, 
        {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'x-rapidapi-key': `${grammarToken}`,
                'x-rapidapi-host': 'grammarbot.p.rapidapi.com',
                useQueryString: true
                // text: 'Susan go to the store everyday', language: 'en-US'
            },
        },
    ).then(response => {
        return response.text();
        // console.log(response)
    }).then((body) => {
        res.send(JSON.parse(body))
    }).catch((err) => {
        res.send(err)
    })
});





