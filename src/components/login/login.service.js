import instance from '@/common/api.js'
import c from '@/common/const.js'
export default {
  login (postPara) {
    return instance({
      url: c.url.login,
      method: 'post',
      data: {
        name: postPara.name,
        password: postPara.password 
      }
    })
  }
}
