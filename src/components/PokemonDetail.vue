<template>
    <div>
        <div class="pokemon__detail" v-if="show">
            <div v-if="pokemon">
                <img :src="pokemonImageUrl + pokemon.id + '.png'">
            </div>
            <div v-if="pokemon">
                <h2>{{ pokemon.name }}</h2>
            </div>
            <h2 v-else>Cannot find your pokemon</h2>
            <button @click="closeDetail">Close</button>
        </div>
        <i v-else> Loading</i>
    </div>
</template>
  
<script>
export default {
    props: [
        'pokemonUrl',
        'pokemonImageUrl'
    ],
    data: () => {
        return {
            show: false,
            pokemon: {}
        }
    },
    methods: {
        fetchData() {
            let req = new Request(this.pokemonUrl);
            fetch(req)
                .then((resp) => {
                    if (resp.status === 200)
                        return resp.json();
                })
                .then((data) => {
                    this.pokemon = data;
                    this.show = true;
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        closeDetail() {
            this.$emit('closeDetail');
        }
    },
    created() {
        this.fetchData();
    }
}
</script>
  
<style scoped>
.pokemon__detail {

    position: fixed;
    top: 50%;
    left: 50%;



}
</style>
  