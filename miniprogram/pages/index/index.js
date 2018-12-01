  //index.js
const app = getApp()
wx.cloud.init()
const db = wx.cloud.database()

var curtime = Date.parse(new Date());  
Page({
    data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    open:[false,true,true],
    ordList:['test1','test2\n换行'],
    waitList:['waiting one','waiting two','waiting tree'],
    hisList:['his1','his2']
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
  showOrdlist: function(){
    this.setData({
      open: [false, true, true]
    })
  },
  showWaitlist: function (e) {
    this.setData({
      open: [true, false, true]
    })
  },
  showHis: function (e) {
    this.setData({
      open: [true, true, false]
    })
  },
  toDetailPage:function(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detailPage/detailPage?id='+id+'?title=会议详情',
    })
  },
  share:function(e){
    wx.navigateTo({
      url: '../detailPage/detailPage',
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
        // console.log(id)
        const _ = db.command
        db.collection('user').where({
          _openid: _.eq(id)
        }).get({
            success: function (res) {
              if (res.data.length == 0) {
                db.collection('user').add({
                  data: {
                    Identity: "Teacher",
                  }
                })
                // console.log("添加成功")
              }
            },
          })
      }
    })
  },
})
