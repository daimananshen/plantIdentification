// pages/showData/showData.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: '',
    content: '',
    dataName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let dataList = JSON.parse(app.globalData.getData)

    for (let i = 0; i < dataList.length; i++) {
      if (dataList[i].baike_info) {
        this.content = dataList[i].baike_info
        this.dataName = dataList[i].name
        console.log(this.content)
      } 
    }

    this.setData({
      img: app.globalData.image,
      dataInfo: this.content,
      dataName: this.dataName
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})