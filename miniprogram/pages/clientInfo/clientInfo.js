// pages/clientInfo/clientInfo.js
var id
wx.cloud.init()
const db = wx.cloud.database()
Page({

  data: {
    hiddenmodalput: true,
    //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框
  },
  formBindsubmit: function (e) {
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        id = res.result.OPENID
      }
    })
    const _ = db.command
    db.collection('user').where({
      _openid: _.eq(id)
    })
      .get({
        success: function (res) {
          db.collection('user').doc(res.data[0]._id).update({
          data: {
            name: e.detail.value.userName,
            usernum: e.detail.value.userNum
          },
        })
        }
    })
    wx.showToast({
      title: '提交成功',
    })
    wx.redirectTo({
      url: '../my/my',
    })
  },
  /**
   * 组件的方法列表
   */
    modalinput: function () {
      this.setData({
        hiddenmodalput: !this.data.hiddenmodalput
      })
    },
    //取消按钮
    cancel: function () {
      this.setData({
        hiddenmodalput: true
      });
    },
    //确认
    confirm: function () {
      this.setData({
        hiddenmodalput: true
      })
  }
})