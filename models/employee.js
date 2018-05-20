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
  

}

//export orms for use
module.exports = employees;
