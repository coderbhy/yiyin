<template>
  <q-infinite-scroll @load="onLoad" :offset="150" ref="child">
    <div class="caption row">
      <!-- <div v-for="(item, index) in videoList" :key="item.id" class="col-3 q-pa-xs">
        <video-player  class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions[index]"
        ></video-player>
      </div> -->
      <div class="col-3 q-pa-xs" v-for="item in resultArray" :key="item.id">
        <q-img :src="item.cover" class="full-width full-height" contain></q-img>
      </div>
    </div>
    <template v-slot:loading>
      <div class="row justify-center q-my-md">
        <q-spinner-dots color="primary" size="40px" />
      </div>
    </template>
    <div v-show="tips">
      <q-separator inset=""></q-separator>
      <div class="text-center text-weight-light text-grey">
        没有更多了
      </div>
    </div>
  </q-infinite-scroll>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
import { mapActions, mapState } from 'vuex'
export default {
  props: {
    // 获取用户点赞数组或者用户作品数组
    resultArray: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      // videoList: []

      // 发送请求时的 page 数
      page: 0,
      tips: false
    }
  },
  computed: {
    // playerOptions () {
    //   let playArray = []
    //   for (let i = 0; i < this.videoList.length; i++) {
    //     let property = {
    //       autoplay: false, //如果true,浏览器准备好时开始回放。
    //       muted: false, // 默认情况下将会消除任何音频。
    //       loop: false, // 导致视频一结束就重新开始。
    //       preload: 'auto', 
    //       fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
    //       sources: [
    //         {
    //           src: this.videoList[i].src,  // 路径
    //           type: 'video/mp4'  // 类型
    //         }, 
    //       ],
    //       //poster: "../../static/images/test.jpg", //你的封面地址
    //       width: document.documentElement.clientWidth,
    //       notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
    //       controlBar:false
    //     }
    //     playArray.push(property)
    //   }
    //   return playArray
    // },
  },
  // mounted () {
  //   for (let i = 0; i < this.thumbList.length; i++) {
  //     this.videoList.push(this.thumbList[i])
  //   }
  // },
  methods: {
    onLoad (index, done) {
      setTimeout(() => {
        this.page += 8
        this.$emit('addPage', this.page)
        done()
      }, 1500)
    }
  },
  created () {
  }
}
</script>

<style scoped>
  
</style>