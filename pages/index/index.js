//index.js
//获取应用实例
const app = getApp();
var taskTitle   = '';
var taskContent = '';
let URL ='http://localhost:8080';

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  getTaskTitle: function (e) {
    console.log("getTaskTitle:"+e.detail.value);
      taskTitle = e.detail.value;
  },
  getTaskContent: function (e) {
    console.log("getTaskContent:" + e.detail.value);
      taskContent = e.detail.value;
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  createTask:function(e){
    console.log("onClick with button");
    wx.request({
      url: 'http://192.168.50.12:8080/createTask/', //仅为示例，并非真实的接口地址,
      method:'POST',
      data: {
        taskTitle,
        taskContent
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
      }
    });
    //END of request...
  },
  onLoad: function () {
    wx.showShareMenu({
      withShareTicket: true
    });

    wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          if (res.code) {
            wx.request({
              url: URL+'/register',
              data: {
                code: res.code,
              },
              success: function (res) {
                if (res.statusCode == 200) {
                  console.log(res.data);
                  // wx.setStorageSync('sessionId', res.data.data.sessionId);
                  //session.sessionId = res.data.data.sessionId;
                  // let sessionId = wx.getStorageSync('sessionId');
                
                }
              },
            });
          } else {
            console.log(res.errMsg);
          }
        }
      })
  }  
})
