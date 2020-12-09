<template>
  <div class="right-info">
    <div class="avatar relative-position text-center">
      <q-avatar>
        <img :src="yb_userhead">
      </q-avatar>
    </div>
    <div class="item text-center" :class="this.like? 'text-red': 'text-grey-9'" @click.stop="changeLike">
      <q-icon name="iconfont icon-aixin_shixin" size="2rem"></q-icon>
      <div class="text-thumb">点赞</div>
      <p>{{ childNum | transThumb }}</p>
    </div>
    <!-- <div class="item text-center" :class="this.money? 'text-red': 'text-grey-9'">
      <q-icon name="iconfont icon-dashang" size="2.5rem"></q-icon>
      <p>1w</p>
    </div> -->
    <div class="rounded relative-position text-center">
      <q-avatar size="2.4rem" class="absolute-center">
        <img :src="yb_userhead">
      </q-avatar>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    videoId: {
      type: String
    },
    yb_userhead: {
      type: String
    },
    num: {
      type: String
    }
  },
  data () {
    return {
      like: false,
      money: false,
      childNum: null
    }
  },
  created () {
    this.childNum = this.num
    console.log('rightinfo')
    // 在这里判断视频是否被点赞
  },
  methods: {
    ...mapActions({
      'thumb': 'user/thumb'
    }),
    changeLike () {
      
      if (this.like) {
        this.childNum = (parseInt(this.childNum) - 1).toString()
      } else {
        this.childNum = (parseInt(this.childNum) + 1).toString()
      }
      this.like = !this.like
      let self = this
      
      
    //   this.thumb(this.videoId)
    //     .then(res => {
    //       if (res.data.code === 200) {
    //         self.like = !this.like
    //       } else if (res.data.code === 400) {
    //         self.$q.notify({
    //           type: 'negative',
    //           message: `点赞失败`,
    //           position: 'top'
    //         })
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    }
  },
  filters: {
    transThumb (value) {
      let numValue = parseInt(value)
      if ((numValue / 10000).toString().split('.')[0] != '0') {
        let result = numValue / 10000
        let finalResult = result.toString().split('.')
        return finalResult[0] + 'W'
      } else if ((numValue / 1000).toString().split('.')[0] != '0') {
        let result = numValue / 1000
        let finalResult = result.toString().split('.')
        return finalResult[0] + 'K'
      } else {
        return numValue
      }
    }
  }
}
</script>

<style scoped>
.right-info .avatar .icon-jia {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -20%;
}
.right-info .item:nth-child(2) {
  padding-top: calc(1.5rem + 1.35rem/2);
  padding-bottom: calc(1.5rem + 1.35rem/2);
}
.right-info .item:nth-child(3) {
  padding: 1.5rem 0;
}
.right-info .item p {
  margin-bottom: 0;
}
@keyframes rounded {
  0% {
    transform: rotate(0);
  } 100% {
    transform: rotate(360deg);
  }
}
.right-info .rounded {
  animation: rounded linear 5s infinite;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: #2e2e2e;
}
.text-thumb {
  font-size: .85rem;
}
</style>