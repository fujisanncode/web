// 引用增加拦截器的axios实例
import instance from '@/common/api.js'
export default {
  submit (postPara) {
    return instance({
      url: `/vue/article-manage/insert-article`,
      method: 'post',
      data: postPara
    })
  },
  queryAll (otherPara) {
    return instance({
      url: `/vue/article-manage/query-articles/${otherPara.curPage}/${otherPara.pageSize}`,
      method: 'get'
    })
  },
  update (postPara) {
    return instance({
      url: `/vue/article-manage/update-article`,
      method: 'post',
      data: postPara
    })
  },
  delete (otherPara) {
    return instance({
      url: `/vue/article-manage/delete-article/${otherPara.id}`,
      method: 'get'
    })
  }
}
