// miniprogram/pages/mapTest/mapTest.js
// const wx = require('wx-server-sdk');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 0,
    longitude: 0,
    showLocationText: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        console.log(res);
        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        wx.showToast({
          title: '获取成功',
        })
      },
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

  showLocation() {
    this.setData({
      showLocationText: true
    })
  },

  // 调用云函数
  add: () => {
    wx.cloud.callFunction({
      name: 'add',
      data: {
        a: 1,
        b: 1
      }
    }).then(console.log)
  }
})