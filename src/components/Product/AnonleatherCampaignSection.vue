<script setup>
import { useCampaign } from "@/stores";
import { ProductCard } from "@/components";
import { onMounted, ref, onBeforeUnmount, watch } from "vue";
import { storeToRefs } from 'pinia';
import {useSetting} from '@/stores'
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

// All Variable  Code Is Here.....................................................................................................
const newSlide = ref([Navigation]);
const modules = ref([Pagination, Autoplay]);
const campaign = useCampaign();
const campaigns = ref("");
const campaignSlug = ref("");
const CampaignBanner = ref();
const setting      = useSetting();
const { settings } = storeToRefs(setting);

const getSettingsData = () => {
  if (!settings.value.data || !Array.isArray(settings.value.data)) {
    console.warn("Settings data is not available yet.");
    return;
  }

  settings.value.data.forEach((ele) => {
    if (ele.key === "campaign_section_banner_image") {
      CampaignBanner.value = ele;
    }
  });
};

watch(
  () => settings.value.data,
  (newData) => {
    if (newData && Array.isArray(newData)) {
      getSettingsData();
    }
  },
  { immediate: true }
);


const getCampaignBanners = async () => {
  const res = await campaign.getCampaignBanner();
  campaignSlug.value = res?.data[0]?.slug;
  campaigns.value = await campaign.getCampaign(res?.data[0]?.slug);
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
  getCampaignBanners();
  getSettingsData(); 
});
</script>

<template>
  <div>
    <div class="main-campaign-section" :style="{ backgroundImage: `url(${CampaignBanner?.value})` }">
      <div class="container">
        <div class="row pt-4">
          <div class="col-lg-12">
            <div class="main-campaign-section">
              <div class="campaign-title">
                <h2 class="text-lg-start">{{ campaigns.title }}</h2>
              </div>
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
        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
          <div
            class="col"
            v-for="(product, index) in campaigns.products"
            :key="index"
          >
            <ProductCard
              :product="product"
              :campaignSlug="campaignSlug"
              :isCampaign="true"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.main-campaign-section{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.countdown{
  text-align: center;
  justify-content: start;
}

.deals-clock{
  margin: 0px 10px;
}

.countdown-time {
  padding: 0;
  border: none;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  margin: 0 10px;
  /* border-radius: 15px; */
}

.deals-clock::after {
  position: absolute;
  content: "";
  top: 0px;
  left: 50%;
  width: 360px;
  height: 70px;
  z-index: -1;
  background: var(--body);
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}

.campaign-title h2{
  font-size: 40px;
  color: rgb(255, 0, 0);
}

@media (max-width: 1199px) {
  .campaign-title h2 {
    font-size: 30px;
  }

  .countdown-time span {
    display: block;
    font-size: 30px;
    font-weight: 700;
    line-height: 40px;
    color: var(--primary);
  }

  .deals-clock::after {
    width: 260px;
  }

}

@media (max-width: 767px) {
  .campaign-title h2 {
    font-size: 27px;
  }

  .countdown {
    background-color: var(--body);
  }

}

@media (max-width: 519px) {
  .main-campaign-section{
    flex-direction: column;
  }

  .campaign-title {
    padding: 1px 10px;
    border: 1px solid var(--primary) ;
    background-color: var(--body);
    border-top-width: 3px ;
    border-radius: 15px / 45px ;
    margin-bottom: 15px;
  }

  .countdown-time span{
    font-size: 20px;
  }
}

@media (max-width: 425px) {
  .campaign-title h2 {
    font-size: 20px;
  }
  .campaign-title h2 {
    font-size: 20px;
  }
}

/* testing 
.product-image img {
  width: 100%;
}

@media (max-width: 1440px) {

}

@media (max-width: 1399px) {

}

@media (max-width: 991px) {
  
}

@media (max-width: 767px) {

}

@media (max-width: 575px) {

}

@media (max-width: 540px) {

}

@media (min-width: 480px) and (max-width: 519px) {

}

@media (min-width: 450px) and (max-width: 480px) {

}

@media (min-width: 431px) and (max-width: 450px) {

}

@media (max-width: 430px) {

}

@media (max-width: 428px) {

}

@media (max-width: 414px) {

}
@media (max-width: 412px) {

}
@media (max-width: 390px) {

}
@media (max-width: 384px) {

}


@media (max-width: 375px) {

}

@media (max-width: 360px) {

}

@media (max-width: 344px) {

}
@media (max-width: 320px) {

}

@media (max-width: 319px) {

}
*/
</style>
