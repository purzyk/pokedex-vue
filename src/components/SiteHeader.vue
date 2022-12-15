<template>
    <header class="mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="nes-container with-title">
                <h3 class="title">{{ hello }}</h3>
                <div class="nes-container">
                    <div class="nes-balloon from-left">
                        <p>{{ title }}</p>
                    </div>
                    <i class="nes-bcrikko"></i>
                </div>
            </div>
            <figure class="aspect-[4/2.7] bg-tv relative">
                <img src="../assets/tv.png" class="relative z-10" />
                <img class="h-[98%] w-[98%] object-cover absolute top-0 left-0" src="../assets/pikachu.gif">
            </figure>
        </div>

    </header>
</template>

<script>
export default {
    data: () => {
        return {
            hello: 'Hello',
            title: 'I love Pokemons. Welcome to my PokeDex website.',
        }
    },

}
</script>