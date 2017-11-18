var utils = require('../../utils/util.js');
var requests = require('../../requests/request.js');
var api = require('../../requests/api.js');
Page({
  data: {
    id: "8857042", //当前日报id
    loading: false, //是否加载中
    isTheme: false,
    news: {}, //日报详情
    modalHidden: true,
    extraInfo: {},
    modalMsgHidden: true,
    pageShow: 'none',
    isCollect: false,//是否被收藏
    title:'',   //标题
    miniText:'',//资讯摘要
    img:'',	//图片url
    typeName:'', //资讯类型
    createTime:'',//创建时间
    dateTime:'',   //1小时前，一分钟前，一周前
    content:'',    //资讯内容
    clicksum:''   //点击量
  },

  //获取列表残过来的参数 id：日报id， theme：是否是主题日报内容（因为主题日报的内容有些需要单独解析）
  onLoad: function (options) {
    var id = options.id;
    var that=this;
    requests.request({
      url: api.getTopInformationDetail(),
      method: 'POST',
      dataType: 'json',
      data: { themeid:id},
      success: function (res) {
        console.log(res)
        if (res.data.message != '成功') {
          wx.showToast({
            title: "获取资讯详情失败",
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
  },

  //加载日报数据
  onReady: function () {
  },
  //跳转到评论页面
  toCommentPage: function (e) {
    var storyId = e.currentTarget.dataset.id;
    var longCommentCount = this.data.extraInfo ? this.data.extraInfo.long_comments : 0; //长评数目
    var shortCommentCount = this.data.extraInfo ? this.data.extraInfo.short_comments : 0; //短评数目
    //跳转到评论页面，并传递评论数目信息
    wx.navigateTo({
      url: '../comment/comment?lcount=' + longCommentCount + '&scount=' + shortCommentCount + '&id=' + storyId
    });
  },

  //现在图片预览不支持调试显示，看不到效果
  //图片预览[当前是当前图片，以后会考虑整篇日报的图片预览]
  previewImgEvent: function (e) {
    var src = e.currentTarget.dataset.src;
    if (src && src.length > 0) {
      wx.previewImage({
        urls: [src]
      });
    }
  },
  //重新加载数据
  reloadEvent: function () {
    loadData.call(this);
  },

  showModalEvent: function () {
    this.setData({ modalHidden: false });
  },

  hideModalEvent: function () {
    this.setData({ modalHidden: true });
  }
});

//加载页面相关数据
function loadData() {
  var _this = this;
  var id = this.data.id;
  var isTheme = this.data.isTheme;
  //获取日报详情内容
  _this.setData({ loading: true });
  requests.getNewsDetail(id, (data) => {
    if ("image" in data) {
      data.image = data.image.replace("pic1", "pic3");
      data.image = data.image.replace("pic2", "pic3");
    }
    console.log(data);
    data.body = utils.parseStory(data.body, isTheme);
    _this.setData({ news: data, pageShow: 'block' });
    wx.setNavigationBarTitle({ title: data.title }); //设置标题
  }, null, () => {
    _this.setData({ loading: false });
  });

  //请求日报额外信息（主要是评论数和推荐人数）
  requests.getStoryExtraInfo(id, (data) => {
    console.log('extra', data);
    _this.setData({ extraInfo: data });
  });
}