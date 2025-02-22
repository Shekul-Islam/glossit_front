<script setup>
import { useCategory } from "@/stores";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
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
const category = useCategory();
const { categories } = storeToRefs(category);
const router = useRouter();

const getCategoryData = (slug) => {
  router.push({ name:'shopPage', query:{ category: slug} });
}

</script>

<template>
  <div>
     <div class="container mt-5">
      <div class="section-heading">
        <h2>
          <span class="section-header-text">Shop by Featured Categories</span>
        </h2>
        <div class="main-section">
        <div class="card category-section text-center" v-for="(category, index) in categories?.data" :key="index" @click="getCategoryData(category.slug)">
          <figure>
            <img :src="category.image" alt="" width="100%" />
          </figure>
          <span class="category-name">{{ category.name }}</span>
        </div>
      </div>
      </div>
    </div> 
  </div>

  <div>
     <div class="container mt-5">
      <div class="section-heading">
        <h2>
          <span class="section-header-text">Shop by Skin Type</span>
        </h2>
        <div class="main-section">
        <div class="card category-section text-center" v-for="(category, index) in categories?.data" :key="index" @click="getCategoryData(category.slug)">
          <figure>
            <img :src="category.image" alt="" width="100%" />
          </figure>
          <span class="category-name">{{ category.name }}</span>
        </div>
      </div>
      </div>
    </div> 
  </div>

  <div>
     <div class="container mt-5">
      <div class="section-heading">
        <h2>
          <span class="section-header-text">Shop by Skin Concern</span>
        </h2>
        <div class="main-section">
        <div class="card category-section text-center" v-for="(category, index) in categories?.data" :key="index" @click="getCategoryData(category.slug)">
          <figure>
            <img :src="category.image" alt="" width="100%" />
          </figure>
          <span class="category-name">{{ category.name }}</span>
        </div>
      </div>
      </div>
    </div> 
  </div>
</template>

<style scoped>

.main-section {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 8px;
}

.card {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, .125);
    border-radius: .25rem;
    padding: 10px;
    box-shadow: 0px 2px 10px -4px rgba(0, 0, 0, .5);
}

.category-name{
  font-size: 18px;
}


/* Shine start*/
.hover14 figure {
	position: relative;
	overflow: hidden; /* Add this to keep shine within bounds */
}

.hover14 figure::before {
	position: absolute;
	top: 0;
	left: -75%;
	z-index: 2;
	display: block;
	content: '';
	width: 50%;
	height: 100%;
	background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,.3) 100%);
	transform: skewX(-25deg);
	transition: left 0.75s ease;
}

.hover14 figure:hover::before {
	left: 125%; /* Move shine effect smoothly */
}

/* Zoom In */
.hover01 figure img {
	transform: scale(1);
	transition: transform .3s ease-in-out;
}

.hover01 figure:hover img {
	transform: scale(1.1); /* Zoom effect */
}


.section-header-text{
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  position: relative;
  color: #333;
}

.section-header-text::before,
.section-header-text::after {
  content: "";
  flex: 1;
  height: 1px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.105);;

}
.section-header-text::before {
  margin-right: 20px; 
}

.section-header-text::after {
  margin-left: 20px; 
}




@media screen and (max-width: 991px) {
  .main-section {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
}
 
}

@media screen and (max-width: 767px) {
  .section-header-text{
    font-size: 17px;
  }
  .main-section {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
}
  
}

@media screen and (max-width: 576px) {
  .section-header-text{
    font-size: 16px;
  }

  .main-section {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
}
}
</style>
