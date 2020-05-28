<template>
  <v-container>
    <v-card>
      <v-card>
        <v-btn class="ma-2" @click="calc">BMI计算器</v-btn>
      </v-card>
      <v-card>
        <!-- ref用于form校验 -->
        <v-form ref="personHealthForm">
          <v-container>
            <v-row>
              <!-- md及以上尺寸，占用4，其他全部 -->
              <v-col cols="12" md="4">
                <v-text-field v-model="height" label="身高(cm)"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model="weight" label="体重(kg)"></v-text-field>
              </v-col>
              <v-col>
                <scale-bar></scale-bar>
                <!-- <v-progress-linear height="48" value="30%" background-opacity="0.3"></v-progress-linear> -->
                <!-- <span>{{ bmi }}</span> -->
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
import helpService from '@/components/health/health.service.js'
import scaleBar from '@/components/utils/scale-bar.vue'
export default {
  components: {
    scaleBar
  },
  data () {
    return {
      bmi: 'bmi',
      // personHealthForm: {},
      height: 186,
      weight: 110
    }
  },
  created () {
  },
  methods: {
    // 计算BMI
    calc () {
      this.bmi = (this.weight / Math.pow(this.height / 100, 2)).toFixed(2)
    }
  }
}
</script>

<style>
</style>
