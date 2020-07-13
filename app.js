//app.js
App({
  onLaunch: function() {
    // 云开发环境 初始化
    wx.cloud.init({
      env: 'dev-0a2xc',
      traceUser: true
    })
  },
  //全局变量
  globalData: {
    getData: '',
    image: '',
    userInfo: null
  },
})