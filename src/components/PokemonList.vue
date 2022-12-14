<template>
    <div class="list">
        <article v-for="(pokemon, index) in pokemons" :key="'poke' + index" @click="setPokemonUrl(pokemon.url)">
            <img :src="pokemonImageUrl + pokemon.id + '.png'">
            <h3>{{ pokemon.name }}</h3>
        </article>
        <div id="scroll-trigger" ref="infinitescrolltrigger">
            <i class="fas fa-spinner fa-spin"></i>
        </div>
        <Observer @intersect="intersected" />
    </div>
</template>
  
<script>
import Observer from './Observer.vue'
export default {
    components: { Observer },
    props: [
        'pokemonImageUrl',
    ],
    data: () => {
        return {
            apiUrl: "https://pokeapi.co/api/v2/pokemon?limit=10",
            pokemons: [],
            postsPerPage: 5,
            nextUrl: '',
            currentUrl: '',
        }
    },
    methods: {
        async intersected() {
            if (this.apiUrl !== null) {
                this.loadPosts();
            }
        },
        loadPosts() {
            fetch(this.apiUrl)
                .then(res => res.json())
                .then((data) => {
                    data.results.forEach(pokemon => {
                        pokemon.id = pokemon.url.split('/').filter(Number)[0];
                        this.pokemons.push(pokemon);
                    });
                    this.apiUrl = data.next
                })
                .catch(err => console.log(err.message))
        },
        setPokemonUrl(url) {
            this.$emit('setPokemonUrl', url);
        },
        loadMore() {
            if (this.apiUrl !== null) {
                this.loadPosts();
            }

        }
    },
    mounted() {
        this.loadPosts();
    },


}
</script>
  