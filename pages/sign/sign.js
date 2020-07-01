// pages/sign/sign.js
let app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
    console.log(this.data.year, this.data.month, this.data.monthDaySize)
    db.collection('sign').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        _id: 'id_' + date.getFullYear() + month + strDate, // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
        checkDate: this.getNowFormatDate(),
        done: true //是否签到
      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log("数据插入成功")

      },
      fail: function(res) {
        console.log("数据插入失败")
      }
    })


  },
  // //获取已签到日期
  getCheckedInRecord: function(year, month, monthDaySize) {

    const db = wx.cloud.database({});
    let calendarSignData = new Array(monthDaySize)
    console.log(calendarSignData)
    db.collection('sign').get({
      success: function(res) {

        let arr = res.data

        console.log('arr', arr)
        for (let value of arr) {
          console.log('value', value)
          calendarSignData[value] = value

        }

        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        that.setData({
          calendarSignData: calendarSignData
        })
      },
      fail: function(res) {}
    })

  },
  init: function() {
    let mydate = new Date(); //本地时间
    let year = mydate.getFullYear(); //年
    let month = mydate.getMonth() + 1; //月
    let date = mydate.getDate(); //今日
    console.log("date", date)
    let day = mydate.getDay(); //天
    console.log("day", day)
    let nbsp = 7 - ((date - day) % 7); //空格
    console.log('nbsp', nbsp)
    let monthDaySize; //天数
    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
      monthDaySize = 31;
    } else if (month == 4 || month == 6 || month == 9 || month == 11) {
      monthDaySize = 30;
    } else if (month == 2) { //计算是否是闰年,如果是二月份则是29天
      if ((year - 2000) % 4 == 0) {
        monthDaySize = 29;
      } else {
        monthDaySize = 28;
      }
    };

    console.log(monthDaySize)
    this.setData({
      year: year,
      month: month,
      nbsp: nbsp,
      date: date,
      monthDaySize: monthDaySize
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