<template>
  <div>
    这是商品列表页面
  </div>
</template>

<script>
export default {
  name: 'Counter',
  props: ["num"],
  data () {
    return {
      num: 0,
    }
  },
  methods: {
    increment() {
      let vm = this;
      vm.$emit('incre');
    },
    decrement() {
      let vm = this;
      vm.$emit('decre');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
