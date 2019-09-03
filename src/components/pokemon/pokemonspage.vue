<template>
  <div class="white">
    <div class="d-flex flex-column align-items-center">
      <img src="../../assets/poxx.jpg" class="img-fluid" alt="pokemons">
    </div>
    <div class="p-2 d-flex flex-row justify-content-center">
      <div class="p-2 d-flex justify-content-center" v-if="pokemons === null">
        <Loader/>
      </div>
      <div class="p-2 d-flex justify-content-center" v-else-if="pokemons === 'error'">
        <h4> Something went wrong, try refresh again </h4>
      </div>
      <div class="mt-4 mb-4 p-3 d-flex flex-row flex-wrap justify-content-center" v-else>
        <PokemonList :thePokemons="pokemons" :pageList="true" :size="12" :forPageList="true"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PokemonList from './pokemon-list.vue';
import Loader from '../reusable/loader.vue';

export default {
  name: 'pokemonpage',
  components: {
    PokemonList,
    Loader,
  },
  data() {
    return {
      search: '',
    };
  },
  computed: {
    ...mapState(['pokemons']),
  },
  async created() {
    await this.$store.dispatch('fetchAllPokemon');
  },
};
</script>

<style lang="stylus" scoped>
.img-fluid
  max-width: 300px;
</style>
