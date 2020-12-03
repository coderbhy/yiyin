<template>
  <q-page class="manage-home q-pa-sm row items-center justify-center">
    <home-table class="col" :type-array="VisibleTypes" @getTypeData="getTypeData"></home-table>
  </q-page>
</template>

<script>
import HomeTable from 'components/context/manageHome/HomeTable'
import { mapGetters } from 'vuex'
export default {
  components: {
    HomeTable
  },
  methods: {
    getTypeData (obj) {
      console.log(obj)
    }
  },
  computed: {
    ...mapGetters({
      'VisibleTypes': 'manager/VisibleTypes'
    })
    
  }
}
</script>

<style scoped>
  
</style>