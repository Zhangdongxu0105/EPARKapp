var api = require('requests/api.js');

//app.js
App({
  systemInfo :null,
  onLaunch: function () {
    // console.log('App Launch')
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  globalData: {
    userInfo: null
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  getSystemInfo: function () {
    var that = this
    if (!that.systemInfo){
      wx.getSystemInfo({
        success: function (res) {
          that.systemInfo = res
        }
      })
    }
    return that.systemInfo
  },
  getUserOpenId: function (callback) {
    var self = this
    var openIdUrl = api.postOpenId()
    if (self.globalData.openid) {
      callback(null, self.globalData.openid)
    } else {
      wx.login({
        success: function (data) {
          console.log(data.code)
          wx.request({
            url: openIdUrl,
            data: {
              code: data.code
            },
            success: function (res) {
              console.log('url', openIdUrl)
              console.log('拉取openid成功', res)
              console.log('openid:',res.data.openid)
              self.globalData.openid = res.data.openid
              callback(null, self.globalData.openid)
            },
            fail: function (res) {
              console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
              callback(res)
            }
          })
        },
        fail: function (err) {
          console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
          callback(err)
        }
      })
    }
  }
})