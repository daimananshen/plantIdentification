// pages/list/list.js
//获取应用实例
// const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: ''
  },
  onLoad: function(options) {
    this.cloudData();
  },
  cloudData:function(){
    wx.cloud.callFunction({
      name:"getList"
    }).then(res=>{
      this.setData({
        userInfo:res.result.data
      })
      
    }).catch(err=>{
      console.error(err)
    })

  }
})