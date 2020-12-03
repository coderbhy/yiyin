<template>
  <div class="upload-card">
    <q-card class="my-card q-pa-xs" flat>
      <q-form @submit.prevent.stop="upload">
        <q-card-section>
          <div class="full-width">
            <q-input
              filled
              v-model="uploadData.title"
              class="full-width q-mb-xs"
              label="请输入标题"
              :rules="[
                val => !!val || '请输入标题',
                val => val.length <= 250 || '文字个数不能超过250个',
              ]"
              ref="title"
              clearable
              lazy-rules
              clear-icon="close">
              <template v-slot:prepend>
                <q-icon name="event" />
              </template>
            </q-input>
          </div>
          <div class="full-width q-mb-xs">
            <q-file
              filled
              v-model="uploadData.video"
              label="请选择视频"
              accept="video/*"
              ref="video"
              outlined
              use-chips
              :rules="[val => !!val || '请选择视频']"
              lazy-rules
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>
          <div class="full-width q-mb-xs">
            <q-file
              filled
              v-model="uploadData.image"
              label="请选择封面"
              ref="image"
              outlined
              use-chips
              :rules="[val => !!val || '请选择封面']"
              lazy-rules
              accept="image/*"
            >
              <template v-slot:prepend>
                <q-icon name="image" />
              </template>
            </q-file>
          </div>
          <div class="full-width row ">
            <div class="col-3 text-center q-pb-xs" v-for="item in TransformVideoType" :key="item.id">
              <q-radio name="video" dense v-model="uploadData.type" :val="item.value" :label="item.label" />
            </div>
          </div>
          <!-- <div class="row relative-position">
            <div class="col-6 q-pa-xs bg-cyan">
              <video :src="blobVideo" class="full-width full-height" controls="controls"></video>
            </div>
            <div class="col-6 q-pa-xs bg-orange relative-position container">
              <q-img
                class=""
                :src="blobImage"
                contain
              />
            </div>
          </div> -->
        </q-card-section>
        <q-separator inset></q-separator>
        <q-card-actions align="center">
          <q-btn padding="sm lg" label="提交" class="bg-primary text-white" icon="cloud_upload" type="submit"></q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </div>
</template>

<script>
import bus from 'boot/bus.js'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      uploadData: {
        title: null,
        video: null,
        image: null,
        type: null
      },
      blobSrc: null
    }
  },
  computed: {
    // 从 vuex 中获取转换后的视频类型数组
    ...mapGetters({
      'TransformVideoType': 'user/TransformVideoType'
    })
  },
  methods: {
    ...mapActions({
      'UploadVideo': 'user/UploadVideo'
    }),
    upload () {
      this.$refs.title.validate()
      this.$refs.video.validate()
      this.$refs.image.validate()
      if (this.uploadData.type === null) {
        this.$q.notify({
          message: '请选择视频类型',
          type: 'negative',
          position: 'top',
          timeout: 3000
        })
      } else if (!(this.$refs.title.hasError || this.$refs.video.hasError || this.$refs.image.hasError)) {
        const self = this
        this.UploadVideo(this.uploadData)
          .then(res => {
            if (res.data.code === 200) {
              this.$q.notify({
                message: '上传成功',
                type: 'positive',
                position: 'top',
                timeout: 3000
              })
              for (let key in self.uploadData) {
                self.uploadData[key] = null
              }
            } else if (res.data.code === 400) {
              this.$q.notify({
                message: '上传失败',
                type: 'negative',
                position: 'top',
                timeout: 3000
              })
            }
          })
      }
    },
    // 将 base64 转换为 blob
    dataURLtoBlob (dataurl) { 
      let arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
      while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    //将 blob 转换为 file
    blobToFile (theBlob, fileName){
      theBlob.lastModifiedDate = new Date();
      theBlob.name = fileName;
      return theBlob;
    }
  },
  // computed: {
  //   blobVideo () {
  //     if (this.uploadData.video === null) {
  //       return null
  //     } else if (this.uploadData.video.indexOf('blob:') === 0) {
  //       let src = this.uploadData.video
  //       // 将 Blob 转换为 File 对象
  //       this.uploadData.video = new File([this.uploadData.video], 'user.mp4', {
  //         type: 'video/mp4'
  //       })
  //       return src
  //     } else {
  //       let blobVideo = URL.createObjectURL(
  //         new Blob(this.uploadData.video, {
  //           type: 'video/mp4'
  //         })
  //       )
  //       return blobVideo
  //     }
  //   },
  //   blobImage () {
  //     if (this.uploadData.image === null) {
  //       let blobImage = null
  //       return blobImage
  //     } else if (this.uploadData.image.indexOf('data:image') === 0) {
  //       let base = this.uploadData.image
  //       let blob = this.dataURLtoBlob(this.uploadData.image)
  //       this.uploadData.image = this.blobToFile(blob, 'user.png')
  //       console.log(this.uploadData.image)
  //       return base
  //     } else {
  //       let blobImage = URL.createObjectURL(
  //         new Blob(this.uploadData.image, {
  //           type: 'image/jpeg'
  //         })
  //       )
  //       return blobImage
  //     }
  //   }
  // },
  beforeCreate () {
    bus.$on('showVideoSrc', obj => {
      bus.dialogSrc = obj.videoSrc
      bus.image = obj.imgSrc
    })
  },
  mounted () {
    // 在此处用 bus 获取从其他界面传过来的视频链接和封面图片
    this.uploadData.video = bus.dialogSrc
    this.uploadData.image = bus.image
  }
}
</script>

<style scoped>
.container {
  overflow: hidden;
}
.q-img__content {
  transform: scale(1.5);
}
</style>