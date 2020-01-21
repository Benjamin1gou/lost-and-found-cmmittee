<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type='text' name='text' v-model='text'>
    <br>
    <button @click='post'>post</button>
  </div>
</template>

<script>
import Methods from '@/api/methods'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      text: ''
    }
  },
  methods: {
    async post() {
      let element = { text: this.text }
      let response = await Methods.testPosting(element)
      console.log(response.data.message)
    }
  }
}
</script>