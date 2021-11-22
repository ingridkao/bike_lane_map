<script>
import { defineComponent } from "vue"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
const blackIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})
const greenIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})
export default defineComponent({
  data() {
    return {
      map: null,
      position: [],
      parkingPos: [],
    }
  },
  props: {
    location: {
        type: Array,
        default: () => [0,0]
    },
    parking: {
        type: Object,
        default: () => {}
    },
  },
  mounted() {
    this.processPosition()
    this.map = L.map("mapContainer").setView(this.position, 15);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    L.marker(this.position, { icon: blackIcon }).addTo(this.map)
    if(this.parkingPos.length > 0){
    //   L.marker(this.parkingPos, { icon: greenIcon }).addTo(this.map)
    }
  },
  onBeforeUnmount() {
    if (this.map) {
      this.map.remove();
    }
  },
  methods: {
    processPosition(){
      if(this.location[0] === 0 && this.location[1] === 0){
        this.position = [25.056, 121.50]
      }else{
        this.position = this.location
      }
    //   if(this.parking.PositionLat && this.parking.PositionLon){
    //     this.parkingPos = [this.parking.PositionLat, this.parking.PositionLon]
    //   }
    }
  }
})
</script>

<template>
    <div id="mapContainer"/>
</template>

<style lang="scss" scoped>
#mapContainer {
  width: 100%;
  height: 20rem;
}
@media only screen and (max-width: 640px) {}
</style>