<!--hotGoodsinfo-->
<template>
  <div @click="goGoodsDetail()">
    <div class="goods-image">
      <img v-lazy="goodsImage" width="90%" />
    </div>
    <div class="goods-name">{{ goodsName }}</div>
    <div class="goods-price">￥{{ goodsPrice | moneyFilter }}</div>
  </div>
</template>
<script>
import { toMoney } from '../filter/moneyFilter.js'
export default {
  props: ['goodsId', 'goodsImage', 'goodsName', 'goodsPrice'],
  data () {
    return {}
  },
  methods: {
    goGoodsDetail () {
      // console.log('hello vue');
      console.log(this.goodsId)
      this.$router.push({
        name: 'goodsDetail',
        query: { goodsId: this.goodsId }
      })
    }
  },
  filters: {
    moneyFilter (money) {
      return toMoney(money)
    }
  }
}
</script>
<style lang="less" scoped>
.goods-name {
  padding: 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
