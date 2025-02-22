<script setup>
import { ProductCard } from "@/components";
import { useCampaign } from "@/stores";
import { onMounted, ref, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "vue-router";

const campaign = useCampaign();
const campaigns = ref("");
const route = useRoute();

const getCampaigns = async () => {
  const res = await campaign.getCampaign(route.params.campaignId);
  campaigns.value = res;
  startDate.value = campaigns.value?.start_date;
  endDate.value = campaigns.value?.end_date;
  startCountdown(startDate.value, endDate.value);
};

const startDate = ref();
const endDate = ref();
const productTimer = ref(true);

// flash deal timer start

const time = {
  days: ref(0),
  hours: ref(0),
  minutes: ref(0),
  seconds: ref(0),
};

let timer = null;

const padSingleDigit = (num) => {
  return num < 10 ? `0${num}` : `${num}`;
};

// Function to parse startDate if it's in a non-standard format
const parseStartDate = (startDate) => {
  const parts = startDate.split(/[- :]/);
  return new Date(
    parts[0],
    parts[1] - 1,
    parts[2],
    parts[3],
    parts[4],
    parts[5]
  );
};

const startCountdown = (startDate, endDate) => {
  //end Date
  const targetDate = new Date(endDate).getTime();

  const parsedStartDate = parseStartDate(startDate);

  timer = setInterval(() => {
    //Start Date
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update values with padded single digits without quotes
    time.days.value = padSingleDigit(days);
    time.hours.value = padSingleDigit(hours);
    time.minutes.value = padSingleDigit(minutes);
    time.seconds.value = padSingleDigit(seconds);

    if (distance < 0) {
      clearInterval(timer);
      time.days.value = "00";
      time.hours.value = "00";
      time.minutes.value = "00";
      time.seconds.value = "00";

      productTimer.value = false;
    }
  }, 1000);
};

// flash deal timer end

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer);
  }
});

onMounted(() => {
  getCampaigns();
});
</script>

<template>
  <div class="main_section my-5 container">
    <div class="counter_section">
      <div class="row">
        <div class="col-lg-12">
          <div class="countdown deals-clock" data-countdown="2021/12/31">
            <span class="countdown-time"
              ><span>{{ time.days.value }}</span
              ><small>দিন</small></span
            >
            <span class="countdown-time"
              ><span>{{ time.hours.value }}</span
              ><small>ঘন্টা</small></span
            >
            <span class="countdown-time"
              ><span>{{ time.minutes.value }}</span
              ><small>মিনিট</small></span
            >
            <span class="countdown-time"
              ><span>{{ time.seconds.value }}</span
              ><small>সেকেন্ড</small></span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="banner_section text-center">
      <a href="">
        <img :src="campaigns?.image" alt="" style="width: 100%" />
      </a>
    </div>
    <div class="mt-5">
      <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
        <div
          class="col"
          v-for="(product, index) in campaigns?.products"
          :key="index"
        >
          <ProductCard :product="product" :campaignSlug="route.params.campaignId" :isCampaign="true" />
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="section-btn-25">
            <router-link :to="{ name : 'CampaignBanner' }" class="btn btn-inline">
              <i class="fas fa-eye"></i>
              <span>view all deals</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
