<template>
    <div id="home-page" class="page">
        <breed-selector
                v-if="visibleBreeds && visibleBreeds.length > 0"
                :breeds="visibleBreeds"
        />
    <dog-list
            v-if="visibleDogs && visibleDogs.length > 0"
            :dogs="visibleDogs"
            :load-more = true
            :with-big-top = true
    ></dog-list>

    </div>
</template>

<script>
    import BreedSelector from "../components/BreedSelector";
    import {mapGetters, mapActions} from 'vuex'
    import DogList from "../components/DogList"

    export default {
        name: "HomePage",

        components: {
            DogList,
            BreedSelector
        },

        async mounted(){
            await this.setActiveBreed(null)
            this.fetchImages()
        },

        computed: mapGetters([
            'visibleDogs',
            'visibleBreeds',
            'loading'
        ]),

        methods: {
            ...mapActions([
                'loadNewPage',
                'toggleSort',
                'toggleFavorite',
                'fetchBreeds',
                'fetchImages',
                'setFavoriteFromStorage',
                'setActiveBreed'
            ]),
        },
    }
</script>

<style scoped lang="scss">

</style>