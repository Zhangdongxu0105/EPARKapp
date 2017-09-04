//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    imgUrls: [
      'http://www.epark.com/group1/M00/00/00/Co1WLViAf5CAe-dBAADWcRaRl4U489.jpg',
      'http://www.epark.com/group1/M00/00/00/Co1WLViBs6OAbnSBAAN9-C5dJUc591.jpg',
      'http://www.epark.com/group1/M00/00/01/Co1WLVld_b2AHmaaAEWItBmApkU607.JPG',
    ],
    icon:'../../images/hotest.png',
    icon_count:[
            {
        url:'../../images/icon007.png',
            text:'社区',
            navigator_url:'../order/order'
            },
            {
              url: '../../images/icon001.png',
                text: '会议室'
            },
            {
              url: '../../images/icon012.png',
                text: '活动场所'
            },
            // {
            //   url: '../../images/icon008.png',
            //     text: '自如客'
            // },
            {
              url: '../../images/icon004.png',
                text: '一卡管理',
                navigator_url:'../ecar/ecar'
            },
            {
              url: '../../images/icon003.png',
                text: '云打印'
            },
            // {
            //   url: '../../images/icon010.png',
            //     text: '汗蒸'
            // },
            {
              url: '../../images/icon009.png',
                text: '吐槽',
                navigator_url: '../tucao/tucao'
            }
            
        ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    
    topScroll: [],
    footerNav: [],
    bannerIcon: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    pageIndex: 1,
    pageSize: 10,
    loading: true,
    loadtitle: "康康正在努力为你加载更多...",
    hasMore: true,
    guessProducts: []
    

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function (userInfo) {
    //   //更新数据
    //   that.setData({
    //     userInfo: userInfo
    //   })
    // })
  }
  // imagebin: function (options){
  //   console.log(options);
  //   wx.navigateTo({
  //     url: options
  //   })
  // }
})
