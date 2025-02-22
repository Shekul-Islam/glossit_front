<script setup>
import HomeSliderSkeleton from '../skeleton/HomeSliderSkeleton.vue'
// All Import File  Code Is Here......................................................................................................
import { ref, onMounted, onBeforeUnmount } from "vue";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";

// slider get data
import { storeToRefs } from "pinia";
// slider data fetch
import { useSlider, useCategory } from "@/stores";

// All Variable  Code Is Here.....................................................................................................

const modules = ref([Pagination, Autoplay, Navigation]);

// slider data fetch
const slider = useSlider();
const sliders = ref("");
const sliderData = ref([]);



// slider part start

const getSlider = async () => {
  const res = await slider.getData();
  sliderData.value = res.data;
  checkScreenSize();
  
};

// slider part end

const checkScreenSize = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth <= 575) {
    sliders.value = sliderData.value.filter((i) => i.type === "mobile");
  } else {
    sliders.value = sliderData.value.filter((i) => i.type === "desktop");
  }
  
};

onMounted(() => {
  getSlider();
  window.addEventListener('resize', checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize); 
});

</script>

<template>
  <div>
    <div class="container">
      <section class="banner-part">
      <div class="home-grid-slider slider-dots">
        <template v-if="!sliders">
          <HomeSliderSkeleton />
        </template>
        <template v-else>
          <swiper
            :slidesPerView="1"
            :sliderPerGroup="1"
            :loop="true"
            :autoplay="{
              delay: 2000,
            }"
            :pagination="{
              clickable: true,
            }"
            :navigation="true"
            :modules="modules"
            class="mySwiper"
          >
            <swiper-slide v-for="(slider, index) in sliders" :key="index">
              <div class="banner-image">
                <img :src="slider.image" alt="" />
              </div>
            </swiper-slide>
          </swiper>
        </template>
      </div>
    </section>
    </div>
  </div>
</template>

<style>

.banner-promo {
  margin-bottom: 25px;
  overflow: hidden;
  border-radius: 5px;
}

.banner-promo a img {
  width: 100%;
  border-radius: 8px;
  transition: transform 0.5s;
}
.banner-promo a img:hover {
  transform: scale(1.1);
  transition: transform 0.5s;
}

.home-grid-slider {
  margin-bottom: 0px !important;
}

.home-grid-slider img {
  width: 100%;
  border-radius: 8px;
}

.banner-category-list {
  max-height: 315px;
  overflow-y: auto;
  overflow-x: hidden;
}

.banner-category-dropdown {
  z-index: 999999 !important;
}

.banner-promo a {
  width: 100%;
}

@media (max-width: 425px) {
}
</style>
