<!--goodsPage-->
<template>
  <div>
    <div class="navbar">
      <van-nav-bar
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      ></van-nav-bar>
      <div class="bigPic">
        <img :src="goodsInfo.IMAGE1" width="100%" />
      </div>
      <div class="goods-name">{{ goodsInfo.NAME }}</div>
      <div class="goods-price">价格：{{ goodsInfo.PRESENT_PRICE }}</div>
      <div>
        <van-tabs>
          <van-tab title="商品详情">
            <div class="detail" v-html="goodsInfo.DETAIL"></div>
          </van-tab>
          <van-tab title="评价">
            正在制作中
          </van-tab>
        </van-tabs>
        <div class="shopCart">
          <van-icon name="star-o" background="read" />
          <div class="toShop">
            <van-button type="primary" @click="addGoodsToCart"
              >加入购物车</van-button
            >
            <van-button type="danger">购 买</van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import url from '../serviceAPI.config.js'
import { Toast } from 'vant'
export default {
  data () {
    return {
      goodsId: '',
      goodsInfo: {},
      swiperOptions: {
        slidesPerView: 1,
        loop: true
      }
    }
  },
  created () {
    this.goodsId = this.$route.query.goodsId
    this.getGoodsInfo()
  },
  methods: {
    getGoodsInfo () {
      axios({
        url: url.goodsinfo,
        method: 'post',
        data: {
          goodsId: this.goodsId
        }
      })
        .then(res => {
          //   console.log(res)
          this.goodsInfo = res.data.message
          // data数据
          console.log('data数据')
          console.log(this.goodsInfo)
        })
        .catch(error => {
          console.log(error)
        })
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    addGoodsToCart () {
      // 取出购物车内的商品数据
      const cartInfo = localStorage.cartInfo
        ? JSON.parse(localStorage.cartInfo)
        : []
      // 判断购物车内是否已经有这个商品
      // 如果没有返回undeifnd，如果有返回第一个查找到的数据
      const isHaveGoods = cartInfo.find(cart => cart.goodsId === this.goodsId)
      console.log('isHaveGoods的数据')
      console.log(isHaveGoods)
      if (!isHaveGoods) {
        // 没有商品直接添加到数组中
        // 重新组成添加到购物车的信息
        const newGoodsInfo = {
          goodsId: this.goodsInfo.ID,
          Name: this.goodsInfo.NAME,
          price: this.goodsInfo.PRESENT_PRICE,
          image: this.goodsInfo.IMAGE1,
          count: 1
        }
        cartInfo.push(newGoodsInfo) // 添加到购物车
        localStorage.cartInfo = JSON.stringify(cartInfo) // 操作本地数据
        Toast.success('添加成功')
      } else {
        Toast.success('已有此商品')
      }
      this.$router.push({ name: 'Cart' }) // 进行跳转
    }
  }
}
</script>
<style lang="less" scoped>
.bigPic {
  width: 20rem;
}
.bigPic image {
  width: 100%;
}
.detail {
  font-size: 0px;
}
.goods-name {
  background-color: #fff;
}
.goods-price {
  background-color: #fff;
}
.shopCart {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 20rem;
  background: #fff;
}
.shopCart button {
  width: 6rem;
}
.toShop {
  right: 0;
}
</style>
