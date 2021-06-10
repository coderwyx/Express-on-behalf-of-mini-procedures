// pages/info/info.js
var checkPhone = /^1[3-9][0-9]{9}$/;
const db = wx.cloud.database();
const users = db.collection("Users");
var name = "",
  phone = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    birthday: "",
    gender: "",
    genderArray: ["男", "女"],
    name: "请填写名字",
    phone: "请填写手机号码",
    id: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    users.get()
      .then(res => {
        console.log("获取成功", res)
        this.setData({
          name: res.data[0].name,
          phone: res.data[0].phone,
          id: res.data[0]._id,
          gender: res.data[0].gender,
          birthday: res.data[0].birthday,
        })
      })
      .catch(err => {
        console.log("获取失败", err)
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
  bindBirthdayChange(e) {
    this.setData({
      birthday: e.detail.value,
    })
  },

  bindGenderChange(e) {
    this.setData({
      gender: this.data.genderArray[e.detail.value],
    })
  },
  getName(e) {
    // this.setData({
    //   name: e.detail.value,
    // })
    name = e.detail.value;
  },
  getPhone(e) {
    // this.setData({
    //   Phone: e.detail.value,
    // })
    phone = e.detail.value;
  },
  changeInfo() {
    console.log(this.data.birthday);
    console.log(this.data.phone);
    console.log(this.data.gender);
    console.log(this.data.name);
    if (name == "" && phone == "" && this.data.gender == "" && this.data.birthday == "") {
      wx.navigateBack({
        delta: 1,
      })
    }
    if (name != "") {
      users.doc(this.data.id)
        .update({
          data: {
            name: name,
          }
        })
    }
    if (phone != "" && !checkPhone.test(phone)) {
      wx.showToast({
        icon: "none",
        title: '手机号格式有误',
      })
      return
    }
    if (phone != "") {

      users.doc(this.data.id)
        .update({
          data: {
            phone: phone,
          }
        })
    }
    if (this.data.gender != "") {
      users.doc(this.data.id)
        .update({
          data: {
            gender: this.data.gender,
          }
        })
    }
    if (this.data.birthday != "") {
      users.doc(this.data.id)
        .update({
          data: {
            birthday: this.data.birthday,
          }
        })
    }
    wx.showToast({
      title: '保存成功',
    })
    setTimeout(function () {
      wx.navigateBack({
        delta: 1,
      })
    }, 1500)

  }
})