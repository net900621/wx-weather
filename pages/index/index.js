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
      'url': 'http://www.weather.com.cn/data/cityinfo/' + citys[this.data.city.replace(/市|县|区|镇|省/g, '')] + '.html'
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

  },
  onReady: function(){
    var that = this;
    wx.getLocation({
      'success': function(e){
        wx.request({
          'url': 'http://api.map.baidu.com/geocoder/v2/',
          'data': {
            'ak': '95E5007f38fb52241ee04113c6e97501',
            'callback': 'renderReverse',
            'location': e.latitude + ',' + e.longitude,
            'output': 'json',
            'pois': 1
          },
          'success': function(data){
            if (data.statusCode == 200 && /ok/.test(data.errMsg)) {
              data = JSON.parse(data.data.replace(/^renderReverse\&\&renderReverse\(|\)$/g, ''));
              that.setData({
                city: data.result.addressComponent.city
              });
              that.searchWeathes();
            }
          }
        })
      }
    })
  }
})
