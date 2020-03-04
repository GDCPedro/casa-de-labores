const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,
    comment: {
      company: '',
      content: '',
      position: '',
      like: 0,
      share: 0,
      message: 0
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setDefaultInfo()
  },

  // 设置默认信息
  setDefaultInfo: function () {
    this.setData({
      ['comment.company']: app.globalData.userInfo.company,
      ['comment.position']: app.globalData.userInfo.position,
    })
  },

  // 匿名发布
  /* 
  @params    anonymous  true匿名 false实名
  */
  handlePublishAno: function (e) {
    this.setData({
      isLoading: true
    })
    const anonymous = e.target.dataset.anonymous === 'true'
    const data = {
      ...app.globalData.userInfo,
      ...this.data.comment,
      anonymous
    }
    delete data._id
    app.service('newComment', data).then(res => {
      if (res.code === 0) {
        wx.showToast({
          title: res.msg
        })
        wx.switchTab({
          url: '/pages/index/index'
        })
        this.setData({
          isLoading: false
        })
      }
    })
      .catch(err => {
        console.error(err)
        this.setData({
          isLoading: false
        })
      })
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

  },

  // 设置值
  setCompany (e) {

    console.log(e)
    const company = e.detail.detail.value
    this.setData({
      ['comment.company']: company
    })
  },

  setPosition (e) {
    const position = e.detail.detail.value
    this.setData({
      ['comment.position']: position
    })
  },

  setContent (e) {
    const content = e.detail.detail.value
    this.setData({
      ['comment.content']: content
    })
  },
})