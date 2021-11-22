<script>
import {defineComponent } from 'vue'
import LandingPage from "@/components/LandingPage.vue"
import BikeMap from "@/components/BikeMap.vue"

export default defineComponent({
  data(){
    return {
      gettingLocation: false,
      cityToggle: false
    }
  },
  created(){
    window.addEventListener("resize", this.detectWindowWidth);
    this.checkGeoLocation()
  },
  destroyed(){
    window.removeEventListener("resize", this.detectWindowWidth);
  },
    components: {LandingPage, BikeMap},
  methods: {
    detectWindowWidth(){
      this.$store.commit("detectWidth", window.innerWidth)
    },
    checkGeoLocation(){
      if ("geolocation" in navigator) {
        /* geolocation is available */
          navigator.geolocation.getCurrentPosition(pos => {
            if(pos && pos.coords){
              this.gettingLocation = true
              this.$store.commit("setGeoLocation", pos.coords)
              console.log(pos.coords);
            }
          }, err => {
            console.log(err.message);
          })
      } else {
        /* geolocation IS NOT available */
        console.log('geolocation IS NOT available')
        this.gettingLocation = false
      }
    },
  }
})
</script>

<template>
  <div v-cloak id="mainPage" >
    <LandingPage/>
    <BikeMap/>
  </div>
</template>

<style lang="scss">
  [v-cloak]{
    display: none;
  }
  #mainPage{
    // display: flex;
    // flex-wrap: wrap;
    height: 100vh;
  }
</style>