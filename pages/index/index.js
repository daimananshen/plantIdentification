Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    item: [],
  },
  /**
  
     * 生命周期函数--监听页面加载
  
     */

  onLoad: function(options) {

    //加载轮播图

    this.getBanner();

  },

  // 轮播图代码

  getBanner() {

    // 调用默认环境数据库的引用

    const db = wx.cloud.database()

    // tables数据库创建的集合名称

    const banner = db.collection('banner')

    //promise

    banner.get().then(res => {
        console.log(res)

        this.setData({
          item: res.data
        })

      })
      .catch(err => {
        console.log(err)
      })

  }
})