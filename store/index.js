import { createStore } from "vuex"

export default createStore({
    state() {
        return {
            geoLocation: {},
            fullPage: false,
            // navToggle:false
        }
    },
    mutations: {
        detectWidth(state, payload) {
            state.fullPage = (payload > 1080)
        },
        setGeoLocation(state, payload) {
            state.geoLocation = payload
        },
        // setNavToggle(state) {
        //     state.navToggle = !state.navToggle
        // },
    }
})