<template>
  <div id="app">
    <Navbar />
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
    <Footer/>
  </div>
</template>

<script>
import Navbar from './components/header/navbar.vue';
import Footer from './components/footer/main.vue';

export default {
  components: {
    Navbar,
    Footer,
  },
  data(){
    return {
      transitionName: 'slide-left',
    };
  },
  beforeRouteUpdate (to, from, next) {
  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length
  this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  next()
}
};

</script>

<style lang="stylus">
@import url('https://rsms.me/inter/inter.css');

$fs = 16px
$myFont = 'Inter', sans-serif

#app
  background linear-gradient(180deg, #ffcb05 26.7%, #ffffff 0%)
  font-size $fs
  font-family $myFont
.white
  background-color white
#color
   bottom 0px
   right 0px
   width 100%
   height 50%
   background-color #fffff
   z-index 1
.slide-right-enter-active, .slide-right-leave-active
   transition-duration 0.6s
   transition-property opacity
   transition-timing-function: ease-in
.slide-right-enter, .slide-right-leave-active
   opacity 0
.slide-left-enter-active, .slide-left-leave-active
  transition-duration 0.6s
  transition-property opacity
  transition-timing-function: ease-out
.slide-left-enter, .slide-left-leave-active
  opacity 0
</style>
