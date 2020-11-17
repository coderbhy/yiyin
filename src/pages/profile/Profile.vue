<template>
  <q-page class="profile">
    <personal />
    <Tabs />
  </q-page>
  
</template>

<script>
import Personal from 'components/context/infoCard/Personal'
import Tabs from 'components/context/infoCard/Tabs'
export default {
  data () {
    return {
    }
  },
  components: {
    Personal,
    Tabs
  }
}
</script>

<style lang="stylus" scoped>

</style>
