<script>
import { defineComponent } from "vue"
import {TaiwanCityList, TaiwanCityLocation} from "/src/assets/js/commom.js"
export default defineComponent({
  data(){
    return {
        routeName: null,
        citiyOption: TaiwanCityList,
        cityBoxToggle:false,
        citySelect: null
    }
  },
  mounted() {
    document.addEventListener("click", this.bodyClose)
  },
  beforeDestroy() {
    document.removeEventListener("click", this.bodyClose)
  },
  methods:{
    bodyClose(e) {
        if (this.cityBoxToggle && this.$refs.cityBox && !this.$refs.cityBox.contains(e.target)) {
            this.cityBoxToggle = false
        }
    },
    startSearch(){
      const targetCity = Object.values(TaiwanCityList).findIndex(item => item === this.citySelect)
      console.log(targetCity);
    //   const cityIndex = TaiwanCityLocation[targetCity] 
    //     this.$store.commit("setGeoLocation", pos)      

    }
  }
})
</script>
<template>
    <div id="main_selector">
        <div class="cityBox" ref="cityBox">
        <button 
            v-for="(item, index) in citiyOption"
            :key="index"
            :class="{selected : citySelect == item}"
            @click="citySelect = item"
        >{{item}}</button>
        </div>
        <button class="search" :class="{show: citySelect}" @click="startSearch">開始搜尋</button>
    </div>
</template>

<style scoped lang="scss">
#main_selector{
  display: flex;
  flex-direction: column;
  margin: 1rem;
  max-width: 16rem;
  >*{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
}
.selectBox{
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #FAFAFA;
  border-radius: 8px;
  margin-bottom: 1rem;
  padding: 0.25rem 0.55rem 0.25rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.08);
  &.text .inputBox{
    flex: 0 0 calc(100% - 2rem);
  }
  .inputBox{
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 0 0 4em;
    p{
      width: 3em;
      font-size: 1rem;
      font-weight: normal;
      color: #222;
      padding: 0;
    }
    button{
      width: 1em;
      height: 1em;
      padding: 0;
    }
  }
  >button{
    flex: 0 0 2rem;
    height: 1.3rem;
    padding: 0;
  }
}
button{
  &.arrow{
    padding: 0;
    transform: rotate(-180deg);
    transition: 1s ease-in-out;
    &.open{
      transform: rotate(0deg);
    }
  }
}
.cityBox{
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    transition: 1s ease-in-out;
    padding: .25rem;
    height: 22rem;
    button{
        flex: 0 0 4rem;
        border: 1px solid #3FB195;
        font-size: 0.9rem;
        padding: 0.25rem;
        &.selected{
            background: #3FB195;
            color: #FFFFFF;
        }
    }
}
.search{
    visibility: hidden;
    background: #3FB195;
    color: #FFFFFF;
    font-size: 1rem;
    margin: 0.5rem auto;
    justify-content: center;
    &.show{
        visibility: visible;
    }
}
@media only screen and (max-width: 640px) {
  .selectBox{
    width: 10rem; 
  }
  .cityBox{
    justify-content: start;
    &.show{
      height: auto;
    }
    button{
      margin: 6px;
      flex: 0 0 5rem;
      font-size: 16px;
    }
  }
}
</style>