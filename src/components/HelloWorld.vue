<template>
  <div>
    <div class="container">
      <h1>Hellooo vue </h1>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  components: {
  },
  props: {
    msg: String,
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.hello
  background: pink;
</style>
