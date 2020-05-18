<template>
    <div id="load-more">
        <loading v-if="loading" />
    </div>
</template>

<script>
    import Loading from "./Loading";
    export default {
        name: "LoadMoreObserver",
        components: {Loading},
        props: {
            loading: {
                type: Boolean
            }
        },

        data(){
            return {
                observer: null,
            }
        },

        mounted(){
            this.observer = new IntersectionObserver(([entry]) => {
                if(entry && entry.isIntersecting){
                    this.$emit('intersect')
                }
            })

            this.observer.observe(this.$el)
        }
    }
</script>

<style scoped>
    #load-more{
        height: 200px;
    }
</style>