// miniprogram/pages/newComment/newComment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment: {
      company: '',
      content: '',
      title: ''
    }
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

  },

  // 勇敢实名发布
  handlePublishReal() {
    const comment = this.data.comment
    wx.cloud.callFunction({
      name: 'newComment',
      data: {
        comment
      }
    }).then(res => {
      console.log(res)
      if (res.result.code === 0) {
        wx.showToast({
          title: '发布成功！'
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },

  // 设置值
  setCompany (e) {
    const company = e.detail.detail.value
    this.setData({
      comment: { ...this.data.comment, company }
    })
  },

  setTitle (e) {
    const title = e.detail.detail.value
    this.setData({
      comment: { ...this.data.comment, title }
    })
  },

  setContent (e) {
    const content = e.detail.detail.value
    this.setData({
      comment: { ...this.data.comment, content }
    })
  },
})