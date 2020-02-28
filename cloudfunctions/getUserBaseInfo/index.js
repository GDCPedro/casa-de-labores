// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  try {
    return await db.collection('users').where({
      openid: _.eq(wxContext.OPENID)
    })
    .get()
    .then(res => {
      return { code: 0, openid: wxContext.OPENID, data: res, msg: '获取成功' }
    })
  } catch (error) {
    
  }

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}