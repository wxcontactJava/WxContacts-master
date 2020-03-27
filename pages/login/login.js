const app = getApp();
//const mcaptcha = require('../../utils/captcha.js');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		phone: '',
		password: '',
    code: "",
		isError: false,
		errorText: ''
	},
  //验证码
  createCode() {
    var code;
    //首先默认code为空字符串
    code = '';
    //设置长度，这里看需求，我这里设置了4
    var codeLength = 4;
    //设置随机字符
    var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'c', 'e', 'f', 'g',
      'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
    //循环codeLength 我设置的4就是循环4次
    for (var i = 0; i < codeLength; i++) {
      //设置随机数范围,这设置为0 ~ 10
      var index = Math.floor(Math.random() * random.length);
      //字符串拼接 将每次随机的字符 进行拼接
      code += random[index];
    }
    //将拼接好的字符串赋值给展示的code
    this.setData({
      code: code
    })
  },
  /**
    * 生命周期函数--监听页面初次渲染完成
    */
  onReady: function () {
    this.createCode();
  },
  getcode: function () {
    this.createCode();
  },

  confirmBtn: function () {
    if (this.data.makecode != this.data.code) {
      wx.showToast({
        title: '验证码不正确',
        icon: 'none',
        duration: 2000
      })
    } else {
      console.log("登陆成功")
    }

  },
  //获取输入验证码
  makecodeInput: function (e) {
    this.setData({
      makecode: e.detail.value
    })
  },
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

	/**
	 * 输入手机号（用户名）
	 */
	bindPhoneInput: function (e) {
		this.setData({
			phone: e.detail.value
		});
	},

	/**
	 * 输入密码
	 */
	bindPasswordInput: function (e) {
		this.setData({
			password: e.detail.value
		});
	},

	/**
	 * 点击登录按钮
	 */
	login: function (e) {
		if (this.data.phone === '' || this.data.password === '') {
			this.setData({
				isError: true,
				errorText: "手机号码或密码不能为空"
			});
			return;
		}
    if (this.data.makecode === '') {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 2000
      })
    } 
    if (this.data.makecode != this.data.code) {
      wx.showToast({
        title: '验证码不正确',
        icon: 'none',
        duration: 2000
      })
    }
		// this.setData({
		// 	isError: true,
		// 	errorText: "请输入正确的手机号或密码"
		// });
		let that = this;
		console.log(222222222)
		wx.request({
			// url: `${app.globalData.apiUrl}/login`,
            url: `${app.globalData.apiUrl1}/login/login`,
            // url: `${app.globalData.apiUrl1}/login/login?phone=`+this.data.phone+'&password='+this.data.password,
            data: {
				phone: this.data.phone,
				password: this.data.password
			},
			method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
			// header: {}, // 设置请求的 header
			success: function (res) {
				// success
                // if (res.data.success) {
                if (res.data.code == 200) {
				// 	wx.setStorageSync('USERID', res.data.userID);
                    wx.setStorageSync('USERID', res.data.data.id);

					wx.switchTab({
						url: "/pages/department/department"
					});
				} else {
					that.setData({
						isError: true,
						errorText: "请输入正确的手机号或密码"
					});
				}
			},
			fail: function () {
				// fail
			},
			complete: function () {
				// complete
			}
		})
		// console.log(this.data.userName, this.data.password);
	},
    /**
     * 点击注册按钮
     */
    register: function (e) {

        wx.switchTab({
            url: "/pages/register/register"
        })

        // console.log(this.data.userName, this.data.password);
    }
})　