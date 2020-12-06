<template>
  <div class="row justify-center q-mt-md home-page">
      <q-pagination
        :value="currentPage"
        @input="changePage"
        :max="CheckMaxPage"
        :input="true"
        size="sm"
      />
    </div>
</template>

<script>
export default {
  props: {
    CheckMaxPage: {
      type: Number
    },
    currentPage: {
      type: Number
    }
  },
  data () {
    return {
    }
  },
  methods: {
    changePage (value) {
      this.$emit('pageIsChange', value)
    }
  }
}
</script>

<style lang="">
  
</style>