<template>
  <q-page class="manage-type q-pa-sm">
    <manage-card @addType="addType" :data-array="VisibleTypes" title="可见类型" @toInvisible="hide" @delType="delType"></manage-card>
    <manage-card @addType="addType" :data-array="InvisibleTypes" title="不可见类型" @toVisible="show" @delType="delType"></manage-card>
    <q-dialog
      v-model="medium"
      transition-show="flip-down"
      transition-hide="flip-up"
    >
      <add-type-dialog @addType="addTypeInCpt"></add-type-dialog>
    </q-dialog>
  </q-page>
</template>

<script>
import ManageCard from 'components/context/manageType/TypeCard'
import AddTypeDialog from 'components/context/manageType/AddTypeDialog'
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    ManageCard,
    AddTypeDialog
  },
  data () {
    return {
      medium: false
    }
  },
  computed: {
    ...mapState({
      'allTypes': state => state.manager.allTypes
    }),
    ...mapGetters({
      'VisibleTypes': 'manager/VisibleTypes',
      'InvisibleTypes': 'manager/InvisibleTypes'
    })
  },
  created () {
    // 获取类型数据
    this.getType()
  },
  methods: {
    ...mapMutations({
      'delTypeData': 'manager/delTypeData',
      'addTypeData': 'manager/addTypeData',
      'DepositToTheLocal': 'manager/DepositToTheLocal',
      'detectAndModifi': 'manager/detectAndModifi',
      'makeObjHide': 'manager/makeObjHide',
      'makeObjShow': 'manager/makeObjShow'
    }),
    ...mapActions({
      'delTypeFromCpt': 'manager/delTypeFromCpt',
      'getTypesFromInterface': 'manager/getTypesFromInterface',
      'UpdateTypefromCpt': 'manager/UpdateTypefromCpt',
      'addTypefromCpt': 'manager/addTypefromCpt'
    }),
    // 初始化 √
    getType () {
      // 若本地缓存中有数据，不必重新发起网络请求
      if (this.$q.sessionStorage.has('allTypes')) {
        console.log(1)
        let payload = this.$q.sessionStorage.getItem('allTypes')
        console.log(payload)
        this.DepositToTheLocal(payload)
      } else {
        // 若本地缓存中无数据，向后端发送请求获取数据
        const self = this
        this.getTypesFromInterface()
          .then(res => {
            // res.data.data => [ { v_type: '', type_status: '' } ]
            // 将获取到的数据放到 state 中 allTypes 中
            self.detectAndModifi(res.data.data)
            // 将从后端获取到的数据放到 sessionStorage 中
            self.$q.sessionStorage.set('allTypes', res.data.data)
          })
      }
    },
    // 隐藏 √
    hide (v_type) {
      const self = this
      this.UpdateTypefromCpt({
        v_type: v_type,
        type_status: '0'
      })
        .then(res => {
          if (res.data.code === 200) {
            self.makeObjHide(v_type)
            self.$q.sessionStorage.set('allTypes', this.allTypes)
            self.$q.notify({
              message: '隐藏成功',
              type: 'positive',
              position: 'top',
              timeout: 3000
            })
          } else if (res.data.code === 400) {
            self.$q.notify({
              message: '隐藏失败',
              type: 'negative',
              position: 'top',
              timeout: 3000
            })
          }
        })
    },
    // 展示 √
    show (v_type) {
      const self = this
      this.UpdateTypefromCpt({
        v_type: v_type,
        type_status: '1'
      })
        .then(res => {
          if (res.data.code === 200) {
            self.makeObjShow(v_type)
            self.$q.sessionStorage.set('allTypes', this.allTypes)
            self.$q.notify({
              message: '显示成功',
              type: 'positive',
              position: 'top',
              timeout: 3000
            })
          } else if (res.data.code === 400) {
            self.$q.notify({
              message: '显示失败',
              type: 'negative',
              position: 'top',
              timeout: 3000
            })
          }
        })
    },
    // √ 删除
    delType (v_type) {
      // console.log('delete:', value)
      const self = this
      this.delTypeFromCpt(v_type)
        .then(res => {
          if (res.data.code === 200) {
            self.delTypeData(v_type)
            self.$q.sessionStorage.set('allTypes', this.allTypes)
            self.$q.notify({
              message: '删除成功',
              type: 'positive',
              position: 'top',
              timeout: 3000
            })
          } else {
            self.$q.notify({
              message: '删除失败',
              type: 'negative',
              position: 'top',
              timeout: 3000
            })
          }
        })
    },
    // 展示添加卡片
    addType (value) {
      this.medium = value
    },
    // 接受从添加卡片返回的值
    addTypeInCpt ({ formData, show, pushObj }) {
      this.medium = show
      // console.log(pushObj)
      const self = this
      this.addTypefromCpt(formData)
        .then(res => {
          // 若添加成功
          if (res.data.code === 200) {
            // 将添加的数据添加到 state 中的 allTypes 数组中
            self.addTypeData(pushObj)
            // 将 state 中的数据保存到本地缓存
            self.$q.sessionStorage.set('allTypes', this.allTypes)
            self.$q.notify({
              message: '添加成功',
              position: 'top',
              type: 'positive',
              timeout: 3000
            })
          } else {
            self.$q.notify({
              message: '添加失败',
              position: 'top',
              type: 'negative',
              timeout: 3000
            })
          }
        })
    }
  }
}
</script>

<style scoped>
  
</style>