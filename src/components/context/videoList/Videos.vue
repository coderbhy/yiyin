<template>
  <div class="video">
    <video-player class="video-player vjs-custom-skin"
      ref="videoPlayer"
      :playsinline="true"
      :options="playerOptions"
    ></video-player>  
  </div>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
export default {
  props: {
    src: {
      type: String
    },
    indexNum: {
      type: Number
    }
  },
  components: {
    videoPlayer
  },
  data () {
    return {
      playStatus: false,
      playerOptions : {
        // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', 
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            src: this.src,  // 路径
            type: 'video/mp4'  // 类型
          }, 
        ],
        //poster: "../../static/images/test.jpg", //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar:false
      }
    }
  },
  methods: {
    playOrPause () {
      if (this.playStatus) {
        this.pauseVideo()
      } else {
        this.playVideo()
      }
    },
    playVideo () {
      this.$refs.videoPlayer.player.play()
      this.playStatus = true
      document.getElementsByClassName('vjs-big-play-button')[this.indexNum].style.display = 'none'
    },
    pauseVideo () {
      this.$refs.videoPlayer.player.pause()
      this.playStatus = false
      document.getElementsByClassName('vjs-big-play-button')[this.indexNum].style.display = 'block'
    },
    loadVideo () {
      this.$refs.videoPlayer.player.load()
    }
  }
}
</script>

<style>
  .video {
    height: 100%;
  }
  .video-js .vjs-big-play-button {
    /* 使用 !important 覆盖原有样式 */
    width: 5rem !important;
    height: 5rem !important;
    line-height: 5rem !important;
    background: transparent !important;
    position: absolute !important;
    left: 50% !important;
    top: 50% !important;
    transform: translate(-50%, -50%) !important;
    border-radius: 50% !important;
    color: white !important;
  }
  .vjs-custom-skin {
    height: calc(100vh - 36px);
  }
</style>