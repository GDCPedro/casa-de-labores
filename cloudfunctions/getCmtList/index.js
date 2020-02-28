// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const start = 10 * (Number(event.page_no) - 1)

  try {
    return await db.collection('comments')
      .limit(10)
      .orderBy('createTime','desc')
      .get()
      .then(res => {
        return { data: res, code: 0, msg: '获取成功' }
      })
      .catch(err => {
        return err
      })
  } catch (error) {
    return error
  }

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}