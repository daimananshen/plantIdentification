// pages/sign/sign.js
// sign_num 签到日期
const app = getApp()
var calendarSignData = [];
var signData;
var score;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    calendarSignData: [],
    signData: []
  },
  //初始化
  //当前时间
  getNowFormatDate() {
    let date = new Date();
    let seperator1 = "-";
    let seperator2 = ":";
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
      " " + date.getHours() + seperator2 + date.getMinutes() +
      seperator2 + date.getSeconds();
    return currentdate;
  },
  // //签到
  calendarSign: function() {

    //把数据给云数据库
    const db = wx.cloud.database({});
    let date = new Date();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    this.getCheckedInRecord(this.data.year, this.data.month, this.data.monthDaySize)
    db.collection('sign').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        _id: 'id_' + date.getFullYear() + month + strDate, // 自定义 _id，而不采用云数据库生成的id,防止重复签到
        score: score + 1,
        checkDate: this.getNowFormatDate(),
        sign_num: strDate,
        avatarUrl: app.globalData.userInfo.avatarUrl,
        nickName: app.globalData.userInfo.nickName,
        done: true
      },
      success: function(res) {
        wx.showToast({
          title: '签到成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function(res) {
        wx.showToast({
          title: '今日已签到,请勿重复签到',
          icon: 'none',
        })
      }
    })
  },
  // //获取已签到日期
  getCheckedInRecord: function(year, month, monthDaySize) {

    const db = wx.cloud.database({});
    db.collection('sign').get({
      success: function(res) {

        let arr = res.data
        wx.setStorageSync("calendarSignData", arr);

        var mydata = [];
        for (let value of arr) {
          score = value.score
          signData = value.sign_num
          mydata.push(signData)
        }

        this.setData({
          calendarSignData: mydata
        })
      },
      fail: function(res) {
        wx.showToast({
          title: '查询本月签到的数据失败',
          icon: 'none',
        })
      }
    })

  },
  init: function() {
    var mydate = new Date();
    var year = mydate.getFullYear();
    var month = mydate.getMonth() + 1;
    var date = mydate.getDate();
    var day = mydate.getDay();
    var nbsp;
    // 重点(网上的nbsp判断不正确)
    if ((date - day) <= 0) {
      nbsp = day - date + 1;
    } else {
      nbsp = 7 - ((date - day) % 7) + 1;
    }
    var monthDaySize;
    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
      monthDaySize = 31;
    } else if (month == 4 || month == 6 || month == 9 || month == 11) {
      monthDaySize = 30;
    } else if (month == 2) {
      // 计算是否是闰年,如果是二月份则是29天
      if ((year - 2000) % 4 == 0) {
        monthDaySize = 29;
      } else {
        monthDaySize = 28;
      }
    };

    calendarSignData = wx.getStorageSync("calendarSignData")

    let mySignData = [];

    for (let value of calendarSignData) {

      signData = value.sign_num;
      mySignData.push(signData)

    }

    this.setData({
      year: year,
      month: month,
      nbsp: nbsp,
      monthDaySize: monthDaySize,
      date: date,
      calendarSignData: mySignData,
      todaySignData: signData,
    })


    this.getCheckedInRecord(year, month, monthDaySize) //获取已签到日期
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.init() //初始化
  }
})