const express = require("express");
const cors = require("cors");
const db = require("./models/index.js");
const authRouter = require("./routes/auth.js")

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
//Routes 
app.use('/api', authRouter);

db.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch(error => {
        console.error(error);
    });

db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
