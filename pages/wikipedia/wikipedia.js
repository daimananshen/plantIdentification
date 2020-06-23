// pages/wikipedia/wikipedia.js
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

    this.getWikipedia()
  },
  getWikipedia() {
    const db = wx.cloud.database()
    const wikipedia = db.collection('wikipedia')

    wikipedia.get().then(res => {
        this.setData({
          items: res.data
        })

      })
      .catch(err => {
        console.log(err)
      })

  },
  viewDetail(e){
    let id = e.target.dataset.id;
    wx.navigateTo({
      url: '../wikipediaDetail/wikipediaDetail?id=' + id
    })
  }

})