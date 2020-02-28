// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

cloud.init()

// 初始化 cloud
// cloud.init({
//   // API 调用都保持和云函数当前所在环境一致
//   // env: cloud.DYNAMIC_CURRENT_ENV
// })

const db = cloud.database()

const _ = db.command

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { company, nickName, position, userInfo } = { ...event }

  try {
    return await db.collection('users').add({
      data: event
    }).then(res => {
      return { 
        code: 0,
        msg: '注册成功'
      }
    }).catch(err => {
      return err
    })
  } catch (e) {
    return e
  }
}

