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
    year: '1997',
    article_id: 0,
    openid: 0,
    _id: 0,
    submitLike: false
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
    let _self = this
    let isLogin = this.getUserInfo()
    if (!isLogin) {
      wx.showToast({
        title: '登陆后再来点赞哦~',
        icon: 'none'
      })
      return
    } else {
      if (!this.data.openid) {
        this.setData({
          openid: app.globalData.userInfo.openid
        })
      }
      let openid = app.globalData.userInfo.openid
      if (this.data.submitLike) return
      this.setData({
        submitLike: true
      })
      if (like.detail.isLike) {
        db.collection('praise')
          .doc(this.data._id)
          .get()
          .then(res => {
            // 查询到已经点过赞则更新数据
            db.collection('praise')
              .doc(this.data._id)
              .update({
                // data 传入需要局部更新的数据
                data: {
                  count: this.data.count + 1,
                  likeStatus: true
                },
                success: function(res) {
                  _self.setData({
                    count: _self.data.count + 1,
                    likeStatus: true,
                    submitLike: false
                  })
                }
              })
          })
          .catch(() => {
            // 插入数据
            db.collection('praise')
              .add({
                data: {
                  count: this.data.count + 1,
                  likeStatus: true,
                  openid: openid
                }
              })
              .then(res => {
                console.log(res)
                this.setData({
                  count: this.data.count + 1,
                  likeStatus: true,
                  _id: res._id,
                  submitLike: false
                })
              })
          })
      } else {
        db.collection('praise')
          .doc(this.data._id)
          .get()
          .then(() => {
            db.collection('praise')
              .doc(this.data._id)
              .update({
                // data 传入需要局部更新的数据
                data: {
                  count: this.data.count - 1,
                  likeStatus: false
                },
                success: function(res) {
                  _self.setData({
                    count: _self.data.count - 1,
                    likeStatus: false,
                    submitLike: false
                  })
                }
              })
          })
          .catch(err => {
            console.log(err)
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
