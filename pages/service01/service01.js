// pages/service01/service01.js
var name = "";
var phone = "";
var num = "";
var where = "";
var kuaidi = "";
var school = "";
var beizhu = "";
var toWhere ="";
var test = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actionSheetHidden:true,
    volume:"",
    _id:0,
    where:"",
    name:"",
    phone:"",
    test:1,
    money:"",
    list:{
    
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
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


 
  getNum(e) {
    num = e.detail.value;
    console.log(e.detail.value);
  },
  getBeizhu(e) {
    beizhu = e.detail.value;
    console.log(e.detail.value);
  },
  getToWhere(e) {
    toWhere = e.detail.value;
    console.log(e.detail.value);
  },
  getKuaidi(e) {
    kuaidi = e.detail.value;
    console.log(e.detail.value);
  },
  addOrder(e) {
    // console.log("取件人姓名：",name);
    // console.log("取件人电话号码：",phone);
  

    if (this.data.test == 1) {
      wx.showToast({
        icon: "none",
        title: '请选择收货地址',
      })
    
    } else if (kuaidi == "") {
      wx.showToast({
        icon: "none",
        title: '请输入快递公司',
      })
    }else if (toWhere == "") {
      wx.showToast({
        icon: "none",
        title: '请输入快递所在的详细地址',
      })
    }else if(this.data._id==0){
      wx.showToast({
        icon:"none",
        title: '请选择快递大小',
      })
    } else if (num == "") {
      wx.showToast({
        icon: "none",
        title: '请输入取件码',
      })
    
    } else {
      switch(this.data._id){
        case "1" :
          this.setData({
            money:'3元'
          })
          break;
      
        case "2" :
          this.setData({
            money:'4元'
          })
          break;
        
        case "3" :
          this.setData({
            money:'5元'
          })
          break;
        
      }
      this.setData({
        actionSheetHidden: !this.data.actionSheetHidden
      });
    }
  },
  goShouhuodizhi() {
   
    wx.navigateTo({
      url: '/pages/shouhuodizhi/shouhuodizhi?service='+"1",
    })

    //微信小程序提供api
    // wx.chooseAddress({
    //   success (res)  {
    //     console.log(res.userName)
      
        
    //     console.log(res.provinceName)
    //     console.log(res.cityName)
    //     console.log(res.countyName)
    //     console.log(res.detailInfo)
    //     console.log(res.nationalCode)
    //     console.log(res.telNumber)
    //   }
       
    // })
  },
  choose(e){
    console.log(e)
    this.setData({
      _id:e.currentTarget.dataset.id
    })
  },
  listenerActionSheet(){
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  pay() {
    if(test){
      test = false;
      if(this.data._id==1){
        this.data.volume = '小件';
      }else if(this.data._id == 2){
        this.data.volume = '中件';
      }else{
        this.data.volume = '大件';
      }
      where = this.data.where;
      name = this.data.name;
      phone = this.data.phone;
      console.log(this.data.where);
      console.log("添加操作");
      wx.cloud.database().collection(school)
        .add({
          data: {
            name: name,
            phone: phone,
            num: num,
            where: where,
            kuaidi: kuaidi,
            beizhu: beizhu,
            toWhere: toWhere,
            finish:false,
            state:0,
            volume:this.data.volume
          }
        })
        .then(res => {
          name = "";
          phone = "";
          num = "";
          where = "";
          kuaidi = "";
  
          console.log("添加成功", res);
          wx.showToast({
  
            title: '支付成功',
          })
          setTimeout(()=> {
            wx.showToast({
              icon: "none",
              title: '发布成功，正等待接单小哥~',
            })
          },1000)
         
          setTimeout(function () {
            wx.switchTab({
              url: '/pages/index/index',
            })
          }, 2000);
  
        })
        .catch(res => {
          console.log("添加失败", res);
        })
    }
   setTimeout(()=> {
     test = true
   },3000)
  }
})