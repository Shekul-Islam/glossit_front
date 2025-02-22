<script setup>
import { useCampaign } from "@/stores";
import { onMounted, ref } from "vue";
const campaign = useCampaign();
const campaignBanners = ref("");

const getCampaignBanners = async () => {
  const res = await campaign.getCampaignBanner();

  campaignBanners.value = res.data;  
};

onMounted(() => {
  getCampaignBanners();
});
</script>

<template>
  <div class="my-5">
    <div class="main-campaign-section container m-auto">
      <div class="campaign-title text-center">
        <h2>
          <span class="section-header-text">All Campaigns</span>
        </h2>
        <div class="heading-line"></div>
      </div>
      <div class="campaign-banner mt-5">
        <div class="row">
          <div
            class="col-md-6 mt-4"
            v-for="(campaignBanner, index) in campaignBanners"
            :key="index"
          >
            <router-link
              :to="{
                name: 'CampaignProductList',
                params: { campaignId: campaignBanner?.slug },
              }"
            >
              <img :src="campaignBanner.image" alt="" style="width: 100%" />
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-campaign-section {
  background-color: var(--white);
  padding: 30px;
}

.section-header-text {
  background-color: #f5f6f7;
  padding: 10px 20px;
  font-size: 28px;
  border: 3px solid var(--primary) !important;
  border-top-width: 7px !important;
  border-radius: 15px / 45px !important;
  box-shadow: #ccdbe8 3px 3px 15px inset, #ffffff80 -3px -3px 12px 1px inset;
  transition: all linear 0.2s;
}

.section-header-text:hover {
  background-color: #f5f6f7;
  border: 3px solid var(--secondary-color) !important;
  border-top-width: 7px !important;
  border-radius: 15px / 45px !important;
  transition: all linear 0.2s;
}

.heading-line {
  width: 100%;
  background-color: var(--primary);
  height: 2px;
  margin-top: -25px;
}
.heading-line:hover {
  background-color: var(--secondary-color);
}
</style>
