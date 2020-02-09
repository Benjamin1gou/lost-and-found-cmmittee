/**
 * chokidar用クラス
 * Created:2020.01.26 Benjamin1gou
 * @constructor chokidar 読み込んだchokidar
 * @constructor monitoringPath 監視するファイルパス  
 */
module.exports = class ChokidarCLass {


    constructor(chokidar, monitoringPath, mongo){
        this.choki = chokidar;
        this.watcher = this.choki.watch(monitoringPath, {	//watch対象ディレクトリorファイル
            ignored: /[\/\\]\./,	//無視する対象
            persistent:true	//監視を継続するかどうか
        })
        
 
        // 監視開始
        this.watcher.on('ready', function() { console.log("監視開始"); })
        
        // ファイル追加処理
        .on('add', function(path) { 
            // 登録用オブジェクトの作成
            let item = {}

            // 登録または変更したtimestamp 
            const date = require('date-utils')
            let timestamp = new Date()
            timestamp = timestamp.toFormat('YYYY-MM-DD HH24:MI:SS')

            // オブジェクトに値格納
            item.timestamp = timestamp
            item.path = path
            item.mode = 'fileAdd'

            // 履歴登録
            mongo.insertOne(item)
            // mongo.insertOne(this.addlog(path, 'fileAdd'))
        })
        
        // フォルダ追加処理
        .on('addDir', function(path) { 
            // 登録用オブジェクトの作成
            let item = {}

            // 登録または変更したtimestamp 
            const date = require('date-utils')
            let timestamp = new Date()
            timestamp = timestamp.toFormat('YYYY-MM-DD HH24:MI:SS')

            // オブジェクトに値格納
            item.timestamp = timestamp
            item.path = path
            item.mode = 'addDir'

            // 履歴登録
            mongo.insertOne(item)
        })

        // ファイル削除処理
        .on('unlink', function(path) {
            // 登録用オブジェクトの作成
            let item = {}

            // 登録または変更したtimestamp 
            const date = require('date-utils')
            let timestamp = new Date()
            timestamp = timestamp.toFormat('YYYY-MM-DD HH24:MI:SS')

            // オブジェクトに値格納
            item.timestamp = timestamp
            item.path = path
            item.mode = 'unlinkFile'

            // 履歴登録
            mongo.insertOne(item)
        })

        // フォルダ削除処理
        .on('unlinkDir', function(path) { // 登録用オブジェクトの作成
            let item = {}

            // 登録または変更したtimestamp 
            const date = require('date-utils')
            let timestamp = new Date()
            timestamp = timestamp.toFormat('YYYY-MM-DD HH24:MI:SS')

            // オブジェクトに値格納
            item.timestamp = timestamp
            item.path = path
            item.mode = 'unlinkdir'

            // 履歴登録
            mongo.insertOne(item)
        })
        // 編集処理
        .on('change', function(path) {
            // 登録用オブジェクトの作成
            let item = {}

            // 登録または変更したtimestamp 
            const date = require('date-utils')
            let timestamp = new Date()
            timestamp = timestamp.toFormat('YYYY-MM-DD HH24:MI:SS')

            // オブジェクトに値格納
            item.timestamp = timestamp
            item.path = path
            item.mode = 'change'

            // 履歴登録
            mongo.insertOne(item)
        })
        // エラー処理
        .on('error', function(error) { console.log("エラーです-> " + error); })

    }
    
    /**
     * addlog
     * ファイルが追加された時の処理
     * DBに追加されたログを登録する。
     * @param path ファイルpath
     */
    addlog(path, mode){
        // 登録用オブジェクトの作成
        let item = {}

        // 登録または変更したtimestamp 
        const date = require('date-utils')

        let timestamp = new date()
        timestamp = date.toFormat('YYYY-MM-DD HH24:MI:SS')

        // オブジェクトに値格納
        item.timestamp = timestamp
        item.path = path
        item.mode = mode

        return item
    }

}