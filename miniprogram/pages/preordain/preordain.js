// pages/logs/logs.js
//获取应用实例
var app = getApp()
const date = new Date()
Page({
  data: {
    classType:[['1','2','3','4','5','6'],['1','2'],['3','4'],['5','6']],
    curClass:[],
    num: 0,
    showModalStatus: false,
    leastCont:0,
    mostCont:0
  },
  showType:function(){
    var myThis = this;
    wx.showActionSheet({
      itemList: ['大', '中', '小'],
      success: function (res) {
        myThis.setData({
          num :res.tapIndex+1
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      },
    })

  },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      //关闭  
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示  
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  }  ,
  reg: function (e) {
    if (e.detail.value.least <= e.detail.value.most) {
      //存入数据库
    }
    this.setData({
      leastCont: e.detail.value.least,
      mostCont: e.detail.value.most,
    })

  }
})