<template>
  <div class="q-pa-md">
    <q-infinite-scroll @load="onLoad" :offset="250" ref="sc">
      <q-btn @click="js"></q-btn>
      <div v-for="(item, index) in items" :key="index" class="caption">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.</p>
      </div>
      <button>111</button>
      <template v-slot:loading v-show="show">
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
      <q-separator inset class="q-my-xs"></q-separator>
      <div v-show="show" class="text-center">tip</div>
    </q-infinite-scroll>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      items: [ {}, {}, {} ],
      totalData: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 }
      ]
    }
  },

  methods: {
    onLoad (index, done) {
      console.log(index)
      setTimeout(() => {
        if (this.items) {
          this.items.push({})
          done()
        }
      }, 2000)
    },
    js () {
      this.$refs.sc.stop()
      this.show = !this.show
    }
  }
}
</script>

<style lang="">
  
</style>