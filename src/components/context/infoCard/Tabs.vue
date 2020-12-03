<template>
  <div class="tabs">
    <q-tabs
      v-model="tab"
      class="text-black"
      indicator-color="orange"
      dense
    >
      <q-tab name="mails"  label="作品" />
      <q-tab name="movies" label="喜欢" />
    </q-tabs>
    <q-separator></q-separator>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="mails">
        <tab-panel ref="work" :result-array="ownWorks" @addPage="addWorkPage"></tab-panel>
      </q-tab-panel>


      <q-tab-panel name="movies">
        <tab-panel ref="thumb" :result-array="userThumb" @addPage="addPage"></tab-panel>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import TabPanel from './TabPanel'
export default {
  data () {
    return {
      tab: 'mails'
    }
  },
  components: {
    TabPanel
  },
  methods: {
    ...mapActions({
      // 1.获取到用户点赞的视频数组 [{ id: 'xx' }]
      // => 需要传入 page 参数获取
      'userSelfThumb': 'user/userSelfThumb',
      // // 2.获取到视频数组后，对视频数组信息做完善补充
      // => 需要传入视频的 id
      'getThumbVideo': 'user/getThumbVideo',

      // 1.获取用户自己的作品数组 [{ id: 'xx' }]
      'getInitWorks': 'user/getInitWorks',
      // 2.根据视频 id 获取到完整信息
      'getPerfectWorks': 'user/getPerfectWorks'
    }),
    // 监听*点赞*子组件的 page 数目变化
    addPage (page) {
      this.getThumbAndComplete(page)
    },
    // 获得点赞初始数组并完善数组
    // 参数为页数 page
    getThumbAndComplete (page) {
      const self = this
      this.userSelfThumb(page)
        .then(res => {
          // 若接口中的点赞数组中没数据
          if (res.data.data.prise_v.length === 0) {
            // 停止 load 事件
            self.$refs.thumb.$refs.child.stop()
            // 直接修改*点赞*子组件中的 tips 值，显示 没有更多数据了
            self.$refs.thumb.tips = true
          } else {
            // 若接口中的点赞数据中含有数据
            // 获取到初始化点赞数组后，先把数组 push 到 state 中的点赞数组后面
            self.$store.commit('pushThumb', res.data.data.prise_v)
            // 得到数组数据后，传入 id 完善点赞数组数据
            for (let i = 0; i < res.data.data.prise_v.length; i++) {
              // 传入未完善点赞数组前的 id
              self.getThumbVideo(res.data.data.prise_v[i])
            }
          }
          
        })
    },
    
    // 根据页数获取后续作品
    getOtherWorks (page) {
      this.getInitWorks({ page: page })
    },
    // 根据视频 id 获得视频详情
    getDetailWorks (page) {
      const self = this
      for (let i = page; i < page + 8; i++) {
        this.getPerfectWorks({ id: this.ownWorks[i].id })
          .then(res => {
            if (res.data.code === 200) {
              self.$store.commit('completeWork', {
                index: i,
                obj: res.data.data[0]
              })
            }
          })
      }
    },
    // 监听子组件事件，当用户向下滑动时，子组件中的 page 数发生变化
    addWorkPage (page) {
      const self = this
      this.getInitWorks({ page: page })
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.data.length === 0) {
              // 若没有发布过作品
              // 停止加载
              self.$refs.thumb.$refs.child.stop()
              // 展示提示
              self.$refs.work.tips = false
            } else {
              // 从接口获取到数组并将它拼接到 state 的用户个人作品数组后面
              self.$store.commit('pushWork', res.data.data.own)
            }
          } else if (res.data.code === 400) {
            console.log('获取用户作品失败')
          }
        })
      this.getDetailWorks(page)
    },
    // 初始化作品数组
    InitWorkCpn () {
      // 获取第0页的个人作品集，初始作品数组
      const self = this
      this.getInitWorks({ page: 0 })
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.data.length === 0) {
              // 若没有发布过作品
              // 停止加载
              self.$refs.thumb.$refs.child.stop()
              // 展示提示
              self.$refs.work.tips = false
            } else {
              // 从接口获取到数组并将它拼接到 state 的用户个人作品数组后面
              self.$store.commit('pushWork', res.data.data.own)
            }
          } else if (res.data.code === 400) {
            console.log('获取用户作品失败')
          }
        })
    }
  },
  computed: {
    ...mapState({
      // 获取用户点赞视频的数组
      // 将该数组传给子组件
      'userThumb': state => state.user.userThumb,

      'ownWorks': state => state.user.ownWorks
    })
  },
  created () {
    // 刚载入个人信息界面时获取第 0 页的数据
    this.getThumbAndComplete(0)
    // 初始化作品数组
    this.InitWorkCpn()
    // 完善第 0 页作品信息
    this.getDetailWorks(0)
  }
}
</script>

<style scoped>
  .tabs .q-tab-panel {
    padding: 0rem;
  }
</style>