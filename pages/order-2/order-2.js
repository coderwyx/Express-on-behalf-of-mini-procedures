// pages/order-2/order-2.js
var buy = "";
var myDate = new Date();
var date = myDate.getDate();
var month = myDate.getMonth + 1;
var tomorrow = date + 1;
var permission = true;
var time = false;
var money = "";
var tip = "";
var address = "";
var where = "";
var name = "";
var phone = "";
var school = "";
var id = "";
var helpId = "";
var help_id = "";
const app = getApp();
var newMoney = "";
var that = this;
var doing = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money:"",
    tip:"",
    actionSheetHidden:true,
    actionSheetHidden2:true,
    actionSheetHidden3:true,
    Overdue: false,
    showTime: "",
    list: {},
    multiSelectorData: [
      ['今天', '明天'],
      [],
      ['00']
    ],
    buy: "",
    _id: "",
    finish:false,
    date:"",
    value2:"",
    value:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //初始化购买时间
    let i = 0;
    let j = 1;
    let hours = 6;
    let minutes = 10;
    while (hours < 24) {

      let key = "multiSelectorData[1][" + i + "]";
      this.setData({
        [key]: hours,
      })
      hours++;
      i++;
    }
    while (minutes < 60) {

      let key2 = "multiSelectorData[2][" + j + "]";
      this.setData({
        [key2]: minutes,
      })
      minutes = minutes + 10;
      j++;
    }

    //获取数据
    console.log(options);
    this.setData({
      _id: options._id
    })

    school = options.school;
    id = options.id;
    wx.cloud.callFunction({
        name: "docGet",
        data: {
          school: options.school,
          id: options.id
        }
      })
      .then(res => {
        console.log("调用云函数docGet成功", res.result)
        helpId = res.result.data.helpId;
        where = res.result.data.where;
        name = res.result.data.name
        phone = res.result.data.phone;
        money = res.result.data.money;
        tip =  res.result.data.tip;
        help_id = res.result.data.help_id;
        console.log(res.result.finish)
       
       
        this.setData({
          list: res.result.data,
          buy: res.result.data.buy,
          money: res.result.data.money,
          tip: res.result.data.tip,
          toWhere: res.result.data.toWhere,
          address: res.result.data.address,
          where: res.result.data.where,
          name: res.result.data.name,
          phone: res.result.data.phone,
          date:res.result.data.date,
        })
        
        if(res.result.data.finish){
          
          this.setData({
            finish:true
          })
        }
        if(this.data._id==2||this.data._id==3){
          wx.cloud.database().collection("Helpers")
          .where({
            _openid:helpId
          })
         .get()
         .then(res=> {
           console.log("获取电话号码成功",res)
           this.setData({
             helpPhone:res.data[0].phone
           })
         })
         .catch(err=> {
           console.log("获取电话号码失败",err)
         })
        }
        if (res.result.data.date == date) {
          this.setData({
            showTime: "今天" + res.result.data.time
          })
        } else if (res.result.data.date == tomorrow) {
          this.setData({
            showTime: "明天" + res.result.data.time
          })
        } else {
          this.setData({
            //判断订单是否过期
            Overdue: true,
            showTime: "已过期"
          })
        }
      })
      .catch(err => {
        console.log("调用云函数docGet失败", err)
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
  getBuy(e) {
    buy = e.detail.value;
  },
  openMap(e) {
    console.log(this.data.list.toWhere)

    if (permission) {
      wx.chooseLocation({

        success: (res) => {
          console.log(res);
          address = res.address;
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
          if (err.errMsg == "chooseLocation:fail auth deny") {
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
  goShouhuodizhi() {
    wx.navigateTo({
      url: '/pages/shouhuodizhi/shouhuodizhi?service=' + "1",
    })
  },
  timeChange(e) {
    var one = e.detail.value[0];
    var two = e.detail.value[1];
    var three = e.detail.value[2];
    if (this.data.multiSelectorData[0][one] == "今天") {
      this.data.date = date;
    } else {
      if (month == 2) {
        if (date == 28) {
          tomorrow = 1;
        }
      } else if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
        if (date == 31) {
          tomorrow = 1;
        }
      } else {
        if (date == 30) {
          tomorrow = 1;
        }
      }
      this.data.date = tomorrow;
    }
    var thone = this.data.multiSelectorData[0][one];
    var thtwo = this.data.multiSelectorData[1][two];
    var ththree = this.data.multiSelectorData[2][three];
    time = true;
    this.setData({
      showTime: thone + " " + thtwo + ":" + ththree,
      time: thtwo + ":" + ththree,
    })
  },
  getMoney() {
    this.setData({
      actionSheetHidden:!this.data.actionSheetHidden
    })
    
  },
  getTip() {
    this.setData({
      actionSheetHidden2:!this.data.actionSheetHidden2
    })
  },
  changeOrder() {
    if (this.data.Overdue && !time) {
      wx.showToast({
        icon: "none",
        title: '需要选择新的购买时间',
      })
    } else if (buy == "" && address == "" && where == this.data.where && name == this.data.name && phone == this.data.phone && !time && money == this.data.money && tip == this.data.tip) {
      wx.navigateBack({
        delta: 1,
      })
    } else {
      console.log(buy);
      console.log(address);
      console.log(this.data.money);
      console.log(this.data.tip);

      if (buy != "") {
        this.data.buy = buy;
      }
    
      if(this.data.money!=money||this.data.tip!=tip){

        this.setData({
          actionSheetHidden3:!this.data.actionSheetHidden3,
          pay:Number(this.data.money)+Number(this.data.tip)
        })
        return
      }
  

      wx.cloud.database().collection(school)
        .doc(id)
        .update({
          data: {
            buy: this.data.buy,
            money: this.data.money,
            tip: this.data.tip,
            toWhere: this.data.toWhere,
            address: this.data.address,
            where: this.data.where,
            name: this.data.name,
            phone: this.data.phone,
            time: this.data.time,
            date: this.data.date,
          }
        })
        .then(res => {
          console.log("更改成功", res);
          if (this.data.Overdue) {
            wx.showToast({
              title: '重新发布订单成功',
            })
          } else {
            wx.showToast({
              title: '更改订单成功',
            })
            buy = "";
            money = "";
            tip = "";
          }
          setTimeout(() => {
            wx.navigateBack({
              delta: 1,
            })
          }, 1500);
        })
        .catch(err => {
          console.log("更改失败", err)
        })
    }

  },
  pay(){
    wx.showToast({
      title: '支付成功',
    })
    setTimeout(() => {
      wx.cloud.database().collection(school)
    .doc(id)
    .update({
      data: {
        buy: this.data.buy,
        money: this.data.money,
        tip: this.data.tip,
        toWhere: this.data.toWhere,
        address: this.data.address,
        where: this.data.where,
        name: this.data.name,
        phone: this.data.phone,
        time: this.data.time,
        date: this.data.date,
      }
    })
    .then(res => {
      console.log("更改成功", res);
      if (this.data.Overdue) {
        wx.showToast({
          title: '重新发布订单成功',
        })
      } else {
        wx.showToast({
          title: '更改订单成功',
        })
        buy = "";
        money = "";
        tip = "";
      }
      setTimeout(() => {
        wx.navigateBack({
          delta: 1,
        })
      }, 1500);
    })
    .catch(err => {
      console.log("更改失败", err)
    })

    }, 1500);
    
  },
  delOrder() {
    wx.showModal({
      title: "确定要取消订单吗?",
      content:"支付金额会根据支付方式返还",
      success(res) {
        if (res.confirm) {
          wx.cloud.database().collection(school).doc(id)
            .remove()
            .then(res => {
              console.log("取消成功", res)
              wx.showToast({
                title: '取消成功',
              })
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1,
                })
              }, 1500)
            })
            .catch(err => {
              console.log("取消失败", ree)
            })
        }
      }
   
    })

  },
  orderFinish(){
    if(doing){
      wx.showModal({
        title:"是否已经送到了指定地点?",
        content: '请勿提前完成订单',
        confirmText:"我送到了",
        cancelText:"还要等等",
        success(res){
          if(res.confirm){
            wx.cloud.callFunction({
              name:"finish",
              data:{
                id:id,
                school:school,
                finish:true
              }
            })
            .then(res=> {
              console.log("完成订单成功",res)
              doing = false;
              wx.showToast({
                title: '订单已完成',
              })
              setTimeout(()=>{
                wx.navigateBack({
                  delta: 1,
                })
                doing = true;
              },1500)
            })
            .catch(err=> {
              console.log("订单完成失败",err)
            })
          }
        }
      })
    }else {
      return;
    }
    
  },
  canceledOrder(){
    if(doing){
      wx.showModal({
        content:"取消订单会扣除保证金哟",
        title:"确定要取消订单吗？",
        success(res) {
          if(res.confirm){
            wx.cloud.callFunction({
              name:"upDate",
              data:{
                id:id,
                school:school,
                state:0,
                helpId:""
              }
            })
            .then(res=> {
              console.log("取消成功",res);
              doing = false;
              wx.showToast({
                title: '取消成功',
              });
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1,
                })
                doing = true;
              }, 1500);
            })
            .catch(err=> {
              console.log("取消失败",err)
            })
          }
          
        }
      })
    }else {
      return;
    }
   
  },
  confirm(){
    var that = this;
    wx.showModal({
      title:"确定收货",
      content: '确定收到货物了吗?',
      success(res){
        
        let add = Number(money)+Number(tip)
        if(res.confirm){
          console.log(helpId)
          wx.cloud.callFunction({
            name:"getMoney",
           data:{
             helpId:helpId
           }
          })
          .then(res=> {
            console.log("成功111",res)
           
            newMoney = add+res.result.data[0].money
            wx.cloud.callFunction({
              name:"upDateHelpersMoney",
              data:{
                help_id:help_id,
                newMoney:newMoney
              }
            })
            .then(res=> {
              console.log("更新钱成功",res)
            })
            .catch(err=> {
              console.log("更新钱失败",err)
            })
          })
          .catch(err=> {
            console.log(err)
          })
          console.log(help_id)
          console.log(that.data.newMoney)
          
          wx.cloud.database().collection(school)
          .doc(id)
          .update({
            data:{
              state:2
            }
          })
          .then(res=> {
            console.log("收货成功",res)
            wx.showToast({
              title: '收货成功',
            })
            setTimeout(() => {
              wx.navigateBack({
                delta: 1,
              })
            }, 1500);
          })
          .catch(err=> {
            console.log("收货失败",err)
          })
        
        }
      }
    })
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
  listenerActionSheet3:function() {
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
   return val.replace(/\D/g, '')
 },
 confrimMoney(){
  if(this.data.value==""){
  //  this.setData({
  //    money:"请填写预付商品费"
  //   })
  //   money = "";
    return
  }
 this.setData({
   money:this.data.value
 })
//  money = this.data.value;
},
confrimMoney2(){
 if(this.data.value2==""){
  // this.setData({
  //   tip:"请填写给小哥的辛苦费"
  //  })
  //  tip = "";
   return
 }
this.setData({
  tip:this.data.value2
})
// tip = this.data.value2;
}


})