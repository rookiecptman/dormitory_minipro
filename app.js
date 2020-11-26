//app.js
import request from 'service/network.js'
App({
  onLaunch: function () {
    // 展示本地存储能力
    var userId = wx.getStorageSync('userId') || ''
    if(userId!=''){
      this.globalData.userId=userId
      wx.redirectTo({
        url: '/pages/dormitory/dormitory',
      })
    }
  },
  // 登录
  login() {
    wx.login({
      success: res => {
        wx.getUserInfo({
          success: getRes => {
            this.globalData.userInfo = getRes.userInfo
            console.log(res.code)
            request({
              data:{
                "code":res.code
              },
              url: 'weixin/login',
            }).then(res => {
              console.log(res)
              wx.setStorageSync('userId', res.data.userId)
              /* this.globalData.userId=res.data.userId */
              wx.redirectTo({
                url: '/pages/dormitory/dormitory',
              })
            }).catch(err => {
              console.log(err)
            })
          }
        })
      }
    })
  },
  globalData: {
    userId:"123456"
  }
})