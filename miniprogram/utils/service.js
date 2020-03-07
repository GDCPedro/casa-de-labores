/*
调用云函数
@params name        云函数名称
@return 999999      未登录
*/
export function service(name, data) {
  if (data && data.isLoading !== false) {
    wx.showLoading()
  }
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name,
      data
    })
    .then(res => {
      wx.hideLoading()
      if (res.result.code === 999999) {
        // 未登录
        wx.navigateTo({
          url: '/pages/login/login',
        })
      } else {
        resolve(res.result)
      }
    })
    .catch(err => {
      wx.hideLoading()
      reject(err)
    })
  })
}