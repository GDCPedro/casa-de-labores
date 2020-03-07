// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  try {
    return await db.collection('like')
    .add({
      createTime: db.serverDate(),
      data: event
    })
    .then(res => {
      return { data: res.data, code: 0, msg: 'Succeed' }
    })
    .catch(err => {
      throw new Error(err)
    })
  } catch (error) {
    throw new Error(error)
  }
}