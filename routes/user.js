const express = require("express");
const User = require("../models/users.model");

const router = express.Router();

router.route("/:username").get((req,res)=>{
    User.findOne({username: req.params.username},(err,result)=>{
        if(err) res.status(500).json({msg: err});
        res.json({
            data: result,
            username: req.params.username,
        });
    });
});

router.route("/login").post((req,res)=>{
User.findOne({username:req.body.username},(err,result)=>{
    if(err) res.status(500).json({msg: err});
   if(result===null)
   {
    res.status(403).json("username incorrect")
   }
   if(result.password===req.body.password)
   {
       //here we implement jwt token fun
       res.json("Ok");
   }
   else{
       res.status(403).json("password is incorrect");
   }
});
});

router.route("/register").post((req , res)=>{
console.log('inside the register');

const user = new User({
    username:req.body.username,
    password: req.body.password,
    email:req.body.email
});
user
.save()
.then(()=>{
console.log('user registered');
res.status(200).json("ok");
})
.catch((err)=>{
    res.status(403).json({msg:err});
});
res.json("registred");
});

//route update 
router.route("/update/:username").patch((req,res)=>{
    User.findOneAndUpdate(
        {username:req.params.username,},
        { $set:{password: req.body.password}},
        (err,result)=>{
            if(err) return res.status(500).json({msg:err});
            const msg = {
                msg: "password successfuly updated",
                username: req.body.username,
            };
            return res.json(msg);
        }
        );
});

router.route("/delete/:username").delete((req,res)=>{
    User.findOneAndDelete({username:req.params.username,},(err,result)=>{
            if(err) return res.status(500).json({msg:err});
            const msg = {
                msg: "delete successfuly",
                username: req.params.username,
            };
            return res.json(msg);
        }
        );
});


module.exports = router;