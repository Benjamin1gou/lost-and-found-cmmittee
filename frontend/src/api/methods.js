import Api from './index'

export default {
  testPosting(item) {
    return Api().post('/test', item)
  }
}