// userinfo.js
var util = require('../../utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // name:false,
    // icard:false,
    // sex:false,
    // date:false,
    // phonenum:false,
    // comaddr:false,
    user:{date:'sdfsad'},
    sexarray: ['帅哥', '美女', '保密'],
    indicatorDots: true,
    autoplay: true,
    result: false,
    enddate: util.formatTime2(new Date)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      userInfo: app.globalData.info
      })
    if (that.data.user.date){
      that.setData({
        date: that.data.user.date
      })
    }
    console.log(app.globalData.info)
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
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      sexindex: e.detail.value
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
    } else {
      this.setData({
        result: false
      })
    }
  },
  formSubmit:function(e){
    var that=this
    that.setData({
      user: e.detail.value
    })
    that.data.user['date']=that.data.date,
      console.log(that.data.user)
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 2000
    })
    setTimeout(function(){
      wx.navigateBack({
        delta: 1
      })
    },2000)
    
  }
})