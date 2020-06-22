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
    
    let title = e.detail.value.title;
    let content = e.detail.value.content;

    if (title == '') {
      wx.showToast({
        title: '标题不能为空',
        icon: "none"
      })
      return;
    } else if (content == '') {
      wx.showToast({
        title: '内容不能为空',
        icon: "none"
      })
      return;
    } else if (imgURL == '') {
      wx.showToast({
        title: '图片不能为空',
        icon: "none"
      })
      return;
    } else {
      //把数据给云数据库
      const db = wx.cloud.database({});
      const cont = db.collection('article');
      cont.add({
        data: {
          title: title,
          content: content,
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
                setTimeout(function() {
                  wx.reLaunch({
                    url: '../index/index'
                  })
                }, 1000);
              }
            }
          })
        }
      });
    }
  },

})