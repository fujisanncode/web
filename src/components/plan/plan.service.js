import instance from '@/common/api.js'
import c from '@/common/const.js'
export default {
  newPlan(postPara) {
    return instance({
      url: c.url.newPlan,
      method: 'post',
      data: postPara
    })
  },
  planList() {
    return instance({
      url: c.url.findAllPlan,
      method: 'get'
    })
  },
  deleteById(planId){
    return instance({
      url: `${c.url.deletePlanById}/${planId}`,
      method: 'delete'
    })
  }
}