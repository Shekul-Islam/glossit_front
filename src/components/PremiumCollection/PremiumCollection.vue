<script setup>
import { onMounted, ref } from "vue";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";

// All Variable  Code Is Here.....................................................................................................
const newSlide = ref([Navigation]);
const modules = ref([Pagination, Autoplay]);

</script>

<template>
  <div>
    <div class="container mb-5">
      <div class="section-heading overwrite-heading-style overwrite-pc-mb">
        <h2>
          <span class="section-header-text">Premium Collection For You</span>
        </h2>
        <div class="heading-line"></div>
      </div>
      <div class="row">
        <swiper
              :slidesPerView="4"
              :sliderPerGroup="1"
              :loop="true"
              :autoplay="{
                delay: 2000,
              }"
              :breakpoints="{
                320 : { slidesPerView: 1, spaceBetween: 40 },
                467 : { slidesPerView: 2, spaceBetween: 20 },
                1200: { slidesPerView: 3, spaceBetween: 20 }
              }"
              :navigation="true"
              :modules="newSlide"
              class="mySwiper"
            >
            <swiper-slide >
              <div class="card main-section">
                <div class="img-section">
                  <img src="https://anonleather.com/wp-content/uploads/2023/10/f4c4d7be-4798-4623-ba60-1baad59bb91a.jpg" class="card-img-top" alt="...">
                </div>
                <div class="card-body text-center premiumcollection-title">
                  <h5>STEADY</h5>
                  <p> A journey of a thousand miles begins with a fabulous pair of shoes.</p>
                  <button>Shop Now</button>
                </div>
              </div>   
            </swiper-slide>
            <swiper-slide >
              <div class="card main-section">
                <div class="img-section">
                  <img src="https://anonleather.com/wp-content/uploads/2023/10/2a4414f6-2cd9-4079-b298-99496c667172.jpg" class="card-img-top" alt="...">
                </div>
                <div class="card-body text-center premiumcollection-title">
                  <h5>TRENDY</h5>
                  <p> Favorite footwear for autumn days & cool evenings. Pair with our latest styles.</p>
                  <button>Shop Now</button>
                </div>
              </div>   
            </swiper-slide>
            <swiper-slide >
              <div class="card main-section">
                <div class="img-section">
                  <img src="https://anonleather.com/wp-content/uploads/2023/10/61ab97e3-0552-47d6-b338-befbbfa3d79a.jpg" class="card-img-top" alt="...">
                </div>
                <div class="card-body text-center premiumcollection-title">
                  <h5>SPORTY</h5>
                  <p>Each pair of kicks is a new story. Get out there and tell yours.</p>
                  <button>Shop Now</button>
                </div>
              </div>   
            </swiper-slide>
        </swiper>  
      </div>
    </div>
  </div>
</template>

<style scoped>

.img-section{
  overflow: hidden;
}
.img-section img{
  transition: 0.5s;
}
.img-section:hover img{
  transform: scale(1.2);
  transition: 0.5s;
}


.main-section{
  transition: 0.5s;
}

.main-section:hover{
  box-shadow: rgba(0, 0, 0, 0.16) 0px 14px 36px;
  transition: 0.5s ;
}

.premiumcollection-title h5{
  padding: 2px;
  width: 67%;
  margin: auto;
  transform: translateY(-50px);
  background-color: white;
  padding: 25px 20px;
  font-size: 40px;
  margin-bottom: -40px;
  color: var(--primary);
  font-weight: 400;
}
.premiumcollection-title button{
  color: var(--secondary-color);
  font-weight: 700;
}

.section-header-text {
  background-color: #f5f6f7;
  padding: 10px 20px;
  font-size: 24px;
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

@media  (max-width: 1199px){
  .premiumcollection-title h5{
    font-size: 26px;
  }
}

@media  (max-width: 991px){
  .section-header-text{
    padding: 5px 20px;
    border: 1px solid var(--primary) !important;
    border-top-width: 3px !important;
    border-radius: 15px / 45px !important;
  }
}

@media (max-width: 767px) {
  .section-header-text{
    font-size: 18px;
  }
  .heading-line{
    margin-top: -20px;
  }

  .premiumcollection-title h5{
    font-size: 20px;
  }
  .overwrite-pc-mb{
    margin-bottom: 45px;
  }
}


@media  (max-width: 320px){
  .premiumcollection-title h5{
    font-size: 33px;
  }
  .section-heading h2 {
    font-size: 16px;
  }
}
</style>
