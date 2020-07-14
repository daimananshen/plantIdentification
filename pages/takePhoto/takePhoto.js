var that = '';
const app = getApp()
const db = wx.cloud.database({});
var util = require("../../utils/util.js");
var openid;
var score = null;
var arrayIsEmpty;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: '/images/bg.jpg',
    imgB64: '',
    content: '',
    score:null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    that.getOpenid();
    that.getDataBase();
  },
  // 获取用户openid
  getOpenid() {
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        openid = res.result.userInfo.openId;
      }
    })
  },
  getDataBase() {
    db.collection('user').where({
      _id: openid // 根据_id查询用户是否有数据
    }).get().then(res => {
      arrayIsEmpty = res.data
    })
  },
  /**
   * 选择图片
   */
  chooseimgTap: function() {
    that.setData({
      content: ''
    });
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths[0];
        that.getB64ByUrl(tempFilePaths);
        getApp().globalData.image = tempFilePaths;
        that.setData({
          img: tempFilePaths
        });

      }
    })
  },
  /**
   * 转base64
   */
  getB64ByUrl: function(url) {
    const FileSystemManager = wx.getFileSystemManager();
    FileSystemManager.readFile({
      filePath: url,
      encoding: 'base64',
      success(res) {
        that.setData({
          imgB64: res.data
        });
        that.plantTap();
      }
    })
  },

  /**
   * 植物识别
   */
  plantTap: function(e) {
    const imgB64 = that.data.imgB64;
    if (!imgB64) {
      return;
    };

    that.getToken(function(token) {
      that.getResult(token);
    });
  },
  getToken: function(callback) {
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=hP60f1uvdS14ShGxe8fKg4qx&client_secret=HVma2uRHsSF0iynTGWOCa3BIKXPkYFdY',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        var token = res.data.access_token;
        return callback(token);
      }
    });
  },
  getResult: function(token) {
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/plant?access_token=' + token,
      method: "post",
      data: {
        image: that.data.imgB64,
        baike_num: '1'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        if (res.statusCode == 200) {
          getApp().globalData.getData = JSON.stringify(res.data.result);
          if (arrayIsEmpty.length == 0) {
            db.collection('user').add({
              data: {
                _id: openid,
                score: score + 1,
                getScoreDate: util.formatTime(new Date())
              },
              success: function(res) {},
              fail: function(err) {}
            });
          } else {
            console.log(arrayIsEmpty)
            db.collection('user').where({
                _id: openid
              })
              .update({
                data: {
                  score: arrayIsEmpty[0].score + 1,
                  getScoreDate: util.formatTime(new Date())
                },
                success: console.log,
                fail: console.error
              })
          }

          wx.navigateTo({
            url: '../showData/showData'
          })
        } else {
          that.setData({
            content: '网络出小差'
          });
        }
      }
    });
  },
  error(e) {
    console.log(e.detail)
  }

})