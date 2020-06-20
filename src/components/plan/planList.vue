<template>
  <v-row align="center">
    <v-card class="mx-auto" max-width="400" tile>
      <v-list :disabled="disabled" :dense="dense" :two-line="twoLine" :three-line="threeLine" :shaped="shaped" :flat="flat" :subheader="subheader" :sub-group="subGroup" :nav="nav" :avatar="avatar" :rounded="rounded">
        <v-subheader>
          计划清单
          <v-btn text @click="planList()">
            刷新列表
          </v-btn>
          <v-btn text @click="forwardToNewPlan()">
            新增计划
          </v-btn>
        </v-subheader>
        <v-list-item-group v-model="itemCount" color="primary">
          <v-list-item v-for="(item, i) in items" :key="i" :inactive="inactive">
            <v-list-item-action>
              <v-btn icon @click="deleteItem(item)">
                <v-icon color="grey lighten-1">delete</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-html="item.title"></v-list-item-title>
              <v-list-item-subtitle v-if="twoLine || threeLine" v-html="item.completionRate"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-row>
</template>

<script>
import planService from '@/components/plan/plan.service.js'
export default {
  data () {
    return {
      // 列表条数
      itemCount: 0,
      // 列表内容
      items: [{
        avatar: '',
        title: '',
        completionRate: ''
      }],
      // 列表属性
      disabled: false,
      dense: false,
      twoLine: true,
      threeLine: false,
      shaped: false,
      flat: false,
      subheader: false,
      inactive: false,
      subGroup: false,
      nav: false,
      avatar: false,
      rounded: false
    }
  },
  created () {
    this.planList()
  },
  methods: {
    // 查询计划列表
    planList () {
      planService.planList().then((res) => {
        let arr = res.data
        this.itemCount = arr.length
        this.items = arr
      })
    },
    // 跳转到新建页面
    forwardToNewPlan () {
      this.$router.push({
        name: 'index-plan-new'
      })
    },
    // 根据主键id，删除计划
    deleteItem (item) {
      planService.deleteById(item.id).then(res => {
        console.log('删除成功')
        this.planList() // 删除成功后重新查询
      })
    }
  }
}
</script>

<style>
</style>
