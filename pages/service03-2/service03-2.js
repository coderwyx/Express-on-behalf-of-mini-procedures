// pages/service03-2/service03-2.js
var school = "";
var myDate = new Date();
var date = myDate.getDate();
var month =  myDate.getMonth()+1;
var tomorrow = date+1;
const app = getApp();
var i = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{},
    showTime:"",
    date:0,
    time:"",
    tomorrow:"",
    nothing:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      date:date,
    })
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
    })
    console.log(tomorrow)
    // this.data.time = myDate.getDate();
    console.log(typeof(this.data.date))
    console.log(options);
    if(options.school==0){
      school = "mazhangpaotui"
    }else{
      school = "xinhupaotui"
    }
    const db = wx.cloud.database();
    const paotui = db.collection(school);
    paotui
    .where({
      state:0
    })
    .get()
    .then(res=> {
      console.log(res)
      if(res.data.length==0){
        this.setData({
          nothing:true,
        })
      }
      for(i=0;i<res.data.length;i++){
        if(res.data[i].date<date){
          this.setData({
            nothing:true,
          })
          
        }else{
          this.setData({
            nothing:false,
          })
          break;
        }
       
      }
      console.log(res)
      this.setData({
        list:res.data
      })
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
    // this.data.date = myDate.getDate();
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
    console.log("money",e)
    const db = wx.cloud.database();
    db.collection("Helpers")
    .where({
      _openid:app.globalData.openid
    })
    .get()
    .then(res=> {
      if(res.data.length==0){
        wx.showToast({
          icon:"none",
          title: '你现在还不能接单',
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
  
  }
})