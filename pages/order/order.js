
// pages/order/order.js
const app = getApp();
var myDate = new Date();
var date = myDate.getDate();
var month =  myDate.getMonth()+1;
var tomorrow = date+1;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _id:1,
    mazhangkuaidiWaitingOrder:[],
    xinhukuaidiWaitingOrder:[],
    mazhangpaotuiWaitingOrder:[],
    xinhupaotuiWaitingOrder:[],
    mazhangkuaidiOrdering:[],
    xinhukuaidiOrdering:[],
    mazhangpaotuiOrdering:[],
    xinhupaotuiOrdering:[],
    mazhangkuaidiGotOrder:[],
    xinhukuaidiGotOrder:[],
    mazhangpaotuiGotOrder:[],
    xinhupaotuiGotOrder:[],
    mazhangkuaidiFinish:[],
    xinhukuaidiFinish:[],
    mazhangpaotuiFinish:[],
    xinhupaotuiFinish:[],
    mymazhangkuaidiFinish:[],
    myxinhukuaidiFinish:[],
    mymazhangpaotuiFinish:[],
    myxinhupaotuiFinish:[],
    helpers:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(month==2){
      if(date==28){
        tomorrow = 1;
      }
    }else if(month==1||month==3||month==5||month==7||month==8||month==10||month==12){
      if(date==31){
        tomorrow = 1;
      }
    }else{
      if(date==30){
        tomorrow = 1;
      }
    }
    this.setData({
      tomorrow:tomorrow,
      date:date
    })
   const db = wx.cloud.database();
   const helpers = db.collection("Helpers");
   helpers
   .where({
     _openid:app.globalData.openid
   })
   .get()
   .then(res=> {
    if(res.data.length!=0){
      this.setData({
        helpers : true,
        _id:4,
      })
     
    }
   })
   .catch(err=> {
     console.log("失败",err)
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
    //获取麻章校区待接快递单
    wx.cloud.callFunction({
      name:"getState",
      data:{
        openid:app.globalData.openid,
        school:"mazhangkuaidi",
        state:0,
      }
    })
    //请求成功
    .then(res=> {
     
      this.setData({
        mazhangkuaidiWaitingOrder:res.result.data
      })
      console.log(this.data.mazhangkuaidiWaitingOrder)
    })
    //请求失败
    .catch(err=> {
      console.log("失败")
    })
    console.log("openid",app.globalData.openid);

    //获取新湖校区待接快递单

    wx.cloud.callFunction({
      name:"getState",
      data:{
        openid:app.globalData.openid,
        school:"xinhukuaidi",
        state:0,
      }
    })
    //请求成功
    .then(res=> {
     
      this.setData({
        xinhukuaidiWaitingOrder:res.result.data
      })
    })
    //请求失败
    .catch(err=> {
      console.log("失败")
    })

    //获取麻章校区待接跑腿单
    wx.cloud.callFunction({
      name:"getState",
      data:{
        openid:app.globalData.openid,
        school:"mazhangpaotui",
        state:0
      }
    })
    .then(res=> {
     
      this.setData({
        mazhangpaotuiWaitingOrder:res.result.data
      })
    })
    .catch(err=> {
      console.log("失败",err)
    })

    //获取新湖校区待接跑腿单
    wx.cloud.callFunction({
      name:"getState",
      data:{
        openid:app.globalData.openid,
        school:"xinhupaotui",
        state:0
      }
    })
    .then(res=> {
     
      this.setData({
        xinhupaotuiWaitingOrder:res.result.data
      })
    })
    .catch(err=> {
      console.log("失败",err)
    })

    //获取麻章校区已接快递单
    wx.cloud.callFunction({
      name:"getState",
      data:{
        openid:app.globalData.openid,
        school:"mazhangkuaidi",
        state:1
      }
     
    })
    .then(res=> {
      this.setData({
        mazhangkuaidiOrdering:res.result.data
      })
    })
    .catch(err=> {
      console.log("失败",err)
    })

     //获取新湖校区已接快递单
     wx.cloud.callFunction({
      name:"getState",
      data:{
        openid:app.globalData.openid,
        school:"xinhukuaidi",
        state:1
      }
     
    })
    .then(res=> {
      this.setData({
        xinhukuaidiOrdering:res.result.data
      })
    })
    .catch(err=> {
      console.log("失败",err)
    })
    
    //麻章校区已接跑腿单
    wx.cloud.callFunction({
      name:"getState",
      data:{
        openid:app.globalData.openid,
        school:"mazhangpaotui",
        state:1
      }
     
    })
    .then(res=> {
      this.setData({
        mazhangpaotuiOrdering:res.result.data
      })
    })
    .catch(err=> {
      console.log("失败",err)
    })

    //新湖校区已接跑腿单
    wx.cloud.callFunction({
      name:"getState",
      data:{
        openid:app.globalData.openid,
        school:"xinhupaotui",
        state:1
      }
     
    })
    .then(res=> {
      this.setData({
       xinhupaotuiOrdering:res.result.data
      })
    })
    .catch(err=> {
      console.log("失败",err)
    })

    //我接到的麻章校区快递单
    wx.cloud.callFunction({
      name:"get",
      data:{
        helpId:app.globalData.openid,
        school:"mazhangkuaidi",
        state:1,
        
      }
     
    })
    .then(res=> {
      console.log("这里",res.result)
      this.setData({
        mazhangkuaidiGotOrder:res.result.data
      })
    })
    .catch(err=> {
      console.log("失败",err)
    })

    //我接到的新湖校区快递单
    wx.cloud.callFunction({
      name:"get",
      data:{
        helpId:app.globalData.openid,
        school:"xinhukuaidi",
        state:1,
        
      }
     
    })
    .then(res=> {
      this.setData({
        xinhukuaidiGotOrder:res.result.data
      })
    })
    .catch(err=> {
      console.log("失败",err)
    })

    //我接到的麻章校区跑腿单
    wx.cloud.callFunction({
      name:"get",
      data:{
        helpId:app.globalData.openid,
        school:"mazhangpaotui",
        state:1,
        
      }
     
    })
    .then(res=> {
      this.setData({
        mazhangpaotuiGotOrder:res.result.data
      })
    })
    .catch(err=> {
      console.log("失败",err)
    })

    //我接到的新湖校区跑腿单
    wx.cloud.callFunction({
      name:"get",
      data:{
        helpId:app.globalData.openid,
        school:"xinhupaotui",
        state:1,
       
      }
     
    })
    .then(res=> {
      this.setData({
       xinhupaotuiGotOrder:res.result.data
      })
    })
    .catch(err=> {
      console.log("失败",err)
    })

    //麻章快递已完成
    wx.cloud.callFunction({
      name:"getState",
      data:{
        openid:app.globalData.openid,
        school:"mazhangkuaidi",
        state:2
      }
     
    })
    .then(res=> {
      this.setData({
       mazhangkuaidiFinish:res.result.data
      })
    })
    .catch(err=> {
      console.log("失败",err)
    })
    
    wx.cloud.callFunction({
      name:"getState",
      data:{
        helpId:app.globalData.openid,
        school:"mazhangkuaidi",
        state:2
      }
     
    })
    .then(res=> {
      this.setData({
       mymazhangkuaidiFinish:res.result.data
      })
    })
    .catch(err=> {
      console.log("失败",err)
    })
     //新湖快递已完成
     wx.cloud.callFunction({
      name:"getState",
      data:{
        openid:app.globalData.openid,
        school:"xinhukuaidi",
        state:2
      }
     
    })
    .then(res=> {
      this.setData({
       xinhukuaidiFinish:res.result.data
      })
    })
    .catch(err=> {
      console.log("失败",err)
    })

    wx.cloud.callFunction({
      name:"getState",
      data:{
        helpId:app.globalData.openid,
        school:"xinhukuaidi",
        state:2
      }
     
    })
    .then(res=> {
      this.setData({
       myxinhukuaidiFinish:res.result.data
      })
    })
    .catch(err=> {
      console.log("失败",err)
    })
     //麻章跑腿已完成
     wx.cloud.callFunction({
      name:"getState",
      data:{
        openid:app.globalData.openid,
        school:"mazhangpaotui",
        state:2
      }
     
    })
    .then(res=> {
      this.setData({
       mazhangpaotuiFinish:res.result.data
      })
    })
    .catch(err=> {
      console.log("失败",err)
    })

    wx.cloud.callFunction({
      name:"getState",
      data:{
        helpId:app.globalData.openid,
        school:"mazhangpaotui",
        state:2
      }
     
    })
    .then(res=> {
      this.setData({
       mymazhangpaotuiFinish:res.result.data
      })
    })
    .catch(err=> {
      console.log("失败",err)
    })
     //新湖跑腿已完成
     wx.cloud.callFunction({
      name:"getState",
      data:{
        openid:app.globalData.openid,
        school:"xinhupaotui",
        state:2
      }
     
    })
    .then(res=> {
      this.setData({
       xinhupaotuiFinish:res.result.data
      })
    })
    .catch(err=> {
      console.log("失败",err)
    })

    wx.cloud.callFunction({
      name:"getState",
      data:{
        helpId:app.globalData.openid,
        school:"xinhupaotui",
        state:2
      }
     
    })
    .then(res=> {
      this.setData({
       myxinhupaotuiFinish:res.result.data
      })
    })
    .catch(err=> {
      console.log("失败",err)
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
 
  kuaidiGoDetail(e){
    console.log(e);
    const school = e.currentTarget.dataset.school+"kuaidi";
    console.log(school);
    var id = e.currentTarget.dataset.id;
 
    if(this.data._id==1){
      wx.navigateTo({
        url: '/pages/order-1/order-1?id='+id+'&school='+school+'&_id=1',
      })
    }else if(this.data._id==4){
      wx.navigateTo({
        url: '/pages/order-1/order-1?id='+id+'&school='+school+'&_id=4',
      })
    }else if(this.data._id==2){
      wx.navigateTo({
        url: '/pages/order-1/order-1?id='+id+'&school='+school+'&_id=2',
      })
    }else{
      wx.navigateTo({
        url: '/pages/order-1/order-1?id='+id+'&school='+school+'&_id=3',
      })
    }
  },
  paotuiGoDetail(e){
    console.log(e);
    const school = e.currentTarget.dataset.school+"paotui";
    console.log(school);
    var id = e.currentTarget.dataset.id;
    if(this.data._id==1){
      wx.navigateTo({
        url: '/pages/order-2/order-2?id='+id+'&school='+school+'&_id=1',
      })
    }else if(this.data._id==4){
      wx.navigateTo({
        url: '/pages/order-2/order-2?id='+id+'&school='+school+'&_id=4',
      })
    }else if(this.data._id==2){
      wx.navigateTo({
        url: '/pages/order-2/order-2?id='+id+'&school='+school+'&_id=2',
      })
    }else{
      wx.navigateTo({
        url: '/pages/order-2/order-2?id='+id+'&school='+school+'&_id=3',
      })
    }
  },
  
  choose(e){
    this.setData({
      _id: e.target.dataset.id
  })
  }
})
