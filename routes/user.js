var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const db = require('../DB/db');

router.post('/insert', function(req, res, next) {
    console.log(req.body);
    let id = req.body.id
    let pw = req.body.pw
    let name = req.body.name
    let number = req.body.number
    let age = req.body.age

    if(!id || !pw || !name || !number || !age){
        return res.send("plz send require elements")
    }
    const hash_pw = bcrypt.hashSync(pw, 10);//암호화
    let query = `INSERT INTO user(id, pw, name, phone_num, age, image_url) VALUES('${id}', '${hash_pw}', '${name}', '${number}', '${age}', 'default')`
    db.query(query, function(err, result){
        if(err){
            res.status(400).send(err)
            return;
        }
        res.status(200).send({res : true, msg : 'success'})
    })
});

module.exports = router;
