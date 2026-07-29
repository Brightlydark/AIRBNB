const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const cookieParser = require("cookie-parser");
// app.use(cookieParser("secretcode"));
const session = require("express-session");
const flash = require("connect-flash");
const path= require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.listen(3000 ,()=>{
    console.log("Server listening");
})
const sessionOptions ={
    secret:"mysupersecretstring",
    resave:false,
    saveUninitialized:true
};
app.use(session(sessionOptions));
app.use(flash());
app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
})
app.get("/test",(req,res)=>{
    res.send("Test successfull")
});
app.get("/reqcount",(req,res)=>{
    if(req.session.count){
        req.session.count++;
    }
    else{
        req.session.count=1;
    }
    res.send(`You have requested ${req.session.count} times`);
})
app.get("/register",(req,res)=>{
    let {name = "anonymous"} = req.query;
    req.session.name=name;
    if(name === "anonymous"){
        req.flash("error","user not registered");
    }
    else{
        req.flash("success","user registered successfully");
    }
    res.redirect("/hello");
});
app.get("/hello",(req,res)=>{
    res.render("page.ejs",{name : req.session.name});
});
// app.get("/",(req,res)=>{
//     console.dir(req.cookies);
//     res.send("root");
// })
// app.get("/greet",(req,res)=>{
//     let {name = "anonymous"} = req.cookies;
//     res.send(`Hi ${name} ,Welcome!`);
// });
// app.use("/users",users);
// app.use("/posts",posts);
// app.get("/",(req,res)=>{
//     res.send("Hi!I am root!");
// });
// app.get("/getsignedcookies",(req,res)=>{
//     res.cookie("made-in","India",{signed:true});
//     res.send("signed cookie sent");
// })
// app.get("/vertify",(req,res)=>{
//     console.dir(req.signedCookies);
//     res.send("vertified");
// })
// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","namaste");
//     res.cookie("Welcome","here");
//     res.send("Fetched cookies");
// })