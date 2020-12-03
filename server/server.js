const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
// routes import
const registerLoginRoute = require("../server/routes/RegisterLogin");
const userAuthRoute = require("../server/routes/userAuth")
const weaponsRoute = require("./routes/weapons")
const enemiesRoute = require("./routes/enemiesRoute")
const roomsRoute = require("./routes/roomsRoute")

// routes
app.use("/", registerLoginRoute);
app.use("/", userAuthRoute);
app.use("/", weaponsRoute);
app.use("/", enemiesRoute);
app.use("/", roomsRoute);


app.listen(port, (err) => {
    if (err) console.log("listen error:", err.message)
    console.log(`Rise of the Valiant server runs on port ${port}`)
});