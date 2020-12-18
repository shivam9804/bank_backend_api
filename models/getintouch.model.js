const sql = require('./db');

//contstructor
const GetInTouch = function(getInTouch){
   this.name = getInTouch.name; 
   this.email = getInTouch.email;
   this.subject = getInTouch.subject;
   this.message = getInTouch.message;
};

GetInTouch.create = (newGetInTouch, result) => {
    sql.query("INSERT INTO inquiry SET ?", newGetInTouch, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Details sent: ", {id: res.insertId, ...newGetInTouch});
        result(null, {id: res.insertId, ...newGetInTouch});
    });
};

GetInTouch.findById = (touchId, result) => {
    sql.query(`SELECT * FROM inquiry WHERE inquiry_id = ${touchId}`, (err, res) => {
        if (err) {
            console.log("error: ", error);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found details: ", res[0]);
            result(null, res[0]);
            return;
        }
    });
};

GetInTouch.getAll = result => {
    sql.query("SELECT * FROM inquiry", (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        console.log(`${res.length} Details fetched: `, res);
        result(null, res);
      });
};

GetInTouch.remove = (touchId, result) => {
    sql.query("DELETE FROM inquiry WHERE inquiry_id = ?", touchId, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
    
        if (res.affectedRows == 0) {
          // not found Customer with the id
          result({ kind: "not_found" }, null);
          return;
        }
    
        console.log("Deleted details with id: ", touchId);
        result(null, res);
      });
};

GetInTouch.removeAll = result => {
    sql.query("DELETE FROM inquiry", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} details`);
        result(null, res);
    });
};

module.exports = GetInTouch