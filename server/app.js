const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");

require("./db/connection")
const port = process.env.PORT || 5000;
const router = require("./routes/route");



app.use(
    cors({
        origin: [
            "http://localhost:3000" 
        ], 
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());

app.use(router)
app.use(require("./routes/displayData"))
app.use(require("./routes/orderDAta"))

app.get("/", (req, res) => {
    res.send("hello world")
})
app.get("*", (req, res) => {
    res.send("404, oops page not find");
});

app.listen(port, () => {
    console.log("connected to local host " + port);
});
