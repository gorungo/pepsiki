<template>
    <button
            id="to-top"
            v-scroll="handleScroll"
            @click="toTop"
            title="к верхним пёсикам"
            v-show="isVisible"
    >
        <img src="/images/up.svg" />
    </button>
</template>

<script>
    export default {
        name: "BtnToTop",

        props: {
            start: {
                type: Number,
                default: 50,
            }
        },

        data(){
            return{
                isVisible: false,
            }
        },

        methods:{
            handleScroll: function () {
                if (window.scrollY > this.start) {
                    this.isVisible = true;
                }else{
                    this.isVisible = false;
                }
            },

            toTop(){
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }
        }
    }
</script>

<style scoped lang="scss">

    #to-top {
        display: block;
        position: fixed;
        bottom: 20px;
        right: 30px;
        z-index: 99;
        width: 55px;
        height: 55px;
        font-size: 18px;
        outline: none;
        color: white;
        cursor: pointer;
        padding: 15px;
        border-radius: 28px;
        border: 1px solid #fff;
        background: #111013;

        img{
            height: 20px;
        }
    }


</style>