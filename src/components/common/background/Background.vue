<template>
  <div class="absolute background">
    <div class="container relative-position overflow-hidden">
      <div class="item absolute-bottom"></div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="stylus" scoped>
  .background
    z-index -10
  .container
    width 100vw
    height 30vh
    background white
  .item
    width 180%
    background $primary
    border-radius 50%
    height 100vh
    left 50%
    margin-left -(@width/2)
</style>
