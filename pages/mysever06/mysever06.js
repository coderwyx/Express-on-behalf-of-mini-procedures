// pages/mysever06/mysever06.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zhuti:"",
    fankui:"",
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
  getzhuti(e){
    console.log("1")
    console.log(e);
    this.setData({
      zhuti:e.detail.value
    })
 
  },
  getfankui(e){
    console.log(e);
    this.setData({
      fankui:e.detail.value
    })
  },
  putProblem(){
    console.log(this.data.zhuti)
    if(this.data.zhuti==""){
      wx.showToast({
        icon:"none",
        title: '请先输入主题',
      })
      return
    }
    if(this.data.fankui==""){
      wx.showToast({
        icon:"none",
        title: '反馈内容不能为空',
      })
      return
    }
    wx.cloud.database().collection("problem")
    .add({
      data:{
        zhuti:this.data.zhuti,
        fankui:this.data.fankui,
      }
     
    })
    .then(res=> {
      console.log("提交成功")
      wx.showToast({
        title: '提交反馈成功',
      })
      setTimeout(()=> {
        wx.navigateBack({
          delta: 1,
        })
      },1500)
    })
    .catch(err=> {
      console.log("提交失败")
      wx.showToast({
        icon:"none",
        title: '提交失败请稍后',
      })
    })
  }
})