<template>
  <div class="bottom-bar">
    <shoot-bar :height="height">
      <div slot="left" class="bottom-left full-height relative-position">
        <p class="absolute-center">live:<span class="timer">{{ timer | addUnit }}</span></p>
      </div>
      <div class="bottom-center relative-position full-height row items-center justify-evenly" slot="center">
        <div v-if="showBeginBtn" class="shoot-btn bg-primary row justify-center items-center relative-position" v-ripple @click="shoot">
          <q-icon name="iconfont icon-shipin" class="text-white"></q-icon>
        </div>
        <div v-else-if="showPauseBtn" class="shoot-btn bg-primary row justify-center items-center relative-position" v-ripple @click="pause">
          <q-icon name="iconfont icon-zanting" class="text-white"></q-icon>
        </div>
        <div class="stop-btn">
          <q-btn icon="iconfont icon-tingzhi" flat round size="1.5rem" padding="xs" color="red" @click="stop"></q-btn>
        </div>
      </div>
      <div slot="right" class="bottom-right full-height relative-position">
        <div class="absolute-center container row items-center justify-center q-pa-xs canvas preview fit"  >
          <div v-if="previewSrc === null">
            <q-icon name="icon-zanwushuju" size="xl" class="text-white"/>
          </div>
          <div class="fit" v-else ref="bottomright" @click.stop="showVideoDialog">
            <img :src="previewImg"  ref="img" class="preview-img">
          </div>
        </div>
      </div>
    </shoot-bar>
  </div>
</template>

<script>
import ShootBar from 'components/common/shootBar/ShootBar'
export default {
  props: {
    previewSrc: {
      type: String,
      required: false
    }
  },
  components: {
    ShootBar
  },
  data () {
    return {
      height: '13vh',
      allHeight: '100vh',
      // playStatus 有三个值，pause暂停，play录制中，stop停止
      playStatus: 'stop',
      timer: 0,
      // 点击帧图片显示对应的视频
      dialogStatus: false,

      imgSrc: null
    }
  },
  computed: {
    showBeginBtn () {
      // 当视频处于 stop 或者 pause 状态时显示 开始录制 按钮
      return (this.playStatus === 'stop') || (this.playStatus === 'pause')
    },
    showPauseBtn () {
      // 当视频处于播放状态时显示暂停按钮
      return (this.playStatus === 'play')
    },
    // 在右下角截取视频中的第一帧作为封面图片
    previewImg () {
      const video = document.createElement('video')
      const canvas = document.createElement('canvas')
      video.src = this.previewSrc
      video.preload = 'auto'
      video.setAttribute('autoplay', 'autoplay') 
      const _that = this
      video.addEventListener('loadeddata', function (e) {
        const width = _that.$refs.bottomright.offsetWidth
        const height = _that.$refs.bottomright.offsetHeight
        console.log(width, height)
        canvas.getContext('2d').drawImage(video, 0, 0, width, height)
        _that.imgSrc = canvas.toDataURL('image/png')
      })
      video.onloadeddata
      return this.imgSrc
    }
  },
  methods: {
    shoot () {
      this.playStatus = 'play'
      console.log('playStatus:' + this.playStatus)
      this.$emit('beginShoot')
      this.startTime()
    },
    pause () {
      this.playStatus = 'pause'
      console.log('playStatus:' + this.playStatus)
      this.$emit('pauseShoot')
      this.pauseTime()
    },
    stop () {
      this.playStatus = 'stop'
      this.timer = 0
      this.stopTime()
      this.$emit('stop')
    },
    startTime () {
      window.intervalObj = setInterval(() => {
        this.timer += 1
        console.log(this.timer)
      }, 1000)
    },
    pauseTime () {
      clearInterval(window.intervalObj)
      console.log(this.timer)
    },
    stopTime () {
      clearInterval(window.intervalObj)
    },
    // 让父组件展示 dialog
    showVideoDialog () {
      this.dialogStatus = true
      this.$emit('showDialog', this.dialogStatus)
    }
  },
  // 解决 clearInterval 函数不起效果
  beforeCreate () {
    window.intervalObj = ''
  },
  filters: {
    addUnit (value) {
      return value + 's'
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  width: 100%;
  position: relative;
  left: 0;
  top: 77vh;
}
.bottom-bar .bottom-center .shoot-btn {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  box-shadow: 0px 0px 0 3px white,
               0px 0px 0 5px #FE2C55;
}
.bottom-bar .bottom-center .shoot-btn .iconfont {
  font-size: 2rem;
}
/* .bottom-bar .bottom-right .container img {} */
.preview {
  overflow: hidden;
}
.preview-img {
  transform: scale(1);

}
</style>