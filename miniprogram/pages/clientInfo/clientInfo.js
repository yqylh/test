// pages/clientInfo/clientInfo.js
var id
wx.cloud.init()
const db = wx.cloud.database()
const _ = db.command
Page({
  onLoad: function() {
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        id = res.result.OPENID
      }
    })
  },
  data: {
    hiddenmodalput: true,
    pwd:'nihao',
    userName: '1',
    userNum: '1'
    //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框
  },
  submit: function (e) {
    var nname = this.data.userName
    var nnum = this.data.userNum
    // console.log(this.data.userName)
    db.collection('user').where({
      _openid: _.eq(id)
    })
      .get({
        success: function (res) {
          // console.log(e.detail.value.userName)
          db.collection('user').doc(res.data[0]._id).update({
            data: {
              name: nname,
              usernum: nnum
            },
          })
          wx.switchTab({
            url: '../my/my',
          })
          wx.showToast({
            title: '提交成功',
          })
        }
      })
  },
  getname: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  getnum: function (e) {
    this.setData({
      userNum: e.detail.value
    })
  },
  getmi:function(e) {
    this.setData({
      pwd:e.detail.value
    })
  },
  showDialogBtn: function () {

    this.setData({
      showModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    var truepwd = "sddaqdxqn3hys"
    if (truepwd == this.data.pwd) {
      db.collection('user').where({
        _openid: _.eq(id)
      })
      .get({
        success: function (res) {
          // console.log(e.detail.value.userName)
          db.collection('user').doc(res.data[0]._id).update({
            data: {
              Identity: "Admin",
            }
          })
          wx.switchTab({
            url: '../my/my',
          })
          wx.showToast({
            title: '申请成功',
            icon: 'success',
            duration: 2000
          })
        }
      })
    } else {
      wx.showToast({
        title: '申请失败',
        icon: 'none',
        duration: 2000
      })
    }

    this.hideModal()
  }
})