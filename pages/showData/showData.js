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
  onLoad: function(options) {

    let dataList = JSON.parse(app.globalData.getData)
    console.log('dataList', dataList)
    for (let i = 0; i < dataList.length; i++) {
      if (dataList[i].baike_info) {
        console.log('dataList[i]', dataList[i])
        this.content = dataList[i].baike_info
        this.dataName = dataList[i].name
        this.score = [(dataList[i].score).toFixed(2)]*100
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
      noData: this.noData,
      score: this.score
    });

  },
  //系统自带分享方法
  onShareAppMessage: function(res) {
    if (res.from === 'button') {}
    return {
      title: this.dataName, //转发标题
      path: '/pages/takePhoto/takePhoto', //转发路径，跳转路径
      imgUrl: app.globalData.image
    }
  }
})