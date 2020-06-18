Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    indicatorActiveColor:"#07c160",
    indicatorColor:"white",
    interval: 5000,
    duration: 500,
    item: [],
    items: '',
    page: 1, //第几页
    limit: 5, //每页的数量
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
  getArticle(callback) {

    if (!callback) {
      callback = res => {}
    }
    wx.showLoading({
      title: '数据加载中',
    })

    // 调用默认环境数据库的引用

    const db = wx.cloud.database()

    // tables数据库创建的集合名称

    const article = db.collection('article')

    article.get().then(res => {
        var that = this;
        let contentList = that.data.items;

        wx.hideLoading();
        callback();

        if (that.data.page == 1) {
          //第一页的时候直接赋值，contentList  为空避免数据重复
          contentList = [];
          that.setData({
            items: res.data
          })
        }

        if (res.data.length < that.data.limit) {
          that.setData({
            items: contentList.concat(res.data),
            hasMoreData: false, //没有数据了
          })
        } else {
          that.setData({
            items: contentList.concat(res.data),
            hasMoreData: true, //还有数据
            page: that.data.page + 1
          })
        }

      })
      .catch(err => {
        console.log(err)
      })

  },
  // 上拉加载数据
  onReachBottom: function() {
    if (this.data.hasMoreData == false) {
      this.getArticle()
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
  },
  // 查看详情
  viewDetail: function(e) {
    let id = e.target.dataset.id;

    wx.navigateTo({
      url: '../detail/detail?id=' + id
    })
  },
  // banner详情
  bannerDetail(e) {
    let id = e.target.dataset.id;

    wx.navigateTo({
      url: '../bannerDetail/bannerDetail?id=' + id
    })
    console.log(e)
  },
  wikipedia(){
    wx.navigateTo({
      url: '../wikipedia/wikipedia'
    })
  },
  notice(){
    wx.navigateTo({
      url: '../notice/notice'
    })
  }
})