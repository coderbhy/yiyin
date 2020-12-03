<template>
  <q-card class="bg-primary text-white video-dialog">
    <q-bar>
      <q-space />
      <q-btn dense flat icon="close" v-close-popup>
        <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
      </q-btn>
    </q-bar>
    <q-card-section class="">
      <div class="full-height bg-white">
        <video :src="dialogSrc" class="fit" controls="controls"></video>
      </div>
    </q-card-section>
    <q-card-actions align="center">
      <q-btn @click="transInfo" icon="icon-shangchuan" label="上传" class="bg-white text-primary" padding="sm md"></q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import bus from 'boot/bus.js'
export default {
  props: {
    dialogSrc: {
      type: String,
      required: true
    },
    coverImg: {
      type: String,
      required: true
    }
  },
  methods: {
    transInfo () {
      // 路由跳转后监听不到发出的 bus 事件
      // 原因：通过 $emit 方法传递数据然后跳转路由的时候，其实页面2的 $on 监听还没有建立，因此无法得到数据！
      // 解决方法：在页面1的 beforeDestroy 或者 destroyed 钩子函数中 emit 数据
      // 在页面2的 beforeCreate、created 或者 beforeMount 钩子函数中建立 $on 监听事件
      // 然后在页面2的 mounted 钩子函数中 $on 得到的数据赋值给页面2的变量中
      this.$router.push('/upload')
    }
  },
  beforeDestroy () {
    if (this.$route.matched[1].path === '/upload') {
      bus.$emit('showVideoSrc', {
        videoSrc: this.dialogSrc,
        imgSrc: this.coverImg
      })
    }
  }
}
</script>

<style scoped>
.video-dialog .q-card__section {
  height: calc(90vh - 32px);
}
</style>