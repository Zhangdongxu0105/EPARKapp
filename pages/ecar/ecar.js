// ecar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://www.epark.com/group1/M00/00/00/Co1WLViAf5CAe-dBAADWcRaRl4U489.jpg',
      'http://www.epark.com/group1/M00/00/00/Co1WLViBs6OAbnSBAAN9-C5dJUc591.jpg',
      'http://www.epark.com/group1/M00/00/01/Co1WLVld_b2AHmaaAEWItBmApkU607.JPG',
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    money_array:[50,100,200,300,500,1000],
    money:0,
    paymoney:false,
    result:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  paytap : function(event) {
    var that=this
    that.setData({
      paymoney: event.target.dataset.money
    })
  }, 
  checkphone: function (e) {
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/; //判断用户输入的是否为手机号
    var rsLowerCase = myreg.test(e.detail.value);
    if (!rsLowerCase) {
      wx.showToast({
        title: '您输入的手机号格式有误，请重新输入！',
        icon: 'success',
        duration: 2000
      })
      this.setData({
        result: '您输入的手机号格式有误，请重新输入！'
      })
    } else 
    {
      this.setData({
        result: false
      })
    }
  },
  checkmoney: function (e) {
    if (typeof e.detail.value != 'number' && e.detail.value% 1 != 0){
      wx.showToast({
        title: '您输入的充值金额必须为整数，请重新输入！',
        icon: 'success',
        duration: 2000
      })
      this.setData({
        result: '您输入的充值金额必须为整数，请重新输入！'
      })
    }else 
      if (20 >= e.detail.value ||  e.detail.value >=  2000) {
        wx.showToast({
          title: '充值金额为20-2000，请重新输入！',
          icon: 'success',
          duration: 2000
        })
      this.setData({
        result: '充值金额为20-2000，请重新输入！'
      })
    }else {
      this.setData({
        result: false
      })
    }
    
  }
})