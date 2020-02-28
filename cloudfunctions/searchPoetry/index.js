// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { rhythmic, author } = event.rhythmic;

  try {
    return await db.collection('ci').where(_.or([
      { rhythmic }, { author }
    ])).get()
  } catch (e) {
    console.error(e)
  }
}