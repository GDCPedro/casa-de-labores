// 云函数入口文件
const cloud = require('wx-server-sdk')

// 单条动态的分享/评论/点赞次数

/*
@param   type    分享share评论comment点赞like
*/

cloud.init()

const db = cloud.database()

const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // 传入_id

  try {
    return await db.collection('comments')
      .doc(event._id)
      .update({
        data: { [event.type]: _.inc(1) }
      })
      .then(res => {
        return { data: res, code: 0, msg: 'Succeed' }
      })
  } catch (error) {
    return error
  }
}