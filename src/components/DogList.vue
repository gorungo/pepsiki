<template>
    <div>
        <div id="dog-list" class="dog-list mt-4">
            <div v-if="dogs && dogs.length > 0" class="dog-list__wrap">
                <dog-list-item
                        v-for="(dog, index) in dogs"
                        :big="withBigTop && index === 0"
                        :dog="dog"
                        :key="dog.id"
                        @liked="handleLiked"
                ></dog-list-item>
            </div>
            <div v-if="!loading && dogs && dogs.length === 0">
                Нет песелей
            </div>
            <loading v-if="loading && !(dogs && dogs.length > 0)" ></loading>
            <btn-to-top />
        </div>
        <load-more-observer
                v-if="loadMore && dogs && dogs.length > 0"
                :loading="loading"
                @intersect="handleLoadMore"
        ></load-more-observer>

    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import LoadMoreObserver from "../components/LoadMoreObserver"
    import DogListItem from './DogListItem'
    import BtnToTop from "./BtnToTop";
    import Loading from "./Loading";

    export default {
        name: "DogList",

        props: {
            dogs: {
                type: Array,
            },
            loadMore: {
                type: Boolean,
                default: true,
            },
            withBigTop: {
                type: Boolean,
                default: false,
            },
        },

        computed: {
            ...mapGetters(['loading', 'activePage']),
        },

        components: {
            Loading,
            BtnToTop,
            DogListItem, LoadMoreObserver
        },

        methods: {
            ...mapActions(['toggleFavorite', 'loadNewPage', 'setLoading']),

            handleLiked(image){
                this.toggleFavorite(image)
            },

            async handleLoadMore(){
                if(this.loadMore && !this.loading){
                    await this.loadNewPage()
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    .dog-list{
        position: relative;

        .dog-list__wrap{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }
    }

</style>