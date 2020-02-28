// miniprogram/pages/poetry/ci.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchText: '',
    curPoetry: '',
    showTip: false
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

  doSearch: function (e) {
    console.log(e.value);
  },

  onQuery: function (e) {
    // const _this = this;
    const queryText = e.detail.value;
    const db = wx.cloud.database();
    db.collection("ci").where({
      rhythmic: queryText
    }).get({
      success: res => {
        if (res.data.length == 0) {
          wx.showToast({
            title: '无结果',
            icon: 'none'
          })
        } else {
          this.setData({
            curPoetry: res.data
          })
        }
        console.log("搜索成功！", res)
      },
      fail: err => {
        wx.showToast({
          title: '无结果',
          icon: 'none'
        })
      }
    })
  },

  newQuery: async function (e) {
    wx.showLoading({
      title: '搜索中...',
    })
    let rhythmic = e.detail.detail.value;
    let author = e.detail.detail.value;
    let res = await wx.cloud.callFunction({
      name: 'searchPoetry',
      data: {
        rhythmic
      }
    })

    let poetries = res.result.data.map(item => {
      return {
        ...item,
        paragraphs: item.paragraphs.join('')
      }
    })
    console.log(res);

    this.setData({
      curPoetry: poetries,
      showTip: poetries.length === 0
    })
    wx.hideLoading();
  },

  showPoetry: (e) => {
    console.log(e.currentTarget.dataset.item);
    app.globalData.selectedPoetry = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: "../poetryDetail/detail",
      success: () => {
        console.log(app.globalData.selectedPoetry)
      }
    })
  },

  hideTip: function () {
    this.setData({
      showTip: false
    })
  }
})