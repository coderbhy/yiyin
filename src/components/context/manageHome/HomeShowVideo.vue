<template>
  <q-card class="home-show-video">
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">{{ videoTitle }}</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section class="q-py-none q-px-lg">
      <video-player 
        class="video-player vjs-custom-skin "
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"></video-player>
    </q-card-section>
  </q-card>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
export default {
  props: {
    videoTitle: {
      type: String,
      default: null
    },
    videoSrc: {
      type: String,
      default: null
    }
  },
  components: {
    videoPlayer
  },
  data () {
    return {
      playerOptions : {
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', 
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            src: this.videoSrc,  // 路径
            type: 'video/mp4'  // 类型
          }, 
        ],
        //poster: "../../static/images/test.jpg", //你的封面地址
        // width: '10rem',
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true // 是否显示全屏按钮
        }
      }
    }
  }
}
</script>

<style lang="stylus">
  .home-show-video
    width 25rem
  .video-js .vjs-big-play-button
    /* 使用 !important 覆盖原有样式 */
    width 5rem !important
    height 5rem !important
    line-height 5rem !important
    background transparent !important
    position absolute !important
    left 50% !important
    top 50% !important
    transform translate(-50%, -50%) !important
    border-radius 50% !important
    color white !important
</style>