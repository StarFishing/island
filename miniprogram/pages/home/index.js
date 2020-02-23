// pages/home/home.js
const app = getApp()
const db = wx.cloud.database() // 初始化数据库
Page({
  /**
   * 页面的初始数据
   */
  data: {
    count: 0, // 点赞数量
    likeStatus: false, // 是否点过赞
    month: '二月',
    day: '14',
    year: '1997',
    article_id: 0, // 当前文章id
    openid: 0, // 当前用户id
    _id: 0, // 当前文章数据库id
    submitLike: false, // 是否正在提交,
    articleList: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('load')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.showLoading({
      title: '加载中'
    })
    let _self = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              _self.setUserInfoOnGloable()
            },
            fail(err) {
              _self.gotoLogin()
            }
          })
        } else {
          _self.setUserInfoOnGloable()
        }
      }
    })

    this.getArticalList()
  },

  setUserInfoOnGloable: function() {
    wx.getUserInfo({
      success: function(res) {
        app.globalData.userInfo = res.userInfo
      }
    })
    wx.cloud
      .callFunction({
        name: 'login'
      })
      .then(res => {
        app.globalData.userInfo.openid = res.result.openid
        app.globalData.userInfo.appid = res.result.appid
      })
  },

  gotoLogin: function() {
    wx.showModal({
      content: '您还没有登录哦，请先登录',
      confirmText: '确认',
      cancelText: '取消',
      success: function(res) {
        //点击“确认”时打开设置页面
        if (res.confirm) {
          wx.switchTab({
            url: '/pages/like/like'
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log('show')
  },

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
  onShareAppMessage: function(res) {
    let shareInfo = res.target.dataset.shareinfo
    return {
      title: shareInfo.title,
      path: shareInfo.path
    }
  },
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
  },
  getArticalList: function() {
    wx.cloud
      .callFunction({
        name: 'getArticalList'
      })
      .then(res => {
        wx.hideLoading()
        if (res.result.data) {
          this.setData({
            articleList: res.result.data
          })
        } else {
          wx.showToast({
            title: res.result.errMsg,
            icon: 'none'
          })
        }
      })
  }
})
