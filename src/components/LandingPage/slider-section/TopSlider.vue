<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { ref } from "vue";

const props = defineProps({
  landingPageData: {
    type: Object,
    default: {},
  }
});

</script>

<template>
  <div>
    <section v-if="landingPageData">
      <div class=" clb-g">
        <div class="slider-title text-center">
          <h2 class="slider-head">{{ landingPageData.title }}</h2>
        </div>
        <div class="container slide-border">
            
          <Swiper
              :autoplay="{ delay: 3000, disableOnInteraction: false }"
              :loop="true"
              :pagination="{ clickable: true }"
              :navigation="true"
              :modules="[Pagination, Navigation, Autoplay]"
              :centeredSlides="true" 
              :breakpoints="{
                320: { slidesPerView: 1, spaceBetween: 20 },
                480: { slidesPerView: 2, spaceBetween: 20 },
                790: { slidesPerView: 3, spaceBetween: 15 },
              }"
              class="mySwiper"
              >
            <SwiperSlide v-for="(image, index) in landingPageData.images" :key="index">
              <div class="slider-box">
                <img :src="image.image" alt="" class="slide-image">
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div class="btn-frame text-center">
          <a href="#" class="order-btn-c">অর্ডার করুন</a>
      </div>
    </div>
  </section>
  </div>
</template>


<style scoped>

@import "@/assets/css/landing-page.css";

.slider-box{
  border: 1px solid black;
  margin: 25px 0px 25px 0px
}

.slide-image{
  width: 100%;
  padding: 15px;
  background-color: white;
  
}

.slide-border{
  border: 2px solid black;
  border-radius: 15px;
  margin-top: 20px;
}
.mySwiper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mySwiper .swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pd-cd{
  padding-top: 33px;
}

@media (max-width: 768px) {
 .order-btn-c {
    padding: 12px 35px;
  }
 .order-btn-c:hover {
    padding: 12px 35px;
  }

  .clb-g .container{
    width: 100%;
  }

  .slider-head{
    width: 60%;
  }

}

@media (max-width: 767px) {
  .clb-g{
    padding: 20px;
  }
  .clb-g .container{
    max-width: 100%;
  }
}

@media (max-width: 575px) {
  .slider-head{
    width: 70%;
  }

  .order-btn-c:hover {
    padding: 12px 30px;
  }

  .order-btn-c {
    padding: 12px 30px;
    font-size: 25px;
  }

}

@media (max-width: 425px) {
  .slider-head{
    width: 90%;
  }

  .slider-head{
    font-size: 22px;
  }

}

</style>