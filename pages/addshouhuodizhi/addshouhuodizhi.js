// pages/addshouhuodizhi/addshouhuodizhi.js
var where = "";
var name = "";
var phone = "";
var checkPhone = /^1[3-9][0-9]{9}$/;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    test: 0,
    name: "请填写收货人的姓名",
    where: "请填写详细地址，如：厚德3059",
    phone: "请填写收货手机号码",
    id: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
     where = "";
     name = "";
     phone = "";
    this.setData({
      test: parseInt(options.test),
    })
    if (!this.data.test) {
      this.setData({
        name: options.name,
        where: options.where,
        phone: options.phone,
        id: options.id,
      })
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
  addShouhuodizhi(e) {
    console.log(e);

    if (where == "") {
      wx.showToast({
        icon: "none",
        title: '请填写详细地址',
      })
    } else if (name == "") {
      wx.showToast({
        icon: "none",
        title: '请填写收货人的姓名',
      })

    } else if (phone == "") {
     
      wx.showToast({
        icon: "none",
        title: '请填写收货手机号码',
      })
    } else  if(!checkPhone.test(phone)){
      wx.showToast({
        icon: "none",
        title: '手机号码格式错误，请重新填写',
      })
    }else {
      console.log("添加操作");
      wx.cloud.database().collection("shouhuodizhi")
        .add({
          data: {
            name: name,
            phone: phone,
            where: where,
          }
        })
        .then(res => {
          where = "";
          name = "";
          phone = "";
          console.log("添加成功", res);
          wx.showToast({
            icon: "none",
            title: '保存成功',
          })

          setTimeout(function () {
            wx.navigateBack({
              delta: 1,
            })
          }, 2000);

        })
        .catch(res => {
          console.log("添加失败", res);
        })
    }
  },
  changeShouhuodizhi() {
    if (where == "" && name == "" && phone == "") {
      wx.navigateBack({
        delta: 1,
      })
      return
    }
    if (where == "") {
      where = this.data.where;
      console.log("1");
    }
    if (name == "") {
      name = this.data.name;
    }
    if (phone == "") {
      phone = this.data.phone;
    }
    if(!checkPhone.test(phone)){
      wx.showToast({
        icon: "none",
        title: '手机号码格式错误，请重新填写',
      })
      return;
    }
    wx.cloud.database().collection("shouhuodizhi")
      .doc(this.data.id)
      .update({
        data: {
          name: name,
          phone: phone,
          where: where,
        }
      })
      .then(res => {
        console.log("更改成功", res)
        wx.showToast({
          title: '修改成功',
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1,
          })
        }, 1000)

      })
      .catch(err => {
        console.log("更改失败", err)
      })
  },
  delShouhuodizhi() {
    console.log(this)
    let that = this;
    wx.showModal({
      title: "确定要删除这条地址吗",
      // content: "删除之后就找不回来咯",
      
      success(res) {
        
        console.log(that.data.id);
        if(res.confirm){
          wx.cloud.database().collection("shouhuodizhi")
          .doc(that.data.id)
          .remove()
          .then(res=> {
            
            wx.showToast({
              title: '删除成功',
            });
            console.log("删除成功");
            setTimeout(function(){
              wx.navigateBack({
                delta: 1,
              });
            },1000)
          })
          .catch(err=> {
            console.log("删除失败");
          })
        }
      }
    })
  },
  getName(e) {
    console.log(e.detail.value);
    name = e.detail.value;
  },
  getWhere(e) {
    console.log(e.detail.value);
    where = e.detail.value;
  },
  getPhone(e) {
    console.log(e.detail.value);
    phone = e.detail.value;
  }
})