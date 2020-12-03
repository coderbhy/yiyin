<template>
  <div class="shoot-bar row" :style="{ height: this.height  }">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  // height 不限制类型
  props: [ 'height', 'wid' ]
}
</script>

<style>
.shoot-bar .left, .shoot-bar .right {
  width: 20%;
  height: 100%
}
.shoot-bar .center {
  width: 60%;
  height: 100%;
}
</style>