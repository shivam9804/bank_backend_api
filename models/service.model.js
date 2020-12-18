const sql = require('./db.js');

//constructor
const Service = function(service){
    this.serviceName = service.serviceName;
    this.serviceDescription = service.serviceDescription;
};

Service.create = (newService, result) => {
    sql.query("INSERT INTO service SET ?", newService, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Service created: ", {id: res.insertId, ...newService});
        result(null, {id: res.insertId, ...newService});
    });
};

Service.findById = (serviceId, result) => {
    sql.query(`SELECT * FROM service WHERE service_id = ${serviceId}`, (err, res) => {
        if (err) {
            console.log("error: ", error);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found service: ", res[0]);
            result(null, res[0]);
            return;
        }
    });
};

Service.getAll = result => {
    sql.query("SELECT * FROM service", (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        console.log("services: ", res);
        result(null, res);
      });
};

Service.updateById = (serviceId, service, result) => {
    sql.query(
        "UPDATE service SET serviceName = ?, serviceDescription = ? WHERE service_id = ?",
        [service.serviceName, service.serviceDescription, serviceId],
        (err, res) => {
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
    
        console.log("updated service: ", { serviceId: serviceId, ...service });
        result(null, { serviceId: serviceId, ...service });
        });
};

Service.remove = (serviceId, result) => {
    sql.query("DELETE FROM service WHERE service_id = ?", serviceId, (err, res) => {
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
    
        console.log("deleted service with id: ", serviceId);
        result(null, res);
      });
};

Service.removeAll = result => {
    sql.query("DELETE FROM service", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} services`);
        result(null, res);
    });
};

module.exports = Service