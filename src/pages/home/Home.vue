<template>
  <q-page class="home">
    <video-list></video-list>
  </q-page>
</template>

<script>
import VideoList from 'components/context/videoList/VideoList'
import { mapActions, mapMutations } from 'vuex'
export default {
  components: {
    VideoList
  },
  data () {
    return {
      likeType: {
        type: this.$q.sessionStorage.getItem('likeType')
      }
    }
  },
  methods: {
    ...mapActions({
      'getOneVideo': 'user/getOneVideo'
    }),
    ...mapMutations({
      'pushOneVideoToAll': 'user/pushOneVideoToAll'
    }),
    getInitTwoVideos () {
      const self = this
      this.$axios.all([this.getOneVideo(this.likeType), this.getOneVideo(this.likeType)])
        .then(this.$axios.spread(function (acct, perms) {
          // acct 为获取到的第一个视频
          // perms 为获取到的第二个视频
          self.pushOneVideoToAll(acct)
          self.pushOneVideoToAll(perms)
        }))
    }
  },
  created () {
    this.getInitTwoVideos()
  }
}
</script>

<style scoped>
</style>
