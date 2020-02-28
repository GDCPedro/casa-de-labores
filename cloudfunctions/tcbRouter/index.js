// 云函数入口文件
const cloud = require('wx-server-sdk')

const TcbRouter = require('tcb-router')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

  const wxContext = cloud.getWXContext()
  const app = new TcbRouter({ event })

  app.use(async (ctx, next) => {
    ctx.data = {};
    await next();
  })

  app.router(['user'], async (ctx, next) => {
    ctx.data.response = "router user";
    await next();
  })

  app.router(['time'], async (ctx, next) => {
    ctx.data.response = "router time";
    await next();
  })

  return app.serve();

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}