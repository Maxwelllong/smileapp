<template>
  <div>
    <div class="floor-title">{{ floorTitle }}</div>
    <div class="floor_1">
      <!-- 不规则部分布局 -->
      <div class="anormal">
        <div class="bigPic">
          <img :src="floors_bigPic" alt="" width="100%" />
        </div>
        <div class="smallPic">
          <div v-for="item in floors_1.slice(1, 3)" :key="item.index">
            <img :src="item.image" alt="floor" width="100%" />
          </div>
        </div>
      </div>
      <!-- 规则部分布局 -->
      <div class="floorRule">
        <div v-for="item in floors_1.slice(3)" :key="item.index">
          <img :src="item.image" alt="floor" width="100%" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['floorData', 'floorTitle'],
  data () {
    return {
      floors_1: [],
      floors_bigPic: ''
    }
  },
  methods: {},
  watch: {
    floorData: function (newVal, oldVal) {
      // console.log(this.floorData);
      this.floors_1 = this.floorData
      this.floors_bigPic = this.floorData[0].image
    }
  }
}
</script>
<style scoped>
.floor-title {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
.anormal {
  display: flex;
  flex-direction: row;
  background-color: #fff;

  border-bottom: 1px solid #ddd;
}
.anormal div {
  width: 10rem;
  box-sizing: border-box;
}
.bigPic {
  border-right: 1px solid #ccc;
}
.smallPic {
  display: flex;
  flex-direction: column;
}
.smallPic div:nth-child(odd) {
  border-bottom: 1px solid #ccc;
}
.floorRule {
  display: flex;
  flex-wrap: wrap;
  background: #fff;
}
.floorRule div {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 10rem;
  border-bottom: 1px solid #ddd;
}
.floorRule div:nth-child(odd) {
  border-right: 1px solid #ddd;
}
</style>
