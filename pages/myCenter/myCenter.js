//获取应用实例
const app = getApp()
var util = require("../../utils/util.js");
const db = wx.cloud.database({});
const user = db.collection('user');
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
    var that = this;

    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
              // 根据自己的需求有其他操作再补充
              // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
              wx.login({
                success: res => {
                  // 获取到用户的 code 之后：res.code
                  console.log("用户的code:" + res.code);
                  // 可以传给后台，再经过解析获取用户的 openid
                  // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
                  wx.request({
                    // 自行补上自己的 APPID 和 SECRET
                    url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx18421dc427ce99c4&secret=3aad5dbec677ab597929b759eb72f538&js_code=' + res.code + '&grant_type=authorization_code',
                    success: res => {
                      // 获取到用户的 openid
                      console.log("用户的openid:" + res.data.openid);
                    }
                  });
                }
              });
            }
          });
        }
      }
    });

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

          user.add({
            data: {
              avatarUrl: app.globalData.userInfo.avatarUrl,
              nickName: app.globalData.userInfo.nickName,
              authorizationDate: util.formatTime(new Date())
            },
            success: function(res) {}
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