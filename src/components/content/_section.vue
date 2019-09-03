<template>
  <div >
    <div class="mt-4 container text-center">
      <div class="d-flex flex-column">
        <div class="p-2">
          <h2> <b>Caught your Pokemon</b> </h2>
          <p class="mt-4"> if you have caught your favorite pokemon, search your collection here</p>
        </div>
        <div class="mb-2 d-flex flex-wrap justify-content-center">
          <div class="mb-2 col-md-4">
            <input class="form-control form-control-lg" type="email" v-model="email" placeholder="Email Address">
          </div>
          <div class="col-xs-10">
            <button type="button" class="btn btn-primary" @click="findMyPokex()" :disabled="checking"> Find me</button>
          </div>
        </div>
        <div class="mt-4 text-left d-flex flex-column justify-content-center shadow p-3 mb-5 bg-white rounded" style="position: relative;">
          <div class="text-center my-2" v-if="pokemonsDashboard === null">
            <Loader/>
          </div>
          <div class="text-center my-2" v-else-if="pokemonsDashboard === 'error'">
            <span> something went wrong, please refresh page again </span>
          </div>
          <div class="mb-4 d-flex flex-row flex-wrap justify-content-around" v-else>
            <PokemonList :thePokemons='pokemonsDashboard'/>
          </div>
        </div>
        <div class="mt-2 text-center d-flex flex-column justify-content-center">
          <div class="p-0 mb-4">
            <h3> Simple but fun</h3>
          </div>
          <div class="p-4 d-flex flex-row flex-wrap justify-content-around">
            <div class="p-0">
              <img src="../../assets/cu.png" class="img-fluid" alt="pikachu">
            </div>
            <div class="p-2 text-left  my-auto d-flex flex-column" style="line-height: 1.6; width: 520px;" >
              <div class="p-0">
                <h4> PokeXmon </h4>
              </div>
              <div class="p-0 text-left">
                <p> take time to relax and have fun with our cute pokemons, <br>they wait to be yours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <SectionTwo/>
    </div>
    <div>
      <SectionThree/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PokemonList from '../pokemon/pokemon-list';
import SectionTwo from './_sectionTwo.vue';
import SectionThree from './_sectionThree.vue';
import Loader from '../reusable/loader.vue';

export default {
  name: 'my-pokex',
  components: {
    PokemonList,
    SectionTwo,
    SectionThree,
    Loader,
  },
  computed: {
    ...mapState(['pokemonsDashboard']),
  },
  data() {
    return {
      email: '',
      checking: false,
    };
  },
  methods: {
    async findMyPokex() {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!re.test(this.email)) {
        this.$swal.fire({
          title: 'Error',
          text: 'please use valid email',
          type: 'error',
          timer: 1300,
        });
      } else {
        this.checking = true
        try {
          const { data } = await this.$axios.get('/user/detail?email=' + this.email);
          if (data.result.email == this.email.toLowerCase()) {
            this.$router.push(`/pokexbag/email=${this.email}`);
            this.checking = false;
          }
        } catch (err) {
          this.checking = false;
          let error = 'something went wrong'
          if(err.response.status === 404){
            error = `can't found data`
          }
          this.$swal.fire({
            title: 'Error',
            text: error,
            type: 'error',
            timer: 1800,
          });
        }
      }
    },
  },
  created() {
    this.$store.dispatch('fetchAllPokemon');
  },
  mounted() {
  },
};

</script>

<style lang="stylus" scoped>

h2
  font-size 42px
h3
  font-size 39.8px
.form-control-lg
  height calc(1.85em + 1rem + 1px)
.btn
  padding 0.9rem 1.75rem
  background-color #3466AF

</style>
