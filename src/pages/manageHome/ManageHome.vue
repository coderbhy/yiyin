<template>
  <q-page class="manage-home q-pa-sm ">
    <div class="row items-center justify-center">
      <home-table
        class="col"
        :type-array="VisibleTypes"
        @getTypeData="getTypeData"
        :data="CheckData"
        @passTheId="passTheId"
        @unpassTheId="unpassTheId"
        @showVideoCard="showVideoCard"></home-table>
    </div>
    <home-page :check-max-page="maxPage" @pageIsChange="pageIsChange" :current-page="currentPage"/>
    <q-dialog v-model="showVideoDetail" full-height>
      <home-show-video
        :video-src="dialogSrc"
        :video-title="dialogTitle"></home-show-video>
    </q-dialog>
  </q-page>
</template>

<script>
import HomeTable from 'components/context/manageHome/HomeTable'
import HomePage from 'components/context/manageHome/HomePage'
import HomeShowVideo from 'components/context/manageHome/HomeShowVideo'
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex'
export default {
  components: {
    HomeTable,
    HomePage,
    HomeShowVideo
  },
  data () {
    return {
      showVideoDetail: false,
      dialogTitle: null,
      dialogSrc: null
    }
  },
  methods: {
    ...mapActions({
      'getSomeVideo': 'manager/getSomeVideo',
      'getMaxLength': 'manager/getMaxLength',
      'updateStatus': 'manager/updateStatus'
    }),
    ...mapMutations({
      'sendDataToArray': 'manager/sendDataToArray',
      'confirmMaxPage': 'manager/confirmMaxPage',
      'changeCheckCurrentPage': 'manager/changeCheckCurrentPage'
    }),
    // 监听子组件的事件
    // 通过id为xx的视频
    passTheId (id) {
      // console.log(id)
      const self = this
      this.updateStatus({
        status: '0',
        id: id
      })
        .then(res => {
          if (res.data.code === 200) {
            this.$q.notify({
              message: '修改成功',
              type: 'positive',
              position: 'top'
            })
            // 修改成功后初始化
            self.init()
          }
        })
    },
    // 监听子组件的事件
    // 当点击 movie 按钮后，显示 dialog √
    showVideoCard ({ bool, src, title }) {
      this.showVideoDetail = bool
      this.dialogTitle = title
      this.dialogSrc = src
    },
    getTypeData (obj) {
      console.log(obj)
    },
    getAPageData (status, page) {
      // status => '0' '1' '2'
      // page => '0' '7' '14'
      status = status.toString()
      page = page.toString()
      return this.getSomeVideo ({
        status: status,
        page: page
      })
    },
    // 初始化时获得第0页的通过数据和未通过数据 √
    init () {
      const self = this
      // 获得最大页数
      this.getCheckMaxPage()
      // 置当前页数为 1
      this.changeCheckCurrentPage(1)
      // 从后端获得第 0 页的审核数据，并放入数组中
      this.$axios.all([
        this.getAPageData(0, 0),
        this.getAPageData(1, 0)
      ])
        .then(this.$axios.spread(function (acct, perms) {
          self.sendDataToArray({
            arrayName: 'allPassData',
            data: acct.data.data
          })
          self.sendDataToArray({
            arrayName: 'allUnpassData',
            data: perms.data.data
          })
        }))
    },
    // 获得最大页数 √
    getCheckMaxPage () {
      const self = this
      this.getMaxLength()
        .then(res => {
          self.getMaxLength(res.data.data)
        })
    },
    unpassTheId (id) {
      const self = this
      this.updateStatus({
        status: '1',
        id: id
      })
        .then(res => {
          if (res.data.code === 200) {
            this.$q.notify({
              message: '修改成功',
              type: 'positive',
              position: 'top'
            })
            // 修改成功后初始化
            self.init()
          }
        })
    },
    pageIsChange (page) {
      this.$axios.all([
        this.getAPageData(0, ((page - 1) * 7).toString()),
        this.getAPageData(1, ((page - 1) * 7).toString())
      ])
        .then(this.$axios.spread(function (acct, perms) {
          self.sendDataToArray({
            arrayName: 'allPassData',
            data: acct.data.data
          })
          self.sendDataToArray({
            arrayName: 'allUnpassData',
            data: perms.data.data
          })
        }))
      this.changeCheckCurrentPage(page)
    }
  },
  computed: {
    ...mapGetters({
      'VisibleTypes': 'manager/VisibleTypes',
      // 每一页的总数据
      'CheckData': 'manager/CheckData'
    }),
    ...mapState({
      'allPassData': state => state.manager.allPassData,
      'allUnpassData': state => state.manager.allUnpassData,
      'currentPage': state => state.manager.currentPage,
      'maxPage': state => state.manager.maxPage
    })
    
  },
  created () {
    // this.init()
  }
}
</script>

<style scoped>
  
</style>