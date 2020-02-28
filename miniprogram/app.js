//app.js
import { service } from './utils/service'

App({
  // 调用云函数
  service,

  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }
    // 登陆
    wx.login({
      complete: (res) => {
        if (res.code) {
          this.globalData.loginData = res
        } else {
          wx.showToast({
            title: '获取登陆态失败！',
          })
        }
      },
    })
    // 获取openid、用户信息
    wx.cloud.callFunction({
      name: 'getOpenId'
    }).then(res => {
      this.globalData.openid = res.result.openid
    }).catch(err => {
      console.error(err)
    })

    wx.cloud.callFunction({
      name: 'getUserBaseInfo',
    })
      .then(res => {
        this.globalData.openid = res.result.openid
        this.globalData.userInfo = { ...res.result.data.data[0] }
      })
  },
  // 全局的数据
  globalData: {
    // openid 用户标识
    openid: '',
    // 登陆信息
    loginData: {},
    userInfo: {},
    author: "Guodongchao",
    searchedPoetries: [],
    selectedPoetry: {},
  }
})
