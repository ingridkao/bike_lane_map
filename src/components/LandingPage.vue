<script>
import { defineComponent } from "vue"

export default defineComponent({
  name: "LandingPage",
  data(){
    return {
      gettingLocation: false,
      cityToggle: false
    }
  },
  created(){
    
  },
  methods:{

    goToMap(){
    }
  },
})
</script>

<template>
  <div >
    <!-- <img src="" alt=""> -->
    <button v-if="gettingLocation" @click="checkGeoLocation">Check</button>
    <button v-else @click="goToMap">Start</button>
  </div>
</template>