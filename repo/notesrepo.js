var mysql = require('mysql');



exports.getnotes = (res) => {
    return new Promise((resolve, reject) => {
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: "test"
          });
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = "select * from test.notes";
            console.log("______________________________********", sql);
            con.query(sql, function (err, result) {
              if (err) throw err;
              console.log("1 record inserted", result);
            });
          });
        // let ;
        // var sql = "select * from notes";
        return resolve(result)

    })
}


exports.insertNotes = (data) => {
    return new Promise((resolve, reject) => {
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: "test"
          });
        con.connect(function(err) {
            if (err) throw err;
            var title = data.title;
            var content = data.content
            // var created_date = data.created_date;

            console.log("Connected!");
            var sql = `INSERT INTO test.notes (title, content, created_date, updated_date ) VALUES (${title}, '${content}','2008-01-01 00:00:01','2008-01-01 00:00:01');`;
            console.log("______________________________********", sql);
            con.query(sql, function (err, result) {
              if (err) throw err;
              console.log("1 record inserted", result);
            });
          });
        // let ;
        // var sql = "select * from notes";
        return resolve(result)

    })
}