// pages/cultivatingDetail/cultivatingDetail.js
const db = wx.cloud.database({}); // 初始化数据
var getId = ""
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
    getId = options.id
    db.collection('cultivating').doc(options.id).get({
      success: res => {
        this.setData({
          item: res.data,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    db.collection('cultivating').doc(getId).get({
      success: res => {
        this.count = res.data.eye
        // update接口需要数据库有_openid,所以需要加个获取—_openid的云函数
        db.collection('cultivating').doc(getId).update({
          // data 传入需要局部更新的数据
          data: {
            eye: this.count + 1
          }
        })
          .then(console.log)
          .catch(console.error)
      }
    })




  },
})