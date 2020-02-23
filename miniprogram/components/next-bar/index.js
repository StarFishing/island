// components/next-bar/index.js
const iconActive = '/images/icon/next-active.svg'
const icon = '/images/icon/next.svg'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String
    },
    currentIndex: {
      type: Number,
      value: 0
    },
    length: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    next: iconActive,
    prev: icon
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleNext: function() {
      // 暴露事件到父组件
      this.triggerEvent('next')
    },
    handlePrev: function() {
      // 暴露事件到父组件
      this.triggerEvent('prev')
    }
  }
})
