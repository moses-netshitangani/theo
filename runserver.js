const express = require('express')
const app = express()

app.listen(5000, () => {
    console.log("Application started and listening on port 5000");
});

app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/src/view/index.html");
});

// app.listen(process.env.PORT || 5000);