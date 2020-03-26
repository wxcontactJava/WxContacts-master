const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: '',
        gender: '',
        phone: '',
        password: '',
        confirmPwd: '',
        communityName: '',
        flowNum: '',
        unitNum: '',
        roomNum: '',
        isError: false,
        errorText: '',
        imgs: [],
        photo: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    /**
     * 用户名
     */
    bindNameInput: function (e) {
        this.setData({
            name: e.detail.value
        });
    },
    /**
     * 性别
     */
    bindGenderInput: function (e) {
        this.setData({
            gender: e.detail.value
        });
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
     * 再次输入密码
     */
    bindConfirmPwdInput: function (e) {
        this.setData({
            confirmPwd: e.detail.value,
        });
    },
    /**
     * 小区名称
     */
    bindCommunityNameInput: function (e) {
        this.setData({
            communityName: e.detail.value
        });
    },
    /**
     * 几号楼
     */
    bindFlowNumInput: function (e) {
        this.setData({
            flowNum: e.detail.value
        });
    },
    /**
     * 几单元
     */
    bindUnitNumInput: function (e) {
        this.setData({
            unitNum: e.detail.value
        });
    },
    /**
     * 房间号
     */
    bindRoomNumInput: function (e) {
        this.setData({
            roomNum: e.detail.value
        });
    },
// 上传图片
    chooseImg: function (e) {
        var that = this;
        var imgs = this.data.imgs;
        console.log(imgs)
        if (imgs.length >= 9) {
            this.setData({
                lenMore: 1
            });
            setTimeout(function () {
                that.setData({
                    lenMore: 0
                });
            }, 2500);
            return false;
        }
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths;
                var imgs = that.data.imgs;
                // 先定义一个photo用来接收图片的base64
                var photo = that.data.photo
                // console.log(tempFilePaths + '----');
                for (var i = 0; i < tempFilePaths.length; i++) {
                    if (imgs.length >= 9) {
                        that.setData({
                            imgs: imgs
                        });
                        return false;
                    } else {
                        imgs.push(tempFilePaths[i]);
                        // 图片转base64传给后台
                        wx.getFileSystemManager().readFile({
                            filePath: res.tempFilePaths[i], // 选择图片返回的相对路径
                            encoding: 'base64', // 编码格式
                            success: res => { // 成功的回调
                            //res.data就是base64编码
                            photo = res.data;
                        //将接收到的pohoto复制给全量的photo
                        that.setData({
                            photo: photo
                        })
                        // console.log(photo)
                        //   console.log('data:image/png;base64,' + res.data)
                    }
                    })
                    }
                }

                // console.log(imgs);
                that.setData({
                    imgs: imgs
                });
            }
        });
    },
    // 删除图片
    deleteImg: function (e) {
        var imgs = this.data.imgs;
        var index = e.currentTarget.dataset.index;
        imgs.splice(index, 1);
        this.setData({
            imgs: imgs
        });
    },
    // 预览图片
    previewImg: function (e) {
        //获取当前图片的下标
        var index = e.currentTarget.dataset.index;
        //所有图片
        var imgs = this.data.imgs;
        wx.previewImage({
            //当前显示图片
            current: imgs[index],
            //所有图片
            urls: imgs
        })
    },


    /**
     * 点击注册按钮
     */
    register: function (e) {
        if (this.data.phone === '' || this.data.password === '') {
            this.setData({
                isError: true,
                errorText: "手机号码或密码不能为空"
            });
            return;
        }
        if (this.data.password !== this.data.confirmPwd) {
            this.setData({
                isError: true,
                errorText: "两次密码不一致"
            });
            return;
        }

        var contactUser = {
            name: this.data.name,
            gender: this.data.gender,
            phone: this.data.phone,
            password: this.data.password,
            communityName: this.data.communityName,
            flowNum: this.data.flowNum,
            unitNum: this.data.unitNum,
            roomNum: this.data.roomNum,
            photo: this.data.photo
        }
        //传递List
        /* var contactUser = [{
             name: this.data.name,
             gender: this.data.gender,
             phone: this.data.phone,
             password: this.data.password,
             communityName: this.data.communityName,
             flowNum: this.data.flowNum,
             unitNum: this.data.unitNum,
             roomNum: this.data.roomNum
         },{
             name: this.data.name,
             gender: this.data.gender,
             phone: this.data.phone,
             password: this.data.password,
             communityName: this.data.communityName,
             flowNum: this.data.flowNum,
             unitNum: this.data.unitNum,
             roomNum: this.data.roomNum
         }]*/


        // this.setData({
        // 	isError: true,
        // 	errorText: "请输入正确的手机号或密码"
        // });
        let that = this;
        wx.request({
            // url: `${app.globalData.apiUrl}/login`,
            url: `${app.globalData.apiUrl1}/login/register`,
            data: contactUser ,
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
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
                } else if (res.data.code == 111){
                    that.setData({
                        isError: true,
                        errorText: "该手机号已存在"
                    });
                }
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
                console.log("test11")
            }
        })
        // console.log(this.data.userName, this.data.password);
    }
})