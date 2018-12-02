// miniprogram/pages/admin/admin.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maskDisplay: 'none',
    ballBottom: 20,
    ballRight: 30,
    ballOpacity: '.8',

    slideHeight: 0,
    slideRight: 0,
    slideWidth: 0,
    slideDisplay: 'block',
    screenHeight: 0,
    screenWidth: 0,
    slideAnimation: {},

    waitList:['1','2','3'],
    showContStatus: false,

    hid:[],

    meetingContent:'',
    meetingName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          screenHeight: res.windowHeight,
          screenWidth: res.windowWidth,
          slideHeight: res.windowHeight,
          slideRight: res.windowWidth,
          slideWidth: res.windowWidth * 0.7
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  ballMoveEvent: function(e) {
    var touchs = e.touches[0];
    var pageX = touchs.pageX;
    var pageY = touchs.pageY;
    if (pageX < 25) return;
    if (pageX > this.data.screenWidth - 25) return;
    if (this.data.screenHeight - pageY <= 25) return;
    if (pageY <= 25) return;
    var x = this.data.screenWidth - pageX - 25;
    var y = this.data.screenHeight - pageY - 25;
    this.setData({
      ballBottom: y,
      ballRight: x
    });
  },
  ballClickEvent: function() {
    slideUp.call(this);
  },
  //遮罩点击  侧栏关闭
  slideCloseEvent: function() {
    slideDown.call(this);
  },

  authorShowEvent: function() {
    this.setData({
      modalMsgHidden: false
    });
  },

  modalMsgHiddenEvent: function() {
    this.setData({
      modalMsgHidden: true
    });
  },

  onPullDownRefreash: function(e) {

    console.log(1);
  },
  pass:function(e){
    var i = e.currentTarget.dataset.id;
    var item = e.currentTarget.dataset.value;
    var tem = this.data.hid;
    tem[i] = true;
    this.setData({
      hid :tem,
    })
    wx.showToast({
      title: '通过',
    })
    //修改数据库内容
  },
  reject:function(e){
    var i = e.currentTarget.dataset.id;
    var item = e.currentTarget.dataset.value;
    var tem = this.data.hid;
    tem[i] = true;
    this.setData({
      hid: tem,
    })
    wx.showToast({
      title: '已拒绝',
      image:'../../images/关闭.png'
    })
    //修改数据库内容
  },
  getName: function (e) {
    this.setData({
      meetingName: e.detail.value,
    })
  },
  getCont: function (e) {
    this.setData({
      meetingContent: e.detail.value,
    })
  },
  confirm:function(){
    var that = this;
    slideDown.call(this);
    wx.showToast({
      title: '添加成功!',
    })
    db.collection('room').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        maxnum:that.data.meetingContent,
        where:that.data.meetingName,
      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      },
      fail: console.error
    })
  },
  
});

//侧栏展开
function slideUp() {
  var animation = wx.createAnimation({
    duration: 300
  });
  this.setData({
    maskDisplay: 'block'
  });
  animation.translateX('100%').step();
  this.setData({
    slideAnimation: animation.export()
  });
}

//侧栏关闭
function slideDown() {
  var animation = wx.createAnimation({
    duration: 800
  });
  animation.translateX('-100%').step();
  this.setData({
    slideAnimation: animation.export()
  });
  this.setData({
    maskDisplay: 'none'
  });

};

