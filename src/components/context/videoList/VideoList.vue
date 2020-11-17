<template>
  <swiper ref="mySwiper" :options="swiperOptions" class="">
    <swiper-slide v-for="(item, index) in videosList" :key="item.id">
      <videos :src="item.src" ref="childVideo" :index-num="index"></videos> 
      <div class="left-info">
        <left-info></left-info>
      </div>
      <div class="right-info">
        <right-info></right-info>
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
          },
          slidePrevTransitionStart: () => {
            this.page -= 1
            this.$refs.childVideo[this.page].playVideo()
            this.$refs.childVideo[this.page + 1].pauseVideo()
            this.$refs.childVideo[this.page + 1].loadVideo()
          }
        }
      },
      videosList: [
        {
          id: 1,
          src: 'http://video.jishiyoo.com/161b9562c780479c95bbdec1a9fbebcc/8d63913b46634b069e13188b03073c09-d25c062412ee3c4a0758b1c48fc8c642-ld.mp4'
        },
        {
          id: 2,
          src: 'http://video.jishiyoo.com/161b9562c780479c95bbdec1a9fbebcc/8d63913b46634b069e13188b03073c09-d25c062412ee3c4a0758b1c48fc8c642-ld.mp4'
        },
        {
          id: 3,
          src: 'http://video.jishiyoo.com/161b9562c780479c95bbdec1a9fbebcc/8d63913b46634b069e13188b03073c09-d25c062412ee3c4a0758b1c48fc8c642-ld.mp4'
        },
        {
          id: 4,
          src: 'http://video.jishiyoo.com/161b9562c780479c95bbdec1a9fbebcc/8d63913b46634b069e13188b03073c09-d25c062412ee3c4a0758b1c48fc8c642-ld.mp4'
        }
      ]
    }
  },
  methods: {
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