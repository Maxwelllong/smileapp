<!--地址选择标签-->
<template>
  <div>
    <van-area cancel-button-text="返回" title="所在地" :area-list="areaList" />
  </div>
</template>
<script>
import { areaList } from '@vant/area-data'
export default {
  data () {
    return {
      areaList
    }
  },
  methods: {
    confirm () {
      this.$router.push('/')
    }
  }
}
</script>
<style lang="less" scoped></style>
