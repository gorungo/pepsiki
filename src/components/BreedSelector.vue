<template>
    <div>
        <div class="bar">
            <div class="breed-toggle_wrap">
                <div class="btn btn__breed-toggle" @click="toggleBreedSelector" :class="{open: breedSelectorOpened}">
                    <span>Породы</span>
                    <img src="/images/dropdown.svg" />
                </div>
                <div v-if="activeBreed && $route.name === 'breed'">
                    <div class="breed-item">
                        <router-link to="/" class="btn breed-item__link router-link-exact-active" style="margin: 0; margin-left: 20px;">
                            <span class="breed-item__title">{{activeBreed.title}} &times;</span>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="btn btn__sort-toggle" @click="toggleSort">
                <span>Сортировка по алфавиту</span>
                <label class="switch">
                    <input type="checkbox" @click="toggleSort" :checked="activeSort === 'alphabet'">
                    <span class="slider round"></span>
                </label>
            </div>
        </div>
        <div id="breed-selector" class="toggle-block mt-2" :class="{open: breedSelectorOpened}">
            <div class="breed-item">
                <router-link
                        to="/"
                        class="btn breed-item__link"
                >
                    <span class="breed-item__title">Все пёсели</span>
                </router-link>
            </div>
            <div class="breed-selector" v-if="visibleBreeds.length > 0">
                <div v-for="(breed, index) in visibleBreeds"
                     :key="breed.title"
                     class="breed-item"
                >
                    <div class="letter" v-if="needLetter(index)">{{firstLetterOf(breed)}}</div>
                    <router-link
                            :to="{ name: 'breed', params: { breed: breed.title }}"
                            class="btn breed-item__link"
                    >
                        <span class="breed-item__title">{{breed.title}}</span>
                    </router-link>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    export default {
        name: "BreedSelector",

        props: {
            breeds: {
                type: Array,
            }
        },

        computed: mapGetters(['breedSelectorOpened', 'activeSort', 'activeBreed', 'visibleBreeds']),

        watch: {
            $route(to) {
                this.$store.dispatch('setActiveBreed', this.visibleBreeds.find((breed) => to.params.breed === breed.title))
            }
        },

        methods: {
            needLetter(index) {
                return index === 0 || this.visibleBreeds[index].title.charAt(0) !== this.visibleBreeds[index - 1].title.charAt(0)
            },

            firstLetterOf(breed) {
                return breed.title.charAt(0)
            },

            ...mapActions(['toggleBreedSelector', 'toggleSort']),
        }
    }
</script>

<style scoped lang="scss">

    $greyText: #626262;

    .breed-selector {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
    }

    .breed-toggle_wrap{
        display: flex;
        align-items: center;
    }

    .breed-item{
        display: flex;

        .breed-item__link{
            color: $greyText;
            text-decoration: none;
            font-size: 12px;
            line-height: 16px;
            border-radius: 20px;
            padding: 4px 12px;
            align-self: center;
            margin: 6px 10px 6px 0;
            border: 1px solid $greyText;


            &.router-link-exact-active{
                $primary_color: #3C59F0;

                color: $primary_color;
                border: 1px solid $primary_color;

            }
        }
    }

    .breed-item:first-child{
        .letter{
            margin-left: 0;
        }
    }

    .letter{
        display: flex;
        order: 0;
        align-self: center;
        line-height: 28px;
        color: $greyText;
        text-transform: capitalize;
        margin-right: 10px;
        margin-left: 20px;
    }

    .toggle-block{
        display: none;
        &.open{
            display: block;
        }
    }

    .bar{
        display: flex;
        justify-content: space-between;
    }


    .btn__breed-toggle {
        border-bottom: 0.5px dashed #FFFFFF;
        padding-bottom: 2px;
        span{
            font-size: 16px;
            line-height: 20px;
        }
        img{
            height: 5px;
            margin-left: 10px;
        }

        &.open{
            img{
                transform: rotate(180deg);
            }
        }

    }

    .btn__sort-toggle{
        display: flex;
        align-items: center;
        color: $greyText;
    }

    .switch {
        position: relative;
        display: inline-block;
        width: 30px;
        height: 17px;
        align-self: center;
        margin-left: 10px;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        -webkit-transition: .4s;
        transition: .4s;
        border: 1px solid $greyText;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 11px;
        width: 11px;
        left: 2px;
        bottom: 2px;
        -webkit-transition: .4s;
        transition: .4s;
        background: $greyText;

    }

    input:checked + .slider {
        border: 1px solid $greyText;

    }

    input:focus + .slider {
        border: 1px solid $greyText;

    }

    input:checked + .slider:before {
        -webkit-transform: translateX(13px);
        -ms-transform: translateX(13px);
        transform: translateX(13px);
    }

    /* Rounded sliders */
    .slider.round {
        border-radius: 15px;
    }

    .slider.round:before {
        border-radius: 50%;
    }


</style>