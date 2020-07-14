// pages/list/list.js
//获取应用实例
const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },
  onLoad: function(options) {
    this.getListData();
  },
  getListData() {
    const banner = db.collection('user')
    banner.get().then(res => {
      console.log(res)
        this.setData({
          userInfo: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
})