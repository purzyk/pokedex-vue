<template>

    <div class="searchbar">
        <form @submit.prevent="setPokemonUrl">
            <div class="container">
                <input type="text" placeholder="Type your query" v-model="search" @blur="toggle = false"
                    @focus="toggle = true">
                <div class="results" v-if="toggle">
                    <div class="result" v-for="book in newBooks" :key="book">
                        <span @click="selectResult(book)" @mousedown.prevent>
                            {{ book.name }}
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
                this.newBooks = [];
                this.books.forEach(element => {
                    if (element.name.includes(val) && val != "") {
                        this.newBooks.push(element);
                    }
                });
            }
        }
    },
    data: () => {
        return {
            search: '',
            toggle: false,
            books: [
                { name: 'bulbasaur' },
                { name: 'venusaur' },
            ],
            newBooks: [],
            searchvalue: '',
        }
    },
    methods: {
        selectResult(book) {
            this.search = book.name;
        },
        setPokemonUrl(url) {
            if (this.search !== '')
                this.$emit('setPokemonUrl', this.apiUrl + this.search);
        }
    }
}
</script>

<style scoped>
.searchbar {
    position: relative;
    width: 100%;
    max-width: 510px;
    padding-bottom: 20px;
}

input {
    border: none;
    outline: none;
    border-radius: 5px;
    padding: 10px 40px 10px 10px;
    width: calc(100% - 50px);
    font-size: 1rem;
    box-shadow: 0 15px 30px rgba(0, 0, 0, .2),
        0 10px 10px rgba(0, 0, 0, .2);
}

.legenda {
    color: #fff;
}

i {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.25rem;
    color: #0A2E50;
    cursor: pointer;
}
</style>
