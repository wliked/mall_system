<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <Counter :num="num" @incre="increment" @decre="decrement"></Counter>
    <p>parents: {{num}}</p>
  </div>
</template>

<script>
  import Counter from './Counter'
  export default {
    name: 'HelloWorld',
    components:{
      Counter: Counter
    },
    data () {
      return {
        num: 10,
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      increment() {
        let vm = this;
        vm.num++;
      },
      decrement() {
        let vm = this;
        vm.num--;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
