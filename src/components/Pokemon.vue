<template>
    <div class="container">
        <img alt="Vue logo" src="../assets/pikachu.gif">
        <h1>Pokedex VueJS</h1>
        <PokemonSearch :apiUrl="apiUrl" @setPokemonUrl="setPokemonUrl" />
        <PokemonList :pokemonImageUrl="pokemonImageUrl" @setPokemonUrl="setPokemonUrl" />
        <PokemonDetail v-if="showDetail" :pokemonUrl="pokemonUrl" :pokemonImageUrl="pokemonImageUrl"
            @closeDetail="closeDetail" />
    </div>
</template>
<script>
import PokemonList from "./PokemonList.vue";
import PokemonDetail from "./PokemonDetail.vue";
import PokemonSearch from "./PokemonSearch.vue";

export default {
    data: () => {
        return {
            pokemonImageUrl:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
            apiUrl: "https://pokeapi.co/api/v2/pokemon/",
            pokemonUrl: "",
            showDetail: false
        };
    },
    components: {
        PokemonList,
        PokemonDetail,
        PokemonSearch
    },
    methods: {
        setPokemonUrl(url) {
            this.pokemonUrl = url;
            this.showDetail = true;
        },
        closeDetail() {
            this.pokemonUrl = "";
            this.showDetail = false;
        }
    }
};
</script>
