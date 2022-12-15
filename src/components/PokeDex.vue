<template>
    <div class="relative pt-10">
        <div v-if="showDetail" class="bg-black absolute top-0 left-0 bottom-0 right-0 z-20 bg-opacity-80"></div>
        <div class="container mx-auto z-10 relative">
            <SiteHeader />



            <PokemonSearch :apiUrl="apiUrl" @setPokemonUrl="setPokemonUrl" />

            <PokemonList :pokemonImageUrl="pokemonImageUrl" @setPokemonUrl="setPokemonUrl" />

        </div>
        <div class="z-30 relative">
            <PokemonDetail v-if="showDetail" :pokemonUrl="pokemonUrl" :pokemonImageUrl="pokemonImageUrl"
                @closeDetail="closeDetail" />
        </div>
    </div>

</template>
<script>
import PokemonList from "./PokemonList.vue";
import PokemonDetail from "./PokemonDetail.vue";
import PokemonSearch from "./PokemonSearch.vue";
import SiteHeader from "./SiteHeader.vue";


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
        PokemonSearch,
        SiteHeader,

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
