<template>
  <div >
    <div class="m container text-center d-flex flex-column flex-wrap justify-content-center">
      <div class="d-flex flex-column">
        <div>
          <h3> Play our game in just minutes</h3>
        </div>
        <div>
          <p>find your favorite pokemons and show them to your friends</p>
        </div>
      </div>
      <div class="mt-2 space d-flex text-center flex-column flex-wrap align-items-center justify-content-center">
        <div class="d-flex flex-column" :class="{box: !isMobiles, boxx: isMobiles}">
          <div class="wrapper">
            <img src="../../assets/pokeballblues.png" alt="pokeball">
          </div>
          <div class="mt-2 line">
            <p> caught them</p>
          </div>
        </div>
        <div class="d-flex flex-column" :class="{box: !isMobiles, boxx: isMobiles}">
          <div class="wrapper">
            <img src="../../assets/plus.png" alt="pokemon">
          </div>
          <div class="mt-2 line">
            <p> name them & save</p>
          </div>
        </div>
        <div class="d-flex flex-column" :class="{box: !isMobiles, boxx: isMobiles}">
          <div class="wrapper">
            <img src="../../assets/pbage.png" alt="pokexbag">
          </div>
          <div class="mt-2 line">
            <p> check & enjoy</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'section-three',
  data() {
    return {
      isMobiles: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.isMobiles = window.innerWidth <= 761 ? true : false;
      window.onresize = () => {
        this.isMobiles = window.innerWidth <= 761 ? true : false;
      }
    });
  },
};
</script>
<style lang="stylus" scoped>

.box
  width 20%
.boxx
  width auto;
.line
  line-height 1.16
.wrapper
  position relative
  overflow hidden
.wrapper:after
  content ''
  display block
  padding-top 100%
.wrapper img
  width auto
  height 100%
  max-width none
  position absolute
  left 50%
  top 0
  transform translateX(-50%)
  text-align: center;
.space
  margin-bottom: 100px;
.m
  margin-top: 60px;
</style>
