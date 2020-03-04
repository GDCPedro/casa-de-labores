// components/message/message.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 头像
    avatar: {
      type: String,
      value: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKPo2PxannibVUXCNhS99UlfRI8ncic0ayFe4IOwkuEQaK2eGJia38icY7RVSaxLbvefxyF6XaANPcKeg/132'
    },
    // 昵称
    nick: {
      type: String,
      value: '昵称'
    },
    // 公司
    company: {
      type: String,
      value: '公司'
    },
    // 职位
    position: {
      type: String,
      value: '职位'
    },
    // 点赞数
    like: {
      type: Number,
      value: 99
    },
    // 内容
    content: {
      type: String,
      value: '内容内容内容'
    },
    // 发表时间
    time: {
      type: Date,
      value: Date.now()
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleLike() {
      console.log('like')
    }
  }
})
