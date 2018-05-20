var connection = require('../config/connection.js');
var orm = {

    //display all info
    selectAll: function(tableName,cb){
        var queryString = "SELECT * FROM ??";
        connection.query(queryString, [tableName], function(err, res){
            if (err) throw err;
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

    // updateOne: function(tableName,colBoolean,valueOfColBoolean,idOfItem,idValue,cb){
    //     var queryString = "UPDATE ?? SET ?? = ? WHERE ?? = ?"
    //     connection.query(queryString,[tableName,colBoolean,valueOfColBoolean,idOfItem, idValue], function(err, res){
    //         if (err) throw err;
    //         cb(res);
    //     })
    // }
}