<template>
  <div class="shoot">
    <video src="" ref="video" class="absolute z-bottom"></video>
    <top-bar />
    <bottom-bar
      ref="bottom"
      @beginShoot="beginShoot(mediaStream)"
      @stop="stopShoot"
      @pauseShoot="pauseShoot"
      :preview-src="blobSrc" 
      @showDialog="showDialog"/>
      <q-dialog
        v-model="dialog"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <video-dialog :dialog-src="blobSrc" :cover-img="coverImg"></video-dialog>
      </q-dialog>
  </div>
</template>

<script>
import TopBar from 'components/context/shootBar/TopBar'
import BottomBar from 'components/context/shootBar/BottomBar'
import VideoDialog from 'components/context/videoDialog/VideoDialog'
export default {
  data () {
    return {
      // 存放视频流的数组，后续将会被转换为 blob 字符串
      recordedChunks: [],
      // 生成的一个新的 mediaRecorder
      mediaRecorder: null,
      // 开启摄像头后获取到的视频流
      mediaStream: null,
      blobSrc: null,
      // 视频是否从暂停开始录制
      playStatus: 'stop',
      // dialog 的显示状态
      dialog: false,
      // 判断 dialog 是否全屏
      maximizedToggle: true,
      // 封面图片
      coverImg: null
    }
  },
  methods: {
    // 开启摄像头，此时未进行录制
    show () {
      navigator.mediaDevices.getUserMedia({
        video: true
      })
        .then((mediaStream) => {
          this.$refs.video.srcObject = mediaStream
          this.$refs.video.play()
          // 获取到 stream 流
          this.mediaStream = mediaStream
          // this.$refs.btn.$el == document.querySelector('.btn')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 点击开始录制
    beginShoot (stream) {
      // 置空生成的视频 blob
        this.blobSrc = null
      // 若视频此时状态为 pause 暂停状态，则不用生成一个新的 MediaRecorder
      // 从上次暂停的时候继续录制
      if (this.playStatus == 'pause') {
        // 恢复录制
        this.mediaRecorder.resume()
        const _that = this
        this.mediaRecorder.addEventListener('dataavailable', function (e) {
          if (e.data.size > 0) _that.recordedChunks.push(e.data)
        })
      } else if (this.playStatus == 'stop') {
        // 若此时视频状态为 stop 未开始录制
        // 重新生成一个 MediaRecorder
        this.mediaRecorder = new MediaRecorder(stream)
        // 推测 mediaRccorder 中的start事件句柄是通过 addEventListener 添加的
        this.mediaRecorder.addEventListener('start', () => {
          console.log('开始录制')
        })
        // 开始录制视频
        this.mediaRecorder.start()
        const _that = this
        // 将视频文件放到数组
        this.mediaRecorder.addEventListener('dataavailable', function (e) {
          if (e.data.size > 0) _that.recordedChunks.push(e.data)
        })
      }
      // 改变视频播放状态为 play 正在播放
      this.playStatus = 'play'
    },
    stopShoot () {
      // 改变视频播放状态为 stop 停止
      this.playStatus = 'stop'
      // 若此时刚录制完毕，则保存录下来的视频
      if (this.mediaRecorder) {
        const _that = this
        // 在 addEventListener 中 this 指向的不是 vue 实例
        this.mediaRecorder.addEventListener('stop', function () {
          console.log("停止 自动下载");
          _that.downLoadVideo(_that.recordedChunks);
        })
        // 停止录制
        this.mediaRecorder.stop()
        // 清空数组
        this.recordedChunks = []
        // 清空生成的视频流对象
        this.mediaRecorder = null
        // 清空视频流
        // this.mediaStream = null
      } else {
        // 若此时并无录制文件，则显示提示
        this.$q.notify({
          message: '还没有开始录制哦',
          color: 'primary',
          icon: 'iconfont icon-tishi',
          position: 'top',
          timeout: 3000
        })
      }
    },
    downLoadVideo (chunks) {
      console.log(chunks)
      // let downloadLink = document.createElement("a");
      // downloadLink.href = URL.createObjectURL(
      //   new Blob(chunks, {
      //     type: "application/video",
      //   })
      // );
      // 将存着视频文件的数组转换为 blob 字符串
      this.blobSrc = URL.createObjectURL(
        new Blob(chunks, {
          type: "video/mp4",
        })
      )
      console.log(this.blobSrc)
    },
    pauseShoot () {
      // 暂停视频
      // 每次暂停然后继续录制，打印的值会逐渐增多
      this.mediaRecorder.addEventListener('pause', () => {
        console.log('视频录制暂停')
      })
      this.mediaRecorder.pause()
      // 修改视频播放状态为 pause 暂停
      this.playStatus = 'pause'
    },
    showDialog (value) {
      // 获取子组件中封面的值
      this.coverImg = this.$refs.bottom.previewImg
      console.log(this.coverImg)
      this.dialog = value
    }
  },
  created () {
    this.show()
  },
  components: {
    TopBar,
    BottomBar,
    VideoDialog
  }
}
</script>

<style scoped>
video {
  width: 100%;
  height: 100vh;
  object-fit: cover;
}
</style>