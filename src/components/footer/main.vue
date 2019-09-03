<template>
  <div class="ff colorfooter">
    <div class="d-flex flex-wrap justify-content-between" :class="{'ml-4': smallScreen, 'container': !smallScreen}">
      <div class="p-0 my-auto" @click="goTo()">
         <h4 style="font-weight: 500;color:#3466AF;">PokeXmon</h4>
       </div>
       <div class="p-0 d-flex flex-row align-items-center justify-content-center">
         <div class="p-2 mr-2 col-sm-2">
           <a href="https://github.com/harmnot" target="_blank">
             <img src="../../assets/Octocat.jpg" class="img-fluid" style="max-width: 34px;" alt="Github">
           </a>
         </div>
         <div class="p-2 ml-1 col-sm-2">
           <a href="https://www.linkedin.com/in/muhammad-ba508a158/" target="_blank">
             <img src="../../assets/LI-In-Bug.png" class="img-fluid"  style="max-width: 22px;"alt="LinkedIn">
           </a>
         </div>
         <div class="p-2 ml-2 col-sm-2">
           <a href="mailto:muhammad099x@gmail.com?Subject=Hello%20Muhammad" target="_top">
             <img src="../../assets/icons8-email-64.png" class="img-fluid"  style="max-width: 20px;" alt="Email">
           </a>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'main-footer',
  data() {
    return{
      smallScreen: false,
    }
  },
  methods: {
    onResize() {
      if (window.innerWidth < 960) {
        this.smallScreen = true;
      } else {
        this.smallScreen = false;
      }
    },
    goTo() {
      this.$router.push('/');
    },
  },
  created() {
    window.addEventListener('resize', this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
}
</script>

<style lang="stylus" scoped>

.colorfooter
  border-top: 1px solid #f4f4f4;
.ff
  position:fixed;
  left  0
  bottom 0
  width 100%
  background-color #f4f4f4
  margin-top 11px
  padding 4px
  text-align center


</style>
