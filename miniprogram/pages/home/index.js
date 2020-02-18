// pages/home/home.js
const app = getApp()
const db = wx.cloud.database() // 初始化数据库
Page({
  /**
   * 页面的初始数据
   */
  data: {
    count: 0,
    likeStatus: false,
    month: '二月',
    day: '14',
    year: '1997'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},
  /**
   * 分享
   */
  onShare: function() {
    console.log('分享')
  },
  /**
   * 点击喜欢
   */
  onLike: function(like) {
    let isLogin = this.getUserInfo()
    if (!isLogin) {
      wx.showToast({
        title: '登陆后再来点赞哦~',
        icon: 'none'
      })
      return
    } else {
      if (like.detail.isLike) {
        // 插入数据
        db.collection('praise')
          .add({
            data: {
              count: this.data.count + 1,
              likeStatus: true
            }
          })
          .then(res => {
            this.setData({
              count: this.data.count + 1,
              likeStatus: true
            })
          })
      } else {
        db.collection('praise')
          .add({
            data: {
              count: this.data.count - 1,
              likeStatus: false
            }
          })
          .then(res => {
            this.setData({
              count: this.data.count - 1,
              likeStatus: false
            })
          })
      }
    }
  },
  /**
   * 判断用户授权状态
   */
  getUserInfo: function() {
    return app.globalData.userInfo
  }
})
