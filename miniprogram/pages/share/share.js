// pages/share/share.js
var meeting_id
wx.cloud.init()
const db = wx.cloud.database()
const _ = db.command
Page({
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '欢迎参加会议',
      path: '/pages/share/share?id=' + meeting_id
    }
  },
  onLoad: function (options) {
    var Mythis = this
    meeting_id = options.id
    db.collection('meeting').where({
      time: _.eq(meeting_id)
    })
      .get({
        success: function (res) {
          // console.log(meeting_id)
          Mythis.setData({
            Introduction: res.data[0].Introduction,
            from: res.data[0].from,
            title: res.data[0].title,
            where: res.data[0].where,
            whouse: res.data[0].whouse,
            flag: false
          })
        }
      })
  },
  data: {
    Introduction: "",
    from: "",
    title: "",
    where: "",
    whouse: "",
  },
  join:function() {
    var Mythis = this
    var __id
    var id
    var test
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        id = res.result.OPENID
      }
    })
    db.collection('user').where({
      _openid: _.eq(id)
    })
      .get({
        success: function (res) {
          if (res.data.length == 0) {
            db.collection('user').add({
              data: {
                Identity: "Teacher",
                name: "",
                participate: [0],
                usernum: ""
              },
              success:function(res){
                __id = res._id
              }
            })
            db.collection('user').doc(__id).update({
              data: {
                participate: _.push(meeting_id)
              },
              success: function (res) {
                console.log(res)
              }
            })
            wx.switchTab({
              url: '../index/index',
            })
            wx.showToast({
              title: '加入成功',
              icon: 'success',
              duration: 2000
            })
            return;
          }
          __id = res.data[0]._id;
          test = res.data[0].participate;
          for (var i = 0; i < test.length; i++) {
            if (test[i] == meeting_id) {
              Mythis.setData({
                flag: true
              })
              // wx.switchTab({
              //   url: '../index/index',
              // })
              wx.showToast({
                title: '您已经参加了',
                icon: 'success',
                duration: 2000
              })
              return;
            }
          }
          db.collection('user').doc(__id).update({
            data: {
              participate: _.push(meeting_id)
            },
            success: function (res) {
              console.log(res)
            }
          })
          wx.switchTab({
            url: '../index/index',
          })
          wx.showToast({
            title: '加入成功',
            icon: 'success',
            duration: 2000
          })
        }
      })
  }
})
