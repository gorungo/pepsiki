<template>
    <div id="app">
        <header-bar/>
        <div class="container">
            <router-view />
        </div>
    </div>
</template>

<script>

    import {mapGetters, mapActions} from 'vuex'
    import HeaderBar from "./components/HeaderBar"

    export default {
        name: 'App',

        async mounted() {
            this.fetchBreeds();
            this.setFavoriteFromStorage();
        },

        watch: {
            $route() {
                this.setPage(1)
            }
        },

        components: {HeaderBar},

        computed: mapGetters([
            'visibleDogs',
            'visibleBreeds',
            'activeBreed',
            'activePage',
            'activeSort',
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
                'setPage',
                'reset',

            ]),
        },
    }
</script>

<style lang="scss">
    * {
        box-sizing: border-box;
    }

    body {
        background: #151419;
        margin: 0;
        padding: 0;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    .container {
        width: 1160px;
        margin: 0 auto;
    }

    .page{
        margin-top: 40px;
    }

    .mt-2{
        margin-top: 20px;
    }

    .mt-4{
        margin-top: 40px;
    }

    .mt-5{
        margin-top: 50px;
    }

    .btn{
        cursor: pointer;
        color: white;
    }

</style>
