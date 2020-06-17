// pages/bannerDetail/bannerDetail.js
var util = require("../../utils/util.js");
const db = wx.cloud.database({}); // 初始化数据

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 读取数据记录 必须使用箭头函数才能显示数据
    db.collection('article').doc(options.id).get({
      success: res => {
        // res.data 包含该记录的数据
        this.setData({
          item: res.data,
          date: util.formatTime(res.data.updateTime)
        })
      }
    })
  }
})