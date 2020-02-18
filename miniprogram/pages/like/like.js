// pages/like/like.js

const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bgImg: '/images/bg.jpeg',
    bagUrl: '',
    aboutIcon: '/images/icon/about.png',
    userText: 'Click Me'
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
   * 获取用户信息
   */
  getUserInfo: function() {
    // wx.cloud
    //   .callFunction({
    //     name: 'login'
    //   })
    //   .then(res => {
    //     console.log(res)
    //   })
    let _self = this
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo) {
      this.setData({
        bagUrl: app.globalData.avatarUrl,
        userText: ''
      })
    } else {
      wx.authorize({
        scope: 'scope.userInfo',
        success() {
          wx.getUserInfo({
            success: user => {
              console.log(user.userInfo.avatarUrl)
              _self.setData({
                bagUrl: user.userInfo.avatarUrl,
                userText: ''
              })
              app.globalData.userInfo = user.userInfo
            }
          })
        }
      })
      // wx.getSetting({
      //   success(res) {
      //     if (!res.authSetting['scope.userInfo']) {

      //     }
      //   }
      // })
    }
  },
  /**
   * 关于我们
   */
  aboutUs: function() {
    console.log('关于我们')
  }
})
