<script setup>
import HomeSliderSkeleton from '../skeleton/HomeSliderSkeleton.vue'
// All Import File  Code Is Here......................................................................................................
import { ref, onMounted } from "vue";

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
// category data fetch
const category = useCategory();
const categories = ref("");

// category part start

const getCategory = async () => {
  categories.value = await category.getCategories();
};

// category part end

// slider part start

const getSlider = async () => {
  sliders.value = await slider.getData();
};

// slider part end

onMounted(() => {
  getCategory();
  getSlider();
});

// API Calling Code Is Here.....................................................................................................

// All Function  Code Is Here.....................................................................................................
</script>

<template>
  <div class="container">
    <section class="banner-part">
      <div class="home-grid-slider slider-dots">
        <template v-if="!sliders.data">
          <HomeSliderSkeleton />
        </template>
        <template v-else>
          <swiper
            :slidesPerView="1"
            :sliderPerGroup="1"
            :loop="true"
            :pagination="{
              clickable: true,
            }"
            :navigation="true"
            :modules="modules"
            class="mySwiper"
          >
            <swiper-slide v-for="(slider, index) in sliders.data" :key="index">
              <div class="banner-image">
                <img :src="slider.image" alt="" />
              </div>
            </swiper-slide>
          </swiper>
        </template>
      </div>
    </section>
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

@media (max-width: 768px) {
  .swiper-button-prev, .swiper-button-next{
    width: 30px !important;
    height: 30px !important;
    line-height: 30px !important;
  }
  .swiper-button-prev::after, 
  .swiper-button-next::after{
    font-size: 16px !important;
  }
}
</style>
