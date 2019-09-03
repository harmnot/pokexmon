import Vue from 'vue';
import Vuex from 'vuex';
import axios from './API/backend';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemonDetail: null,
    pokemons: null,
    myPokex: null,
    pokemonsDashboard: null,
    emailUser: null,
    hasPokemon: true,
  },
  mutations: {
    FETCH_POKEMONS(state, payload) {
      state.pokemons = payload;
    },
    DASHBOARD_POKEMONS(state, payload) {
      state.pokemonsDashboard = payload;
    },
    SAVE_EMAIL(state, payload) {
      state.emailUser = payload;
    },
    ADD_POKEMON_COUGHT(state, payload) {
      for (let i of state.pokemons) {
        if (i._id === payload.id) {
          i.owned.push(payload.theId);
        }
      }
    },
    POKEMON_USER(state, payload) {
      state.myPokex = payload;
    },
    EMAIL_USER(state, payload) {
      state.emailUser = payload;
    },
    IS_HAS_POKEMON(state, payload) {
      state.hasPokemon = payload;
    },
    DELETE_MYPOKEMON(state, { id, idPokemon }) {
      state.myPokex.pokex = state.myPokex.pokex.filter(({ _id }) => _id !== id);
      if (state.myPokex.pokex.length === 0) {
        state.hasPokemon = false;
      }
      if (state.pokemons !== null) {
        const index = state.pokemons.findIndex(({ _id: theiD }) => theiD === idPokemon);
        if (index !== -1) {
          const findIndex = state.pokemons[index].owned.findIndex(val => val === idPokemon);
          if (findIndex !== -1) {
            state.pokemons[index].owned.splice(findIndex, 1);
          }
        }
      } else if (state.pokemonsDashboard !== null) {
        const index = state.pokemonsDashboard.findIndex(({ _id: theId }) => theId === idPokemon);
        if (index !== -1) {
          const findIndex = state.pokemonsDashboard[index].owned.findIndex(val => val === idPokemon);
          if (findIndex !== -1) {
            state.pokemonsDashboard[index].owned.splice(findIndex, 1);
          }
        }
      }
    },
  },
  actions: {
    async fetchAllPokemon({ commit }) {
      try {
        const { data } = await axios.get('/pokemons');
        commit('FETCH_POKEMONS', data.result);
        commit('DASHBOARD_POKEMONS', data.result.slice(79, 82));
      } catch (err) {
        commit('FETCH_POKEMONS', 'error');
        commit('DASHBOARD_POKEMONS', 'error');
      }
    },
  },
});
