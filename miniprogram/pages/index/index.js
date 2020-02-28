//index.js
const app = getApp()

Page({
  data: {
    page_no: 1,
    userInfo: {},
    cmtList: []
  },

  // onLoad: function () {
  //   // 获取数据
  //   this.getList(this.data.page_no)
  // },

  onShow: function () {
    this.getList(this.data.page_no)
  },

  // 获取10条数据
  getList: function (page) {
    app.service('getCmtList', { page })
      .then(res => {
        if (res.code === 0) {
          wx.showToast({
            title: res.msg,
          })
          console.log(res)
          this.setData({
            page_no: this.data.page_no + 1,
            cmtList: res.data.data
          })
        }
      })
      .catch(err => {
        wx.showToast({
          title: 'Error',
          icon: 'none'
        })
      })
  }
})
