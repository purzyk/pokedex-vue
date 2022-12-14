<template>

    <div class="searchbar" v-if="pokemons">
        <form @submit.prevent="setPokemonUrl">
            <div class="container">
                <input type="text" placeholder="Type your query" v-model="search" @blur="toggle = false"
                    @focus="toggle = true">
                <div class="results" v-if="toggle">
                    <div class="result" v-for="pokemon in pokemonsAutoComplete" :key="pokemon">
                        <span @click="selectResult(pokemon)" @mousedown.prevent>
                            {{ pokemon.name }}
                        </span>
                    </div>
                </div>
            </div>


        </form>
        <i class="fas fa-search" @click="setPokemonUrl">search</i>
    </div>
</template>

<script>
export default {
    props: [
        'apiUrl'
    ],
    watch: {
        search(val) {
            if (val.length > 2) {
                this.pokemonsAutoComplete = [];
                this.pokemons.forEach(element => {
                    if (element.name.includes(val) && val != "") {
                        this.pokemonsAutoComplete.push(element);
                    }
                });
            }
        }
    },
    data: () => {
        return {
            search: '',
            toggle: false,
            pokemons: [],
            pokemonsAutoComplete: [],
            searchvalue: '',
        }
    },
    methods: {
        selectResult(pokemon) {
            this.search = pokemon.name;
        },
        loadPosts() {
            fetch(this.apiUrl + '?limit=100000&offset=0')
                .then(res => res.json())
                .then((data) => {
                    this.pokemons = data.results;
                })
                .catch(err => console.log(err.message))
        },
        setPokemonUrl(url) {
            if (this.search !== '')
                this.$emit('setPokemonUrl', this.apiUrl + this.search);
        }
    },
    mounted() {
        this.loadPosts();
    },
}
</script>