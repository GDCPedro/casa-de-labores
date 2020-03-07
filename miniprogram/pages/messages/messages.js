const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentDetail: {},
    messageTxt: '',
    curId: '',
    msgList: []
  },

  //setMessageTxt
  setMessageTxt: function (e) {
    // this.setData({
    //   messageTxt: e.detail.value
    // })
  },

  // 获取已评论的列表
  getTalkedData: function (commentedId) {
    app.service('getMessageList', { commentedId })
      .then(res => {
        this.setData({
          msgList: res.data.data
        })
      })
  },

  // 发送消息
  handleSend: function (e) {
    const data = {
      // 评论的内容
      comment: e.detail.value,
      // 评论者的昵称
      fromNick: app.globalData.userInfo.nickName,
      // 评论者的openid
      fromOpenId: app.globalData.userInfo.openid,
      // 评论者的头像
      fromAvatar: app.globalData.userInfo.userInfo.avatarUrl,
      // 被评论的那一条新闻
      commentedId: this.data.curId,
      // 父级节点的_id
      parentId: '',
      // 点赞数
      like: 0
    }
    console.log(data)
    app.service('addMessage', data)
      .then(res => {
        console.log(res)
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      curId: options._id
    })
    this.getDetail(options._id)
    this.getTalkedData(options._id)
  },

  // 获取详情
  getDetail: function (_id) {
    app.service('getNewData', { _id })
      .then(res => {
        if (res.code === 0) {
          this.setData({
            commentDetail: res.data.data
          })
        }
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
  onShow: function (option) {
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
    console.log(111)
    // this.getDetail(this.data.curId)
    // this.getTalkedData(this.data.curId)
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