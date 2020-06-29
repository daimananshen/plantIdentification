// pages/cultivating/cultivating.js
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
    this.getWikipedia()
  },
  /**
 * 生命周期函数--监听页面显示
 * 从详情页返回到本页，只会调用onshow刷新数据
 */
  onShow: function () {
    this.getWikipedia()
  },
  getWikipedia() {
    const db = wx.cloud.database()
    const wikipedia = db.collection('cultivating')

    wikipedia.get().then(res => {
      this.setData({
        items: res.data
      })

    })
      .catch(err => {
        console.log(err)
      })

  },
  viewDetail(e) {
    let id = e.target.dataset.id;
    wx.navigateTo({
      url: '../cultivatingDetail/cultivatingDetail?id=' + id
    })
  }

})