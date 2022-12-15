<template>
    <section class="mb-8">
        <div class="nes-container with-title">
            <h3 class="title">{{ title }}</h3>
            <div id="textarea" class="item"><label for="textarea_field">{{ searchHere }}</label>
                <form @submit.prevent="setPokemonUrl">
                    <div class="mb-4">
                        <input class="nes-textarea" type="text" :placeholder="placeholder" v-model="search"
                            @blur="toggle = false" @focus="toggle = true">
                        <div class="results absolute z-10 bg-white" v-if="toggle">
                            <div class="result" v-for="pokemon in pokemonsAutoComplete" :key="pokemon">
                                <span @click="selectResult(pokemon)" @mousedown.prevent>
                                    {{ pokemon.name }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button @click="setPokemonUrl" type="button" class="mt-4 nes-btn is-primary showcode z-80">{{
                            searchButton
                    }}</button>
                </form>
            </div>
        </div>
    </section>
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
            else {
                this.pokemonsAutoComplete = [];
            }
        }
    },
    data: () => {
        return {
            title: 'What is you favourite pokemon?',
            searchHere: 'Search here',
            placeholder: 'Search...',
            searchButton: 'Search',
            search: '',
            toggle: false,
            pokemons: [],
            pokemonsAutoComplete: [],

        }
    },
    methods: {
        selectResult(pokemon) {
            this.search = pokemon.name;
            this.toggle = false;
            this.$emit('setPokemonUrl', this.apiUrl + this.search);
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