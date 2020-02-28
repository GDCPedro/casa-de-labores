/*
调用云函数
@params name        云函数名称
@return 999999      未登录
*/
export function service(name, data) {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name,
      data
    })
    .then(res => {
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
      reject(err)
    })
  })
}