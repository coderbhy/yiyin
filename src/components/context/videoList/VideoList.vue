<template>
  <swiper ref="mySwiper" :options="swiperOptions" class="">
    <swiper-slide v-for="(item, index) in allVideos" :key="item.id">
      <videos :src="item.video.src" ref="childVideo" :index-num="index"></videos> 
      <div class="left-info">
        <left-info :title="item.video.title" :yb_usernick="item.user.yb_usernick"></left-info>
      </div>
      <div class="right-info">
        <right-info :video-id="item.video.id" :num="item.video.num" :yb_userhead="item.user.yb_userhead"></right-info>
      </div>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import 'swiper/swiper-bundle.css'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

import Videos from './Videos'
import LeftInfo from './LeftInfo'
import RightInfo from './RightInfo'

import { mapActions, mapMutations, mapState } from 'vuex'
export default{
  components: {
    Swiper,
    SwiperSlide,
    Videos,
    LeftInfo,
    RightInfo
  },
  data () {
    return {
      page: 0,
      swiperOptions: {
        direction:"vertical",
        grabCursor: true, 
        setWrapperSize: true, 
        autoHeight: true, //自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化
        slidesPerView: 1,
        mousewheel: true, 
        mousewheelControl: true, 
        height: window.innerHeight,
        resistanceRatio: 0, 
        observeParents: true,
        observer: true,
        on:{
          tap: () => {
            this.$refs.childVideo[this.page].playOrPause()
          },
          slideNextTransitionStart: () => {
            this.page += 1
            this.$refs.childVideo[this.page].playVideo()
            this.$refs.childVideo[this.page - 1].pauseVideo()
            const self = this
            // 向下滑动时开始向后端发送请求
            // 并将请求到的数据加到数组
            this.getOneVideo({ type: this.$q.sessionStorage.getItem('likeType') })
              .then(res => {
                self.pushOneVideoToAll(res.data.data)
              })
          },
          slidePrevTransitionStart: () => {
            this.page -= 1
            this.$refs.childVideo[this.page].playVideo()
            this.$refs.childVideo[this.page + 1].pauseVideo()
            this.$refs.childVideo[this.page + 1].loadVideo()
          }
        }
      }
    }
  },
  methods: {
    ...mapActions({
      'getOneVideo': 'user/getOneVideo'
    }),
    ...mapMutations({
      'pushOneVideoToAll': 'user/pushOneVideoToAll'
    })
  },
  computed: {
    // 获取首页中用户观看的所有视频
    ...mapState({
      'allVideos': state => state.user.allVideos
    })
  },
  created () {
  }
}
</script>

<style scoped>
.swiper-container {
  /* 36px 是底部导航栏的高度 */
  height: calc(100vh - 36px);
}
.swiper-wrapper {
  height: 100%;
}
.left-info {
  position: absolute;
  bottom: .25rem;
  left: .25rem;
}
.right-info {
  position: absolute;
  bottom: .25rem;
  right: .25rem;
}
</style>