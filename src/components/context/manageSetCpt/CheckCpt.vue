<template>
  <div class="check-cpt">
    <q-list bordered padding>
      <q-item-label header>{{ title }}</q-item-label>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Picture uploaded</q-item-label>
          <q-item-label caption>Allow notification when uploading images</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-toggle
            :value="checkModuleDark"
            checked-icon="nights_stay"
            color="primary"
            unchecked-icon="brightness_low"
            size="lg"
            @input="changeDark"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  props: {
    title: {
      type: String
    }
  },
  data () {
    return {
      third: true
    }
  },
  computed: {
    ...mapState({
      'checkModuleDark': state => state.manager.checkModuleDark
    })
  },
  methods: {
    ...mapMutations({
      'changeCheckDark': 'manager/changeCheckDark'
    }),
    changeDark (value) {
      this.$q.localStorage.set('checkModuleDark', value)
      this.changeCheckDark(value)
    }
  }
}
</script>

<style lang="stylus" scoped>
  
</style>