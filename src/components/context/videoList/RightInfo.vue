<template>
  <div class="right-info">
    <div class="avatar relative-position text-center">
      <q-avatar>
        <img src="~assets/avatar/星空.jpg">
      </q-avatar>
      <q-icon name="iconfont icon-jia-tianchong" class="text-pink icon-jia" size="1.35rem"></q-icon>
    </div>
    <div class="item text-center" :class="this.like? 'text-red': 'text-grey-9'" @click.stop="changeLike">
      <q-icon name="iconfont icon-aixin_shixin" size="2rem"></q-icon>
      <p>1.4w</p>
    </div>
    <div class="item text-center" :class="this.money? 'text-red': 'text-grey-9'">
      <q-icon name="iconfont icon-dashang" size="2.5rem"></q-icon>
      <p>1w</p>
    </div>
    <div class="rounded relative-position text-center">
      <q-avatar size="2.4rem" class="absolute-center">
        <img src="~assets/avatar/星空.jpg">
      </q-avatar>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      like: true,
      money: false
    }
  },
  methods: {
    changeLike () {
      this.like = !this.like
    }
  }
}
</script>

<style scoped>
.right-info .avatar .icon-jia {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -20%;
}
.right-info .item:nth-child(2) {
  padding-top: calc(1.5rem + 1.35rem/2);
}
.right-info .item:nth-child(3) {
  padding: 1.5rem 0;
}
.right-info .item p {
  margin-bottom: 0;
}
@keyframes rounded {
  0% {
    transform: rotate(0);
  } 100% {
    transform: rotate(360deg);
  }
}
.right-info .rounded {
  animation: rounded linear 5s infinite;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: #2e2e2e;
}
</style>