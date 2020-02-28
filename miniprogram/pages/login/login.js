// miniprogram/pages/login/login.js
// 获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: '',
    company: '',
    position: '',
    isLoading: false
  },

  getUserInfo: function (e) {
    const userInfo = e.detail.userInfo
    app.globalData.userInfo = e.detail.userInfo
    const { nickName, company, position } = { ...this.data }
    this.formVldt().then(res => {
      this.setData({
        isLoading: true
      })
      app.service('login', {
        nickName,
        company,
        position,
        userInfo,
        openid: app.globalData.openid
      })
      .then(res => {
        if (res.code === 0) {
          wx.showToast({
            title: res.msg
          })
          wx.switchTab({
            url: '/pages/index/index',
            success: res => {
              console.log(res)
            },
            fail: err => {
              console.error(err)
            }
          })
        } else {
          this.setData({
            isLoading: false
          })
        }
      })
      .catch(err => {
        wx.showToast({
          title: err,
          icon: 'none'
        })
        this.setData({
          isLoading: false
        })
      })
    })
    .catch(err => {
      wx.showToast({
        title: err,
        icon: 'none'
      })
    })
  },

  // 表单验证
  formVldt: function () {
    const boolCompany = !!this.data.company.length
    const boolNick = !!this.data.nickName.length
    const boolPosition = !!this.data.position.length
    return new Promise((resolve, reject) => {
      if (!boolNick) {
        reject('请输入昵称')
      } else if (!boolCompany) {
        reject('请输入公司名称')
      } else if (!boolPosition) {
        reject('请输入职位')
      } else {
        resolve()
      }
    })
  },

  // 昵称输入
  onNickChange: function (e) {
    const nickName = e.detail.detail.value
    this.setData({
      nickName
    })
  },
  onCompanyChange: function (e) {
    const company = e.detail.detail.value
    this.setData({
      company
    })
  },
  onPositionChange: function (e) {
    const position = e.detail.detail.value
    this.setData({
      position
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})