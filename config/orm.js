var connection = require('../config/connection.js');
var orm = {

    //display all info
    selectAll: function(tableName,cb){
        var queryString = "SELECT * FROM ??";
        connection.query(queryString,tableName, function(err, res){
            if (err) throw err;
            cb(res);
        })
    },

    displayTimeWorked: function(idValue,cb){
        var queryString = "select * from time_sheet; Select 	a.employee_id,a.time_punch AS punchIN,b.time_punch AS punchOUT,DAYNAME(b.time_punch) AS DAY_OF_WEEK,TIMEDIFF(b.time_punch,a.time_punch) AS hoursWORKED FROM time_sheet AS a INNER JOIN time_sheet AS b ON a.employee_id = b.employee_id AND DATE(a.time_punch) = DATE(b.time_punch WHERE a.punch_code = 'clockIn' AND b.punch_code = 'clockOut' AND a.employee_id = ? ORDER BY a.employee_id;"
        connection.query(idValue, function(err,res){
                if(err) throw err;
                cb(res);
        })
    },

    //selectOne
    //show info for a certain employee when they log in
    selectOne: function(tableName,userId,userID_value,cb){
        var queryString = "SELECT * FROM ?? WHERE ?? = ? ";
        connection.query(queryString, [tableName,userId,userID_value], function(err, res){
            if (err) throw err;
            cb(res);
        })
    },

    //add new employee for manager view
    //clock in clock out for employee
    insertOne: function(tableName,colName, valueOfCol,cb){
        var queryString = "INSERT INTO ?? (??) VALUES (?)"
        connection.query(queryString,tableName,[colName],[valueOfCol], function(err,res){
            if(err) throw err;
            cb(res);
        })
    }, 

    updateOne: function(tableName,colNames,new_values,id,idValue,cb){
        var queryString = "UPDATE ?? SET ?? = ? WHERE ?? = ?"
        connection.query(queryString,tableName,[colNames],[new_values],id, idValue, function(err, res){
            if (err) throw err;
            cb(res);
        })
    }
}

module.exports = orm;
