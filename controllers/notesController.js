var express = require('express');
var mysql = require('mysql');
const notesrepo = require('../repo/notesrepo.js')

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'restful_db'
  });


exports.getnotes = (req, res) => {
   
        // console.log(req.body.quote)
        // notesrepo.getnotes()
        
        
           
    
};
// Insert

// exports.Insert = (req, res) => {
   
//     // console.log(req.body.quote)
//     notesrepo.insertNotes(req.body)
       

// };
exports.Insert = (req, res) => {
    if (req.body.title && req.body.content ) {
        console.log(req.body.title)
        notesrepo.insertNotes(req.body)
            .then((data) => {
                res.send(data) 
            })
            .catch((err) => {
                res.status(400)
                res.send(err)
            })
    } else {
        res.status(400);
        res.send({ msg: "required" })
    }
};