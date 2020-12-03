<template>
    <q-card style="width: 700px; max-width: 80vw;">
      <q-form autofocus @submit.prevent.stop="submitAdd">
      <q-card-section>
        
        <q-input
          filled
          v-model="addTypeInfo.v_type"
          name="v_type"
          :rules="[val => !!val || '* 必填选项']"
          lazy-rules
          ref="v_type"
          clearable
          clear-icon="close">
          <template v-slot:prepend>
            <q-icon name="event" />
          </template>
        </q-input>
        <div>
          <div class="type">类型：</div>
          <q-radio name="type_status" v-model="addTypeInfo.type_status" val="0" label="不可见" />
          <q-radio name="type_status" v-model="addTypeInfo.type_status" val="1" label="可见" />
        </div>
    
      </q-card-section>
      <q-card-actions align="around" class="bg-white text-teal">
        <q-btn flat label="Cancel" v-close-popup/>
        <q-btn flat label="OK" type="submit"/>
        
      </q-card-actions>
      </q-form>
    </q-card>
  
</template>

<script>
export default {
  data () {
    return {
      addTypeInfo: {
        v_type: null,
        type_status: null
      }
    }
  },
  methods: {
    submitAdd (evt) {
      this.$refs.v_type.validate()
      if (!this.$refs.v_type.hasError && this.addTypeInfo.type_status != null) {
        const formData = new FormData(evt.target)
        // formData => { v_type: String, type_status: String }
        // for (const [ name, value ] of formData.entries()) {
        //   console.log(name + ':' + value)
        //   console.log(typeof value)
        // }
        this.$emit('addType', {
          formData: formData,
          show: false
        })
      } else {
        this.$q.notify({
          message: '请选择可见类型',
          position: 'top',
          type: 'negative',
          timeout: 3000
        })
      }
      
    }
  }
}
</script>

<style scoped>
  .type {
    display: inline-block;
  }
</style>