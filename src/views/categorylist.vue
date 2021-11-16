<!--商品分类列表-->
<template>
  <div>
    <!-- 头部信息 -->
    <van-nav-bar
      title="商品列表"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 内容区域 -->
    <div class="content">
      <van-row>
        <!-- 左侧标题栏 -->
        <van-col span="6" id="leftNav">
          <ul v-for="(item, index) in categoryList" :key="index">
            <li
              @click="clickCategory(index, item.ID)"
              :class="{ categoryActive: categoryIndex === index }"
            >
              {{ item.MALL_CATEGORY_NAME }}
            </li>
          </ul>
        </van-col>
        <!-- 右侧 -->
        <van-col span="18">
          <!-- 右侧标题栏 -->
          <div class="tabCategorySub">
            <van-tabs v-model="active" @click="onClickCategorySub">
              <van-tab
                v-for="(item, index) in categorySubList"
                :key="index"
                :title="item.MALL_SUB_NAME"
              ></van-tab>
            </van-tabs>
          </div>
          <!-- 内容区域 -->
          <div id="list-div">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
              >
                <div
                  class="list-item"
                  v-for="(item, index) in list"
                  :key="index"
                >
                  <div class="list-item-img">
                    <img :src="item.IMAGE1" width="100%" :onerror="errorImg" />
                  </div>
                  <div class="list-item-text">
                    <div>{{ item.NAME }}</div>
                    <div class="">￥{{ item.ORI_PRICE }}</div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant'
import axios from 'axios'
import url from '../serviceAPI.config'
export default {
  data () {
    return {
      // 左侧列表
      categoryList: [],
      categoryIndex: 0,
      // categoryId: '',
      page: 1,
      // 右侧顶部导航栏
      categorySubList: [],
      active: 0,
      // 右侧内容区域
      loading: false,
      finished: false,
      list: [],
      isLoading: false,
      categorySubId: '',
      errorImg: 'this.src="' + require('@/assets/img/errorimg.png') + '"' // 错误图片显示路径
    }
  },
  created () {
    this.getCategoryList()
    this.clickCategory(0, 1)
  },
  mounted () {
    const winHeight = document.documentElement.clientHeight
    document.getElementById('leftNav').style.height = winHeight - 46 + 'px'
    document.getElementById('list-div').style.height = winHeight - 90 + 'px'
  },
  methods: {
    onClickLeft () {
      this.$router.push('/')
    },
    // 获取左侧菜单栏内容
    getCategoryList () {
      axios({
        url: url.goodslist,
        method: 'get'
      })
        .then(result => {
          // console.log(result);
          this.categoryList = result.data.message
          // console.log(this.categoryList)
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 点击大类的方法
    clickCategory (index, categoryId) {
      this.categoryIndex = index
      this.page = 1
      this.finished = false
      this.list = []
      this.getCategorySubByCategoryId(categoryId)
    },
    // 根据大类ID读取小类类别列表
    getCategorySubByCategoryId (categoryId) {
      axios({
        url: url.getCategorySubList,
        method: 'post',
        data: {
          categoryId: categoryId,
          page: this.page
        }
      })
        .then(res => {
          this.categorySubList = res.data.message
          console.log(res.data.message)
        })
        .catch(error => {
          console.log(error)
        })
    },
    onClickCategorySub (index, item) {
      // 点击事件
      // console.log(this.categorySubList[index])
      this.categorySubId = this.categorySubList[index].ID
      // console.log('----3333-----')
      // console.log(this.categorySubId)
      // console.log('----123---')
      this.list = []
      this.finished = false
      this.page = 1
      this.onLoad()
    },
    getGoodList () {
      axios({
        url: url.getcategorySubId,
        method: 'post',
        data: {
          categoryId: this.categorySubId,
          page: this.page
        }
      })
        .then(response => {
          console.log('---111---222---')
          console.log(response)
          console.log('---111---222---')
          // console.log(response)
          if (response.data.code === 200 && response.data.message.length) {
            this.page++
            this.list = this.list.concat(response.data.message)
          } else {
            this.finished = true
          }
          this.loading = false
          console.log(this.finished)
        })
        .catch(error => {
          console.log(error)
        })
    },
    onLoad () {
      setTimeout(() => {
        console.log('获取info')
        // console.log(this.categorySubList[0].ID)
        this.categorySubId = this.categorySubId
          ? this.categorySubId
          : this.categorySubList[0].ID
        // console.log('----44444-----');
        // console.log(this.categorySubId)
        this.getGoodList()
      }, 1000)
    },
    onRefresh () {
      setTimeout(() => {
        Toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 1000)
    }
  }
}
</script>
<style lang="less" scoped>
#leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.categoryActive {
  background-color: #fff;
}
.list-item {
  text-align: center;
  line-height: 80px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
}
#list-div {
  overflow: scroll;
}
.list-item {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 5px;
}
#list-div {
  overflow: scroll;
}
.list-item-img {
  flex: 8;
}
.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
}
</style>
