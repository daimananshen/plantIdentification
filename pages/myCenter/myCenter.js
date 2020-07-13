//获取应用实例
const app = getApp()
var util = require("../../utils/util.js");
const db = wx.cloud.database({});
const user = db.collection('user');
var openid;
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo') //判断小程序的API，回调，参数，组件等是否在当前版本可用。
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../myCenter/myCenter'
    })
  },
  onLoad: function() {
    this.getOpenid();

    var that = this;
    wx.getStorage({
      key: 'getUserInfo',
      success: function(res) {
        that.setData({
          userInfo: res.data,
          hasUserInfo: true
        });
      },
      fail: function(res) {}
    });

  },
  getUserInfo: function(e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      var that = this;
      wx.setStorage({
        key: "getUserInfo",
        data: app.globalData.userInfo,
        success: function(res) {

          //保存登录信息到数据库 
          user.add({
            data: {
              _id: openid,
              avatarUrl: app.globalData.userInfo.avatarUrl,
              nickName: app.globalData.userInfo.nickName,
              authorizationDate: util.formatTime(new Date())
            },
            success: function(res) {},
            fail: function(err) {}
          });

          that.setData({
            userInfo: app.globalData.userInfo,
            hasUserInfo: true
          });
        }
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法使用部分功能!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          if (res.confirm) {

          }
        }
      })
    }

  },
  // 获取用户openid
  getOpenid() {
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log('云函数获取到的openid: ', res.result.userInfo.openId)
        openid = res.result.userInfo.openId;
      }
    })
  },
  wechatReward() {
    wx.navigateTo({
      url: '../wechatReward/wechatReward'
    })
  },
  feedback() {
    wx.navigateTo({
      url: '../feedback/feedback'
    })
  },
  openSetting() {
    wx.navigateTo({
      url: '../openSetting/openSetting'
    })
  }
})