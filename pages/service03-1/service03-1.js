// pages/service03/service03.js
const app = getApp()
var school = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    nothing:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
   
   if(options.school==0){
    school = "mazhangkuaidi"
   } else{
    school = "xinhukuaidi"
   }
    wx.cloud.database().collection(school)
    .where({
      state:0
    })
    .get()
    .then(res=> {
      if(res.data.length==0){
        this.setData({
          nothing:true
        })
      }
      this.setData({
        list:res.data
      })
    })
    .catch(ree=> {
      console.log("失败")
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
  takeOrders(e){
    wx.cloud.database().collection(school)
        .doc(e.currentTarget.dataset.id,)
        .get()
        .then(res => {
          if(res.data._openid==app.globalData.openid){
            wx.showToast({
              icon:"none",
              title: '不能接自己发布的订单哟',
            })
            return
          }else{
            console.log(e.currentTarget.dataset.id);
    const db = wx.cloud.database();
    db.collection("Helpers")
    .where({
      _openid:app.globalData.openid
    })
    .get()
    .then(res=> {
      if(res.data.length==0){
        // wx.showToast({
        //   icon:"none",
        //   title: '你现在还不能接单',
        // })
        wx.showModal({
          title:"你现在还不能接单哟",
          content:"需要申请接单资格吗？",
          success(res){
            if(res.confirm){
              wx.navigateTo({
                url: '/pages/mysever02/mysever02',
              })
            }
          }
          
        })
        return
      }else{
       


        console.log("这里",res)
        wx.cloud.callFunction({
      
          name:'upDate',
          data:{
            id:e.currentTarget.dataset.id,
            helpId:app.globalData.openid,
            school:school,
            state:1,
            help_id:res.data[0]._id
            
          }
        })
        .then(res=> {
          console.log("成功",res)
          wx.showToast({
            title: '接单成功',
          })
          setTimeout(()=> {
            wx.switchTab({
              url: '/pages/order/order',
            })
          },1500)
        })
        .catch(err=> {
          console.log("失败",err)
    
        })
      }
    })
    .catch(err=> {
      console.log("失败")
    })
    console.log(school)
   
          }
          
        })
        .catch(err=> {
          console.log(err)
        })
    
  
  }
})