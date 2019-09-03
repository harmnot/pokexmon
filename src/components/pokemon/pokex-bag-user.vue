<template>
  <div class="white mb-4 container" style="border-radius: 30px" >
    <div class="d-flex justify-content-center">
      <div class="p-2" v-if="!myPokex">
        <Loader />
      </div>
      <div class="white mb-4 container d-flex flex-column align-items-center" style="border-radius: 30px" v-else-if="myPokex.type === '404' || myPokex.type === '500' ">
        <div class="p-2 picc">
          <img src="../../assets/duckk.png" alt="phyduck">
        </div>
        <h2> {{ myPokex.error }}</h2>
      </div>
      <div class="mt-4 mb-4"v-else>
        <div class="mt-4 mt-4 mb-4 text-center">
          <h4 style="word-break: break-all;"> {{ email }}</h4>
        </div>
        <PokemonList :myPokex="true" :myListPokex="myPokex.pokex" :pageList="true" :size="9" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PokemonList from './pokemon-list.vue';
import Loader from '../reusable/loader.vue';

export default {
  name: 'my-pokemon-list',
  components: {
    PokemonList,
    Loader,
  },
  data() {
    return{
      email: this.$route.params.email,
    };
  },
  computed: {
    ...mapState(['myPokex']),
  },
  async created() {
    try {
      const { data } = await this.$axios.get('/user/detail?email=' + this.email);
      if(data.result.pokex.length === 0 || data.result.pokex.length <= 9 ){
        this.$store.commit('IS_HAS_POKEMON', false);
      }
      if(data.result.email === this.email) {
        this.$store.commit("POKEMON_USER", data.result);
      }
    } catch (err) {
      if (err == 'Error: Network Error'){
        this.$store.commit("POKEMON_USER", { type: '500', error: `something went wrong`});
      } else if (err.response.status === 404){
        this.$store.commit("POKEMON_USER", { type: '404', error: `can't found any`});
      } else {
        this.$store.commit("POKEMON_USER", { type: '500', error: `something went wrong`});
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        if(this.myPokex === null){
          this.$store.commit("POKEMON_USER", { type: '500', error: `something went wrong`});
        }
      }, 10000);
    })
  },
};
</script>

<style lang="stylus" scoped>
.picc > img
  width 265px
</style>
