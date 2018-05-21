var orm = require('../config/orm.js')

var employee = {

  selectOne: function (tableName,userId,userID_value,cb ) {
    orm.selectOne(tableName,userId,userID_value,function (res) {
      cb(res);
    })
  },
  insertOne: function (tableName,colName,valueOfCol,cb) {
      orm.insertOne(tableName,[colName],[valueOfCol],function(res){
          cb(res);
      })
  },

  displayTimeWorked: function(idValue,cb){
  
      orm.displayTimeWorked(idValue, function(err,res){
            if(err) throw err;
            cb(res);
    })
  },
  updateOne: function(tableName,colNames,new_values,id,idValue,cb){
      
      orm.updateOne(queryString,tableName,[colNames],[new_values],id, idValue, function(err, res){
        if (err) throw err;
        cb(res);
    })
}
  

}

//export orms for use
module.exports = employee;
