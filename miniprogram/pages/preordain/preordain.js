// pages/logs/logs.js
//获取应用实例
var app = getApp()
var b1
var b2
var b3
const date = new Date()
var startyear;
startyear = date.getFullYear();
var s2
s2 = date.getMonth() + 1;
var s3
s3 = date.getDate();
var ed1;
var ed2;
var ed3;
var va;
var years = []
var months = []
var days = []
if (s2 == 2) {
  if (startyear % 400 == 0 || (startyear % 4 == 0 && startyear % 100 == 0)) {
    va = 29;
  }
  va = 28;
} else {
  if (s2 == 1 || s2 == 3 || s2 == 5 || s2 == 7 || s2 == 8 || s2 == 10 || s2 == 12) va = 31;
  else va = 30;
}
ed3 = s3 + 30;
ed2 = s2;
while (ed3 > va) {
  ed3 -= va;
  ed2++;
}
if (ed3 == 0) ed3 = va;
ed1 = startyear;
if (ed2 > 12) {
  ed1++;
  ed2 -= 12;
}
for (let i = startyear; i <= ed1; i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}
Page({
  data: {
    classType:[['1','2','3','4','5','6'],['1','2'],['3','4'],['5','6']],
    curClass:[],
    num: 0,
    leastCont:0,
    mostCont:0,
    datename: "日期",
    year: startyear,
    month: s2,
    day: s3,
    a1: startyear,
    a2: s2,
    a3: s3,
    eyear: ed1,
    emonth: ed2,
    eday: ed3,
    years: years,
    months: months,
    days: days,
    value: [0, s2-1, s3-1],
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    showModalStatus: false,
    showContStatus: false,
  },

  showType: function () {
    var myThis = this;
    wx.showActionSheet({
      itemList: ['显示全部','大', '中', '小'],
      success: function (res) {
        myThis.setData({
          num: res.tapIndex 
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      },
    })

  },
  /**
   * 对话框确认按钮点击事件
   */
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  powerDrawer1: function (e) {
    if (((b1 < ed1) || (b1 == ed1 && b2 < ed2) || (b1 == ed1 && b2 == ed2 && b3 <= ed3)) && ((b1 > startyear || (b1 == startyear && b2 > s2) || (b1 ==  startyear && b2 == s2 && b3 >= s3)))) {
      var currentStatu = e.currentTarget.dataset.statu;
      this.util(currentStatu);
      this.setData({
        datename: b1 + '.' + b2 + '.' + b3
      })
      wx.showToast({
        title: '成功',
      })
    }
    else {
      wx.showModal({
        title: '提示',
        content: '日期不在规定范围内',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击重置')
          } else {
            console.log('用户点击取消')
          }

        }
      })
    }
  },
  showCont: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util_2(currentStatu)
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

    // 第3步：执行第一组动画：Y轴偏移240px后(盒子高度是240px)，停
    animation.translateY(240).step();

    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画：Y轴不偏移，停
      animation.translateY(0).step()
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })

      //关闭抽屉
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示抽屉
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },
  bindChange: function (e) {
    const val = e.detail.value
    b1 = this.data.years[val[0]]
    b2 = this.data.months[val[1]]
    b3 = this.data.days[val[2]]
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
  },
  util_2: function (currentStatu) {
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
      //关闭抽屉
      if (currentStatu == "close") {
        this.setData(
          {
            showContStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示抽屉
    if (currentStatu == "open") {
      this.setData(
        {
          showContStatus: true
        }
      );
    }
  },
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