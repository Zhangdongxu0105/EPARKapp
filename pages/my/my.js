var app = getApp()
Page({
  data: {
    userInfo: {
      avatarUrl: '../../images/icon013.png',
      nickName:'游客'
    },
    userListInfo: [
      {
        icon: '../../images/icon005.png',
        text: 'E卡管理',
        isunread: false,
        unreadNum: 0,
        url:'../ecar/ecar'
    },
     {
       icon: '../../images/icon006.png',
        text: '优惠券',
        isunread: false,
        unreadNum: 0
    }, 
    {
      icon: '../../images/icon014.png',
        text: '订单中心',
        isunread: false,
        unreadNum: 0
    }, 
    {
      icon: '../../images/icon015.png',
        text: '实验室'
    }, 
    {
      icon: '../../images/icon016.png',
        text: '客户中心'
    }, 
    {
      icon: '../../images/icon017.png',
        text: '设置'
    }]
  },

  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
      app.globalData.info = userInfo
    })
  },
  imbin:function(){
    wx.navigateTo({
      url: '../userinfo/userinfo',
    })
  }
})