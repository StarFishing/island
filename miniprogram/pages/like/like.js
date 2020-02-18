// pages/like/like.js

const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bgImg: '/images/bg.jpeg',
    bagUrl: '',
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
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    wx.getUserInfo({
      success: res => {
        console.log(res.userInfo.avatarUrl)
        this.setData({
          bagUrl: res.userInfo.avatarUrl,
          userText: ''
        })
        app.globalData.userInfo = res.userInfo
      }
    })

    // wx.getSetting({
    //   success(res) {
    //     console.log(app.globalData)
    //     if (!res.authSetting['scope.userInfo']) {
    //       wx.authorize({
    //         scope: 'scope.userInfo',
    //         success(user) {
    //           console.log(user)
    //         }
    //       })
    //     }
    //   }
    // })
  }
})
