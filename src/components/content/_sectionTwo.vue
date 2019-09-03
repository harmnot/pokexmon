<template>
  <div style="background-color: #ffcb05;">
    <div class="d-flex flex-wrap justify-content-around" :class="{'flex-column': isMobile, 'flex-row': !isMobile}">
      <div class="p-0 text-center" :class="{'marginn': !isMobile, 'my-4': isMobile}">
        <h3>100+</h3>
        <h4>Pokemons</h4>
      </div>
      <div class="p-0 text-center" :class="{'marginn': !isMobile, 'my-4': isMobile}">
        <h3>20+</h3>
        <h4>Users</h4>
      </div>
      <div class="p-0 text-center" :class="{'marginn': !isMobile, 'my-4': isMobile}">
        <h3> Unlimited</h3>
        <h4>Pokex</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'section-two',
  data() {
    return {
      isMobile: false,
    };
  },
  methods: {
    onResize() {
      this.isMobile = window.innerWidth <= 790 ? true : false;
    },
  },
  created() {
    this.isMobile = window.innerWidth <= 791;
    window.addEventListener('resize', this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
};
</script>

<style lang="stylus" scoped>

.marginn
  margin-top 4rem !important
  margin-bottom 4rem !important
h3
  font-size 53px
  font-weight 500
  line-height: 0.8
h4
  font-size: 16px

</style>
