var express = require('express');
var mysql = require('mysql');
var controller = require('../controllers/notesController.js')
var router = express.Router();
var moment = require('moment');


// const mysql = require('mysql');
 
// parse application/json
// router.use(bodyParser.json());
 
//create database connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'test'
});
 
conn.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected...');
  });
   

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "test"
// });

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});


router.get('/api/getNotes',(req, res) => {
    let sql = "SELECT id, title, content FROM test.notes2 where notes2.deleted_date = '0000-00-00 00:00:00' AND status!=0";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });


  //post notes
  router.post('/api/insertNotes',(req, res) => {

   if(req.body.title != '' && req.body.content!=''){
    //    var created_date = new Date();
       var created_date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
       console.log(created_date);
    let data = {title: req.body.title, content: req.body.content, created_date: created_date, updated_date:'0000-00-00 00:00:00',status:1, version:1};
    // console.log(data);
    let sql = "INSERT INTO test.notes2 SET ?";
    // let sql = "INSERT INTO test.notes2_mapping SET ?";
    console.log(sql);
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
      console.log(results);
      let sql2 = "SELECT max(id) as id from test.notes2";
    //   let query2 = conn.query(sql2);
      let query2  = conn.query(sql2, data,(err, results2) => {
        if(err) throw err;
        console.log(results2[0].id);
        var note_id  = results2[0].id
        // console.log(note_id);
        // let data2 = {note_id: note_id, note_version: 1};
        let sql3 = "UPDATE test.notes2 SET note_id='"+note_id+"' WHERE id="+note_id;
        let query3  = conn.query(sql3, (err, results3) => {
            if(err) throw err;
        });
    });

      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
    }else{
        res.send(JSON.stringify({"status": 200, "error": null, "response": "title and content are required."}));
    }
    
  });


  //update notes
//   router.put('/api/updateNotes/:id',(req, res) => {
//     let sql = "UPDATE test.notes2 SET title='"+ req.body.title+"', content='"+req.body.content+"' WHERE id="+req.params.id;
//     let query = conn.query(sql, (err, results) => {
//       if(err) throw err;
//       let sql2 = "SELECT max(note_version) as version from test.notes_mapping;";
//       let query2  = conn.query(sql2,(err, results2) => {
//         var version  = results2[0].version;
//         let data2 = {note_id: req.params.id, note_version: version+1};
//         let sql3 = "INSERT INTO test.notes_mapping SET ?";
//         let query3  = conn.query(sql3, data2,(err, results3) => {
//             if(err) throw err;
//         });
//       });
      
//       res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
//     });
//   });
//   update notes
    router.put('/api/updateNotes/:id',(req, res) => {
    // var status = 0;
    var updated_date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    let sql = "UPDATE test.notes2 SET status='"+0+"', updated_date='"+updated_date+"' WHERE id="+req.params.id;

    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
    //   console.log(results);
  
    var created_date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      let data = {title: req.body.title, content: req.body.content, created_date: created_date, updated_date:'0000-00-00 00:00:00',status:1};
      let sql2 = "INSERT INTO test.notes2 SET ?";
      let query2  = conn.query(sql2,data,(err, results2) => {
            if(err) throw err;
            // console.log(results2);
            let sql34 = "select max(version) as version from test.notes2  WHERE note_id="+req.params.id;

            let query3  = conn.query(sql34,(err, results3) => {

                let sql2 = "SELECT max(id) as id from test.notes2";
                //   let query2 = conn.query(sql2);
                  let query2  = conn.query(sql2, data,(err, results2) => {
                    if(err) throw err;
                    console.log(results2[0].id);
                    console.log(results3[0].version);

                            if(err) throw err;
                            console.log(results3[0].version);
                            var version = results3[0].version+1;
                            var id = results2[0].id;
                            let sql3 = "UPDATE test.notes2 SET note_id='"+req.params.id+"',version='"+version+"' WHERE id="+id;
                            let query3  = conn.query(sql3, (err, results3) => {
                                if(err) throw err;
                    })
                });
            });
      });
      
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

//get by id
  router.get('/api/getById/:id',(req, res) => {
    if(req.params.id != null){
    let sql = "SELECT id,  title, content FROM test.notes2 WHERE id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results, "message": "record found."}));
    });
    }else{
        res.send(JSON.stringify({"status": 200, "error": null, "message": "record not exist." }));  
    }
  });

//delete note by id
  router.delete('/api/deleteById/:id',(req, res) => {
    var deleted_date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    console.log(deleted_date);
    let sql = "UPDATE  test.notes2 SET deleted_date= '"+deleted_date+"'  WHERE id ="+req.params.id+"";
    console.log(sql);
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results, "message": "record deleted successfully."}));
    });
    
  });

  
//note history
router.get('/api/history/:id',(req, res) => {
    if(req.params.id != null){
    let sql = "SELECT  title, content, version,created_date FROM test.notes2 WHERE note_id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results, "message": "record found."}));
    });
    }else{
        res.send(JSON.stringify({"status": 200, "error": null, "message": "record not exist." }));  
    }
  });



module.exports = router;
