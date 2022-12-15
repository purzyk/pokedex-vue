<template>
    <section class="mb-8">
        <div class="nes-container with-title">
            <h3 class="title">{{ title }}</h3>
            <div class="autocomplete">
                <input class="nes-textarea" type="text" @input="onChange" :placeholder="placeholder" v-model="search"
                    @keydown.down="onArrowDown" @keydown.up="onArrowUp" @keydown.enter="onEnter" />
                <ul id="autocomplete-results" v-show="isOpen" class="autocomplete-results">
                    <li class="loading" v-if="isLoading">
                        Loading results...
                    </li>
                    <li v-else v-for="(result, i) in results" :key="i" @click="setResult(result)"
                        class="autocomplete-result" :class="{ 'is-active': i === arrowCounter }">
                        {{ result.name }}
                    </li>
                </ul>
            </div>
        </div>
    </section>

</template>
  
<script>
export default {
    name: 'SearchAutocomplete',
    props: [
        'apiUrl'
    ],
    data() {
        return {
            title: 'What is you favourite pokemon?',
            searchHere: 'Search here',
            placeholder: 'Search...',
            searchButton: 'Search',
            isOpen: false,
            results: [],
            pokemons: [],
            search: '',
            isLoading: false,
            arrowCounter: -1,
        };
    },
    watch: {
        items: function (value, oldValue) {
            if (value.length !== oldValue.length) {
                this.results = value;
                this.isLoading = false;
            }
        },
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside);
        this.loadPosts();
    },
    destroyed() {
        document.removeEventListener('click', this.handleClickOutside)
    },

    methods: {

        loadPosts() {
            fetch(this.apiUrl + '?limit=100000&offset=0')
                .then(res => res.json())
                .then((data) => {
                    this.pokemons = data.results;
                })
                .catch(err => console.log(err.message))
        },
        setResult(result) {
            this.search = result.name;
            this.isOpen = false;
            this.$emit('setPokemonUrl', this.apiUrl + this.search);
        },
        filterResults() {
            this.results = this.pokemons.filter((item) => {
                return item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
            });
        },
        onChange() {
            this.$emit('input', this.search);
            this.filterResults();
            this.isOpen = true;
        },
        handleClickOutside(event) {
            if (!this.$el.contains(event.target)) {
                this.isOpen = false;
                this.arrowCounter = -1;
            }
        },
        onArrowDown() {
            if (this.arrowCounter < this.results.length) {
                this.arrowCounter = this.arrowCounter + 1;
            }
        },
        onArrowUp() {
            if (this.arrowCounter > 0) {
                this.arrowCounter = this.arrowCounter - 1;
            }
        },
        onEnter() {
            this.search = this.results[this.arrowCounter].name;
            this.isOpen = false;
            this.arrowCounter = -1;
            this.$emit('setPokemonUrl', this.apiUrl + this.search);
        },
    },
};
</script>
  
<style>
.autocomplete {
    position: relative;
}

.autocomplete-results {
    padding: 0;
    margin: 0;
    height: 120px;
    overflow: auto;
}

.autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
    background-color: #108de0;
    color: white;
}
</style>