<template>
  <div class="mt-2">
    <div class="d-flex flex-row flex-wrap" :class="{'justify-content-around': !pageList, 'justify-content-center': pageList}" v-if="!myPokex">
      <div class="p-1 mt-4 d-flex flex-wrap" v-for="(pokemons, index) in thePaginatedData" :key="index" @click="goToPokemonsDetail(pokemons._id)" id="hover">
        <div class="p-1 m-1 d-flex flex-content-around shadow p-3 mb-1 bg-white rounded box">
          <div class="my-auto" v-if="!myPokex">
            <img :src="pokemons.pokemon_detail.pic" alt="pokemon pic">
          </div>
          <div class="p-1 d-flex flex-column">
            <div class="p-0" v-if="!myPokex">
              <h4> {{ pokemons.name}} </h4>
            </div>
            <div class="p-1" v-if="!myPokex">
              <span> owned by {{ pokemons.owned.length}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-4 d-flex flex-row flex-wrap white shadow-lg bg-white rounded" :class="{'justify-content-around': !pageList, 'justify-content-center': pageList }" v-if="myPokex">
      <div class="p-1 mt-4 text-center d-flex flex-wrap" v-if="myListPokex.length > 0" v-for="(pokemons, index) in thePaginatedData" :key="index">
        <div class="p-1 m-1 d-flex flex-column flex-content-around shadow-lg p-2 mb-4 bg-white rounded box">
          <div class="text-right">
            <span class="mr-3" style="color:#CC0000; cursor: pointer;" @click="deleteThisPokemon(pokemons._id, pokemons.pokemon._id)"> X </span>
          </div>
          <div class="my-auto">
            <img :src="pokemons.pokemon.pokemon_detail.pic" alt="pokemon pic">
          </div>
          <div class="p-1 d-flex flex-column">
            <div class="p-0">
              <h4> {{ pokemons.nickname}} </h4>
            </div>
            <div class="p-0 d-flex flex-column flex-wrap">
              <div class="p-0">
                <span>caught at</span>
              </div>
              <div class="p-0">
                <small>  {{ pokemons.created_at.split('T')[0] }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="p-1 mt-4 text-center d-flex flex-wrap flex-column" v-if='myListPokex.length == 0'>
        <div class="p-2 picc">
          <img src="../../assets/duckk.png" alt="phyduck">
        </div>
        <div class="mt-2">
          <h4> NO POKEMON </h4>
        </div>
      </div>
    </div>
    <div class="mb-4 d-flex flex-row flex-wrap justify-content-center" v-if="pageList && (hasPokemon || forPageList)">
      <div class="mx-2 my-4 col-xs-10">
        <button type="button" class="btn btn-primary" @click="prevPage" :disabled="pageNumber === 0"> Prev </button>
      </div>
      <div class="mx-2 my-4 col-xs-10">
        <button type="button" class="btn btn-primary" @click="nextPage" :disabled="pageNumber >= pageCount -1"> Next </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'pokemon-list',
  props: {
    pageList: {
      type: Boolean,
      default: false,
    },
    size: {
      type: Number,
      default: 10,
    },
    thePokemons: Array,
    myListPokex: Array,
    myPokex: {
      type: Boolean,
      default: false,
    },
    forPageList: Boolean,
  },
  computed: {
    ...mapState(['hasPokemon']),
    pageCount() {
      let currentDate = this.myPokex === true ? this.myListPokex : this.thePokemons;
      const [l, s] = [currentDate.length, this.size];
      return Math.ceil(l / s);
    },
    thePaginatedData() {
      let currentDate = this.myPokex === true ? this.myListPokex : this.thePokemons;
      const start = this.pageNumber * this.size;
      const end = start + this.size;
      return currentDate.slice(start, end);
    },
  },
  data() {
    return {
      pageNumber: 0,
      deleting: false,
    };
  },
  methods: {
    goToPokemonsDetail(id) {
      this.$router.push({ path: `/pokemons/${id}` });
    },
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
    deleteThisPokemon(id, idPokemon) {
      this.$swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ffcb05',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.$swal.fire({
            title: 'Deleting...',
            allowOutsideClick: false,
            onOpen: () => {
              this.$swal.showLoading();
            }
          })
          this.$axios.delete('/pokex/'+ id)
          .then(({data}) => {
            if(data.result === 'successfully deleted') {
              this.$store.commit('DELETE_MYPOKEMON', {id: id, idPokemon: idPokemon });
              this.$swal.close();
            }
          })
          .catch(err => {
            this.$swal.fire({
              title:'Error',
              text: 'something went wrong',
              type: 'error',
              timer: 1500,
            });
          })
        }  else {
          this.$swal.close();
        }
      })
    },
  },
  beforeDestroy() {
    this.$store.commit('POKEMON_USER', null );
  },
};
</script>

<style lang="stylus" scoped>

.box
  width 265px
  border-radius 13px
#hover
  cursor pointer
.btn
  padding 0.9rem 1.25rem
  background-color #3466AF
.picc > img
  width 230px

.slide-enter-active, .slide-leave-active
  transition-duration 0.6s
  transition-property opacity
  transition-timing-function: ease-in
.slide-enter, .slide-leave-active
  opacity 0
</style>
