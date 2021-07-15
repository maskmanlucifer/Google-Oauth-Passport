const router = require('express').Router();
const passport = require('passport');


router.get('/login',(req,res)=>{
  res.render('login',{user:req.user});
});

router.get('/logout',(req,res)=>{
    //handle with passport
    req.logout();
    res.redirect("/");
});

router.get('/google',passport.authenticate('google',{
    scope:['profile']
}));

//callback route

router.get('/google/callback',passport.authenticate('google'),(req,res)=>{
  res.redirect('/profile');
});
module.exports = router;