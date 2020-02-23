const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const db = cloud.database()
  return db
    .collection('article')
    .doc(event.id)
    .get()
    .then(res => {
      db.collection('article')
        .doc(event.id)
        .update({
          // data 传入需要局部更新的数据
          data: {
            linkNum: event.count,
            hasPraise: event.praise
          }
        })
        .then(res => {
          return res
        })
    })
    .catch(err => {
      return err
    })
}
