import Vue from 'vue'
import Vuex from 'vuex'
import dog from './modules/dog'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        dog,
    }
})
