<template>
  <div class="login-card">
    <q-form @submit.prevent.stop="login" autofocus>
      <div class="title">
        <img src="~assets/img/login/logo.png" alt="">
      </div>
      <div class="main">
        <q-input
          class="input"
          v-model="username"
          ref="username"
          label="Username"
          dense
          clearable
          clear-icon="close"
          :rules="[ val => val && val.length > 0 || 'Please type something']" />
        <q-input
          class="input"
          v-model="password"
          label="Password"
          ref="password"
          dense
          clearable
          clear-icon="close"
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          :type="isPwd ? 'password' : 'text'">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
      <div class="bottom">
        <button
          class="login"
          type="submit">Login</button>
        <button class="text-primary regis" @click="test2">Register</button>
      </div>
    </q-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      username: '',
      password: '',
      isPwd: true
    }
  },
  methods: {
    ...mapActions({
      'Login': 'user/Login',
      'userSelfInfo': 'user/userSelfInfo'
    }),
    login () {
      this.$refs.username.validate()
      this.$refs.password.validate()
      if (this.$refs.username.hasError || this.$refs.password.hasError) {
        this.$q.notify({
          type: 'negative',
          message: `请完善信息`,
          position: 'top'
        })
      } else {
        const self = this
        this.Login({
          Username: this.username,
          Password: this.password
        })
          .then(res => {
            if (res.data.code === 200) {
              // 登陆成功后获取用户头像、昵称、id信息
              self.userSelfInfo()
              // 清空帐号
              self.username = ''
              self.$router.push('/home')
            } else if (res.data.code === 400) {
              self.$q.notify({
                type: 'negative',
                message: `用户名或者密码有误`,
                position: 'top'
              })
            }
            self.password = ''
          })
        // this.$router.push('/home')
      }
    },
    test2 () {
      console.log('reg')
    }
  }
}
</script>

<style lang="stylus" scoped>
.q-form
  width 90vw
  height 90vh
  background rbg(235, 236, 240)
  padding 1em
  position absolute
  top 50%
  left 50%
  transform translate(-50%, -50%)
  box-shadow  10px 10px 10px #BABECC,
              -10px -10px 10px #FFF
  border-radius 20px
img
  position relative
  left 50%
  transform translatex(-50%)
  height 15vh
.account
  width 70%
  background rbg(235, 236, 240)
.main
  width 70%
  position relative
  left 50%
  transform translatex(-50%)
.input
  margin-top 25%
.bottom
  position absolute
  left 50%
  transform translatex(-50%)
  bottom 15%
.btn
  border-radius 20px
  background #EBECF0
.login
  padding .5em 2em
  background-color #EBECF0
  border 0
  border-radius 20px
  box-shadow -3px -3px 5px #FFF,
              3px 3px 5px #BABECC
  display block
  margin 0 auto
  font-size 1.25em
  margin-bottom 1.25em
.regis
  margin-top 1em
  margin auto
  display block
  border 0
button:hover
  outline none
</style>
