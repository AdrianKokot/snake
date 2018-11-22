const express = require('express'),
    app = express(),
    port = process.env.PORT || 8080;

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/*', (req,res)=>{
    res.render('index');
});

app.listen(port, () => {
    console.log("Started");
})