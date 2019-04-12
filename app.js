require('dotenv').config()
// eslint-disable-next-line no-undef
var port = process.env.PORT || 8080;

var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds"),
    methodOverride = require("method-override"),
    flash = require("connect-flash");

//requring routes
var commentRoutes = require("./routes/comments"),
    reviewRoutes = require("./routes/reviews"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

var url = process.env.DATABASEURL || "mongodb://localhost:27017/yelp_camp";
mongoose.connect(url, {useNewUrlParser: true});

// mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
// mongoose.connect("mongodb+srv://phuongminh2303:abc12345@yelpcampbyphuong-g9d5a.mongodb.net/test", {useNewUrlParser: true});

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
// eslint-disable-next-line no-undef
app.use(express.static(__dirname + "/public"));
// seedDB(); // seed database 
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require("moment");

// PASSPORT CONFIGURATION
app.use(require("express-session")({ 
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);


app.listen(port, function () {
    console.log("The YelpCamp Server Has Started!");
});