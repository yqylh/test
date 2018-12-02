var rth;
var lth;
var lnow;
var rnow;
rth = 50;
lth = 50;
var ls;
var rs;
var le;
var re;
ls = 8;
le = 13;
rs = 13;
re = 18;
var as = []
var at = []
var ccc;
  as.push(8);
  at.push(18);
Page({
  data: {
    arrays: as,
    arrayt: at,
    leftMin: ls, //左边滑块最小值
    leftMax: le, //左边滑块最大值
    rightMin: rs, //右边滑块的最小值
    rightMax: re, //右边滑块最大值
    leftValue: ls, //左边滑块默认值
    rightValue: re, //右边滑块默认值
    leftWidth: '50', //左边滑块可滑动长度：百分比
    rightWidth: '50', //右边滑块可滑动长度：百分比
    leftV: ls + ":00",
    rightV: re + ":00"
  },
  onLoad:function(e){
    ccc=e.id;
  },
  // 左边滑块滑动的值
  leftChange: function (e) {
    console.log('左边改变的值为：' + e.detail.value);
    lnow = e.detail.value;
    var that = this;
    if (e.detail.value == le && le != 18) {
      rth -= 10;
      lth += 10;
      rs += 1;
      le += 1;
    }
    that.setData({
      rightWidth: rth,
      leftWidth: lth,
      leftMax: le,
      rightMin: rs,
      leftValue: e.detail.value, //设置左边当前值
      leftV: e.detail.value + ":00"
    })
  },
  // 右边滑块滑动的值
  rightChange: function (e) {
    console.log('右边改变的值为：' + e.detail.value);
    var that = this;
    rnow = e.detail.value;
    if (e.detail.value == rs && rs != 8) {
      rth += 10;
      lth -= 10;
      rs -= 1;
      le -= 1;
    }
    that.setData({
      rightWidth: rth,
      leftWidth: lth,
      leftMax: le,
      rightMin: rs,
      rightValue: e.detail.value,
      rightV: e.detail.value + ":00"
    })
  },
  makesure: function (e) {
    var bb
    var ii
    var pd
    var tt
    pd = 0;
    bb = 1;
    for (var i = 0; i < as.length; i++) {
      if (as[i] <= lnow && at[i] >= rnow) {
        bb = 1;
        ii = i;
        tt = at[i];
        break;
      }
    }
    if (bb == 1) {
      if (as[ii] - lnow != 0) {
        pd++;
        at[ii] = lnow;
      }
      if (tt - rnow != 0) {
        if (pd == 1) {
          for (var i = as.length; i > ii; i--) {
            at[i] = at[i - 1];
            as[i] = as[i - 1];
          }
          as[ii + 1] = rnow;
          at[ii + 1] = tt;
        }
        else {
          as[ii] = rnow;
        }
      }
      wx.navigateTo({
        url: '../apply/apply?id=' + ccc,
      })
      wx.showToast({
        title: '成功',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '该时间不在可选范围之内,请重置',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }
  }
})
