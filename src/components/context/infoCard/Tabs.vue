<template>
  <div class="tabs">
    <q-tabs
      v-model="tab"
      class="text-black"
      indicator-color="orange"
      dense
    >
      <q-tab name="mails"  label="作品" />
      <q-tab name="alarms" label="动态" />
      <q-tab name="movies" label="喜欢" />
    </q-tabs>
    <q-separator></q-separator>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="mails">
        
      </q-tab-panel>

      <q-tab-panel name="alarms">
        alarm
      </q-tab-panel>

      <q-tab-panel name="movies">
        movie
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tab: 'mails'
    }
  }
}
</script>

<style scoped>
  .tabs .q-tab-panel {
    padding: .5rem;
  }
</style>