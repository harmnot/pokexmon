<template>
  <div class="mb-4 mt-0 white">
    <div class="d-flex flex-wrap justify-content-center align-items-center">
      <div class="mt-4 p-2" v-if="pokemonDetail === null">
        <Loader />
      </div>
      <div class="mt-4 mb-4 p-4 text-center" v-else-if="pokemonDetail === 'error'">
        <div class="p-4 picduck align-items-center justify-content-center">
          <img src="../../assets/duckk.png" class="img-fluid" alt="physuck">
        </div>
        <h4> sorry, something went wrong, try refresh </h4>
      </div>
      <div class="mb-4 p-1 d-flex flex-column flex-wrap justify-content-center align-items-center" v-else>
        <div class="mt-4 p-0 pic" v-if="!cought && !failedCought">
          <img :src="pokemonDetail.pokemon_detail.pic" class="img-fluid" alt="pokemon">
        </div>
        <div class="mt-4 p-2" v-if="cought">
          <img src="../../assets/pokball11.gif" class="img-fluid" style="width: 400px;" alt="pokeball">
        </div>
        <div class="mb-4 p-3 d-flex flex-column flex-wrap" v-if="saveAndGiveName">
          <div class="p-1">
            <h4> Horeeyyy... you cought {{ pokemonDetail.name }}</h4>
            <p> save <b>{{ pokemonDetail.name }}</b> to your bag list, give the Nickname and save to your email</p>
          </div>
          <div class="p-1">
            <input class="form-control form-control-lg" type="text" v-model="nickName" pattern="[A-Za-z]" placeholder="Input Nickname">
          </div>
          <div class="p-1">
            <input class="form-control form-control-lg" type="email" v-model="emailUser" placeholder="Pokemon Bag Email">
          </div>
          <div class="mb-4 p-2">
            <button type="button" class="btn btn-primary" v-if="!loadingSavePokemon" @click="savePokemon(pokemonDetail._id)">Save to bag</button>
            <button class="btn btn-primary" type="button" disabled v-if="loadingSavePokemon">
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Save to bag
            </button>
          </div>
        </div>
        <div class="p-1 pic" v-if="savedToBag" style="margin-top: 78px;">
          <img src="../../assets/pbag2.jpg" class="img-fluid" alt="pokexbag">
        </div>
        <div class="p-4" v-if="savedToBag">
          {{ nickName.toUpperCase() }} succesfully save to your pokex bag
        </div>
        <div class="p-1" v-if="savedToBag">
          <button type="button" class="btn btn-primary" @click="goToMylistPokemon()">My pokex bag</button>
        </div>
        <div class="mb-4 p-1" v-if="savedToBag">
          <button type="button" class="btn btn-primary" style="background-color: #ffcb05;" @click="allPokemons()" >Find more pokemons</button>
        </div>
        <div class="p-1 pic" v-if="failedCought && !temp" style="margin-top: 78px;">
          <img src="../../assets/caat.jpg" class="img-fluid" alt="pokex">
        </div>
          <div class="mt-2 p-1 text-center" v-if="failedCought && !temp">
            <h4> try catch another pokemons</h4>
          </div>
          <div class="mb-4 p-1" v-if="failedCought && !temp">
            <button type="button" class="btn btn-primary" @click="allPokemons()">All pokemons</button>
          </div>
        <div class="p-0 mb-4" v-if="!saveAndGiveName && !failedCought">
          <h1>{{ pokemonDetail.name }}</h1>
        </div>
        <div class="mb-4 container d-flex flex-column" v-if="!saveAndGiveName && !failedCought">
          <div class="p-0 d-flex flex-column flex-wrap">
            <div class="container shadow p-2 mb-2 bg-white rounded" :class="{'bigscreen': isBigScreen }" >
              <div class="d-flex flex-row justify-content-between">
                <div class="d-flex flex-lg-row" style="width: 150px;">
                  <h5> Type </h5>
                </div>
                <div>
                  <span> {{ pokemonDetail.type.join(', ') }}</span>
                </div>
              </div>
              <div class="d-flex flex-row justify-content-between">
                <div class="d-flex flex-lg-row" style="width: 150px;">
                  <h5> Height </h5>
                </div>
                <div>
                  <span> {{ pokemonDetail.pokemon_detail.height }} cm</span>
                </div>
              </div>
              <div class="d-flex flex-row justify-content-between">
                <div class="d-flex flex-lg-row" style="width: 150px;">
                  <h5> Weight </h5>
                </div>
                <div>
                  <span> {{ pokemonDetail.pokemon_detail.weight}} pounds</span>
                </div>
              </div>
            </div>
            <div class="mt-2 d-flex flex-column flex-wrap justify-content-center align-items-center">
              <div class="p-0 mb-2">
                <h5> Moves</h5>
              </div>
              <div class="p-0 d-flex float-left flex-row flex-wrap align-items-center shadow-sm p-2 bg-white rounded" :class="{'smallscreen': !isBigScreen, 'bigscreen bigscroll':isBigScreen }"v-if=" pokemonDetail.moves.length >= 13">
                <div class="" v-for="(move, index) in pokemonDetail.moves" :key="index" style="width: 128px;">
                  <a class="p-2 mx-1 my-1 badge badge-primary" > {{move}} </a>
                </div>
              </div>
              <div class="p-0 d-flex float-left flex-row flex-wrap align-items-center shadow-sm p-2 bg-white rounded" v-else :class="{'bigscreen': isBigScreen}">
                <div class="" v-for="(move, index) in pokemonDetail.moves" :key="index" style="width: 128px;">
                  <a class="p-2 mx-1 my-1 badge badge-primary" > {{move}} </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-4 p-2" v-if="!cought && (!saveAndGiveName && !failedCought)">
          <button type="button" class="btn btn-primary" @click="coughtPokemon()">catch this</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '../reusable/loader.vue';

export default {
  name: 'pokemon-detail',
  components: {
    Loader,
  },
  data() {
    return {
      id: this.$route.params.id,
      pokemonDetail: null,
      isBigScreen: false,
      cought: false,
      saveAndGiveName: false,
      failedCought: false,
      savedToBag: false,
      nickName: '',
      temp: false,
      emailUser: '',
      loadingSavePokemon: false,
    };
  },
  methods: {
    async fetchDetailPokemon() {
      try {
        const { data } = await this.$axios.get(`/pokemons/${this.id}`);
        this.pokemonDetail = data.result;
      } catch (err) {
        this.pokemonDetail = 'error';
      }
    },
    allPokemons() {
      this.$router.push('/pokemons');
    },
    onResize() {
      this.isBigScreen = window.innerWidth >= 991;
    },
    coughtPokemon() {
      window.scrollTo(0,0);
      this.cought = true;
      const dateNow = new Date().getDay();
      const idPokemons = this.pokemonDetail.pokemon_detail.id;
      const setThisTimeOut = 6000 + dateNow + idPokemons;
      setTimeout(() => {
        const idPokex = [this.pokemonDetail.name, 'zonk', this.pokemonDetail.name, 'zonk'];
        const random = Math.floor(Math.random() * idPokex.length);
        if (idPokex[random] !== 'zonk') {
          this.$swal.fire({
            title: 'Gotcha',
            text: `you cought ${this.pokemonDetail.name}`,
            type: 'success',
            timer: 1200,
          });
          this.cought = false;
          window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
          this.saveAndGiveName = true;
        } else {
          this.$swal.fire({
            title: 'Sorry',
            text: `you can't cought ${this.pokemonDetail.name}`,
            type: 'warning',
          });
        this.cought = false;
        this.failedCought = true;
        }
      }, setThisTimeOut);
    },
    async savePokemon(id) {
      const dataToSend = {
        nickname: this.nickName,
        email: this.emailUser,
        idPokemon: id,
      };
      const reg = /[!@#$%^&*()_+{}\[\]:;'"\/\\?><.,1234567890]/;
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (reg.test(this.nickName)) {
        this.$swal.fire({
          title: 'Error',
          text: 'only allow alphabets',
          type: 'error',
          timer: 1200,
        });
      } else if (!re.test(this.emailUser)) {
        this.$swal.fire({
          title: 'Error',
          text: 'please use valid email',
          type: 'error',
          timer: 1200,
        });
      } else {
        this.loadingSavePokemon = true;
        try {
          const { data } = await this.$axios.post('/pokex/createpokex', dataToSend);
          if (data.result.email === this.emailUser.toLowerCase()) {
            this.$store.commit('ADD_POKEMON_COUGHT', {id: this.id, theId: data.pokex._id });
            this.nickName = data.pokex.nickname;
            this.loadingSavePokemon = false;
            this.failedCought = true;
            this.temp = true;
            this.saveAndGiveName = false;
            this.savedToBag = true;
          }
        } catch (err) {
          this.$swal.fire({
            title: 'Error',
            text: 'something went wrong',
            type: 'error',
            timer: 1200,
          });
          this.loadingSavePokemon = false;
        }
      }
    },
    goToMylistPokemon() {
      this.$router.push('/pokexbag/email='+ this.emailUser);
    }
  },
  created() {
    window.scrollTo(0,200);
    this.isBigScreen = window.innerWidth >= 991;
    this.fetchDetailPokemon();
    window.addEventListener('resize', this.onResize);

  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
};
</script>

<style lang="stylus" scoped>

.pic > img
  width 340px;
.picduck > img
  width: 235px;
.bigscreen
  width 350px
.bigscroll
  width: 400px;
  overflow scroll
  height 288px
.smallscreen
  height 200px
  overflow scroll
.badge-primary
  background-color #3466AF
a:not([href]):not([tabindex])
  color white
.btn
  padding 0.9rem 1.75rem
  background-color #3466AF

</style>
