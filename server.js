var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

const app = express();

var userRoute = require('./routes/userRoute'); 

// cors
const cors = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET,PUT,POST,PATCH,DELETE,OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, Content-Length, X-Requested-With"
    );
    // intercept OPTIONS method
    if ("OPTIONS" === req.method) {
      res.sendStatus(200);
    } else {
      next();
    }
  };
  
  // db setup
mongoose.Promise = require("bluebird");
mongoose
  .connect("mongodb://localhost/login-api", {
    promiseLibrary: require("bluebird"),
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection successful"))
  .catch((err) => console.error(err));


// bodyParser
app.use(bodyParser.json());
app.use(cors);

app.use('/users', userRoute);

// Port
const port =  process.env.PORT || 3000;
app.listen(port,() => console.log(`server started on port ${port}`));;