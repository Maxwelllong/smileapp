<!--homePage-->
<template>
  <div>
    <!-- 搜索区域 -->
    <van-row class="search-bar" type="flex" justify="center">
      <van-col span="3" class="site" @click="toArea">
        成都
        <i class="iconfont arrowdown">&#xe623;</i>
      </van-col>
      <van-col span="18" @click="toSearch">
        <div class="search searchTo">搜索：王八炒豆芽</div>
      </van-col>
      <van-col span="3"><i class="iconfont">&#xe601;</i></van-col>
    </van-row>
    <!-- 轮播图区域 -->
    <div class="swiperArea">
      <van-swipe :autoplay="3000" indicator-color="orange">
        <van-swipe-item v-for="item in bannerPic" :key="item.index">
          <img v-lazy="item.image" alt="轮播图片" width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 图标区域 -->
    <div class="category">
      <div
        v-for="(items, index) in category"
        :key="index"
        class="categoryStyle"
      >
        <img v-lazy="items.image" alt="菜单" />
        <span>{{ items.mallCategoryName }}</span>
      </div>
    </div>
    <!-- 广告 -->
    <div class="ad">
      <img :src="ad.PICTURE_ADDRESS" alt="广告" />
    </div>
    <!-- slide滑块 -->
    <div class="recommend-area">
      <div class="recommend-title">
        商品推荐
      </div>
      <swiper class="recommend-body" :options="swiperOptions">
        <swiper-slide
          class="recommendGoods"
          v-for="items in recommendGoods"
          :key="items.index"
        >
          <img :src="items.image" alt="商品图片" />
          <div>{{ items.goodsName }}</div>
          <span class="price">
            {{ items.mallPrice | moneyFilter }}
          </span>
          <span class="deletePrice">{{ items.price | moneyFilter }}</span>
        </swiper-slide>
      </swiper>
    </div>
    <!-- 商品展示 -->
    <floorComponent
      :floorData="floor1"
      :floorTitle="floorName.floor1"
    ></floorComponent>
    <floorComponent
      :floorData="floor2"
      :floorTitle="floorName.floor2"
    ></floorComponent>
    <floorComponent
      :floorData="floor3"
      :floorTitle="floorName.floor3"
    ></floorComponent>
    <!-- 热卖商品组件 -->
    <div class="hotArea">
      <div class="hotTitle">热卖商品</div>
      <div class="hotGoods">
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="item in hotGoods" :key="item.index">
              <goodsInfo
                :goodsId="item.goodsId"
                :goodsImage="item.image"
                :goodsName="item.name"
                :goodsPrice="item.price"
              ></goodsInfo>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import floorComponent from '../components/floorComponent.vue'
import goodsInfo from '../components/goodsInfo.vue'
import { toMoney } from '../filter/moneyFilter'
import URL from '../serviceAPI.config.js'
export default {
  components: { floorComponent, goodsInfo },
  data () {
    return {
      bannerPic: [],
      category: [],
      ad: {},
      recommendGoods: [],
      swiperOptions: {
        slidesPerView: 3,
        loop: true
      },
      floorName: '',
      floor1: [],
      floor2: [],
      floor3: [],
      goodsId: '',
      hotGoods: []
    }
  },
  created () {
    axios({
      url: URL.getShoppingMallInfo,
      method: 'get'
    })
      .then(res => {
        console.log(res)
        this.bannerPic = res.data.data.slides
        this.category = res.data.data.category
        this.ad = res.data.data.advertesPicture
        this.recommendGoods = res.data.data.recommend
        this.floor1 = res.data.data.floor1
        this.floor2 = res.data.data.floor2
        this.floor3 = res.data.data.floor3
        this.floorName = res.data.data.floorName
        this.hotGoods = res.data.data.hotGoods
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    toArea () {
      this.$router.push('/selectarea')
    },
    toSearch () {
      this.$router.push('/search')
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
.search-bar {
  color: white;
  height: 2.2rem;
  background-color: #2301e5da;
  line-height: 2.2rem;
  text-align: center;
}
.site {
  color: white;
  font-size: 0.7rem;
}
.search {
  height: 1.6rem;
  width: 100%;
  border-bottom: 1px solid #e9e8eeda;
  color: white;
  font-size: 0.8rem;
  padding-left: 0.3rem;
  // background: #f50909da;
}
.searchBtn {
  height: 2.2rem;
  line-height: 2.2rem;
}
.searchTo {
  color: rgb(151, 153, 155);
}
.swiperArea {
  width: 100%;
  clear: both;
  background: #ccc;
  height: 0;
  padding-bottom: (184/414) * 100%;
}
.category {
  background-color: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
}
.categoryStyle {
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
}
.categoryStyle img {
  width: 45px;
}
.categoryStyle span {
  margin-top: 0.2rem;
}
.ad {
  width: 100%;
}
.ad img {
  width: 100%;
}
.recommend-area {
  background-color: #fff;
  margin-top: 0.3rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d;
}
.recommend-body {
  border-bottom: 1px solid #eee;
}
.recommendGoods {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
  img {
    width: 100%;
  }
}

.deletePrice {
  color: red;
  text-decoration: line-through;
}

// 热卖商品
.hotArea {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
</style>
