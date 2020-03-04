// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  try {
    return await db.collection('messages')
      .where({
        commentedId: event.commentedId
      })
      .orderBy('createTime','desc')
      .get()
      .then(res => {
        return { data: res, code: 0, msg: '获取评论列表成功' }
      })  
  } catch (err) {
    return err
  }
}