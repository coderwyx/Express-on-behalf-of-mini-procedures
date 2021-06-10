// pages/service02/service02.js
//以后加一个确认订单页面
var buy = "";
var permission = true;
var myDate = new Date();
var date = myDate.getDate();
var month =  myDate.getMonth()+1;
var tomorrow = date+1;
var time = false;
var money = "";
var tip = "";
var school = "";
var test = true;

// var date = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:"",
    value2:"",
    actionSheetHidden:true,
    actionSheetHidden2:true,
    actionSheetHidden3:true,
    toWhere: "点击选择购买地址",
    address: "",
    where:"点击选择收货地址",
    name:"",
    phone:"",
    time:"",
    date:"",
    showTime:"请选择购买时间",
    money:"请填写预付商品费",
   
    tip:"请填写给小哥的辛苦费",
    multiSelectorData:[
      ['今天','明天'],
      [],
      ['00']
    ],
   pay:"",
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  console.log(myDate.getDate());
  // date = myDate.getDate();
  school = options.school;
   
   let i = 0;
   let j = 1;
   let hours = 6;
   let minutes = 10;
    while(hours<24){
     
      let key = "multiSelectorData[1]["+i+"]";
      this.setData({
        [key]:hours,
      })
     hours++;
     i++;
    }
    while(minutes<60){
     
      let key2 = "multiSelectorData[2]["+j+"]";
      this.setData({
        [key2]:minutes,
      })
      minutes = minutes+10;
      j++;
    }
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

  goShouhuodizhi() {
    wx.navigateTo({
      url: '/pages/shouhuodizhi/shouhuodizhi?service=' + "1",

    })
  },
  getBuy(e) {
    buy = e.detail.value;
  },
  openMap(e) {
    console.log(permission)
   
    if (permission) {
      wx.chooseLocation({

        success: (res) => {
          console.log(res);
          this.setData({
            toWhere: res.name,
            address: res.address,
          })
          console.log("1");
          permission = true;
        },
        fail: (err) => {
          console.log("授权失败", err);
          console.log(err.errMsg)
          if(err.errMsg=="chooseLocation:fail auth deny"){
            permission = false;
          }
         
        }
      })
    } else {
      wx.openSetting({
        success: (res) => {
          console.log(res.authSetting["scope.userLocation"])
          if (res.authSetting["scope.userLocation"]) {
            permission = true;
          }

        }
      })
    }



  },
  timeChange(e){
    console.log(e);
    console.log(e.detail.value[0])
    console.log(e.detail.value[1])
    console.log(e.detail.value[2])
   
    var one = e.detail.value[0];
    var two = e.detail.value[1];
    var three = e.detail.value[2];
    // if(this.data.multiSelectorData[0][one]=="今天"){
    //   this.setData({
    //     date:date,
    //   })
    // }else{
    //   this.setData({
    //     date:0,
    //   })
    // }
    console.log(this.data.multiSelectorData[0][one])
    console.log(this.data.multiSelectorData[1][two])
    console.log(this.data.multiSelectorData[2][three])
    if(this.data.multiSelectorData[0][one]=="今天"){
      this.data.date = date;
    }else{
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
      this.data.date = tomorrow;
    }
    var thone = this.data.multiSelectorData[0][one];
    var thtwo = this.data.multiSelectorData[1][two];
    var ththree = this.data.multiSelectorData[2][three];
    //用来检查用户是否选择了时间
    time = true;
    this.setData({
     showTime:thone+" "+thtwo+":"+ththree,
     time:thtwo+":"+ththree,
    })
  },
  getMoney(){
    this.setData({
      actionSheetHidden:!this.data.actionSheetHidden
    })
    
  },
  getTip(){
    this.setData({
      actionSheetHidden2:!this.data.actionSheetHidden2
    })
  },
  addOrder(){
    if(buy==""){
      wx.showToast({
        icon:"none",
        title: '请输入需要购买的商品',
      })
    }else if(this.data.address==""){
      wx.showToast({
        icon:"none",
        title: '请选择购买地址',
      })
    }else if(this.data.name==""){
      wx.showToast({
        icon:"none",
        title: '请选择收货地址',
      })
    }else if(!time){
      wx.showToast({
        icon:"none",
        title: '请选择购买时间',
      })
    }else if(this.data.money=="请填写预付商品费"){
      wx.showToast({
        icon:"none",
        title: '请填写预付商品费',
      })
    }else if(this.data.tip=="请填写给小哥的辛苦费"){
      wx.showToast({
        icon:"none",
        title: '请填写给小哥的辛苦费',
      })
    }else{
      this.setData({
        pay:Number(money)+Number(tip),
        actionSheetHidden3:!this.data.actionSheetHidden3
      })



      
    }

  },
  pay(){
    if(test){
      test= false;
      wx.showToast({
        title: '支付成功',
      })
      setTimeout(()=> {
        console.log("下单成功");
        const db = wx.cloud.database();
        db.collection(school)
        .add({
          data:{
            buy:buy,
            toWhere:this.data.toWhere,
            address:this.data.address,
            where:this.data.where,
            name:this.data.name,
            phone:this.data.phone,
            time:this.data.time,
            money:money,
            tip:tip,
            date:this.data.date,
            finish:false,
            state:0
          }
        })
       
      
          .then(res=>{
            console.log("下单成功",res)
            wx.showToast({
              title: '已下单',
            })
            setTimeout(() => {
              wx.navigateBack({
                delta: 1,
              })
            }, 1500);
          })
          .catch(err=> {
            console.log("下单失败",err)
            
          })
      },1000)
      setTimeout(()=>{
        test = true;
      },3000)
    }else {
      wx.showToast({
        icon:"none",
        title: '请勿重复下单',
      })
    }
   
    
  },
  listenerActionSheet:function() {
    this.setData({
     actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  listenerActionSheet2:function() {
    this.setData({
     actionSheetHidden2: !this.data.actionSheetHidden2
    })
  },
  listenerActionSheet3(){
    this.setData({
      actionSheetHidden3: !this.data.actionSheetHidden3
     })
  },
  handleInput(e) {
    console.log(e)
   let value = this.validateNumber(e.detail.value)
   this.setData({
    value
   })
   console.log(this.data.value)
 },
 handleInput2(e) {
  console.log(e)
 let value2 = this.validateNumber(e.detail.value)
 this.setData({
  value2
 })
 console.log(this.data.value2)
},
 validateNumber(val) {
   let value = val.replace(/^0/g, '')
   return value.replace(/\D/g, '')
  
 },
 confrimMoney(){
   if(this.data.value==""){
    this.setData({
      money:"请填写预付商品费"
     })
     money = "";
     return
   }
  this.setData({
    money:this.data.value+"元"
  })
  money = this.data.value;
 },
 confrimMoney2(){
  if(this.data.value2==""){
   this.setData({
     tip:"请填写给小哥的辛苦费"
    })
    tip = "";
    return
  }
 this.setData({
   tip:this.data.value2+"元"
 })
 tip = this.data.value2;
}
 

})