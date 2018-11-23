const express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    sanitizer = require("express-sanitizer"),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose');

mongoose.connect("mongodb://adrian:snejksnejk123@ds239217.mlab.com:39217/snejk");
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(sanitizer());
app.use(bodyParser.urlencoded({extended: true}));

const userSchema = new mongoose.Schema({
    username: String,
    score: Number
});

const User = mongoose.model('User', userSchema);

// User.remove({}, ()=>{
//     console.log('usuniete');
// });
app.get('/*', (req, res) => {
    User.find({}, function (err, foundData) {
        if (err) return console.error(err);
        fonudData = foundData.sort(function(a,b){
            if (a.score > b.score)
                return -1;
            if (a.score < b.score)
                return 1;
            return 0;
        }).slice(0,5);
        res.render('index', {
            users: foundData
        });
    });
});

app.post('/*', (req, res) => {
    req.body.user.body = req.sanitize(req.body.user.body);
    const newUser = new User(req.body.user);
    // console.log(req.body.user);
    newUser.save().then(res.redirect("/"));
    // console.log(newUser);
});

app.listen(port, () => {
    console.log("Started");
});