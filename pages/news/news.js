// pages/news/news.js
var utils = require('../../utils/util.js');
var requests = require('../../requests/request.js');

var weekdayStr = ['日', ' 一', '二', '三', '四', '五', '六'];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageData: {}, //列表数据
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
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var date = utils.getCurrentData();
    this.setData({ currentDateStr: date.year + '.' + date.month + '.' + date.day });

    var _this = this;
    _this.setData({ loading: true });
    requests.getNewsLatest((data) => {
      data = utils.correctData(data);
      console.log(data);
      //console.log( data.stories );
      _this.setData({
        sliderData: data.top_stories,
        pageData: data.stories
      });
      _this.setData({ pageShow: 'block' });
    }, null, () => {
      _this.setData({ loading: false });
    });

    // //获取主题日报列表
    // requests.getTheme((data) => {
    //   _this.setData({ themeData: data.others });
    // });
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
    this.loadingMoreEvent.call(this)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //列表加载更多
  loadingMoreEvent: function (e) {
    if (this.data.loadingMore) return;
    console.log(this.data.currentDate);
    var date = new Date(Date.parse(this.data.currentDate) - 1000 * 60 * 60 * 24);
    var _this = this;
    var pageData = [];

    this.setData({ loadingMore: true });
    updateRefreshIcon.call(this);
    var y = date.getFullYear();
    var m = (date.getMonth() + 1);
    var d = date.getDate();
    m = m > 9 ? m : '0' + m;
    d = d > 9 ? d : '0' + d;
    var dateStr = [y, m, d].join('');
    requests.getBeforeNews(dateStr, (data) => {
      data = utils.correctData(data);
      console.log(data);
      pageData = _this.data.pageData;
      pageData.push({ type: '3', title: ([y, m, d].join('.') + '  星期' + weekdayStr[date.getDay()]) });
      pageData = pageData.concat(data.stories);

      _this.setData({ currentDate: date, pageData: pageData });
    }, null, () => {
      _this.setData({ loadingMore: false });
    });
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