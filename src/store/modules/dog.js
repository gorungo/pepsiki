import axios from 'axios'

export default {
    actions: {
        /**
         * Reset application state
         * @param commit
         */
        reset({commit}){
            commit('reset')
        },

        /**
         * Change sort order
         * @param commit
         * @param state
         */
        toggleSort({commit, state}){
            const newSort = state.sort === 'random' ? 'alphabet' : 'random'
            commit('setSort', newSort)
        },

        /**
         * Change breed selector state
         * @param commit
         * @param state
         */
        toggleBreedSelector({commit, state}){
            const newPosition = state.breedSelectorPosition === 'open' ? 'close' : 'open'
            commit('setBreedSelectorPosition', newPosition)
        },

        setPage({commit}, page){
            commit('setPage', page)
        },

        setLoading({commit}, loading){
            commit('setLoading', loading)
        },
        /**
         * Increase page number
         * ( we cant upload data because api not support limited upload )
         * we will just get limited data from array
         *
         * @param commit
         * @param state
         */
        async loadNewPage({state, dispatch}){
            dispatch('setPage', state.page + 1)
            dispatch('fetchImages');
        },

        async fetchImages({state, commit}){

            const breed = state.activeBreed
            const url = !breed
                ? `https://dog.ceo/api/breeds/image/random/${state.limit}&_page=${state.page}`
                : `https://dog.ceo/api/breed/${breed.parent !== null ? breed.parent : breed.name }/images/random/${state.limit}&_page=${state.page}`

            if(state.lastUrl !== url){
                commit('setLoading', true)

                if(state.page === 1) {
                    commit('clearImages')
                }

                try{
                    const res = await axios.get(url)
                    const images = await res.data

                    commit('addImages', images.message)

                }catch(e){
                    console.log('Случилось страшное', e.message)

                }

                commit('setLastUrl', url)

                commit('setLoading', false)
            }
        },

        async fetchBreeds({commit}){
            const url = 'https://dog.ceo/api/breeds/list/all'

            commit('setLoading', true)

            try{
                const res = await axios.get(url)
                const breeds = await res.data
                commit('updateBreeds', breeds.message)

            }catch(e){
                console.log('Случилось страшное', e.message)

            }

            commit('setLoading', false)
        },

        toggleFavorite({state, commit}, image){
            const index = state.favoriteImages.indexOf(image);

            if(index !== -1){
                commit('removeFromFavoriteByIndex', index)
            }else{
                commit('addToFavorite', image)
            }

        },

        setFavoriteFromStorage({commit}){
            const favoriteItems = window.localStorage.getItem("favoriteItems")
            commit('setFavoriteFromStorage', favoriteItems ? JSON.parse(favoriteItems).items : [])
        },

        setActiveBreed({commit, dispatch}, newBreed){
            commit('setBreed', newBreed)
            if(newBreed){
                dispatch('fetchImages')
            }
        }
    },

    mutations: {
        addImages(state, images){
            state.images = [...state.images, ...images]
        },

        clearImages(state){
            state.images = []
        },

        updateBreeds(state, breeds){
            state.breeds = breeds
        },

        setBreed(state, newBreed){
            state.activeBreed = newBreed
        },

        setPage(state, page){
            state.page = page
        },

        setSort(state, newSort){
            state.sort = newSort
        },

        setBreedSelectorPosition(state, newPosition){
            state.breedSelectorPosition = newPosition
        },

        addToFavorite(state, image){
            state.favoriteImages.push(image)
            window.localStorage.setItem("favoriteItems", JSON.stringify({
                items: state.favoriteImages
            }))
        },

        setFavoriteFromStorage(state, newFavorite){
            state.favoriteImages = newFavorite
        },

        removeFromFavoriteByIndex(state, index){
            state.favoriteImages.splice(index, 1)
            window.localStorage.setItem("favoriteItems", JSON.stringify({
                items: state.favoriteImages
            }))
        },

        reset(state){
            state.images = []
            state.breeds = []
            state.activeBreed = null
            state.page = 1
            state.sort = 'random'
            window.localStorage.clear()
        },

        setLoading(state, newLoading){
            state.loading = newLoading
        },

        setLastUrl(state, lastUrl){
            state.lastUrl = lastUrl
        }
    },

    state: {
        breeds: [],
        images: [],
        favoriteImages: [],

        activeBreed: null,
        lastUrl: null,
        page: 1,
        limit: 20,
        loading: false,

        breedSelectorPosition: 'close', // open || close
        sort: 'random', // random || alphabet
    },

    getters: {
        /**
         * Resulted array of prepared objects images to show
         * @param state
         * @returns {array}
         */
        visibleDogs(state){
            if(state.images.length > 0){

                let images = state.images.map((image, index) => {
                    const title = image.split('/')[4];
                    return {
                        id: index,
                        image,
                        title: title,
                        inFavorite: state.favoriteImages.indexOf(image) > -1
                    }
                })

                if(state.activeBreed && state.activeBreed.parent !== null){
                    images = images.filter((image) => {
                        return image.title === state.activeBreed.title
                    })
                }

                // sort if needed
                if(state.sort === 'alphabet'){
                    return images.sort((a, b) => {
                        return ('' + a.title).localeCompare(b.title)
                    })
                }

                return images;
            }
            return [];
        },

        favoriteDogs(state){
            if(state.favoriteImages.length > 0){
                return state.favoriteImages.slice(0, state.page * state.limit).map((image, index) => {
                    const title = image.split('/')[4];
                    return {
                        id: index,
                        image,
                        title: title,
                        inFavorite: true
                    }
                })
            }
            return [];
        },


        activeBreed(state){
            return state.activeBreed ? state.activeBreed : null
        },

        visibleBreeds(state){

            let newBreeds = []

            for (let prop in state.breeds) {
                newBreeds.push({
                    title: prop,
                    name: prop,
                    parent: null,
                })

                if(Object.prototype.hasOwnProperty.call(state.breeds, prop) && state.breeds[prop].length > 0){
                    state.breeds[prop].forEach((subBreed) => {
                        newBreeds.push({
                            name: subBreed,
                            title: `${prop}-${subBreed}`,
                            parent: prop,
                        })
                    })
                }


            }

            return newBreeds.sort()

        },

        activePage(state){
            return state.page
        },

        activeSort(state){
            return state.sort
        },

        loading(state){
            return state.loading
        },

        breedSelectorOpened(state){
            return state.breedSelectorPosition === 'open'
        },

    }
}