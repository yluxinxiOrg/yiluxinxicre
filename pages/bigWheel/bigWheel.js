var timer;
var n = 1; //旋转圈数
var whichdegs = "";//中奖项
Page({
  data: {
    animationData: {},//动画
    isclick: "start",//按钮事件  默认开始事件
    hiddenModal: true,//弹框是否隐藏
    detail: "恭喜您获得",//弹框内容
    topval:0,
    pic:'',
    isVir:'',
    score:"",
  
    winnerdata:[{
      tel:17323442363,
      txt:"88积分抵用券",
      time:'05/29'
    }, {
      tel: 15056921363,
      txt: "18积分抵用券",
      time: '05/29'
      }, {
        tel: 17723446545,
        txt: "88积分抵用券",
        time: '05/29'
    }, {
      tel: 18023445432,
      txt: "18积分抵用券",
      time: '05/29'
      }, {
        tel: 13623445654,
        txt: "188积分抵用券",
        time: '05/29'
    }, {
      tel: 17323445467,
      txt: "88积分抵用券",
      time: '05/29'
      }, {
        tel: 15323446578,
        txt: "18积分抵用券",
        time: '05/29'
    }, {
      tel: 18223446754,
      txt: "88积分抵用券",
      time: '05/29'
      }, {
        tel: 17723445699,
        txt: "188积分抵用券",
        time: '05/29'
    }, {
      tel: 15623445265,
      txt: "88积分抵用券",
      time: '05/29'
      }, {
        tel: 15023448542,
        txt: "454545787878/7/",
        time: '05/29'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.scroll();
    this.querypic();
     var s = wx.getStorageSync("score");
     this.setData({
       score: s
     })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  start: function (e) {
    var _this = this;
    wx.request({
      url: 'http://192.168.1.156:10000/prize/openprize',
      method: 'Get',
      data: {
        attribution: '陕西'
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (data) {
        whichdegs = data.data.angle;
        _this.data.detail += data.data.prizeName;
        _this.data.isVir = data.data.isVir;
        _this.setData({
          isVir: _this.data.isVir,
        })
        console.log(_this.data.isVir);
      },
      fail: function (error) {
        var timestamp = (new Date()).valueOf();
        console.log(timestamp);
        wx.showModal({
          title: '抱歉',
          content: '网络异常，请重试',
          showCancel: false
        })
      }
    })
    n = 1;
    //开始事件以后置为停止事件（改为自动停止）
    this.setData({
      isclick: "",
    })
    //重置动画
  //  _this.reset.call(_this);

    timer = setInterval(function () {
      //开始旋转
      star.call(_this);
      //
      n++;
    } , 300);
    //启动动画
    function star() {
      //开始旋转动画
      var animation = wx.createAnimation({
        transformOrigin: "50% 50%",
        duration: 300,
        timingFunction: "linear"//匀速
      });
      animation.rotate(360*n).step();
      this.setData({
        animationData: animation.export()
      })
    }
    //多久以后自动停止
    setTimeout(_this.stop,3000);
  },
  stop: function (e) {
    var _this = this;
    clearInterval(timer);
    timer = null;
    //结束动画
    //动画越来越慢直到停止
    sto.call(_this);
    function sto() {
      var animation = wx.createAnimation({
        transformOrigin: "50% 50%",
        duration: 4 * 300 + whichdegs * 1.4,
        timingFunction: "ease-out"  //低速结束
      });
      animation.rotate(n * 360 + whichdegs).step();//d转到哪个盘
      this.setData({
        animationData: animation.export()
      })
    }
    //显示弹出框
    timer = setTimeout(function () {
      _this.setData({
        hiddenModal: false,
        detail: _this.data.detail,
      })
    }, 4 * 300 + whichdegs * 1.4);
  },
  listenerConfirm: function (e) {
    var _this = this;
    this.setData({
      hiddenModal: true,
      isclick: "start",
      detail: "恭喜您获得",
      isclick: "start"
    })
    _this.reset();
  },
  //重置动画
  reset: function () {
    //重置动画 度数重置为0
    var animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 0,
      timingFunction: "linear"
    });
    animation.rotate(0).step();
    this.setData({
      animationData: animation.export()
    })
  },
  scroll:function(){
    var that=this;
    setInterval(function(){
      if (that.data.topval ==-384){
        that.data.topval=0;
      }else{
        that.data.topval-=1;
      }
      that.setData({
        topval: that.data.topval
      })
    },30)
  },
  //获取转盘图片
  querypic:function(){
    var that = this;
    wx.request({
      url: 'http://192.168.1.156:10000/prize/getpic',
      method: 'Get',
      data: {
        attribution: '陕西'
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (data) {
        that.data.pic = data.data;
        that.setData({
          pic:that.data.pic,
        })
      },
      fail: function (error) {
        wx.showModal({
          title: '抱歉',
          content: '网络异常，请重试',
          showCancel: false
        })
      }
    })
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
  
  }
})