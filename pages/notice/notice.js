// pages/notice/notice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgURL: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //上传文件
  upload() {
    //把this赋值给that，就相当于that的作用域是全局的。
    let that = this;
    console.log("jaj");
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log("成功", res);
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
        console.log("上传成功", res)
        //获取文件路径
        this.setData({
          imgURL: res.fileID
        })
      },
      fail: console.error
    })
  }
  // formSubmit(e) {
  //   console.log('form发生了submit事件，携带数据为：', e.detail.value)
  // },
  
})