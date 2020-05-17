<template>
    <div id="favorite-page" class="page">
        <dog-list
                v-if="favoriteDogs && favoriteDogs.length > 0"
                :dogs="favoriteDogs"
                :load-more = false
        ></dog-list>
        <p class="text-center" v-else>
            Нет пёселей в избранном
        </p>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import DogList from "../components/DogList"

    export default {
        name: "FavoritePage",

        components: {
            DogList
        },

        computed: {
            ...mapGetters([
                'favoriteDogs',
                'loading',
            ]),
        },

        methods: {
            ...mapActions([
                'loadNewPage',
                'toggleSort',
            ]),
        },
    }
</script>

<style scoped>
    .text-center{
        text-align: center;
    }
</style>