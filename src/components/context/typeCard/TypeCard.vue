<template>
  <div class="login-card">
    <div class="form">
      <div class="title text-center text-weight-medium text-body1 q-mb-md">
        选择自己感兴趣的模块
      </div>
      <div class="row">
        <div class="col-3 column items-center q-pa-xs q-mb-xs" v-for="(item, index) in allTypes" :key="index">
          <div class="btn row items-center justify-center relative-position " v-ripple @click="submitType(item.type)"> 
            <div class="ellipsis full-width text-no-wrap  text-weight-light text-center">
              {{ item.type }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      'allTypes': state => state.user.allTypes
    })
  },
  created () {
    // 若本地缓存中含有数据，删除数据
    if (this.$q.sessionStorage.has('likeType')) {
      this.$q.sessionStorage.remove('likeType')
    }
    this.getAllTypes()
  },
  methods: {
    ...mapActions({
      'getAllTypes': 'user/getAllTypes'
    }),
    submitType (type) {
      this.$q.sessionStorage.set('likeType', type)
      this.$router.push(`/home/${type}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
.form
  width 90vw
  height 90vh
  background rbg(235, 236, 240)
  padding 1em
  position absolute
  top 50%
  left 50%
  transform translate(-50%, -50%)
  box-shadow  10px 10px 10px #BABECC,
              -10px -10px 10px #FFF
  border-radius 20px
.btn
  width 2.75rem
  height 2.75rem
  border-radius 14px
  background #EBECF0;
  box-shadow 4px 4px 9px #c8c9cc, 
              -4px -4px 9px #ffffff
</style>
