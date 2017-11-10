//index.js
var utils = require('../../utils/util.js');
var requests = require('../../requests/request.js');
var api = require('../../requests/api.js');
//获取应用实例
var app = getApp()
Page({
  data: {
    imgUrls: [],//首页轮播图
    activityData:[],
    pageData:[], //列表数据
    themeId: 0,//当前主题id
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
                text: '娱乐'
            }, 
            {
              url: '../../images/icon009.png',
              text: '吐槽',
              navigator_url: '../tucao/tucao'
            },
            {
              url: '../../images/icon003.png',
              text: '云打印'
            },
            {
              url: '../../images/icon004.png',
                text: 'E卡',
                navigator_url:'../ecar/ecar'
            },
            
            // {
            //   url: '../../images/icon010.png',
            //     text: '汗蒸'
            // },
            
            
        ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    
    topScroll: [],
    footerNav: [],
    bannerIcon: [],
    indicatorDots: true,
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
  },

  //从详细页面返回时会刷新
  onShow: function () {
    var that = this
    if (this.data.themeId == -1) {
      var pageData = wx.getStorageSync('pageData') || []
      // console.log(pageData);
      this.setData({
        pageData: pageData
      })
    }
    requests.request({
      url: api.getBanner(),
      data: {
        positionCode: "HOME_PAGE"
      },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        if (res.data.message != '成功') {
          wx.showToast({
            title: "首页轮播图获取失败",
            icon: 'success',
            duration: 2000
          })
        } else {
          that.setData({
            imgUrls: res.data.data
          })
        }
      }
    })
    
    requests.request({
      url: api.getTopInformationr(),
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res)
        if (res.data.message != '成功') {
          wx.showToast({
            title: "首页咨询失败",
            icon: 'success',
            duration: 2000
          })
        } else {
          that.setData({
            pageData: res.data.data
          })
        }
      }
    })


    requests.request({
      url: api.getActivityr(),
      data: {
        pageNumber: 1,
        pageSize:5
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        if (res.data.message != '成功') {
          wx.showToast({
            title: "获取热门活动失败",
            icon: 'success',
            duration: 2000
          })
        } else {
          that.setData({
            activityData: res.data.data
          })
        }
      }
    })
  },

  onReady: function () {

    var date = utils.getCurrentData();
    this.setData({ currentDateStr: date.year + '.' + date.month + '.' + date.day });

    var _this = this;
    _this.setData({ loading: true });
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
  },
   toHomePage: function (e) {
    var _this = this;
    _this.setData({ loading: true, themeId: 0 });
    console.log('themeId', _this.data.themeId);
    requests.getNewsLatest((data) => {
      data = utils.correctData(data);
      console.log(data);
      _this.setData({
        sliderData: data.top_stories,
        pageData: data.stories
      });
      slideDown.call(this);
      _this.setData({ pageShow: 'block' });
    }, null, () => {
      _this.setData({ loading: false });
    });
  },

  toThemePage: function (e) {
    var _this = this;
    _this.setData({ loading: true, themeId: e.currentTarget.dataset.id });
    console.log('themeId', _this.data.themeId);
    requests.getThemeStories(_this.data.themeId, (data) => {
      //console.log(data);
      data.background = data.background.replace("pic1.", "pic3.");
      data.background = data.background.replace("pic2.", "pic3.");
      for (var i = 0; i < data.editors.length; i++) {
        data.editors[i].avatar = data.editors[i].avatar.replace("pic1.", "pic3.");
        data.editors[i].avatar = data.editors[i].avatar.replace("pic2.", "pic3.");
      }
      data = utils.correctData(data);
      console.log(data);
      _this.setData({
        pageData: data.stories,
        background: data.background,
        description: data.description,
        editorData: data.editors
      });
      slideDown.call(this);
      //wx.setNavigationBarTitle( { title: data.name }); //设置标题
    }, null, () => {
      _this.setData({ loading: false });
    });
  },

  toCollectPage: function () {
    var _this = this;
    _this.setData({ themeId: -1 });
    var pageData = wx.getStorageSync('pageData') || []
    console.log(pageData);
    _this.setData({
      themeId: -1,
      pageData: pageData
    })
    //_this.setData( {
    //  pageData: data.stories,
    //  background: data.background,
    //  description: data.description,
    //  editorData: data.editors
    slideDown.call(this);
    //wx.setNavigationBarTitle( { title: data.name }); //设置标题

  },
  //toThemePage: function( e ) {
  //  var themeId = e.currentTarget.dataset.id;
  //  console.log( 'themeId', themeId );
  //  wx.navigateTo( {
  //    url: '../theme/theme?themeId=' + themeId
  //  });
  //},

  authorShowEvent: function () {
    this.setData({ modalMsgHidden: false });
  },

  modalMsgHiddenEvent: function () {
    this.setData({ modalMsgHidden: true });
  },

  onPullDownRefreash: function (e) {
    console.log(1);
  },
  bindtap_url:function(e){
    wx.navigateTo({
      url: "../urlhtml/urlhtml?url="+e.currentTarget.dataset.url
    })
    
  }
});

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