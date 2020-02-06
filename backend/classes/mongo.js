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
     * データを一つだけ登録する
     * @param object 登録するデータ
     */
    insertOne(object){
        this.mongoClient.connect('mongodb://127.0.0.1:27017/test', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        .then(function(client){

            // mongoDBからcollectionの呼び出し
            // const db = client.db('log')
            // let collection = db.collection('log')
            // データ登録
            const db = client.db('test')
            db.collection("log",(error, collection) => {
                collection.insertMany([
                    object
                ],(error,result) => {
                    client.close()  //db.close()から変更
                });
            });
        })
        .catch(err => {
            console.log(Error, err.message)
        })
    }
    
}