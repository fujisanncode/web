// 引用增加了拦截器的axios实例
import instance from '@/common/api.js'
import c from '@/common/const.js'
export default {
  index () {
    return instance({
      url: c.url.index,
      method: 'get'
    })
  }
}
