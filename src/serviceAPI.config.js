const BASEURL =
  ' https://www.fastmock.site/mock/1d1ad10003f2616af689cb8b06e9e512/smile/'
const LOCALURL = 'http://localhost:3000/'
const URL = {
  getShoppingMallInfo: BASEURL + 'index',
  getGoodsInfo: BASEURL + 'getGoodsInfo',
  registerUser: LOCALURL + 'user/register',
  login: LOCALURL + 'user/login',
  goodsinfo: LOCALURL + 'goods/goodsinfo',
  goodslist: LOCALURL + 'goods/goodslist',
  getCategorySubList: LOCALURL + 'goods/goodssublist', // 获取小类的方法
  getcategorySubId: LOCALURL + 'goods/getcategorySubId' // 获取小类内容的方法
}

module.exports = URL
