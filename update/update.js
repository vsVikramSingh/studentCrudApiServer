//import modules
const express = require('express')
let mongodb = require('mongodb')
//import url
let url = require('../url')
//create mongoclient
let mcl = mongodb.MongoClient
//create router instance
let router = express.Router()
//create rest api
router.post("/", (req, res) => {
    let s_id = req.body.s_id
    let obj = {
        "s_name": req.body.s_name,
        "s_email": req.body.s_email,
        "s_phonenumber": req.body.s_phonenumber,
        "s_gender": req.body.s_gender,
        "s_language": req.body.s_language,
        "s_zipcode": req.body.s_zipcode
    }
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db('nodedb')
            db.collection('students').updateOne({ s_id }, { $set: obj }, (err) => {
                if (err)
                    res.json({ 'update': 'Error ' + err })
                else {
                    console.log('Data updateed')
                    res.json({ 'update': 'Success' })
                    conn.close()
                }
            })
        }
    })
})
//export router
module.exports = router
