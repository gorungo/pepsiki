<template>
    <div id="breed-page" class="page">
        <breed-selector
                v-if="visibleBreeds && visibleBreeds.length > 0"
                :breeds="visibleBreeds"
        />
        <dog-list
                :dogs="visibleDogs"
                :load-more=true
        ></dog-list>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import DogList from "../components/DogList"
    import BreedSelector from "../components/BreedSelector";

    export default {
        name: "BreedPage",

        components: {
            DogList,
            BreedSelector
        },

        async mounted(){
            await this.setActiveBreed(this.visibleBreeds.find((breed) => this.$route.params.breed === breed.title))
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

<style scoped>

</style>