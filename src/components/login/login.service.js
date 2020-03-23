import instance from '@/common/api.js'
import url from '@/common/const.js'
export default {
  login (postPara) {
    return instance({
      url: url.login,
      method: 'post',
      data: {
        name: postPara.name,
        password: postPara.password 
      }
    })
  }
}
