// pages/home/home.js
const app = getApp()
const db = wx.cloud.database() // 初始化数据库
Page({
  /**
   * 页面的初始数据
   */
  data: {
    openid: 0, // 当前用户id
    _id: '', // 当前文章数据库id
    submitLike: false, // 是否正在提交,
    articleList: null,
    articleItem: {
      cover: '',
      type: '',
      desc: '',
      sourceLink: '',
      title: ''
    },
    articleItemHeader: {
      article_id: 0, // 当前文章id
      count: 0, // 点赞数量
      likeStatus: false, // 是否点过赞
      month: '二月',
      day: '14',
      year: '1997'
    },
    articleItemIndex: 0
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
      if (this.data.submitLike) return
      this.setData({
        submitLike: true
      })
      if (like.detail.isLike) {
        wx.cloud
          .callFunction({
            name: 'updateArticleLike',
            data: {
              praise: true,
              count: this.data.articleItemHeader.count + 1,
              id: this.data._id
            }
          })
          .then(() => {
            _self.setData({
              ['articleItemHeader.count']:
                this.data.articleItemHeader.count + 1,
              submitLike: false,
              ['articleItemHeader.likeStatus']: true
            })
          })
      } else {
        wx.cloud
          .callFunction({
            name: 'updateArticleLike',
            data: {
              praise: false,
              count: this.data.articleItemHeader.count - 1,
              id: this.data._id
            }
          })
          .then(res => {
            _self.setData({
              ['articleItemHeader.count']:
                this.data.articleItemHeader.count - 1,
              submitLike: false,
              ['articleItemHeader.likeStatus']: false
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
          this.setArticleItem()
        } else {
          wx.showToast({
            title: res.result.errMsg,
            icon: 'none'
          })
        }
      })
  },
  setArticleItem: function() {
    for (let i = 0; i < this.data.articleList.length; i++) {
      if (i === this.data.articleItemIndex) {
        let item = this.data.articleList[i]
        this.setData({
          articleItem: {
            cover: item.cover,
            type: item.type,
            desc: item.desc,
            sourceLink: item.sourceLink,
            title: item.title
          },
          articleItemHeader: {
            article_id: item._id, // 当前文章id
            count: item.linkNum, // 点赞数量
            likeStatus: item.hasPraise, // 是否点过赞
            month: item.month,
            day: item.day,
            year: item.year
          },
          articleItemIndex: i,
          _id: item._id
        })
        break
      }
    }
  }
})
