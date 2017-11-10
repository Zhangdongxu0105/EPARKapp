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
    pageData: [
              {
                "images": [
                  "http://pic2.zhimg.com/e97b08d1177ebc57bd9e9d8ddf17e055.jpg（显示图片）"
                ],
                "type": 0,                                  																												//保留字段（暂时传0） 
                "id": 8966833,							  																												// 咨询ID
                "title": "知乎好问题 · 时间管打算离开股份哈山东理工黑色柳丁家里开始打了个客户数量的开发卡萨丁厉害管理卡水电费拉时间到了房间拉萨的理最常见的误区有哪些？",  //咨询标题
                "dateTime": '1小时前',																																			//咨询发布时间
                "clicksum": '9999',																																		//咨询点击数
                "typeName": "E园早报",																																		//咨询分类
                "content": "知乎好问题 · 时间管打算离开股份哈山东理工黑色柳丁家里开始打了个客户数量的开发卡萨丁厉害管理卡水电费拉时间到了房间拉萨的理最常见的误区有哪些？" //咨询内容（暂时不显示，后期不确定）
              }
    ], //列表数据
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
        type:'before',
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
            lastthemeid:that.data.pageData[that.data.pageData.length-1].id,
            themeid: that.data.pageData[0].id,
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
        type: 'before',
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
        type: 'laster',
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