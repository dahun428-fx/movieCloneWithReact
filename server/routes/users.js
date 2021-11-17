const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    });
});

router.post("/register", (req, res) => {
    const user = new User(req.body);
    User.findOne({email : req.body.email},(err, user)=>{
        if(err){
            return res.status(400).send(err);
        } else {
            if(!user){
                user.save((err, user) => {
                    if(err){
                        return res.status(400).send(err);
                    } else {
                        return res.status(200).json({success : true});
                    }
                })
            } else {
                return res.status(200).json({success : false, message : '이미 존재하는 이메일입니다.'})
            }
        }
    })

});
router.post("/login", (req, res) => {
    User.findOne({
        email : req.body.email
    }, (err, user) => {
        if(err){
            return res.status(400).send(err);
        } else {
            if(!user){
                return res.status(200).json({success : false, message : '아이디나 비밀번호를 확인해주세요'});
            }
        }
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch){
                return res.status(200).json({success : false, message : '아이디나 비밀번호를 확인해주세요.'});
            }
            user.generateToken((err, user) => {
                if(err){
                    return res.status(400).send(err);
                } else {
                    let userId = user._id;
                    return res.cookie('x_auth', user.token).status(200).json({success : true, userId })
                }
            })
        })
    })
});

router.get("/logout", auth, (req, res) => {
    let user = req.user;
    let userId = user._id;
    User.findOneAndUpdate({ _id : userId }, { token : '', tokenExp : '' }, (err, user) => {
        if(err){
            return res.status(400).send(err);
        } else {
            return res.status(200).json({ success : true });
        }
    })
});

module.exports = router;