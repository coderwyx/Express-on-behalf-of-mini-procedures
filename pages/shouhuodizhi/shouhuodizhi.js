// pages/shouhuodizhi/shouhuodizhi.js
const app = getApp();
var service = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {

    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.service);
    service = options.service;
    
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.cloud.database().collection("shouhuodizhi")
    .where({
      _openid:app.globalData.openid
    })
      .get()
      .then(res => {

        this.setData({
          list: res.data
        })
      })
      .catch(ree => {
        console.log("获取失败", ree);
      })
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
  goAdd() {
    wx.navigateTo({
      url: '/pages/addshouhuodizhi/addshouhuodizhi?test=1'
    })
  },
  goAdd2(e) {
    console.log(e);
    var where = e.currentTarget.dataset.where;
    var name = e.currentTarget.dataset.name;
    var phone = e.currentTarget.dataset.phone;
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/addshouhuodizhi/addshouhuodizhi?test=0&name='+name+'&where='+where+'&phone='+phone+'&id='+id
    })
  },
  goDetail(e) {
   
    if (service == 1) {
      console.log(e.currentTarget.dataset.where);
      console.log(e.currentTarget.dataset.name);
      console.log(e.currentTarget.dataset.phone);
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1]; //当前页面
      var prevPage = pages[pages.length - 2];
      prevPage.setData({
        where: e.currentTarget.dataset.where,
        name: e.currentTarget.dataset.name,
        phone: e.currentTarget.dataset.phone,
        test: 0
      })

      
      wx.navigateBack({
        delta: 1,
      })
      service = 0;
    }

  }
})