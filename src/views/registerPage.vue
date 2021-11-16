<!--注册页面-->
<template>
  <div>
    <van-nav-bar
      title="注册"
      left-text="返回"
      right-text="完成"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="registerPanel">
      <van-field
        v-model="username"
        label="用户名"
        clearable
        placeholder="请输入用户名"
        required
        :error-message="usernameErrMessage"
        @click-icon="username = ''"
      ></van-field>
      <van-field
        v-model="password"
        label="密码"
        clearable
        placeholder="请输入密码"
        required
        :error-message="passwordErrMessage"
        @click-icon="password = ''"
      ></van-field>
      <van-field
        v-model="checkPassword"
        label="确认密码"
        clearable
        placeholder="请确认密码"
        required
        @click-icon="password = ''"
      ></van-field>
      <div class="registerButton">
        <van-button
          type="primary"
          @click="registAction"
          :loading="openLoading"
          size="large"
        >
          注册
        </van-button>
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
      username: '',
      password: '',
      checkPassword: '',
      openLoading: false, // 默认关闭loading事件，开启注册按钮
      usernameErrMessage: '',
      passwordErrMessage: ''
    }
  },
  methods: {
    onClickLeft () {
      this.$router.push('/login')
    },
    onClickRight () {
      this.$router.push('/login')
    },
    registAction () {
      this.checkForm() && this.axiosRegisterUser()
    },
    axiosRegisterUser () {
      axios({
        url: url.registerUser,
        method: 'post',
        data: {
          userName: this.username,
          password: this.password
        }
      })
        .then(res => {
          if (res.data.state === 200) {
            Toast.success(res.data.message)
            this.openLoading = true
            this.$router.push('/login')
          } else {
            // console.log(res.data.message)
            Toast.fail('注册失败')
            this.openLoading = false
          }
          // console.log(res.data.state)
        })
        .catch(err => {
          Toast.fail('注册失败')
          // console.log(err)
          this.openLoading = false
        })
    },

    checkForm () {
      let isOK = true
      if (this.username.length < 5) {
        this.usernameErrMessage = '用户名不能小于5位'
        isOK = false
      } else {
        this.usernameErrMessage = ''
      }
      if (this.password.length < 6) {
        this.passwordErrMessage = '密码长度不能少于5位'
        isOK = false
      } else {
        this.passwordErrMessage = ''
      }
      return isOK
    }
  }
}
</script>
<style lang="less" scoped>
.registerPanel {
  width: 95%;
  margin: 20px auto;
  border-radius: 5px;
  padding-bottom: 50px;
}
.registerButton {
  padding-top: 10px;
  border-radius: 10px;
}
</style>
