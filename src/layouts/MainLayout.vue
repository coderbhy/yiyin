<template>
  <q-layout view="hHh lpR fFf"> 
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer v-show="!($route.path == '/shoot')">
      <tab-bar />
    </q-footer>
  </q-layout>
</template>

<script>
import TabBar from 'components/context/tabbar/TabBar'
export default {
  name: 'MainLayout',
  data () {
    return {
    }
  },
  components: {
    TabBar
  }
}
</script>

<style lang="stylus">
</style>
