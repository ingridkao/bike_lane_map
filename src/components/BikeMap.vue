<script>
import { mapState } from "vuex"

import {TaiwanCityList, TaiwanCityLocation, GetTdxData} from "@/assets/js/commom.js"
import CitySelector from "@/components/CitySelector.vue"
import LeafletMap from "@/components/LeafletMap.vue"

export default {
    data(){
        return {
            mapShow:true,
            position: TaiwanCityLocation['Taipei']
        }
    },
    created(){
        this.updateLocation()    },
    computed: {
        ...mapState(["geoLocation"])
    },
    watch: {
        geoLocation(){
            this.updateLocation()
        }
    },
    components: {CitySelector, LeafletMap},
    methods:{
        updateLocation(){
            if(this.geoLocation.latitude && this.geoLocation.longitude){
                this.position = [this.geoLocation.latitude, this.geoLocation.longitude]
                this.mapShow = true
            }else{
                this.mapShow = false
            }
        //   const answer = this.place_data.filter(item => item.tag === location)
        //   this.placeName = answer[0] && answer[0]['place'] ? answer[0]['place']: ''
        //   GetTdxData()
        }
    }
}
</script>

<template>
    <div id="BikeMap">
        {{mapShow? 1: 0}}
        <div class="mapBox" v-if="mapShow">
            <LeafletMap :location="position"/>
        </div>
        <div v-else>Loading...</div>
        <!-- <CitySelector/> -->
        <button id="openInformation" class="top">openInformation</button>
        <button id="getCurrentPosition" class="bottom right">getCurrentPosition</button>
    </div>
</template>

<style lang="scss">
  #BikeMap{
    position: relative;
    // display: flex;
    // flex-wrap: wrap;
    width: 100%;
    height: 100vh;
    >button{
        position: absolute;
        &.top{
            top: .5rem;
        }
        &.bottom{
            bottom: 0.5rem;
        }
        &.right{
            right: 0.5rem;
        }
    }
  }
</style>