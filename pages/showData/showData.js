// pages/showData/showData.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: '',
    content: '',
    dataName: '',
    noData: ''
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
        // 改变标题名称
        wx.setNavigationBarTitle({
          title: this.dataName
        })
        
      } else {
        this.noData = '抱歉!暂时没有找到具体的内容呢~QAQ'
      }
    }

    this.setData({
      img: app.globalData.image,
      dataInfo: this.content,
      dataName: this.dataName,
      noData: this.noData
    });

  },
  //系统自带分享方法
  onShareAppMessage: function (res) {
    if(res.from === 'button'){}
    return {
      title: this.dataName, //转发标题
      path: '/pages/takePhoto/takePhoto', //转发路径，跳转路径
      imgUrl: app.globalData.image
    }
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