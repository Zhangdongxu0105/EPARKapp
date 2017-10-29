var constants = require('./constants');
var utils = require('./utils');
var Session = require('./session');
var loginLib = require('./login');
var api = require('./api.js');
var noop = function noop() {};

var buildAuthHeader = function buildAuthHeader(session) {
    var header = {};

    if (session && session.id && session.skey) {
        header[constants.WX_HEADER_ID] = session.id;
        header[constants.WX_HEADER_SKEY] = session.skey;
    }

    return header;
};

/***
 * @class
 * 表示请求过程中发生的异常
 */
var RequestError = (function () {
    function RequestError(type, message) {
        Error.call(this, message);
        this.type = type;
        this.message = message;
    }

    RequestError.prototype = new Error();
    RequestError.prototype.constructor = RequestError;

    return RequestError;
})();

function request(options) {
    if (typeof options !== 'object') {
        var message = '请求传参应为 object 类型，但实际传了 ' + (typeof options) + ' 类型';
        throw new RequestError(constants.ERR_INVALID_PARAMS, message);
    }

    var requireLogin = options.login;
    var success = options.success || noop;
    var fail = options.fail || noop;
    var complete = options.complete || noop;
    var originHeader = options.header || {};

    // 成功回调
    var callSuccess = function () {
        success.apply(null, arguments);
        complete.apply(null, arguments);
    };

    // 失败回调
    var callFail = function (error) {
        fail.call(null, error);
        complete.call(null, error);
    };

    // 是否已经进行过重试
    var hasRetried = false;

    if (requireLogin) {
        doRequestWithLogin();
    } else {
        doRequest();
    }

    // 登录后再请求
    function doRequestWithLogin() {
        loginLib.login({ success: doRequest, fail: callFail });
    }

    // 实际进行请求的方法
    function doRequest() {
        var authHeader = buildAuthHeader(Session.get());

        wx.request(utils.extend({}, options, {
            header: utils.extend({}, originHeader, authHeader),

            success: function (response) {
                var data = response.data;

                // 如果响应的数据里面包含 SDK Magic ID，表示被服务端 SDK 处理过，此时一定包含登录态失败的信息
                if (data && data[constants.WX_SESSION_MAGIC_ID]) {
                    // 清除登录态
                    Session.clear();

                    var error, message;
                    if (data.error === constants.ERR_INVALID_SESSION) {
                        // 如果是登录态无效，并且还没重试过，会尝试登录后刷新凭据重新请求
                        if (!hasRetried) {
                            hasRetried = true;
                            doRequestWithLogin();
                            return;
                        }

                        message = '登录态已过期';
                        error = new RequestError(data.error, message);

                    } else {
                        message = '鉴权服务器检查登录态发生错误(' + (data.error || 'OTHER') + ')：' + (data.message || '未知错误');
                        error = new RequestError(constants.ERR_CHECK_LOGIN_FAILED, message);
                    }

                    callFail(error);
                    return;
                }

                callSuccess.apply(null, arguments);
            },

            fail: callFail,
            complete: noop,
        }));
    };

};



/*************************************************************************************************************************** */

var util = require('../utils/util.js');
var api = require('./api.js');

var app = getApp();

/**
 * 网络请求方法
 * @param url {string} 请求url
 * @param data {object} 参数
 * @param successCallback {function} 成功回调函数
 * @param errorCallback {function} 失败回调函数
 * @param completeCallback {function} 完成回调函数
 * @returns {void}
 */
function requestData(url, data, successCallback, errorCallback, completeCallback) {
  if (app.debug) {
    console.log('requestData url: ', url);
  }
  wx.request({
    url: url,
    data: data,
    header: { 'Content-Type': 'application/json' },
    success: function (res) {
      if (app.debug) {
        console.log('response data: ', res);
      }
      if (res.statusCode == 200)
        util.isFunction(successCallback) && successCallback(res.data);
      else
        util.isFunction(errorCallback) && errorCallback();
    },
    error: function () {
      util.isFunction(errorCallback) && errorCallback();
    },
    complete: function () {
      util.isFunction(completeCallback) && completeCallback();
    }
  });
}

function getNewsLatest(successCallback, errorCallback, completeCallback) {
  //requestData( api.getLatestNews(), {}, successCallback, errorCallback, completeCallback );
  var op = {
    "date": "20161110",
    "stories": [
      {
        "images": [
          "http://pic2.zhimg.com/e97b08d1177ebc57bd9e9d8ddf17e055.jpg",
          "http://pic2.zhimg.com/e97b08d1177ebc57bd9e9d8ddf17e055.jpg",
          "http://pic2.zhimg.com/e97b08d1177ebc57bd9e9d8ddf17e055.jpg"
        ],
        "type": 0,
        "id": 8966833,
        "ga_prefix": "111017",
        "title": "知乎好问题 · 时间管理最常见的误区有哪些？",
        "date": '1小时前',
        "clicksum": '9999',
        "label": "E园早报"
      },
      {
        "images": [
          "http://pic3.zhimg.com/fc30413e70df02ecbcc13fed7b35c32e.jpg",
          "http://pic2.zhimg.com/e97b08d1177ebc57bd9e9d8ddf17e055.jpg"
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
    ]
  };
  successCallback(op);
  completeCallback();
}

function getBeforeNews(date, successCallback, errorCallback, completeCallback) {
  // requestData( api.getBeforeNews( date ), {}, successCallback, errorCallback, completeCallback );
  var ss = { "date": "20161110", "stories": [{ "images": ["http:\/\/pic1.zhimg.com\/1bb294cd4dad57eee8af66ca75086fb8.jpg"], "type": 0, "id": 8967488, "ga_prefix": "111022", "title": "小事 · 被性侵之后" }, { "images": ["http:\/\/pic3.zhimg.com\/703ad2ae4ff91c7ae0a78598cecf010e.jpg"], "type": 0, "id": 8966783, "ga_prefix": "111021", "title": "一个男人为救活妻子，找到了永生之树" }, { "title": "瓷器有七种彩，可别再只认得青花瓷了", "ga_prefix": "111020", "images": ["http:\/\/pic3.zhimg.com\/28a29f1bd69f6c6342778a46bf5af7b2.jpg"], "multipic": true, "type": 0, "id": 8963560 }, { "images": ["http:\/\/pic3.zhimg.com\/ad315e8eb3a2c66a7e05ccc55e6058c2.jpg"], "type": 0, "id": 8967028, "ga_prefix": "111020", "title": "他是产品，我是运营，互联网的大潮里我们都有光明的前途" }, { "images": ["http:\/\/pic1.zhimg.com\/a26340666020fbdbe42f158b3e033a98.jpg"], "type": 0, "id": 8967161, "ga_prefix": "111019", "title": "双十一 · 「大家都别买，商家库存大，后面肯定更便宜」" }, { "images": ["http:\/\/pic3.zhimg.com\/3ca005e7cb5c8833f1d36049bcab1b02.jpg"], "type": 0, "id": 8966379, "ga_prefix": "111018", "title": "「不就是透明玻璃和大白墙嘛，极简建筑我也能设计」" }, { "images": ["http:\/\/pic2.zhimg.com\/e97b08d1177ebc57bd9e9d8ddf17e055.jpg"], "type": 0, "id": 8966833, "ga_prefix": "111017", "title": "知乎好问题 · 时间管理最常见的误区有哪些？" }, { "images": ["http:\/\/pic3.zhimg.com\/fc30413e70df02ecbcc13fed7b35c32e.jpg"], "type": 0, "id": 8964409, "ga_prefix": "111015", "title": "宁泽涛和国家游泳队的冲突从何而来？他会退役吗？" }, { "images": ["http:\/\/pic4.zhimg.com\/4ced184e0a84464d93dd62f207228abb.jpg"], "type": 0, "id": 8961167, "ga_prefix": "111014", "title": "二手车挑来挑去，各家交易平台上价格怎么差好多" }, { "images": ["http:\/\/pic3.zhimg.com\/20ac6fe024d134c8234df0c134150dc6.jpg"], "type": 0, "id": 8965861, "ga_prefix": "111013", "title": "预测美国大选，有一项数据还挺准的，而且越来越明显" }, { "images": ["http:\/\/pic1.zhimg.com\/73de922af044dd70beae4f6d3c113d14.jpg"], "type": 0, "id": 8965513, "ga_prefix": "111012", "title": "大误 · 樱木花道，我可是在帮你啊" }, { "images": ["http:\/\/pic4.zhimg.com\/e76156d3f4b1932e3cf02bf7a23b8a03.jpg"], "type": 0, "id": 8964264, "ga_prefix": "111011", "title": "苹果公司是怎样培养消费者忠诚度的？" }, { "images": ["http:\/\/pic1.zhimg.com\/522632f1bc771bf91743af4574b6aa94.jpg"], "type": 0, "id": 8962937, "ga_prefix": "111010", "title": "「就知道你一定会投给我」：两党「亲妈州」是这么来的" }, { "images": ["http:\/\/pic2.zhimg.com\/b1bf21f4b6a7b4b5851279dc517a613d.jpg"], "type": 0, "id": 8963864, "ga_prefix": "111009", "title": "家庭里的「仪式感」多一点，孩子感受到的爱就多一点" }, { "title": "打开上帝视角，重新发现一座城市", "ga_prefix": "111008", "images": ["http:\/\/pic3.zhimg.com\/c959c6353d0adb61c053757a8b1d8052.jpg"], "multipic": true, "type": 0, "id": 8963763 }, { "images": ["http:\/\/pic1.zhimg.com\/47ac4b0e2cfe37cf1b40c8d16a60f9c8.jpg"], "type": 0, "id": 8964773, "ga_prefix": "111007", "title": "特朗普「逆袭」取胜，为什么所有预测机构都出错了？" }, { "images": ["http:\/\/pic3.zhimg.com\/7c187dbb9c060748e162d234280168d2.jpg"], "type": 0, "id": 8958248, "ga_prefix": "111007", "title": "说真的，看电影还有个好处是，可以止痛" }, { "images": ["http:\/\/pic3.zhimg.com\/9c3c775781a74373023f55bca724cee2.jpg"], "type": 0, "id": 8964898, "ga_prefix": "111007", "title": "年轻人独自一人居住，如何有效地保持自律？" }, { "images": ["http:\/\/pic4.zhimg.com\/d1b96f8e289674d972f57c14a422a4db.jpg"], "type": 0, "id": 8964643, "ga_prefix": "111007", "title": "读读日报 24 小时热门 TOP 5 · 特朗普总统的第一个任期" }, { "images": ["http:\/\/pic2.zhimg.com\/80473eae77df078154818643ec3b7bdd.jpg"], "type": 0, "id": 8961174, "ga_prefix": "111006", "title": "瞎扯 · 如何正确地吐槽" }] };
  successCallback(ss);
  completeCallback();
}

function getNewsDetail(newsId, successCallback, errorCallback, completeCallback) {
  requestData(api.getNewsDetail(newsId), {}, successCallback, errorCallback, completeCallback);
}

function getTheme(successCallback, errorCallback, completeCallback) {
  // requestData( api.getTheme(), {}, successCallback, errorCallback, completeCallback );
  var ss = { "limit": 1000, "subscribed": [], "others": [{ "color": 15007, "thumbnail": "http:\/\/pic3.zhimg.com\/0e71e90fd6be47630399d63c58beebfc.jpg", "description": "了解自己和别人，了解彼此的欲望和局限。", "id": 13, "name": "日常心理学" }, { "color": 8307764, "thumbnail": "http:\/\/pic4.zhimg.com\/2c38a96e84b5cc8331a901920a87ea71.jpg", "description": "内容由知乎用户推荐，海纳主题百万，趣味上天入地", "id": 12, "name": "用户推荐日报" }, { "color": 14483535, "thumbnail": "http:\/\/pic3.zhimg.com\/00eba01080138a5ac861d581a64ff9bd.jpg", "description": "除了经典和新片，我们还关注技术和产业", "id": 3, "name": "电影日报" }, { "color": 8307764, "thumbnail": "http:\/\/pic4.zhimg.com\/4aa8400ba46d3d46e34a9836744ea232.jpg", "description": "为你发现最有趣的新鲜事，建议在 WiFi 下查看", "id": 11, "name": "不许无聊" }, { "color": 62140, "thumbnail": "http:\/\/p1.zhimg.com\/d3\/7b\/d37b38d5c82b4345ccd7e50c4ae997da.jpg", "description": "好设计需要打磨和研习，我们分享灵感和路径", "id": 4, "name": "设计日报" }, { "color": 1615359, "thumbnail": "http:\/\/pic4.zhimg.com\/aa94e197491fb9c44d384c4747773810.jpg", "description": "商业世界变化越来越快，就是这些家伙干的", "id": 5, "name": "大公司日报" }, { "color": 16031744, "thumbnail": "http:\/\/pic2.zhimg.com\/f2e97ff073e5cf9e79c7ed498727ebd6.jpg", "description": "从业者推荐的财经金融资讯", "id": 6, "name": "财经日报" }, { "color": 9699556, "thumbnail": "http:\/\/pic2.zhimg.com\/98d7b4f8169c596efb6ee8487a30c8ee.jpg", "description": "把黑客知识科普到你的面前", "id": 10, "name": "互联网安全" }, { "color": 59647, "thumbnail": "http:\/\/pic3.zhimg.com\/2f214a4ca51855670668530f7d333fd8.jpg", "description": "如果你喜欢游戏，就从这里开始", "id": 2, "name": "开始游戏" }, { "color": 1564695, "thumbnail": "http:\/\/pic4.zhimg.com\/eac535117ed895983bd2721f35d6e8dc.jpg", "description": "有音乐就很好", "id": 7, "name": "音乐日报" }, { "color": 6123007, "thumbnail": "http:\/\/pic1.zhimg.com\/a0f97c523c64e749c700b2ddc96cfd7c.jpg", "description": "用技术的眼睛仔细看懂每一部动画和漫画", "id": 9, "name": "动漫日报" }, { "color": 16046124, "thumbnail": "http:\/\/pic1.zhimg.com\/bcf7d594f126e5ceb22691be32b2650a.jpg", "description": "关注体育，不吵架。", "id": 8, "name": "体育日报" }] };
  successCallback(ss);
  completeCallback();
}

function getThemeStories(themeId, successCallback, errorCallback, completeCallback) {
  requestData(api.getThemeStories(themeId), {}, successCallback, errorCallback, completeCallback);
}

function getStoryShortComments(storyId, successCallback, errorCallback, completeCallback) {
  requestData(api.getStoryShortComments(storyId), {}, successCallback, errorCallback, completeCallback);
}

function getStoryLongComments(storyId, successCallback, errorCallback, completeCallback) {
  requestData(api.getStoryLongComments(storyId), {}, successCallback, errorCallback, completeCallback);
}

function getStoryExtraInfo(storyId, successCallback, errorCallback, completeCallback) {
  requestData(api.getStoryExtraInfo(storyId), {}, successCallback, errorCallback, completeCallback);
}

function getSplashCover(size, successCallback, errorCallback, completeCallback) {
  //requestData( api.getSplashCover( size ), {}, successCallback, errorCallback, completeCallback );
  var ot = {
    "text": '',
    "img": 'https://pic3.zhimg.com/v2-44cfa7c08af5d2eb2bd3b778a52478ba.jpg'
  };
  successCallback(ot);
  completeCallback();
}

/*************************************************************************************************************************** */

module.exports = {
  getNewsLatest: getNewsLatest,
  getBeforeNews: getBeforeNews,
  getNewsDetail: getNewsDetail,
  getTheme: getTheme,
  getStoryExtraInfo: getStoryExtraInfo,
  getThemeStories: getThemeStories,
  getStoryLongComments: getStoryLongComments,
  getStoryShortComments: getStoryShortComments,
  getSplashCover: getSplashCover,
  RequestError: RequestError,
  request: request,
};