//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env: 'dev-0a2xc'
    })
  },
  //全局变量
  globalData: {
    getData: '',
    image:''
  },
})