<template>
  <q-page class="login">
    <login-card></login-card>
  </q-page>
</template>

<script>
import LoginCard from 'components/context/loginCard/LoginCard'
export default {
  components: {
    LoginCard
  }
}
</script>

<style scoped>
  .login {
    background: #EBECF0;
  }
</style>