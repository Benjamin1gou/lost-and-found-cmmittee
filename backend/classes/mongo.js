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
    insertOnea(object){
        this.mongoClient.connect('mongodb://127.0.0.1:27017/test', (err, client) =>{
            this.assert.equal(null, err)

            // mongoDBからcollectionの呼び出し
            const db = client.db('log')
            // let collection = db.collection('log')
            
            console.log(db)
            // データ登録
            console.log(object)
            db.collection("test",(error, collection) => {
                collection.insertMany([
                    object
                ],(error,result) => {
                    collection.find().toArray((error, documents) => {
                        for (var document of documents) {
                            console.log(document.name);
                        }
                    });
                    client.close();  //db.close()から変更
                });
            });
        })
    }
    
}