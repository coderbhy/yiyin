<template>
  <div class="shoot">
    <video src="" ref="video" class="absolute z-bottom"></video>
    <div class="top row relative-position justify-center q-pa-md items-center">
      <q-btn
        @click="back"
        round
        dense
        flat
        class="bg-transparent text-primary absolute close">
        <q-icon name="close" ></q-icon>
      </q-btn>
      <div class="title row items-center">
        <q-icon name="icon-yinfu" size="1.25rem" class="q-mr-xs"></q-icon>
        <div>
          拍摄
        </div>
      </div>
    </div>
    <div class="bottom relative-position row justify-center items-center">
      <div class="shoot-btn bg-primary row justify-center items-center relative-position" v-ripple @click="get">
        <q-icon name="iconfont icon-shipin" class="text-white" ></q-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    show () {
      navigator.mediaDevices.getUserMedia({
        video: true
      })
        .then((mediaStream) => {
          this.$refs.video.srcObject = mediaStream
          this.$refs.video.play()
          // var video = document.querySelector('video')
          // video.srcObject = mediaStream;
          // video.onloadedmetadata = function(e) {
          //   video.play();
          // }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    get () {
      console.log('helo')
    },
    back () {
      this.$router.push('/home')
    }
  },
  created () {
    this.show()
  }
}
</script>

<style scoped>
video {
  width: 100%;
  height: 100vh;
  object-fit: cover;
}
.close {
  left: 5%;
}
.shoot .top .title {
  letter-spacing: .5rem;
  font-size: 1.25rem;
}
.shoot .bottom {
  width: 100%;
  height: 12vh;
  top: calc(88vh - 62px);
  left: 0;
}
.shoot .bottom .shoot-btn {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  box-shadow: 0px 0px 0 3px white,
               0px 0px 0 5px #FE2C55;
}
.shoot .bottom .shoot-btn .iconfont {
  font-size: 2rem;
}
</style>