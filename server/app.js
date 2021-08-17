var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var firebase = require("firebase");
var cors = require("cors");
var { graphqlHTTP } = require("express-graphql");

const config = {
  apiKey: "AIzaSyB0JXER0ZTR7CLN_HENHP4hFHmRkCt00Mg",
  authDomain: "phone-data-eff24.firebaseapp.com",
  databaseURl: "https://phone-data-eff24.firebaseio.com/",
  projectId: "phone-data-eff24",
  storageBucket: "phone-data-eff24.appspot.com",
  messagingSenderId: "729295723557",
};
firebase.initializeApp(config);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("*", cors());

app.use("/", indexRouter);
app.use("/users", usersRouter);

const contactSchema = require("./graphql").contactSchema;
app.use(
  "/graphql",
  cors(),
  graphqlHTTP({
    schema: contactSchema,
    rootValue: global,
    graphiql: true,
  })
);

module.exports = app;
