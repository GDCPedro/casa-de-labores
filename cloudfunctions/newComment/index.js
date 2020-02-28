// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const comment = event.comment

  console.log(comment, 'comment')

  try {
    return await db.collection('comments').add({
      data: event
    }).then(res => {
      return { code: 0 }
    }).catch(err => {
      return err
    })
  } catch (e) {
    return e
  }
}