<!--loginPage-->
<template>
  <div>
    <van-nav-bar
      title="登录"
      left-text="返回"
      right-text="注册"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="loginPanel">
      <van-field
        v-model="userName"
        label="用户名"
        clearable
        placeholder="请输入用户名"
        required
        @click-icon="userName = ''"
      ></van-field>
      <van-field
        v-model="password"
        label="密码"
        clearable
        placeholder="请输入密码"
        required
        @click-icon="password = ''"
      ></van-field>
      <div class="loginButton">
        <van-button
          type="primary"
          size="large"
          @click="loginBtn"
          :loading="openLoading"
          >登录</van-button
        >
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
      userName: '',
      password: '',
      openLoading: false
    }
  },
  created () {
    if (localStorage.userInfo) {
      Toast.success('已经登录')
      this.$router.push('/')
    }
  },
  methods: {
    onClickLeft () {
      this.$router.push('/')
    },
    onClickRight () {
      this.$router.push('/register')
    },
    loginBtn () {
      // 给按钮定义loading状态防止重复提交
      this.openLoading = true
      axios({
        url: url.login,
        method: 'post',
        data: {
          userName: this.userName,
          password: this.password
        }
      })
        .then(res => {
          if (res.data.state === 200 && res.data.message) {
            new Promise((resolve, reject) => {
              localStorage.setItem(
                'userInfo',
                JSON.stringify({ userName: this.userName })
              )
              setTimeout(() => {
                resolve()
              }, 400)
            })
              .then(() => {
                Toast.success('登录成功')
                this.$router.push('/')
              })
              .catch(err => {
                Toast.fail('登录状态保持失败')
                console.log(err)
              })
          } else {
            Toast.fail('登录失败')
            this.openLoading = false
          }
        })
        .catch(error => {
          console.log(error)
          Toast.fail('登录失败')
          this.openLoading = false
        })
    }
  }
}
</script>
<style lang="less" scoped>
.loginPanel {
  width: 95%;
  margin: 20px auto;
  border-radius: 5px;
  padding-bottom: 50px;
}
.van-field {
  margin-top: 10px;
}
.loginButton {
  padding-top: 20px;
}
</style>
