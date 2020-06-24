// pages/wikipediaDetail/wikipediaDetail.js
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
  onLoad: function(options) {
    getId = options.id
    db.collection('wikipedia').doc(options.id).get({
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
  onShow: function() {

    db.collection('wikipedia').doc(getId).get({
      success: res => {
        this.count = res.data.eye 

        db.collection('wikipedia').doc(getId).update({
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