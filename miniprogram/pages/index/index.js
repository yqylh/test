  //index.js
const app = getApp()
wx.cloud.init()
const db = wx.cloud.database()
const _ = db.command
var curtime = Date.parse(new Date());
var id
var _id
import regeneratorRuntime from '../regenerator-runtime/runtime.js';
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
    ordList:[],
    waitList:[],
    hisList:[],
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
      open: [false, true, true],
      ordList:this.data.ordList,
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
    return;
  },
  share:function(e){
    var id = "2018_12_1_1"
    wx.navigateTo({
      url: '../share/share?id=' + id,
    })
  },
  // onShow: async function() {

  // },
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
        id = res.result.OPENID
        // console.log(id)
        db.collection('user').where({
          _openid: _.eq(id)
        }).get({
          success: function (res) {
            if (res.data.length == 0) {
              db.collection('user').add({
                data: {
                  Identity: "Teacher",
                  name: "",
                  participate: [0],
                  usernum: ""
                }
              })
              // console.log("添加成功")
            }
          },
        })
      }
    })
    // while(id != null);
    // console.log(23)
    var Mythis = this;
    var attend;
    db.collection('user').where({
      _openid: _.eq(id)
    })
      .get({
        success: function (res) {
          _id = res.data[0]._id
          attend = res.data[0].participate
          // console.log(attend)
          var date2 = new Date;
          // console.log(date2)
          for (var i = 1; i < attend.length; i++) {
            db.collection('meeting').where({
              time: _.eq(attend[i]),
              end: _.lt(date2),
              check: _.eq(1)
            })
              .get({
                success: function (res) {
                  // console.log(res)
                  Mythis.data.ordList.push('时间' + res.data[0].from + '地点'+ res.data[0].where + '主题' + res.data[0].title)
                  Mythis.setData({
                    ordList: Mythis.data.ordList,
                  })
                }
              }),
            db.collection('meeting').where({
              time: _.eq(attend[i]),
              check: _.eq(2)
            })
              .get({
                success: function (res) {
                  // console.log(res)
                  Mythis.data.waitList.push('时间' + res.data[0].from + '地点' + res.data[0].where + '主题' + res.data[0].title)
                  Mythis.setData({
                    waitList: Mythis.data.waitList,
                  })
                }
              }),
            db.collection('meeting').where({
              time: _.eq(attend[i]),
              end: _.gt(date2)
            })
              .get({
                success: function (res) {
                  console.log(res)
                  Mythis.data.hisList.push('时间' + res.data[0].from + '地点' + res.data[0].where + '主题' + res.data[0].title)
                  Mythis.setData({
                    hisList: Mythis.data.hisList,
                  })
                }
              })
          }
        }
      })
  },
});