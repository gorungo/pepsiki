<template>
    <div class="dog-item" :class="{big}">
        <img :src="dog.image">
        <div class="dog-item__info-wrap">
            <div class="dog-item__title">{{dog.title}}</div>
            <div class="dog-item__btn-favorite" @click="$emit('liked', dog.image)">
                <img :src="dog.inFavorite ? '/images/heart_filled.svg' : '/images/heart.svg'">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DogListItem",
        props: {
            dog: {
                type: Object,
                required: true,
            },

            big: {
                type: Boolean,
                default: false,
            }
        },
    }
</script>

<style scoped lang="scss">
    .dog-item{
        width: 367px;
        height: 290px;
        border-radius: 8px;
        margin-bottom: 2rem;
        overflow: hidden;
        position: relative;

        img{
            width: inherit;
            height: inherit;
            object-fit: cover;
            position: absolute;
            left: 0;
        }

        .dog-item__info-wrap{
            position: absolute;
            width: 100%;
            height: 100%;

            background: linear-gradient(1.42deg, #000000 -15.62%, rgba(0, 0, 0, 0) 45.69%);

            .dog-item__title{
                position: absolute;
                font-style: normal;
                font-weight: 600;
                font-size: 25px;
                line-height: 28px;
                letter-spacing: 0.01em;
                color: #FFFFFF;
                right: 25px;
                bottom: 25px;
            }
            .dog-item__title::first-letter {
                text-transform: uppercase;
            }

            .dog-item__btn-favorite{
                position: absolute;
                top: 25px;
                left: 25px;

                img{
                    height: 29px;
                }
            }
        }

        &.big{
            width: 1160px;
            height: 513px;

            img{
                width: inherit;
                height: inherit;
                object-fit: cover;
                position: absolute;
            }
            .dog-item__info-wrap {
                background: linear-gradient(1.42deg, #000000 -15.62%, rgba(0, 0, 0, 0) 45.69%);

                .dog-item__title {
                    right: 50px;
                    bottom: 50px;
                }
            }
        }

    }

</style>