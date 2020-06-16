Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    item: [],
    items: [],
  },
  /**
  
     * 生命周期函数--监听页面加载
  
     */

  onLoad: function(options) {

    //加载轮播图

    this.getBanner();

    // 获取文章
    this.getArticle();

  },

  // 轮播图代码

  getBanner() {

    // 调用默认环境数据库的引用

    const db = wx.cloud.database()

    // tables数据库创建的集合名称

    const banner = db.collection('banner')

    //promise

    banner.get().then(res => {

        this.setData({
          item: res.data
        })

      })
      .catch(err => {
        console.log(err)
      })

  },

  // 获取文章
  getArticle() {

    // 调用默认环境数据库的引用

    const db = wx.cloud.database()

    // tables数据库创建的集合名称

    const article = db.collection('article')

    //promise

    article.get().then(res => {

        this.setData({
          items: res.data
        })

      })
      .catch(err => {
        console.log(err)
      })

  },
  // 查看详情
  viewDetail: function(e) {
    let id = e.target.dataset.id;

    wx.navigateTo({
      url: '../detail/detail?id=' + id
    })
    console.log(e)
  },
  // banner详情
  bannerDetail(e){
    let id = e.target.dataset.id;

    wx.navigateTo({
      url: '../bannerDetail/bannerDetail?id=' + id
    })
    console.log(e)
  }
})