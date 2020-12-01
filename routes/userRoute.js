var express = require("express");
var _users = require("../models/userModel");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var router = express.Router();

const saltRounds = 14;

router.route("/").get(async (req, res) => {
  try {
    const users = await _users.find().select("-password");
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const user = await _users.findById(req.params.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});


//route to update user
router.route("/:id").put(async (req, res) => {
    try {
     const user = await  _users.findByIdAndUpdate(req.params.id,req.body).select('-password');
     return res.json(data); 
    } catch (error) {
        console.log(error);
    } 
 });
 
 // route to delete user
 router.route("/:id").delete(async (req, res) => {
     try {
         const data =  await _users.findByIdAndDelete(req.params.id).select('-password');
         return res.json(data);
     } catch (error) {
         console.log(error);
     }
 });
 
 // signUp Route
 router.route("/signup").post(async (req, res) => {
         try {
           // add logic to check both email & phone
           const users = await _users.find({ email: req.body.email });
           if (users.length > 0) 
           {
             res.json({ message: "Account with that email already exits" });
           }
            else 
           {
             const body = req.body;
             // hashing the password 
             const hash = await bcrypt.hash(body.password, saltRounds);
             body.password =  hash;
             const newUser = await _users.create(body);
             res.json(newUser);
           }
           } catch (error) {
           console.log(error);
         }
       });
 
 // Login Route
router.route('/login')
      .post(async(req, res) => {
        try {
            const user = await _users.findOne({email:req.body.email});
            if(!user) { res.json({ message:'Account with that email not exist'});}
            else { 
              const check = await bcrypt.compare(req.body.password, user.get('password'));
              if(check == true) {
                const token = jwt.sign({ id: user._id}, 'loginapi');
                res.json({ message:'ok', token: token, id:user._id});
              } else { res.json({ message: 'Wrong Password!'});}
            }
        } catch (error) {
          console.log(error);
        }
      })
      
 
  module.exports = router;
  