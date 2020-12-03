<template>
  <div class="top-bar">
    <shoot-bar :height="height">
      <div class="top-left full-height relative-position" slot="left">
        <q-btn
          @click="back"
          round
          dense
          flat
          icon="close"
          class="bg-transparent text-primary close absolute-center">
        </q-btn>
      </div>
      <div class="top-center relative-position full-height" slot="center">
        <div class="title absolute-center row items-center">
          <q-icon name="iconfont icon-yinfu" size="1.25rem" class="q-mr-xs text-white"></q-icon>
          <div class="text-white">
            拍摄
          </div>
        </div>
      </div>
    </shoot-bar>
  </div>
</template>

<script>
import ShootBar from 'components/common/shootBar/ShootBar'
export default {
  components: {
    ShootBar
  },
  methods: {
    back () {
      this.$router.push('/home')
    }
  },
  data () {
    return {
      height: '10vh'
    }
  }
}
</script>

<style scoped>
.top-bar {
  width: 100%;
}
.top-bar .top-center .title {
  letter-spacing: .5rem;
  font-size: 1.25rem;
}
.top-bar .top-center .title > div {
  display: inline-block;
}
</style>