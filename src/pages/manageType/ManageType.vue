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
import { mapState, mapActions, mapGetters } from 'vuex'
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
    ...mapGetters({
      'VisibleTypes': 'manager/VisibleTypes',
      'InvisibleTypes': 'manager/InvisibleTypes'
    })
  },
  methods: {
    ...mapActions({
      'delTypeFromCpt': 'manager/delTypeFromCpt',
      'getTypesFromInterface': 'manager/getTypesFromInterface',
      'UpdateTypefromCpt': 'manager/UpdateTypefromCpt',
      'addTypefromCpt': 'manager/addTypefromCpt'
    }),
    hide (value) {
      const self = this
      return this.UpdateTypefromCpt({
        v_type: value,
        type_status: '0'
      })
        .then(res => {
          self.getTypesFromInterface()
          self.$q.notify({
            message: '隐藏成功',
            type: 'positive',
            position: 'top',
            timeout: 3000
          })
        })
      console.log('parent', value)
    },
    show (value) {
      this.UpdateTypefromCpt({
        v_type: value,
        type_status: '1'
      })
        .then(res => {
          self.getTypesFromInterface()
          self.$q.notify({
            message: '显示成功',
            type: 'positive',
            position: 'top',
            timeout: 3000
          })
        })
      console.log('parent', value)
    },
    delType (value) {
      console.log('delete:', value)
      const self = this
      this.delTypeFromCpt(value)
        .then(res => {
          if (res.data.code === 200) {
            self.getTypesFromInterface()
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
    addType (value) {
      this.medium = value
    },
    addTypeInCpt ({ formData, show }) {
      // console.log(formData)
      // console.log(show)
      // console.log(formData.get('v_type'))
      // console.log(formData.get('type_status'))
      this.medium = false
      const self = this
      this.addTypefromCpt(formData)
        .then(res => {
          self.getTypesFromInterface()
          if (res.data.code === 200) {
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