const models = require("../models");
const express = require("express")
const router = express.Router();
//var createError = require('http-errors');

router.get('/asdf', function(req, res){
    models.Test.findOne({
        where: {
            nickname: req.query.name
        }
    }).then(res1 => {
        if(res1){
            res.json({
                status: 200,
                message: '',
                data : {
                    likeFood: JSON.parse(res1.likeFood),
                    dislikeFood: JSON.parse(res1.dislikeFood)
                }
            });
        }
        else {
            console.log("그런 유저는 없습니다..");
        }
    }).catch(err => {
        console.log(err);
    })
});

router.post('/create', function(req, res){
    models.Test.create({
        nickname: req.body.nickname,
        likeFood: req.body.likeFood,
        dislikeFood : req.body.dislikeFood
    }).then(res1 => {
        res.json({
            status: 201,
            message: '데이터 추가 완료'
        }).status(201).send();
    }).catch(err => {
        console.log(err);
    });
})

router.get('/delete', function(req, res){
    models.Test.findOne({
        where: {
            nickname: req.query.name
        }
    }).then(res1 => {
        if(res1){
            models.Test.destroy({ //특정 데이터만 삭제
                where: {
                    nickname:req.query.name
                }
            }).then(()=>{
                res.json({
                    message: "삭제에 성공했습니다."
                })
            }).catch(err2=>{
                console.log(err2);
            });
        }
        else {
            res.json({
                message : "해당하는 유저가 존재하지 않습니다."
            })
        }
    }).catch(err => {
        console.log(err);
    })
});

module.exports = router;