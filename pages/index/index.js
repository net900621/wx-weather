var citys = require('../city.js')
Page({
  data: {
    weathes: {},
    city: ''
  },
  bindKeyInput: function(e){
    this.setData({
      city:e.detail.value
    });
  },
  searchWeathes: function (e) {
    var that = this

    wx.request({
      'url': 'http://www.weather.com.cn/data/cityinfo/' + citys[this.data.city] + '.html'
      ,'method': 'GET'
      ,'success': function(data){
        if (data.statusCode == 200 && /ok/.test(data.errMsg)) {
          console.log(data);
          that.setData({
            weathes: data.data.weatherinfo
          });
        }
      }
    })

  }
})
