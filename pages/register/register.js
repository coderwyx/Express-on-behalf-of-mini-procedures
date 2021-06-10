// pages/zhuce/zhuce.js
var checkPhone = /^1[3-9][0-9]{9}$/;
const db = wx.cloud.database();
const users = db.collection("Users");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"",
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
  getPhone(e){
    this.setData({
      phone:e.detail.value
    })
    console.log(this.data.phone)
  },
  register(){
    if(this.data.phone == ""){
      console.log("手机号码为空");
      wx.showToast({
        icon:"none",
        title: "手机号码为空",
      })
    }else if(!checkPhone.test(this.data.phone)){
      console.log("手机号码格式错误，请输入正确的手机号码");
      wx.showToast({
        icon:"none",
        title: "手机号码格式错误",
      })
    }else{
     
      users.add({
        data:{
          phone:this.data.phone,
          money:0
        }
        
      })
      .then(res=> {
        console.log("注册成功");
        wx.showToast({
          title: "注册成功",
        })
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1]; //当前页面
        var prevPage = pages[pages.length - 2];
        prevPage.setData({
          isShowUserName:true,
        });
        setTimeout(function(){
          wx.navigateBack({
            delta: 1,
          });
        },1500)
       
      })
    }
   
  }
})