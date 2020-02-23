// components/card-info/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cover: {
      type: String,
      value: ''
    },
    type: {
      type: Number, // 文案类型 1-图文 2-音频文字
      value: 1
    },
    desc: {
      type: String // 文案简介
    },
    title: {
      type: String // 底部名称
    },
    sourceLink: {
      type: String // 音频地址
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {}
})
