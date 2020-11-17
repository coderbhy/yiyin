<template>
  <q-tabs
    dense
    class="bg-white text-black tab-bar"
    narrow-indicator
    indicator-color="primary"
    active-color="primary">
    <q-route-tab
      icon="home"
      to="/home"
      exact />
    <q-fab icon="add" direction="up" padding="xs" class="bg-primary text-white" vertical-actions-align="center">
      <q-fab-action external-label label-position="right" label="拍摄" color="primary" icon="icon-paishe" to="/shoot"/>
      <q-fab-action external-label label-position="right" label="上传" color="secondary" icon="icon-shangchuan" />
    </q-fab>
    <q-route-tab
      icon="person"
      to="/profile"
      exact
    />
  </q-tabs>
</template>

<script>
export default {
  
}
</script>

<style>
  .tab-bar {
    box-shadow: 0 -.5px 2px grey;
  }
  body.mobile .q-tabs__content {
    overflow: visible !important;
  }
</style>
