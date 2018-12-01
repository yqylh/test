//index.js
const app = getApp()
wx.cloud.init()
const db = wx.cloud.database()

Page({
    data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: false,
    vertical: false,
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0
  },
  changeProperty: function (e) {
    var propertyName = e.currentTarget.dataset.propertyName
    var newData = {}
    newData[propertyName] = e.detail.value
    this.setData(newData)
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  onLoad: function () {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        // console.log('callFunction test result: ', res.result.OPENID)
        var id = res.result.OPENID
        console.log(id)
        const _ = db.command
        db.collection('user').where({
          _openid: _.eq(id)
        }).get({
            success: function (res) {
              if (res.data.length != 0) console.log(res.data)
              else {
                db.collection('user').add({
                  data: {
                    Identity: "Teacher",
                  }
                })
                console.log("添加成功")
              }
            },
          })
      }
    })
  // wx.getSetting({
  //   success: res => {
  //     // if (!res.authSetting['scope.userInfo']) {

  //     // }
  //     // wx.getUserInfo({
  //     //   success: res => {
  //     //     var x = res.userInfo;
  //     //     console.log(x)
  //     //   }
  //     // })
  //   }
  // })
  },
})
