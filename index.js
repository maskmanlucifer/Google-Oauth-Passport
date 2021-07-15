const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const passportSetup = require('./config/passport-setup');
const cookiesession = require('cookie-session');

const app = express();

app.set('view engine','ejs');


app.use(cookiesession({
    maxAge: 24*60*60*1000,
    keys: [""]
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(authRoutes);
app.use(profileRoutes);


let uri= "";
mongoose.connect(uri,{ useNewUrlParser: true,useUnifiedTopology: true },()=>{
    console.log("connected");
})
app.get('/',(req,res)=>{
    res.render('index',{user:req.user});
});


app.listen(3000,()=>{
    console.log("Listening........");
});
