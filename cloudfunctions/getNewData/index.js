// 云函数入口文件
const cloud = require('wx-server-sdk')

// 获取更新后的点赞/评论/分享次数

cloud.init()

const db = cloud.database()

const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  try {
    return await db.collection('comments')
      .doc(event._id)
      .get()
      .then(res => {
        return { data: res, code: 0, msg: 'Succeed' }
      })
  } catch (err) {
    return err
  }
}