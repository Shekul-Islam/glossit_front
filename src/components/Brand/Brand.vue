<script setup>
// All Import File  Code Is Here......................................................................................................
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
// product data fetch
import { useBrand } from "@/stores";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";

// All Variable  Code Is Here.....................................................................................................
const brand = useBrand();
const { brands } = storeToRefs(brand);
const modules = ref([Pagination, Autoplay, Navigation]);

function calculateSlides() {
  if (window.innerWidth < 768) {
    return 1;
  } else if (window.innerWidth < 1024) {
    return 2;
  } else {
    return 5;
  }
}

onMounted(() => {
  brand.getData();
});
</script>

<template>
  <div>
    <section class="section brand-part">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="section-heading">
              <h2>shop by brands</h2>
            </div>
          </div>
        </div>
        <div class="brand-slider slider-arrow">
          <swiper
            :slidesPerView="5"
            :sliderPerGroup="1"
            :navigation="true"
            :modules="modules"
            class="mySwiper"
            :breakpoints="{
              320: { slidesPerView: 2, spaceBetweenSlides: 20 },
              480: { slidesPerView: 3, spaceBetweenSlides: 20 },
              790: { slidesPerView: 5, spaceBetweenSlides: 40 },
            }"
          >
            <swiper-slide
              v-for="(brand, index) in brands?.result?.data"
              :key="index"
            >
              <div class="brand-wrap">
                <div class="brand-media">
                  <img :src="brand.image" alt="brand" />
                  <div class="brand-overlay">
                    <router-link
                      :to="{ name: 'shopPage', query: { brand: brand.id } }"
                      ><i class="fas fa-link"></i
                    ></router-link>
                  </div>
                </div>
                <div class="brand-meta">
                  <h4>{{ brand.name }}</h4>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.brand-part {
  margin-top: -22px !important;
}

.brand-slide {
  margin-top: -43px;
}

@media (max-width: 768px) {
  .section-heading {
    margin-bottom: 35px;
  }
}
@media (max-width: 425px) {
  .brand-slide {
    margin-top: -43px !important;
  }
}
</style>
