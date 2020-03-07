//index.js
const app = getApp()

Page({
  data: {
    page_no: 1,
    userInfo: {},
    cmtList: []
  },

  //  查看详情、评论
  toDetail: function (e) {
    const _id = e.currentTarget.dataset._id
    wx.navigateTo({
      url: `/pages/messages/messages?_id=${_id}`
    })
  },

  // 转发
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      console.log(res)
    }
    return {
      title: '转发',
      path: `/pages/index/index?page_no=${this.data.page_no}`
    }
  },

  // 转发
  handleShare: function (e) {
    const { type, _id } = { ...e.target.dataset }
    app.service('addOpCount', { type, _id })
      .then(res => {
        this.refreshCount(_id)
      })
      .catch(err => {
        console.error(err)
      })
  },

  // 点赞
  handleLike: function (e) {
    console.log(1)
  },

  // 转发/评论/点赞后获取更新的数据
  refreshCount: function (_id) {
    app.service('getNewData', { _id })
      .then(res => {
        if (res.code === 0) {
          // 设置新值
          this.data.cmtList.map((item, index) => {
            if (item._id === res.data.data._id) {
              this.setData({
                [`cmtList[${index}]`]: res.data.data
              })
            }
          })
        }
      })
  },

  onShow: function () {
    this.getList(this.data.page_no)
  },

  // 获取10条数据
  getList: function (page) {
    app.service('getCmtList', { page })
      .then(res => {
        if (res.code === 0) {
          // wx.showToast({
          //   title: res.msg,
          // })
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
