<template>
    <!--Pokemon detail-->
    <div class="relative ">
        <div class="pokemon__detail p-2 md:p-8 bg-white fixed top-0 md:top-[10%] left-0 md:left-[10%] w-full md:w-[80%] "
            v-if="show">
            <div class="mb-4" v-if="pokemon">
                <div class="nes-container with-title">
                    <div class="title">{{ pokemon.name }}</div>
                    <div class="flex flex-wrap">
                        <img class="max-w-[30%]" v-if="pokemon.sprites.front_default"
                            :src="pokemon.sprites.front_default" />
                        <img class="max-w-[30%]" v-if="pokemon.sprites.back_default"
                            :src="pokemon.sprites.back_default" />
                        <img class="max-w-[30%]" v-if="pokemon.sprites.front_female"
                            :src="pokemon.sprites.front_female" />
                        <img class="max-w-[30%]" v-if="pokemon.sprites.back_female"
                            :src="pokemon.sprites.back_female" />
                        <img class="max-w-[30%]" v-if="pokemon.sprites.front_shiny"
                            :src="pokemon.sprites.front_shiny" />
                        <img class="max-w-[30%]" v-if="pokemon.sprites.back_shiny" :src="pokemon.sprites.back_shiny" />
                        <img class="max-w-[30%]" v-if="pokemon.sprites.front_shiny_female"
                            :src="pokemon.sprites.front_shiny_female" />
                        <img class="max-w-[30%]" v-if="pokemon.sprites.back_shiny_female"
                            :src="pokemon.sprites.back_shiny_female" />
                    </div>
                    <div class="mb-8">
                        <div class="nes-container is-rounded">
                            <p>{{ weightCopy }}{{ pokemon.weight / 10 }}{{ kg }}, {{ heightCopy }}{{ pokemon.height /
                                    10
                            }}{{ m }}
                            </p>
                        </div>
                    </div>
                    <div class="mb-8">
                        <div class="nes-container is-rounded">
                            <p>{{ typesCopy }}</p>
                            <div class="flex flex-wrap">
                                <div class="mr-4" v-for="(typ, index) in pokemon.types" :key="index">
                                    <p class="nes-badge">
                                        <span :class="typ.type.name">{{ typ.type.name }}</span>
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h2 v-else>{{ errorCopy }}</h2>
            <button class="nes-btn is-primary showcode" @click="closeDetail">{{ buttonCopy }}</button>
        </div>
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
            buttonCopy: 'Close',
            errorCopy: 'Cannot find your pokemon',
            typesCopy: 'Types:',
            weightCopy: 'Weight:',
            heightCopy: 'Height:',
            kg: 'kg',
            m: 'm',
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
.nes-badge span {
    position: absolute;
    top: 0;
    width: 100%;
    color: #fff;
    text-align: center;
}

.grass {
    background-color: #038b2c;
    box-shadow: 0 0.5em #038b2c, 0 -0.5em #038b2c, 0.5em 0 #038b2c, -0.5em 0 #038b2c
}

.poison {
    background: #4a0769;
    box-shadow: 0 0.5em #4a0769, 0 -0.5em #4a0769, 0.5em 0 #4a0769, -0.5em 0 #4a0769
}

.water {
    background: #0887db;
    box-shadow: 0 0.5em #0887db, 0 -0.5em #0887db, 0.5em 0 #0887db, -0.5em 0 #0887db
}

.dragon {
    background: #1b0244;
    box-shadow: 0 0.5em #1b0244, 0 -0.5em #1b0244, 0.5em 0 #1b0244, -0.5em 0 #1b0244
}

.ice {
    background: #4ec7ff;
    box-shadow: 0 0.5em #4ec7ff, 0 -0.5em #4ec7ff, 0.5em 0 #4ec7ff, -0.5em 0 #4ec7ff
}

.flying {
    background: #91d7ff;
    box-shadow: 0 0.5em #91d7ff, 0 -0.5em #91d7ff, 0.5em 0 #91d7ff, -0.5em 0 #91d7ff
}

.fire {
    background: #ee8711;
    box-shadow: 0 0.5em #ee8711, 0 -0.5em #ee8711, 0.5em 0 #ee8711, -0.5em 0 #ee8711
}

.ghost {
    background: #4a3457;
    box-shadow: 0 0.5em #4a3457, 0 -0.5em #4a3457, 0.5em 0 #4a3457, -0.5em 0 #4a3457
}

.fighting {
    background: #7a0000;
    box-shadow: 0 0.5em #7a0000, 0 -0.5em #7a0000, 0.5em 0 #7a0000, -0.5em 0 #7a0000
}


.normal {
    background: #686868;
    box-shadow: 0 0.5em #686868, 0 -0.5em #686868, 0.5em 0 #686868, -0.5em 0 #686868
}

.psychic {
    background: #c300ff;
    box-shadow: 0 0.5em #c300ff, 0 -0.5em #c300ff, 0.5em 0 #c300ff, -0.5em 0 #c300ff
}

.bug {
    background: #345706;
    box-shadow: 0 0.5em #345706, 0 -0.5em #345706, 0.5em 0 #345706, -0.5em 0 #345706
}

.dark {
    background: #2b2b2b;
    box-shadow: 0 0.5em #2b2b2b, 0 -0.5em #2b2b2b, 0.5em 0 #2b2b2b, -0.5em 0 #2b2b2b
}

.steel {
    background: #747474;
    box-shadow: 0 0.5em #747474, 0 -0.5em #747474, 0.5em 0 #747474, -0.5em 0 #747474
}

.fairy {
    background: #f8a5ed;
    box-shadow: 0 0.5em #f8a5ed, 0 -0.5em #f8a5ed, 0.5em 0 #f8a5ed, -0.5em 0 #f8a5ed
}

.eletric {
    background: #ffd901;
    box-shadow: 0 0.5em #ffd901, 0 -0.5em #ffd901, 0.5em 0 #ffd901, -0.5em 0 #ffd901
}

.rock {
    background: #585f64;
    box-shadow: 0 0.5em #585f64, 0 -0.5em #585f64, 0.5em 0 #585f64, -0.5em 0 #585f64
}

.ground {
    background: #5c4646;
    box-shadow: 0 0.5em #5c4646, 0 -0.5em #5c4646, 0.5em 0 #5c4646, -0.5em 0 #5c4646
}
</style>
  