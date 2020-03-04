// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 发起评论
const db = cloud.database()

const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  try {
    return await db.collection('messages')
      .add({
        data: { ...event, createTime: db.serverDate() }
      })  
      .then(res => {
        return { code: 0, data: res, msg: '评论成功' }
      })  
  } catch (err) {
    return err
  }
}