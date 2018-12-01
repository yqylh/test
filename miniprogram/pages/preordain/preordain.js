// pages/logs/logs.js
//获取应用实例
var app = getApp()
const date = new Date()
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
    open: [false, true, true],
    ordList: ['test1', 'test2\n换行'],
    waitList: ['waiting one', 'waiting two', 'waiting tree'],
    hisList: ['his1', 'his2']
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  }
})