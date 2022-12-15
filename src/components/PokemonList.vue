<template>

    <main class="grid grid-cols-1 items-start">
        <div class="sticky w-full col-span-1 top-0 flex flex-wrap bg-white mb-8 z-10">
            <section class="w-full nes-container with-title bg-white" v-if="filteredPokemons.length > 0">
                <h3 class="title">My favourite pokemons</h3>
                <div class="flex flex-wrap w-full items-center">
                    <div class="relative" v-for="(pokemon, index) in filteredPokemons" :key="'poke' + index">
                        <button @click="$emit('setPokemonUrl', pokemon.url)">
                            <img class="w-full" :src="pokemonImageUrl + pokemon.id + '.png'" v-if="pokemon.isFav" />
                        </button>
                        <button class="absolute top-2 right-2" @click="favToggle(pokemon)"> <i
                                class="nes-icon is-small heart"
                                :class="{ 'is-transparent': !pokemon.isFav }"></i></button>
                    </div>
                </div>
            </section>

        </div>
        <div class="col-span-1">
            <section class="showcase ">
                <section class="nes-container with-title">
                    <h3 class="title">Pokemons</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        <div class="item" v-for="(pokemon, index) in pokemons" :key="'poke' + index">
                            <div class="nes-container with-title is-centered relative">
                                <p class="title"> {{ pokemon.name }}</p>

                                <button class="absolute top-2 right-2" @click="favToggle(pokemon)"> <i
                                        class="nes-icon is-medium heart"
                                        :class="{ 'is-transparent': !pokemon.isFav }"></i></button>
                                <img class="h-50 m-auto" style="image-rendering: pixelated;"
                                    :src="pokemonImageUrl + pokemon.id + '.png'" />
                                <button type="button" class="nes-btn is-primary showcode"
                                    @click="$emit('setPokemonUrl', pokemon.url)">SHOW
                                    DETAILS</button>
                            </div>
                        </div>
                        <div id="scroll-trigger" ref="infinitescrolltrigger">
                            <i class="fas fa-spinner fa-spin"></i>
                        </div>
                        <Observer @intersect="intersected" />
                    </div>
                </section>

            </section>


        </div>


    </main>

</template>
  
<script>
import Observer from './Observer.vue'

export default {
    components: { Observer },
    props: [
        'pokemonImageUrl',
    ],
    emits: ["favToggle", "setPokemonUrl"],
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

        favToggle(pokemon) {
            pokemon.isFav = !pokemon.isFav
        },
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
                        pokemon.isFav = false;
                        this.pokemons.push(pokemon);
                    });
                    this.apiUrl = data.next
                })
                .catch(err => console.log(err.message))
        },

        loadMore() {
            if (this.apiUrl !== null) {
                this.loadPosts();
            }

        },
        addToFav(pokemon) {
            pokemon.isFav = !pokemon.isFav
        }
    },
    computed: {
        filteredPokemons() {
            return this.pokemons.filter(pokemon => pokemon.isFav === true)

        }
    },
    mounted() {
        this.loadPosts();
    },


}
</script>
<style scoped>
i {
    color: #bbb;
}

i.active {
    color: #ff005d;
}

.parent {

    align-items: flex-start;

}
</style>