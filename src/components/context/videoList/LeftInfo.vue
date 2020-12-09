<template>
  <div class="left-info column">
    <div class="item text-weight-bold">@{{ yb_usernick }}</div>
    <div class="full-width item col text-weight-regular text-no-wrap ellipsis">{{ title }}</div>
    <!-- <div class="item row items-center">
      <q-icon name="music_note" class="col-auto"></q-icon>
      <marquee class="col" behavior="" direction="">哈哈</marquee>
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    yb_usernick: {
      type: String
    },
    title: {
      type: String
    }
  }
}
</script>

<style scoped>
.item {
  margin: 0 0 .25rem 0;
  font-size: 1rem;
}
.left-info {
  width: 8rem;
}
</style>
