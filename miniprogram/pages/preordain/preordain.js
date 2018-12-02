// pages/logs/logs.js
//获取应用实例
wx.cloud.init()
const db = wx.cloud.database()
const _ = db.command
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
    classType:[[]],
    ifhidden:[],
    curClass:[],
    idid:[],
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
  onLoad: function () {
    var Mythis = this;
    var attend;
    db.collection('room').where({
      maxnum:_.gt(0)
    })
      .get({
        success: function (res) {
          // _id = res.data[0]._id
          // attend = res.data[0].participate
          for (var i = 0; i < res.data.length; i++) {
            Mythis.data.classType[0].push(res.data[i].where + "最多" + res.data[i].maxnum + "人")
            Mythis.data.ifhidden.push(false)
            Mythis.data.idid.push(res.data[i].where)
            Mythis.setData({
              classType:Mythis.data.classType,
              ifhidden:Mythis.data.ifhidden,
              idid:Mythis.data.idid
            })
          }
        }
      })
  },
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
    // console.log(this.data)
    if (e.detail.value.least <= e.detail.value.most) {
      var Mythis = this;
      var attend;
      db.collection('room').where({
        maxnum: _.gt(0)
      })
        .get({
          success: function (res) {
            for (var i = 0; i < res.data.length; i++) {
              if (res.data[i].maxnum > e.detail.value.most || res.data[i].maxnum < e.detail.value.least){
                Mythis.data.ifhidden[i] = true;
                Mythis.setData({
                  ifhidden: Mythis.data.ifhidden
                })
              } else {
                Mythis.data.ifhidden[i] = false;
                Mythis.setData({
                  ifhidden: Mythis.data.ifhidden
                })
              }
            }
          }
        })
      this.setData({
        showContStatus: false,
      })
      // 存入数据库
    }
    else {
      this.setData({
        showContStatus:true,
      }),
        wx.showToast({
          title: '请检查输入!',
          image: '../../images/关闭.png',
        })
    }
    this.setData({
      leastCont: e.detail.value.least,
      mostCont: e.detail.value.most,
    })
  },
  toDetail:function(e){
    // console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../apply/apply?id=' + this.data.idid[e.currentTarget.dataset.id],
    })
  },
  showCont: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util_2(currentStatu)
  },
})