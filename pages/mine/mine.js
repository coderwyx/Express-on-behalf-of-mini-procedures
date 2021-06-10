// pages/mine/mine.js
var test = 0;
const db = wx.cloud.database();
const users = db.collection("Users");
var app = getApp();
var id = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    helpers:false,
    userInfo: null,
    isShowUserName: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
   console.log(this.data.userInfo)
   
  },
  // handleGetUserInfo(res){
  //   console.log(res)
  //   if(res.detail.userInfo){

  //     this.setData({
  //       userInfo:res.detail.userInfo
  //     })
  //   }
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.getUserProfile()
    const db = wx.cloud.database();
    const users = db.collection("Users");
    users.get({
      success: res => {
        if (res.data.length != 0&&wx.getStorageSync('user')) {
          this.setData({
            isShowUserName: true,
            
          })
        }
      }
    })
    var user = wx.getStorageSync('user');
    if (user && user.nickName) {
      this.setData({
        // isShowUserName: true,
        userInfo: user,
      })
    }
   
    const helpers = db.collection("Helpers");
    helpers.where({
      _openid:app.globalData.openid
    })
    .get({
      success: res => {
        console.log(res)
        if (res.data.length != 0 ) {
          id=res.data[0]._id;
         this.setData({
           helpers:true,
           money:res.data[0].money,
           
         })
          
        }
      }
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
  goShouhuodizhi() {
    wx.navigateTo({
      url: '/pages/shouhuodizhi/shouhuodizhi',
    })


    // wx.chooseAddress({
    //   success (res)  {
    //     console.log(res.userName)
    //     console.log(res.postalCode)
    //     console.log(res.provinceName)
    //     console.log(res.cityName)
    //     console.log(res.countyName)
    //     console.log(res.detailInfo)
    //     console.log(res.nationalCode)
    //     console.log(res.telNumber)
    //   }

    // })
  },
  goLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  getUserProfile() {
    var user = wx.getStorageSync('user');
    if(!user){
      
      wx.getUserProfile({
        desc: "用于完善用户资料",
  
        success: (res) => {
          console.log("获取用户信息成功", res)
          let user = res.userInfo
          wx.setStorageSync('user', user)
          this.setData({
            // isShowUserName: true,
            userInfo: user,
          })
         
         
          users.get({
            success: res => {
              if (res.data.length == 0) {
                wx.navigateTo({
                  url: '/pages/register/register',
                })
              }else{
                this.setData({
                  isShowUserName: true,
                 
                })
              }
            }
          })
        },
        fail: (err) => {
          console.log(err);
        }
      })
  
    }else{
     
          users.get({
            success: res => {
              if (res.data.length == 0) {
                wx.navigateTo({
                  url: '/pages/register/register',
                })
              }
            }
          })
    }
    


  },
  goInfo() {
    wx.navigateTo({
      url: '/pages/info/info',
    })
  },
  takeMoney(){
    let that = this;
    if(this.data.money==0){
      wx.showToast({
        icon:"none",
        title: '没有钱可以提现啦,快去接单赚钱吧',
      })
      return
    }
    wx.showModal({
      title:"确定要提现吗？",
      success(res){
        if(res.confirm){
          wx.showToast({
            title: '提现成功',
          })
          wx.cloud.database().collection("Helpers")
          .doc(id)
          .update({
            data:{
              money:0
            }
          })
          .then(res=> {
            console.log("提现成功",res)
            that.setData({
              money:0
            })
          })
          .catch(err=> {
            console.log("提现失败",err)
          })
        }
      }
    })
  },
  goSever01(){
    wx.navigateTo({
      url: '/pages/mysever01/mysever01',
    })
  },
  goSever02(){
    if(this.data.helpers){
      wx.showToast({
        icon:"none",
        title: '你已经可以帮忙啦，不用再申请了',
      })
      return
    }
    wx.navigateTo({
      url: '/pages/mysever02/mysever02',
    })
  },
  goSever05(){
    wx.navigateTo({
      url: '/pages/mysever05/mysever05',
    })
  },
  goSever06(){
    wx.navigateTo({
      url: '/pages/mysever06/mysever06',
    })
  },
})