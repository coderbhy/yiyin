<template>
  <div class="row justify-center q-mt-md home-page">
    <q-pagination
      :value="UncheckCurrent"
      @input="changeCurrent"
      :max="maxPage"
      :input="true"
      size="sm"
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  props: {
    maxPage: {
      type: Number
    }
  },
  computed: {
    ...mapState({
      'UncheckCurrent': state => state.manager.UncheckCurrent
    })
    
  },
  data () {
    return {
      baseIndex: 1
    }
  },
  methods: {
    ...mapMutations({
      'changePage': 'manager/changePage',
      'fillUncheckData': 'manager/fillUncheckData'
    }),
    ...mapActions({
      'getSomeVideo': 'manager/getSomeVideo'
    }),
    changeCurrent (value) {
      // 改变页数不需要重新获取最大页数
      const self = this
      this.changePage(value)
      this.getSomeVideo({
        status: '2',
        page: ((value - 1) * 7).toString()
      })
        .then(res => {
          self.fillUncheckData(res.data.data)
        })
    }
  }
}
</script>

<style >
  
</style>