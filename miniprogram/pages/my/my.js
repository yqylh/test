//index.js
const app = getApp()
var id
wx.cloud.init()
const db = wx.cloud.database()
const _ = db.command
var st = 233
Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    name: '',
    id:'',
    identity:'',
    flag:true
  },
  clicksao: function () {
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },
  onLoad: function () {
    var myThis = this;
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        id = res.result.OPENID
      }
    }),
      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                this.setData({
                  avatarUrl: res.userInfo.avatarUrl,
                  userInfo: res.userInfo
                  //id : 从数据库获取
                })
              }
            })
          }
        }
      }),
      db.collection('user').where({
        _openid: id,
      })
      .get({
        success: function (res) {
          st = res.data[0].Identity
          myThis.setData({
            identity: st,
          })
          if (st == 'Admin') {
            myThis.setData({
              flag: false,
            })
          }
        }
      })
  },
  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
  getName: function () {
    if (this.data.userInfo != {}) {
      this.setData({
        name: this.data.userInfo.nickName
      })
    }
  },
  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

})

