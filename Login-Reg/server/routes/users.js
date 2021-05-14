const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');

/*router.get('/hello', (req, res) => {
    console.log("jay");

    try {
        res.json({ name: "jay" });
        res.send("hello");
    } catch (err) {
        console.log(err)
    }
}); */

router.post('/', async (req, res) => {
    // First Validate The Request
    const { error } = validate(req.body);
   if (error) {
        return res.status(400).send(error.details[0].message);
    }
    // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('That user already exisits! Please Double Click on SignUp And Login ');
    } else { 
        // Insert the new user if they do not exist yet
       user = new User({
            name: req.body.name,     //"jay14",
            email: req.body.email,    //"jay15@gmail.com",   
            password: req.body.password  // "jay123"   
        }); 
       /* user = new User(_.pick(req.body, ['name', 'email', 'password']));*/
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        res.send("User Registered Please Double Click on SignUp And Login");
        // res.send(_.pick(user, ['_id', 'name', 'email']));
    }
});

router.post('/login/', async (req, res) => {
    // First Validate The Request
    const { error } = validate(req.body);
   if (error) {
        return res.status(400).send(error.details[0].message);
    }
    // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        var correct = await User.findOne({  email: req.body.email,
                                            password: req.body.password
                                        })
        if(!correct){
            res.send("incorrect");
        }else{
            res.send("correct");
        }
    }
});

module.exports = router;

