// components/header-bar/header-bar.js
const like = '/images/icon/like.png'
const unlike = '/images/icon/unlike.png'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    day: {
      type: String,
      value: '02'
    },
    month: {
      type: String,
      value: '二月'
    },
    year: {
      type: String,
      value: '1997'
    },
    count: {
      type: Number,
      value: 0
    },
    likeStatus: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    unlike,
    like,
    shareUrl: '/images/icon/share.png',
    shareInfo: {
      title: '旧岛小样',
      path: 'pages/home/index',
      fromButton: 'one'
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggleLike: function() {
      let data = this.properties
      if (data.likeStatus) {
        // 暴露事件到父组件
        this.triggerEvent('clickLike', { isLike: false })
      } else {
        this.triggerEvent('clickLike', { isLike: true })
      }
    },
    onShare: function() {
      // 暴露事件到父组件
      this.triggerEvent('share')
    }
  }
})
