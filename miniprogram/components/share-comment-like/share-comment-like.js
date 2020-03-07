const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    currentId: {
      type: String,
      value: undefined
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    share: 1,
    message: 2,
    like: 3
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleShare () {
      console.log('share')
    },
    handleDetail () {
      console.log('detail')
    },
    handleLike () {
      console.log('like')
      app.service('handleLike', {
        likedId: this.properties.currentId
      })
        .then(res => {
          console.log(res)
        })
    }
  }
})
