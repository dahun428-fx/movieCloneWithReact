const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

// ==================================
//             Favorite
// ==================================
router.post('/count', (req, res) => {
    Favorite.find({movieId : req.body.movieId}).exec((err, favorite)=>{
        if(err){
            return res.status(400).send(err);
        } else {
            return res.status(200).json({success : true, count : favorite.length});
        }
    })
})
router.post('/registerOne', (req, res) => {
    const favorite = new Favorite(req.body);
    Favorite.findOne({userForm : req.body.userForm, movieId: req.body.movieId}, (err, item) => {
        if(err){
            return res.status(400).send(err);
        } else {
            if(!item){
                favorite.save((err, favorite) => {
                    if(err){
                        return res.status(400).send(err);
                    } else {
                        return res.status(200).json({success : true});
                    }
                })
            } else {
                return res.status(200).json({success : false, message : 'already accepted Movie'});
            }
        }
    })
});
router.post('/removeOne', (req,res) => {
    Favorite.findOne({userForm : req.body.userForm, movieId : req.body.movieId}, (err, favorite)=>{
        if(err){
            return res.status(400).send(err);
        } else {
            if(!favorite){
                return res.status(200).json({success : false, message : 'No Item in your favorite Movie List'})
            } else {
                Favorite.deleteOne({userForm : req.body.userForm, movieId: req.body.movieId}).exec((err, favorite)=>{
                    if(err){
                        return res.status(400).json({success : false, message : '해당 작업에 실패하였습니다. 나중에 다시 시도해주십시오.'});
                    } else {
                        return res.status(200).json({success : true, message : '제거하였습니다.'});
                    }
                })
            }
        }
    })
})
router.post('/getFavoriteByMovieId', (req, res)=>{
    Favorite.findOne({userForm:req.body.userForm, movieId:req.body.movieId}).exec((err, favorite)=>{
        if(err){
            return res.status(400).send(err);
        } else {
            if(!favorite){
                return res.status(200).json({success : false});
            } else {
                return res.status(200).json({success : true, favorite});
            }
        }
    })
})
router.post('/getFavoriteMovieByUserId', (req, res)=>{
    Favorite.find({userForm:req.body.userForm}).exec((err, favorite)=>{
        if(err){
            return res.status(400).send(err);
        } else {
            if(!favorite){
                return res.status(200).json({success : false});
            } else {
                return res.status(200).json({success : true, favorite});
            }
        }
    })
})

module.exports = router;