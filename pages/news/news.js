// pages/news/news.js
var utils = require('../../utils/util.js');
var requests = require('../../requests/request.js');
var api = require('../../requests/api.js');
var weekdayStr = ['日', ' 一', '二', '三', '四', '五', '六'];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageData: [], //列表数据
    themeData: {}, //主题菜单数据
    sliderData: {}, //轮播图数据
    currentDateStr: '',
    currentDate: new Date(),
    refreshAnimation: {}, //加载更多旋转动画数据
    loadingMore: false, //是否正在加载
    avatarUrl: '', //当前开发者头像
    nickName: '', //当前开发者名字

    loading: false,
    loadingMsg: '加载中...',
    pageShow: 'none',

    maskDisplay: 'none',
    slideHeight: 0,
    slideRight: 0,
    slideWidth: 0,
    slideDisplay: 'block',
    screenHeight: 0,
    screenWidth: 0,
    slideAnimation: {},

    ballBottom: 20,
    ballRight: 30,
    ballOpacity: '.8',
    modalMsgHidden: true,
    themeId: 0,//当前主题id
    lastthemeid:0,//当前主题最后ID

    id: null,
    //pageShow: 'display',
    background: '',
    //pageData: [], //列表数据源
    editorData: [], //主编数据
    description: '',
    //loading: false,
    //loadingMsg: '数据加载中...'
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.ballBottom)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var date = utils.getCurrentData();
    this.setData({ currentDateStr: date.year + '.' + date.month + '.' + date.day });

    var that = this;
    that.setData({ loading: true });
    requests.request({
      url: api.getTopInformationList(),
      method: 'POST',
      dataType: 'json',
      data:{
        type:'home',
        themeid:1,
        count:15
      },
      success: function (res) {
        console.log(res)
        if (res.data.message != '成功') {
          wx.showToast({
            title: "获取咨询列表失败",
            icon: 'success',
            duration: 2000
          })
        } else {
          that.setData({
            pageData: res.data.data,
            lastthemeid: res.data.data[res.data.data.length-1].id,
            themeid: res.data.data[0].id,
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // if (this.data.themeId == -1) {
    //   var pageData = wx.getStorageSync('pageData') || []
    //   console.log(pageData);
    //   this.setData({
    //     pageData: pageData
    //   })
    // }
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
  //刷新列表
  refesh: function (e) {
    that.setData({ loadingMore: true });
    requests.request({
      url: api.getTopInformationList(),
      method: 'POST',
      dataType: 'json',
      data: {
        type: 'laster',
        themeid: themeid,
        count: 15
      },
      success: function (res) {
        console.log(res)
        if (res.data.message != '成功') {
          wx.showToast({
            title: "获取咨询列表失败",
            icon: 'success',
            duration: 2000
          })
        } else {
          that.setData({
            pageData: that.data.pageData.concat(res.data.data),
            themeid: that.data.pageData[0].id,
          })
        }
      }
    })
    that.setData({ loadingMore: false });
  },
  //加载更多
  loadMore: function (e) {
    that.setData({ loadingMore: true });
    requests.request({
      url: api.getTopInformationList(),
      method: 'POST',
      dataType: 'json',
      data: {
        type: 'before',
        themeid: that.data.lastthemeid,
        count: 15
      },
      success: function (res) {
        console.log(res)
        if (res.data.message != '成功') {
          wx.showToast({
            title: "获取咨询列表失败",
            icon: 'success',
            duration: 2000
          })
        } else {
          that.setData({
            pageData: that.data.pageData.concat(res.data.data),
            lastthemeid: that.data.pageData[that.data.pageData.length - 1].id,
          })
        }
      }
    })
    that.setData({ loadingMore: false });
  },


  toDetailPage: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../newsinfo/newsinfo?id=' + id
    });
  }
})

/**
 * 旋转上拉加载图标
 */
function updateRefreshIcon() {
  var deg = 360;
  var _this = this;

  var animation = wx.createAnimation({
    duration: 1000
  });

  var timer = setInterval(function () {
    if (!_this.data.loadingMore)
      clearInterval(timer);
    animation.rotateZ(deg).step();
    deg += 360;
    _this.setData({
      refreshAnimation: animation.export()
    })
  }, 1000);
}