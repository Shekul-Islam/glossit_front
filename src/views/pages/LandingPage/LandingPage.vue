<script setup>
import axiosInstance from "@/services/axiosService.js";
import {TopView, TopBanner, VideoCampaign, TopSlider, CardAwarness, ImageCampaign, OfferCampaign, SizeChart, OrderSection, AnonLeatherLandingPageFooter } from "@/components";
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router';


const route = useRoute();
const landingPageDatas = ref("");
console.log(route);

const getLandingPageData = async () => {
  try {
    const res = await axiosInstance.get(`/landing-pages/${route.params.slug}`);
    landingPageDatas.value = res.data.result;
    console.log(res.data.result.sections[5].titles[1].id);
    console.log(landingPageDatas.value);
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getLandingPageData();
});


</script>

<template>
  <div>
      <span v-for="(landingPageData, index) in landingPageDatas.sections" :key="index">
        <span v-if="landingPageData.layout.id == 1">
          <TopView :landingPageData="landingPageData"/>
        </span>
       <span v-if="landingPageData.layout.id == 1">
          <TopBanner :landingPageData="landingPageData"/>
        </span>
        
        <span v-if="landingPageData.layout.id == 2">
          <videoCampaign :landingPageData="landingPageData" />
        </span>
        
        <span v-if="landingPageData.layout.id == 3">
          <TopSlider :landingPageData="landingPageData"/>
        </span>

        <span v-if="landingPageData.layout.id == 5">
          <CardAwarness :landingPageData="landingPageData"/>
        </span>

        <span v-if="landingPageData.layout.id == 6">
          <ImageCampaign :landingPageData="landingPageData"/>
        </span>

        <span v-if="landingPageData.layout.id == 7">
          <OfferCampaign :landingPageData="landingPageData"/>
        </span>

        <span v-if="landingPageData.layout.id == 8">
          <SizeChart :landingPageData="landingPageData"/>
        </span>
        
        <span v-if="landingPageData.layout.id == 9">
          <OrderSection :landingPageData="landingPageData" :products="landingPageDatas.items"/>
        </span>
        
        <!-- <span v-if="landingPageData.layout.id == 10">
          <AnonLeatherLandingPageFooter  :landingPageData="landingPageData"/>
        </span>  -->

      </span>
    
  </div>
  
</template>

<style scoped>
@import "@/assets/css/landing-page.css";

</style>
