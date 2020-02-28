// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  try {
    return await db.collection('comments').add({
      data: { ...event, openid: wxContext.OPENID }
    }).then(res => {
      return { code: 0, msg: '发布成功' }
    }).catch(err => {
      return err
    })
  } catch (e) {
    return e
  }
}