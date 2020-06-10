//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env: 'dev-0a2xc'
    })
  },
  globalData: {
    userInfo: null
  }
})