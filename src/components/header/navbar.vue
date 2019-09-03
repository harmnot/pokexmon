<template>
  <div class="container" id="padding">
    <div class="justify-content-center" v-if="!isMobile">
      <div class="d-flex bd-highlight p-4">
        <div class="p-2 m-1 flex-grow-1 bd-highlight" style="font-size: 20px;">
          <router-link to="/" active-class="active"> PokeXmon </router-link>
        </div>
        <div class="p-2 m-2 bd-highlight">
          <router-link to="/about" active-class="active" > About </router-link>
        </div>
        <div class="p-2 m-2 bd-highlight">
          <router-link to="/pokemons" active-class="active" > Pokemon </router-link>
        </div>
      </div>
    </div>
    <div class="pos-f-t d-flex flex-row justify-content-between" v-else>
      <nav class="mt-2 mb-4 navbar navbar-dark">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </nav>
      <nav class="mt-4 mb-2  d-flex flex-row">
        <div class="mr-2 mt-1">
          <img src="../../assets/pikachussss.png" alt="pika">
        </div>
        <div class="">
          <router-link to="/" active-class="active" style="font-size: 23px;"> PokeXmon </router-link>
        </div>
      </nav>
    </div>
    <div class="mb-4 collapse" id="navbarToggleExternalContent">
      <div class="d-flex flex-column ">
        <div class="ml-4 p-2 d-flex flex-row">
          <div class="mr-1">
            <img src="../../assets/pokeball.png" alt="pokeball">
          </div>
          <div class="ml-1">
            <router-link to="/pokemons" active-class="active" > Pokemons </router-link>
          </div>
        </div>
        <div class="ml-4 p-2 d-flex flex-row">
          <div class="mr-1">
            <img src="../../assets/psyduck.png" alt="psyducj">
          </div>
          <div class="ml-1">
            <router-link to="/about" active-class="active" > About </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  data() {
    return {
      isMobile: false,
    };
  },
  methods: {
    onResize() {
      this.isMobile = window.innerWidth <= 761;
    },
  },
  created() {
    this.isMobile = window.innerWidth <= 761;
    window.addEventListener('resize', this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
};
</script>

<style lang="css" scoped>

  a {
    color: #3466AF;
  }
  a:hover {
    color: #ffffff;
    text-decoration: none;
  }
  #padding {
    padding-left: 0px;
  }
  .navbar-toggler {
    background-color: #d6141475;
    border: 1px solid #d82323c9;
  }
</style>
