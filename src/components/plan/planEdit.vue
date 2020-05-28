<template>
  <v-card class="mx-auto" style="max-width: 500px;">
    <v-toolbar color="deep-purple accent-4" cards dark flat>
      <v-btn icon @click="forwardToPlanList()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-card-title class="title font-weight-regular">Sign up</v-card-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    <v-form ref="refPlanForm" v-model="form" class="pa-4 pt-6">
      <v-text-field v-model="newPlan.title" :rules="[rules.title, rules.length(1)]" filled color="deep-purple" counter="300" label="计划标题" style="min-height: 96px"></v-text-field>
      <v-text-field v-model="newPlan.completionRate" :rules="[rules.completionRate]" filled color="deep-purple" label="计划完成比例"></v-text-field>
      <v-menu ref="refStartMenu" v-model="startMenu" :close-on-content-click="false" :nudge-right="40" :return-value.sync="newPlan.startTime" transition="scale-transition" min-width="290px" offset-y>
        <template v-slot:activator="{ on }">
          <v-text-field v-model="newPlan.startTime" filled color="deep-purple" label="计划开始时间" readonly v-on="on"></v-text-field>
        </template>
        <!-- 日历选择，然后同时绑定到输入框中 -->
        <v-date-picker v-model="newPlan.startTime" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="startMenu = false">
            Cancel
          </v-btn>
          <v-btn text color="primary" @click="$refs.refStartMenu.save(newPlan.startTime)">
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
      <v-menu ref="refEndMenu" v-model="endMenu" :close-on-content-click="false" :nudge-right="40" :return-value.sync="newPlan.endTime" transition="scale-transition" min-width="290px" offset-y>
        <template v-slot:activator="{ on }">
          <v-text-field v-model="newPlan.endTime" filled color="deep-purple" label="计划结束时间" readonly v-on="on"></v-text-field>
        </template>
        <v-date-picker v-model="newPlan.endTime" no-title scrollable>
          <v-spacer></v-spacer>
          <!-- 使用endMenu字段 -->
          <v-btn text color="primary" @click="endMenu = false">
            Cancel
          </v-btn>
          <!-- 使用组件endMenu中的save方法 -->
          <v-btn text color="primary" @click="$refs.refEndMenu.save(newPlan.endTime)">
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
      <v-textarea v-model="newPlan.content" auto-grow filled color="deep-purple" label="计划内容" rows="3"></v-textarea>
    </v-form>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn text @click="$refs.refPlanForm.reset()">
        Clear
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn :disabled="!form" class="white--text" color="deep-purple accent-4" depressed @click="savePlan()">保存计划</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import planService from '@/components/plan/plan.service.js'
export default {
  data () {
    return {
      // 表单中校验结果保存到表单的v-modle中
      rules: {
        completionRate: v => true,
        // 字段校验
        title: v => true,
        // 长度校验函数，len是指定的校验长度，v是字段内容
        length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`
      },
      // form中字段绑定
      newPlan: {
        startTime: '',
        endTime: '',
        title: '',
        content: '',
        completionRate: 0
      },
      // 关闭日期选择插件
      startMenu: false,
      endMenu: false,
      // form中rule校验通过，form为true，否则未false 
      form: false
    }
  },
  created () {
  },
  methods: {
    // 登录
    savePlan () {
      planService.newPlan(this.newPlan).then((res) => {
        console.log('insert sucess')
      })
    },
    forwardToPlanList () {
      this.$router.push({
        name: 'index-plan-list'
      })
    }
  }
}
</script>

<style>
</style>
