// pages/notice/notice.js
var imgURL = ''

Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  //上传文件
  upload() {
    //把this赋值给that，就相当于that的作用域是全局的。
    let that = this;

    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        that.uploadImage(res.tempFilePaths[0]);
      }
    })
  },
  uploadImage(fileURL) {
    wx.cloud.uploadFile({
      cloudPath: new Date().getTime() + '.png', // 上传至云端的路径
      filePath: fileURL, // 小程序临时文件路径
      success: res => {
        // 返回文件 ID
        imgURL = res.fileID
        //获取文件路径
        this.setData({
          imgURL: res.fileID
        })
      },
      fail: console.error
    })
  },
  formSubmit(e) {
    //把数据给云数据库
    const db = wx.cloud.database({});
    const cont = db.collection('article');
    cont.add({
      data: {
        title: e.detail.value.input,
        content: e.detail.value.content,
        image: imgURL,
        updateTime: new Date()
      },
      success: function(res) {

        wx.showModal({
          title: '成功',
          content: '您已经发布内容成功',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              console.log(res.confirm)
              wx.navigateTo({
                url: '../index/index'
              })
            }
          }
        })
      }
    });
  },

})