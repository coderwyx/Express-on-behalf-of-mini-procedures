// pages/service03-1/service03-1.js
let school = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    a:"<",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    school = options.school;
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
 goKuaidi(){
  wx.navigateTo({
    url: '/pages/service03-1/service03-1?school=' + school,
  })
 },
 goPaotui(){
  wx.navigateTo({
    url: '/pages/service03-2/service03-2?school=' + school,
  })
 },
  back(){
   wx.navigateBack({
      delta: 1,
    });
  }
})