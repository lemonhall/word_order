//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    var that = this;
    var showTasks = function (tasks) {
                that.setData({
                  logs: tasks.map(task => {
                    return task.taskTitle
                  })
                })
      };
      wx.request({
        url: 'http://192.168.50.12:8080/getTasks/',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data);
          showTasks(res.data);
        }
      });
      //END of request...
    }
  })
