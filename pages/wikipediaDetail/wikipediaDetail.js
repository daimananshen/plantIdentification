// pages/wikipediaDetail/wikipediaDetail.js
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
  onLoad: function (options) {
    db.collection('wikipedia').doc(options.id).get({
      success: res => {
        console.log(res.data)
        this.setData({
          item: res.data,
        })
      }
    })
  }
})