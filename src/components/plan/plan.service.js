import instance from '@/common/api.js'
import url from '@/common/const.js'
export default {
  newPlan(postPara) {
    return instance({
      url: url.newPlan,
      method: 'post',
      data: postPara
    })
  },
  planList() {
    return instance({
      url: url.findAllPlan,
      method: 'get'
    })
  },
  deleteById(planId){
    return instance({
      url: `${url.deletePlanById}/${planId}`,
      method: 'delete'
    })
  }
}