const passport = require('passport');
const User = require('../model/userModel');
const GoogleStrategy = require('passport-google-oauth20');

passport.serializeUser((user,done)=>{
    done(null,user._id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user);
    })
    
});
passport.use(
    new GoogleStrategy({
    // options for strategy
    callbackURL:'/google/callback',
    clientID:"",
    clientSecret:""
},
(accessToken,refreshToken,profile,done)=>{
   console.log(profile);
   User.findOne({googleid:profile.id}).
   then((currentUser)=>{
    if(currentUser){
     console.log('user is' + profile.displayName);
     done(null,currentUser);
    } else {
        new User({
            username:profile.displayName,
            googleid:profile.id
        }).save().then((newUser)=>{
         console.log(newUser);
         done(null,newUser);
        }).catch(()=>{
            console.log("error occured")
        })
    }
   })
})
)