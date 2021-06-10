// pages/mysever02/mysever02.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Username:"",
    phone:"",
    state:false,
    User:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.cloud.database().collection("Users")
    .where({
      _openid:app.globalData.openid,
    })
    .get()
    .then(res=> {
      if(res.data.length==0){
        this.setData({
          User:true
        })
      }
      console.log("获取用户数据成功",res)
      this.setData({
        Username:res.data[0].name,
        phone:res.data[0].phone
      })
    })
    .catch(err=> {
      console.log("获取用户数据失败",err)
    })
    wx.cloud.database().collection("toHelper")
    .get()
    .then(res=> {
      if(res.data.length!=0){
        this.setData({
          state:true
        })
      }
    })
    .catch(err=> {
      console.log("获取用户是否已经申请失败",err)
    })
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
  toHelper(){
    if(this.data.state){
      wx.showToast({
        icon:"none",
        title: '您已经申请过了,请耐心等待结果',
      })
      return
    }
    if(this.data.User){
      wx.showToast({
        icon:"none",
        title: '请先注册',
      })
      return
    }
    let that = this;
    console.log(this.data.Username)
    if(this.data.Username==undefined){
      wx.showToast({
        icon:"none",
        title: '请完善个人资料再申请',
      })
      return
    }
    wx.showModal({
      title:"确定要申请帮忙吗？",
      content:"申请需要1~2个工作日审核",
      confirmText:"我要申请",
      cancelText:"我再想想",
      success(res){
        if(res.confirm){
          wx.cloud.database().collection("toHelper")
          .add({
            data:{
              name:that.data.Username,
              phone:that.data.phone
            }
          })
          .then(res=> {
            console.log("向申请数据库添加数据成功",res)
          })
          .catch(err=> {
            console.log("向申请数据库添加数据库失败",err)
          })
          wx.showToast({
            title: '申请成功',
          })
          setTimeout(()=>{
            wx.navigateBack({
              delta: 1,
            })
          },1500)
        }
      }
    })
  }
})