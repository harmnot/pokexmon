<template>
  <div>
    <SectionOne/>
  </div>
</template>

<script>
// @ is an alias to /src
import SectionOne from '@/components/content/_section.vue';
// import SectionTwo from '@/components/content/_sectionTwo.vue';

export default {
  name: 'home',
  components: {
    SectionOne,
    // SectionTwo,
  },
};
</script>
<style lang="stylus" scoped>

#test
  position: fixed;
  top: 50px;
  right: 30px;
  z-index: 1;
  clear: both;


</style>
