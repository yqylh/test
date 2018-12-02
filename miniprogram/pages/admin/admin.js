// miniprogram/pages/admin/admin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maskDisplay: 'none',
    ballBottom: 20,
    ballRight: 30,
    ballOpacity: '.8',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  }
});

//侧栏展开
function slideUp() {
  var animation = wx.createAnimation({
    duration: 600
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

