// index.js
// 获取应用实例
const app = getApp()
var school = 1;

Page({
  data: {
    login: false,
    openid: app.globalData.openid,
    test: {
      hidden: true,
      default: "请选择所在校区",
      txt: ["麻章校区", "新湖校区"]
    },
    swiper:[],
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    this.getOpenid();
    wx.cloud.database().collection("swiper")
    .get()
    .then(res=> {
      console.log("获取轮播图数据成功",res)
      this.setData({
        swiper:res.data
      })
    })
    .catch(err=> {
      console.log("获取轮播图数据失败",err)
    })
  },
  onShow: function () {
    const db = wx.cloud.database();
    const users = db.collection("Users");
    users.get()
      .then(res => {
        if (res.data.length != 0 && wx.getStorageSync('user')) {
          this.data.login = true;
        } else {
          this.data.login = false;
        }
      })
      .catch(err => {
        console.log("调用失败", err)
      })

    console.log(wx.getStorageSync('user'))
  },
  getUserInfo(e) {
    console.log(e)

    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  goSever01() {
    //判断用户是否登录
    if (!this.data.login) {
      wx.showToast({
        icon: "none",
        title: '请先登录',
      })
      return
    }

    //判断用户选择的校区
    if (school) {
      wx.showToast({
        icon: "none",
        title: '请先选择所在校区',
      })
    } else {
      if (this.data.test.default == "麻章校区") {
        wx.navigateTo({

          url: '/pages/service01/service01?school=' + "mazhangkuaidi",
        })
      } else {
        wx.navigateTo({

          url: '/pages/service01/service01?school=' + "xinhukuaidi",
        })
      }

    }

  },
  goSever02() {
    //判断用户是否登录
    if (!this.data.login) {
      wx.showToast({
        icon: "none",
        title: '请先登录',
      })
      return
    }

    if (school) {
      wx.showToast({
        icon: "none",
        title: '请先选择所在校区',
      })
    } else if (this.data.test.default == "麻章校区") {

      wx.navigateTo({

        url: '/pages/service02/service02?school=' + "mazhangpaotui",

      })
    } else if (this.data.test.default == "新湖校区") {

      wx.navigateTo({

        url: '/pages/service02/service02?school=' + "xinhupaotui",

      })
    }
  },
  goSever03() {
    //判断用户是否登录
    if (!this.data.login) {
      wx.showToast({
        icon: "none",
        title: '请先登录',
      })
      return
    }

    if (school) {
      wx.showToast({
        icon: "none",
        title: '请先选择所在校区',
      })
    } else {
      if (this.data.test.default == "麻章校区") {

        wx.navigateTo({

          url: '/pages/service03/service03?school=0',
        })
      } else {
        wx.navigateTo({

          url: '/pages/service03/service03?school=1',
        })
      }

    }
  },
  showSchool:function(){
    var data=this.data.test;
    data["hidden"]=!data.hidden;
    console.log("点击了");
    this.setData({
      test: data
    })
  },
  SelectVal: function (e) {
    // 获取到点击的列表下标，因为是在下拉的父元素点击，所以获取到menus下标
    var index = e.target.dataset.index;
    var data = this.data.test;
    //获取选中的选项的值
    var test_name = data.txt[index];

    console.log("选择了选项:" + test_name);

    //设置区域默认值和隐藏
    data["default"] = test_name;
    school = 0;
    data["hidden"] = !data.hidden;
    this.setData({
      test: data
    })

  },

  getOpenid() {
    let that = this;
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log('云函数获取到的openid: ', res.result.openId)
        var openid = res.result.openId;
        that.setData({
          openid: openid
        })
      }
    })

  },


})