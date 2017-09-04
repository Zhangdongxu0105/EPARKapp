// pages/tucao/tucao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    where: ["中国", "美国", "巴西", "日本"],
    what: ["中国", "美国", "巴西", "日本"],
    who: ["中国", "美国", "巴西", "日本"]
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
   * 生命周期函数--监听页面卸载l
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
  where_bindPickerChange: function (e) {
    this.setData({
      where_index: e.detail.value
    })
  },
  what_bindPickerChange: function (e) {
    this.setData({
      what_index: e.detail.value
    })
  },
  who_bindPickerChange: function (e) {
    this.setData({
      who_index: e.detail.value
    })
  }
})