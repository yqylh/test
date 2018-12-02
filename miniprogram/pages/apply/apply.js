// miniprogram/pages/apply/apply.js
wx.cloud.init()
const db = wx.cloud.database()
const _ = db.command
var id
import regeneratorRuntime from '../regenerator-runtime/runtime.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meetingTheme:'',
    meetingContent:'',
    mediaNeeded:false,
    teaNeed:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        id = res.result.OPENID


      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
      
  },
  getTheme:function(e){
    this.setData({
      meetingTheme:e.detail.value,
    })
  },
  getCont: function (e) {
      this.setData({
        meetingContent: e.detail.value,
      })
  },
  switch1Change: function (e) {
    this.setData({
      mediaNeeded:e.detail.value,
    })
  },
  switch2Change: function (e) {
    this.setData({
      teaNeed:e.detail.value,
    })
  },              ///将该四个变量传到数据库中即可
  confirm:function(e){
    var Mythis = this
    var where_id = e.id
    // console.log(time)
    if(this.data.meetingTheme!=''){
      var date2 = new Date;
      var date22 = date2.toString()
      db.collection('meeting').add({
        data: {
          Introduction: Mythis.data.meetingContent,
          check:2,
          time: date22,
          where: where_id,
          title: Mythis.data.meetingTheme,
          mediaNeeded: Mythis.data.mediaNeeded,
          teaNeed: Mythis.data.teaNeed
        },
        success: function (res) {
          // console.log(res)
        },
        fail: console.error
      }),
        db.collection('user').where({
          _openid: _.eq(id)
        })
          .get({
            success: function (res) {
              db.collection('user').doc(res._id).update({
                data: {
                  participate:_.push(date22)
                }
              })
            }
          })
      wx.navigateBack({
        url: '../index/index',
      }),
      wx.showToast({
        title: '申请成功!',
        icon: 'success',
      })
    }else {
      wx.showToast({
        title: '会议主题不能为空!',
        image:'../../images/关闭.png',
      })
    }
  }
})