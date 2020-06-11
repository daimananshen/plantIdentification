//app.js
App({
  onLaunch: function () {
    // 云开发环境
    wx.cloud.init({
      env: 'dev-0a2xc'
    })
  },
  //全局变量
  globalData: {
    getData: '',
    image: ''
  },
})