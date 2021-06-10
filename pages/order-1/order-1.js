// pages/order-1/order-1.js
var school = "";
var id = "";
var kuaidi = "";
var num = "";
var toWhere = "";
var beizhu = "";
var where = "";
var name = "";
var phone = "";
var volume = "";
var test = 0;
var helpId = "";
var help_id = "";
const app = getApp();
var newMoney = "";
var doing = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actionSheetHidden: true,
    id: "",
    _id: "",
    kuadi: "",
    num: "",
    beizhu: "",
    toWhere: "",
    where: "",
    name: "",
    phone: "",
    helpPhone: "",
    volume: "",
    money: "",
    finish: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      _id: options._id
    })
    console.log(options)

    // kuaidi = "";
    // num = "";
    // toWhere = "";
    // beizhu = "";
    // where = "";
    // name = "";
    // phone = "";

    id = options.id;
    school = options.school;
    console.log(school)
    wx.cloud.database().collection(school)
      .doc(id)
      .get()
      .then(res => {
        if (res.data.state == 1) {
          help_id = res.data.help_id
        }

        console.log(test)
        where = res.data.where;
        name = res.data.name;
        phone = res.data.phone;
        kuaidi = res.data.kuaidi;
        num = res.data.num;
        toWhere = res.data.toWhere;
        beizhu = res.data.beizhu;
        volume = res.data.volume;
        helpId = res.data.helpId;
        console.log(where);
        console.log("成功1", res);
        console.log(volume)
        if (res.data.finish) {
          this.setData({
            finish: true
          })
        }


        this.setData({
          kuaidi: res.data.kuaidi,
          where: res.data.where,
          name: res.data.name,
          phone: res.data.phone,
          num: res.data.num,
          toWhere: res.data.toWhere,
          beizhu: res.data.beizhu,
          volume: res.data.volume,
        })
        if (this.data._id == 2 || this.data._id == 3) {

          wx.cloud.database().collection("Helpers")
            .where({
              _openid: res.data.helpId,
            })
            .get()
            .then(res => {
              console.log("获取小哥电话成功", res)
              this.setData({
                helpPhone: res.data[0].phone
              })
            })
            .catch(err => {
              console.log("获取小哥电话失败", err)
            })

        }
        if (this.data.volume == "小件") {
          this.setData({
            id: 1
          })
        } else if (this.data.volume == "中件") {
          this.setData({
            id: 2
          })
        } else {
          this.setData({
            id: 3
          })
        }
      })
      .catch(err => {
        console.log("失败", err)
      })
    console.log(test)
    test = 1;
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
  changeOrder() {
    //判断用户是否修改了订单
    if (this.data.kuaidi == "") {
      this.data.kuaidi = kuaidi;
    };
    if (this.data.num == "") {
      this.data.num = num;
    };
    if (this.data.toWhere == "") {
      this.data.toWhere = toWhere;
    };
    if (this.data.beizhu == "") {
      this.data.beizhu = beizhu;
    };
    if (where == this.data.where && name == this.data.name && phone == this.data.phone) {

      if (kuaidi == this.data.kuaidi && num == this.data.num && toWhere == this.data.toWhere && beizhu == this.data.beizhu && volume == this.data.volume) {
        wx.navigateBack({
          delta: 1,
        })
        return;
      }
    }
    //判断用户支付金钱
    switch (this.data.id) {
      case "1":
        this.setData({
          money: '3元'
        })
        break;

      case "2":
        this.setData({
          money: '4元'
        })
        break;

      case "3":
        this.setData({
          money: '5元'
        })
        break;

    }
    let that = this;
    console.log("1")
    wx.showModal({

      title: "确定要更改订单信息吗？",

      success(res) {
        if (res.confirm) {
          console.log(volume)
          console.log(that.data.volume)
          if (volume != that.data.volume) {
            that.setData({
              actionSheetHidden: !that.data.actionSheetHidden
            })
          } else {
            wx.cloud.database().collection(school)
              .doc(id)
              .update({
                data: {
                  where: that.data.where,
                  name: that.data.name,
                  phone: that.data.phone,
                  kuaidi: that.data.kuaidi,
                  num: that.data.num,
                  toWhere: that.data.toWhere,
                  beizhu: that.data.beizhu,
                }
              })
              .then(res => {
                console.log("更改成功")
                wx.showToast({
                  title: '更改成功',
                })
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1,
                  })
                }, 1000)
              })
              .catch(err => {
                console.log("失败");
              })
          }
        }

      }
    })




  },

  delOrder() {
    wx.showModal({
      title: "确定要取消这个订单吗?",
      content: "支付金额会根据付款方式退回",

      success(res) {
        if (res.confirm) {
          //用户点击确定之后的删除操作
          wx.cloud.database().collection(school)
            .doc(id)
            .remove()
            .then(res => {
              console.log("删除成功");
              wx.showToast({
                title: '订单已取消',
              });
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1,
                })
              }, 2000)
            })
            .catch(err => {
              console.log("删除失败");
            })
        }
      }
    })

  },

  getKuaidi(e) {

    this.data.kuaidi = e.detail.value;
    console.log(this.data.kuaidi);
  },

  getNum(e) {
    console.log(e.detail.value);
    this.data.num = e.detail.value;
  },

  getToWhere(e) {
    console.log(e.detail.value);
    this.data.toWhere = e.detail.value;
  },
  getBeizhu(e) {
    console.log(e.detail.value);
    this.data.beizhu = e.detail.value;
  },
  choose(e) {
    console.log(e)
    switch (e.currentTarget.dataset.id) {
      case "1":
        this.setData({
          volume: "小件",
        })
        break;
      case "2":
        this.setData({
          volume: "中件",
        })
        break;
      case "3":
        this.setData({
          volume: "大件",
        })
        break;
    }
    this.setData({
      id: e.currentTarget.dataset.id
    })
  },
  pay() {
    wx.cloud.database().collection(school)
      .doc(id)
      .update({
        data: {
          where: this.data.where,
          name: this.data.name,
          phone: this.data.phone,
          kuaidi: this.data.kuaidi,
          num: this.data.num,
          toWhere: this.data.toWhere,
          beizhu: this.data.beizhu,
          volume: this.data.volume,
        }
      })
      .then(res => {
        console.log("更改成功")

        wx.showToast({
          title: '更改成功',
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1,
          })
        }, 1000)
      })
      .catch(err => {
        console.log("失败");
      })
  },
  canceledOrder() {
    if (doing) {
      wx.showModal({
        content: "取消订单会扣除保证金哟",
        title: "确定要取消订单吗？",
        success(res) {
          if (res.confirm) {
            wx.cloud.callFunction({
                name: "upDate",
                data: {
                  id: id,
                  school: school,
                  state: 0,
                  helpId: "",
                  help_id: "",
                }
              })
              .then(res => {
                console.log("取消成功", res);
                doing = false;
                wx.showToast({
                  title: '取消成功',
                });
                setTimeout(() => {
                  wx.navigateBack({
                    delta: 1,
                  });
                  doing = true;
                }, 1500);
              })
              .catch(err => {
                console.log("取消失败", err)
              })
          }

        }
      })
    } else {
      return
    }

  },
  orderFinish() {
    if (doing) {
      wx.showModal({
        title: "是否已经送到了指定地点?",
        content: '请勿提前完成订单',
        confirmText: "我送到了",
        cancelText: "还要等等",
        success(res) {
          if (res.confirm) {
            wx.cloud.callFunction({
                name: "finish",
                data: {
                  id: id,
                  school: school,
                  finish: true
                }
              })
              .then(res => {
                console.log("完成订单成功", res)
                doing = false;
                wx.showToast({
                  title: '订单已完成',
                })
                setTimeout(() => {
                  wx.navigateBack({
                    delta: 1,
                  })
                  doing = true;
                }, 1500)
              })
              .catch(err => {
                console.log("订单完成失败", err)
              })
          }
        }
      })
    } else {
      return
    }

  },
  confirm() {
    // wx.showModal({
    //   title:"确定收货",
    //   content: '确定收到货物了吗?',
    //   success(res){
    //     if(res.confirm){
    //       wx.cloud.database().collection(school)
    //       .doc(id)
    //       .update({
    //         data:{
    //           state:2
    //         }
    //       })
    //       .then(res=> {
    //         console.log("收货成功",res)
    //         wx.showToast({
    //           title: '收货成功',
    //         })
    //         setTimeout(() => {
    //           wx.navigateBack({
    //             delta: 1,
    //           })
    //         }, 1500);
    //       })
    //       .catch(err=> {
    //         console.log("收货失败",err)
    //       })

    //     }
    //   }
    // })
    var that = this;
    wx.showModal({
      title: "确定收货",
      content: '确定收到货物了吗?',
      success(res) {


        if (res.confirm) {
          console.log(helpId)
          wx.cloud.callFunction({
              name: "getMoney",
              data: {
                helpId: helpId
              }
            })
            .then(res => {
              console.log("成功111", res)
              switch (volume) {
                case "小件":
                  newMoney = res.result.data[0].money + 3;
                  break;
                case "中件":
                  newMoney = res.result.data[0].money + 4;
                  break;
                case "大件":
                  newMoney = res.result.data[0].money + 5;
                  break;
              }

              wx.cloud.callFunction({
                  name: "upDateHelpersMoney",
                  data: {
                    help_id: help_id,
                    newMoney: newMoney
                  }
                })
                .then(res => {
                  console.log("更新钱成功", res)
                })
                .catch(err => {
                  console.log("更新钱失败", err)
                })
            })
            .catch(err => {
              console.log(err)
            })
          console.log(help_id)
          console.log(that.data.newMoney)

          wx.cloud.database().collection(school)
            .doc(id)
            .update({
              data: {
                state: 2
              }
            })
            .then(res => {
              console.log("收货成功", res)
              wx.showToast({
                title: '收货成功',
              })
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1,
                })
              }, 1500);
            })
            .catch(err => {
              console.log("收货失败", err)
            })

        }
      }
    })
  },
  listenerActionSheet() {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  }
})