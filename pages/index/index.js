//index.js
var utils = require('../../utils/util.js');
var requests = require('../../requests/request.js');
var api = require('../../requests/api.js');
//获取应用实例
var app = getApp()
Page({
  data: {
   
    imgUrls: [
      { "id": "1", "img": "http://www.epark.com/group1/M00/00/00/Co1WLViAf5CAe-dBAADWcRaRl4U489.jpg", 'linkUrl': "wwww", "activityId": "1", "typeCode": "NONE" },
      { "id": "1", "img": 'http://www.epark.com/group1/M00/00/00/Co1WLViBs6OAbnSBAAN9-C5dJUc591.jpg', 'linkUrl': "wwww", "activityId": "1", "typeCode": "NONE" },
    ],
    activityData:[
      {
        "id":1,
        "img":"http://www.epark.com/group1/M00/00/00/Co1WLViAf5CAe-dBAADWcRaRl4U489.jpg",
        "title":"爱心早餐",
        "lableimg":"../../images/icon021.png"
      },
      {
        "img": "http://www.epark.com/group1/M00/00/01/Co1WLVld_b2AHmaaAEWItBmApkU607.JPG",
        "title": "徒步30千米",
        "lableimg": "../../images/icon021.png"
      },
      {
        "img": "http://www.epark.com/group1/M00/00/01/Co1WLVld_b2AHmaaAEWItBmApkU607.JPG",
        "title": "免费早餐",
        "lableimg": "../../images/icon021.png"
      },
      {
        "img": "http://www.epark.com/group1/M00/00/01/Co1WLVld_b2AHmaaAEWItBmApkU607.JPG",
        "title": "免费早餐",
        "lableimg": "../../images/icon021.png"
      }
    ],
    pageData:
    [
        {
          "images": [
            "http://pic2.zhimg.com/e97b08d1177ebc57bd9e9d8ddf17e055.jpg"
          ],
          "type": 0,
          "id": 8966833,
          "ga_prefix": "111017",
          "title": "知乎好问题 · 时间管打算离开股份哈山东理工黑色柳丁家里开始打了个客户数量的开发卡萨丁厉害管理卡水电费拉时间到了房间拉萨的理最常见的误区有哪些？",
          "date":'1小时前',
          "clicksum":'9999',
          "label":"E园早报",
          "outline":"知乎好问题 · 时间管打算离开股份哈山东理工黑色柳丁家里开始打了个客户数量的开发卡萨丁厉害管理卡水电费拉时间到了房间拉萨的理最常见的误区有哪些？"
        },
        {
          "images": [
            "http://pic3.zhimg.com/fc30413e70df02ecbcc13fed7b35c32e.jpg"
          ],
          "type": 0,
          "id": 8964409,
          "ga_prefix": "111015",
          "title": "宁泽涛和国家游泳队的冲突从何而来？他会退役吗？"
        },
        {
          "images": [
            "http://pic4.zhimg.com/4ced184e0a84464d93dd62f207228abb.jpg"
          ],
          "type": 0,
          "id": 8961167,
          "ga_prefix": "111014",
          "title": "二手车挑来挑去，各家交易平台上价格怎么差好多"
        },
        {
          "images": [
            "http://pic3.zhimg.com/20ac6fe024d134c8234df0c134150dc6.jpg"
          ],
          "type": 0,
          "id": 8965861,
          "ga_prefix": "111013",
          "title": "预测美国大选，有一项数据还挺准的，而且越来越明显"
        },
        {
          "images": [
            "http://pic1.zhimg.com/73de922af044dd70beae4f6d3c113d14.jpg"
          ],
          "type": 0,
          "id": 8965513,
          "ga_prefix": "111012",
          "title": "大误 · 樱木花道，我可是在帮你啊"
        },
        {
          "images": [
            "http://pic4.zhimg.com/e76156d3f4b1932e3cf02bf7a23b8a03.jpg"
          ],
          "type": 0,
          "id": 8964264,
          "ga_prefix": "111011",
          "title": "苹果公司是怎样培养消费者忠诚度的？"
        },
        {
          "images": [
            "http://pic1.zhimg.com/522632f1bc771bf91743af4574b6aa94.jpg"
          ],
          "type": 0,
          "id": 8962937,
          "ga_prefix": "111010",
          "title": "「就知道你一定会投给我」：两党「亲妈州」是这么来的"
        },
        {
          "images": [
            "http://pic2.zhimg.com/b1bf21f4b6a7b4b5851279dc517a613d.jpg"
          ],
          "type": 0,
          "id": 8963864,
          "ga_prefix": "111009",
          "title": "家庭里的「仪式感」多一点，孩子感受到的爱就多一点"
        },
        {
          "title": "打开上帝视角，重新发现一座城市",
          "ga_prefix": "111008",
          "images": [
            "http://pic3.zhimg.com/c959c6353d0adb61c053757a8b1d8052.jpg"
          ],
          "multipic": true,
          "type": 0,
          "id": 8963763
        },
        {
          "images": [
            "http://pic1.zhimg.com/47ac4b0e2cfe37cf1b40c8d16a60f9c8.jpg"
          ],
          "type": 0,
          "id": 8964773,
          "ga_prefix": "111007",
          "title": "特朗普「逆袭」取胜，为什么所有预测机构都出错了？"
        },
        {
          "images": [
            "http://pic3.zhimg.com/7c187dbb9c060748e162d234280168d2.jpg"
          ],
          "type": 0,
          "id": 8958248,
          "ga_prefix": "111007",
          "title": "说真的，看电影还有个好处是，可以止痛"
        },
        {
          "images": [
            "http://pic3.zhimg.com/9c3c775781a74373023f55bca724cee2.jpg"
          ],
          "type": 0,
          "id": 8964898,
          "ga_prefix": "111007",
          "title": "年轻人独自一人居住，如何有效地保持自律？"
        },
        {
          "images": [
            "http://pic4.zhimg.com/d1b96f8e289674d972f57c14a422a4db.jpg"
          ],
          "type": 0,
          "id": 8964643,
          "ga_prefix": "111007",
          "title": "读读日报 24 小时热门 TOP 5 · 特朗普总统的第一个任期"
        },
        {
          "images": [
            "http://pic2.zhimg.com/80473eae77df078154818643ec3b7bdd.jpg"
          ],
          "type": 0,
          "id": 8961174,
          "ga_prefix": "111006",
          "title": "瞎扯 · 如何正确地吐槽"
        }
      ],
      "top_stories": [
        {
          "image": "http://pic4.zhimg.com/3d10e453c1e7012c24709ccdbb5765fb.jpg",
          "type": 0,
          "id": 8966833,
          "ga_prefix": "111017",
          "title": "知乎好问题 · 时间管理最常见的误区有哪些？"
        },
        {
          "image": "http://pic1.zhimg.com/90bd2acf132b929d70a5f508820c1d68.jpg",
          "type": 0,
          "id": 8964409,
          "ga_prefix": "111015",
          "title": "宁泽涛和国家游泳队的冲突从何而来？他会退役吗？"
        },
        {
          "image": "http://pic4.zhimg.com/2d73a59c90458a0a118ca35a4778784b.jpg",
          "type": 0,
          "id": 8965861,
          "ga_prefix": "111013",
          "title": "预测美国大选，有一项数据还挺准的，而且越来越明显"
        },
        {
          "image": "http://pic1.zhimg.com/c3daf9ae0f8914030203881a6d8deb98.jpg",
          "type": 0,
          "id": 8962937,
          "ga_prefix": "111010",
          "title": "「就知道你一定会投给我」：两党「亲妈州」是这么来的"
        },
        {
          "image": "http://pic3.zhimg.com/7766a061e3374ca2f498f6ed589e105e.jpg",
          "type": 0,
          "id": 8942755,
          "ga_prefix": "110306",
          "title": "这里是广告 · 斜杠青年的进阶，是斜杠中年还是高级玩家？"
        }
      ], //列表数据
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
    wx.request({
      url: api.getBanner(),
      data: {
        positionCode: "HOME_PAGEl"
      },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res)
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
    wx.request({
      url: api.getActivityr(),
      data: {
        pageNumber: 1,
        pageSize:5
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        console.log(res)
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