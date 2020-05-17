<template>
    <nav class="header-bar">
        <div class="header-bar__wrap">
            <div class="logo">
                <router-link to="/">
                    <img src="images/logo.svg" />
                </router-link>
            </div>
            <div>
                <router-link to="/favorites" class="btn-favorite" :class="{active: $route.name==='favorites'}">
                    <span>Избранные пёсели</span>
                    <img src="/images/heart.svg" />
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "HeaderBar"
    }
</script>

<style scoped lang="scss">
    $greyText: #626262;

    a{
        text-decoration: none;
        color: white;
    }
    .header-bar{
        height: 100px;
        background: #151419;
        position: relative;
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        justify-content: space-between;
        padding: .5rem 1rem;
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.55);

        .logo img{
            height: 27px;
        }
    }
    .header-bar__wrap{
        display: flex;
        width: 1160px;
        justify-content: space-between;
        align-content: center;
        margin: 0 auto;
    }
    .btn-favorite{
        line-height: 33px;
        display: flex;
        align-content: center;
        color: $greyText;
        text-decoration: none;

        img {
            height: 16px;
            margin-left: 10px;
            opacity: 0.3;
            align-self: center;
        }

        &.active{
            color: white;
            img {
                opacity: 1;
            }
        }
    }
</style>