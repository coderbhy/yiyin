<template>
  <div class="manage-other q-pa-sm">
    <table-uncheck :data="allUncheckData"></table-uncheck>
    <page :max-page="UncheckMaxPage"></page>
  </div>
</template>

<script>
import TableUncheck from 'components/context/manageUncheck/Table'
import Page from 'components/context/manageUncheck/Page'
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  components: {
    TableUncheck,
    Page
  },
  methods: {
    ...mapActions({
      'getSomeVideo': 'manager/getSomeVideo',
      'getMaxLength': 'manager/getMaxLength'
    }),
    ...mapMutations({
      'getUncheckMax': 'manager/getUncheckMax',
      'fillUncheckData': 'manager/fillUncheckData',
      'changePage': 'manager/changePage'
    }),
    init () {
      this.initPage()
      this.initData()
    },
    // 初始化时获得最大页数
    initPage () {
      const self = this
      this.getMaxLength()
        .then(res => {
          self.getUncheckMax(res.data.data["2"])
        })
    },
    initData () {
      // 更改当前页数为 1
      this.changePage(1)
      const self = this
      this.getSomeVideo({
        status: '2',
        page: ((self.UncheckCurrent - 1) * 8).toString()
      })
        .then(res => {
          self.fillUncheckData(res.data.data)
        })
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      'allUncheckData': state => state.manager.allUncheckData,
      'UncheckMaxPage': state => state.manager.UncheckMaxPage,
      'UncheckCurrent': state => state.manager.UncheckCurrent
    })
  },
  created () {
    this.init()
  }
}
</script>

<style scoped>
  
</style>