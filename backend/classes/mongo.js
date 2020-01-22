/**
 * MongoDB操作用クラス
 * Created:2020.01.22 Benjamin1gou
 * @constructor db 
 */
module.exports = class MongoClass{
    constructor (db){
        this.mongoClient = db
        this.assert = require('assert')
    }

    /**
     * 接続用テスト
     */
    mongoConnect(){
        this.mongoClient.connect('mongodb://127.0.0.1:27017/test', (err, db) =>{
          this.assert.equal(null, err)
          console.log('Connected success')
          db.close()
        })
    }

    /**
     * 変更履歴登録
     */
    
}