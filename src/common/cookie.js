// 将服务器cookie设置到本地
export function setCookie(key, value){
  let expireTime = new Date()
  expireTime.setTime(expireTime.getTime() + 24*60*60*1000)
  document.cookie = `${key}=${value}; path=/; expires=${expireTime.toGMTString()}`
}

// 获取指定名称的cookie值
export function getCookie(key){
  let cookie_content = undefined
  let cookie = document.cookie
  if(cookie.length > 0) {
    let cookieArr = cookie.split('; ')
    cookieArr.forEach(e => {
      let eArr = e.split('=')
      if (eArr[0] == key) {
        cookie_content = eArr[1]
        return cookie_content
      }
    })
  }
  return cookie_content

}