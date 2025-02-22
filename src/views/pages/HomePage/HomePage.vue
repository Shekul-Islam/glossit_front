<script setup>
import Banner from '../../../components/Banner/Banner.vue'
import AnonleatherLocationStoreSection from '../../../components/Footer/AnonleatherLocationStoreSection.vue'
import Blog from '../../../components/Blog/Blog.vue'
import HomePageBanner from '../../../components/Banner/HomePageBanner.vue'
import PremiumCollection from '../../../components/PremiumCollection/PremiumCollection.vue'
import AnonleatherSectionProduct from '../../../components/Product/AnonleatherSectionProduct.vue'
import CategorySection from '../../../components/Category/CategorySection.vue'
import AnonleatherCampaignSection from '../../../components/Product/AnonleatherCampaignSection.vue'
import AnonLeatherBanner from '../../../components/Banner/AnonLeatherBanner.vue'
import { ref, onMounted } from "vue";


</script>

<template>
  <div>

    <Banner />

    <!-- <AnonLeatherBanner /> -->
    
    <!-- <AnonleatherCampaignSection />  ---->

    <CategorySection />

    <AnonleatherSectionProduct /> 
    
    <!-- <PremiumCollection /> -->
    
    <!-- <HomePageBanner /> -->
    
    <!-- <Blog /> -->
    
    <!-- <AnonleatherLocationStoreSection />  ---->
  </div>
</template>

<style scoped>

</style>
