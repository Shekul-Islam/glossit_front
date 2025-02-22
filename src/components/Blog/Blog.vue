<script setup>
import { ref, onMounted, computed } from "vue";
import { useBlog } from '@/stores'
import { storeToRefs } from 'pinia';
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

const newSlide = ref([Navigation]);
const modules = ref([Pagination, Autoplay]);

// getBlogPost data start
const blog = useBlog();
const blogPostData = ref()
// getBlogPost data end

// getBlogPost data start
const getBlogPost = async (tagID = '', BlogPost = '') => {
    const res = await blog.getBlogPost(tagID, BlogPost); 
    if (res.success) {
        blogPostData.value = res.result.data
    }
}



// Define a computed property to format the date
const formattedDate = (createdAtString) => {
  // Convert ISO string to Date object
  const createdAtDate = new Date(createdAtString);
  
  // Check if the date is valid
  if (isNaN(createdAtDate.getTime())) {
    return ""; // Return empty string if date is invalid
  }
  
  return createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit"
  });
};
// getBlogPost data end






onMounted(() => {
  getBlogPost();
});

</script>

<template>
  <div>
  <section class="blog-part" v-if="blogPostData?.length > 0">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="section-heading overwrite-blog-heading">
              <h2><span class="section-header-text">Blog Title</span></h2>
              <div class="heading-line"></div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="blog-slider slider-arrow">

              <swiper
                :slidesPerView="1"
                :sliderPerGroup="1"
                :loop="true"
                :autoplay="{
                  delay: 2000,
                }"
                :breakpoints="{ 
                  320 : { slidesPerView:1 },
                  467 : { slidesPerView:2,spaceBetweenSlides: 30  },
                  1200: { slidesPerView:3,spaceBetweenSlides: 40 } }"
                :navigation="true"
                :modules="newSlide"
                class="mySwiper"
              >
                <swiper-slide v-for="(blogPost, index) in blogPostData" :key="index">
                 <div class="blog-card">
                <div class="blog-media">
                  <router-link :to="{ name: 'blogDetailsPage', params:{ postSlug: blogPost.slug} }" class="blog-img" href="#">
                      <img :src="blogPost.image" alt="blog">
                  </router-link>
                </div>
                <div class="blog-content">
                  <ul class="blog-meta">
                    <li>
                      <i class="fas fa-user"></i>
                      <span>admin</span>
                    </li>
                    <li>
                      <i class="fas fa-calendar-alt"></i>
                      <span>{{ formattedDate(blogPost.created_at) }}</span>
                    </li>
                  </ul>
                  <router-link :to="{ name: 'blogDetailsPage', params:{ postId: blogPost.id} }" class="blog-title">
                      <a href="blog-details.html">{{ blogPost.title }}</a>
                  </router-link>
                  <p class="blog-desc" v-html="$filters.textShort(blogPost.description, 100)"></p>
                  <div class="tags">
                    <ul>
                      <li v-for="(tag, index) in blogPost.tags" :key="index">{{ tag.name }}</li>
                    </ul>
                  </div>
                  <router-link :to="{ name: 'blogDetailsPage', params:{ postId: blogPost.id} }" class="blog-btn" href="#">
                      <span>read more</span>
                      <i class="icofont-arrow-right"></i>
                  </router-link>
                </div>
              </div>
                </swiper-slide>
              </swiper>  
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="section-btn-25">
              <router-link :to="{name : 'blogPage'}" class="btn btn-outline">
                <i class="fas fa-eye"></i>
                <span>view all blog</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped>



/* blog title start */

.section-header-text {
  background-color: #f5f6f7;
  padding: 10px 20px;
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


/* blog title end */

.tags {  
  box-sizing: border-box;
  margin-bottom: 10px;
}

.tags ul {
  display: flex;
  gap: 15px;
  flex-wrap: wrap; 
}

.tags ul li {
  border: 1px solid black;
  padding: 2px 5px;
  font-size: 14px;
  background-color: var(--secondary-color);
  color: var(--primary);
  border-radius: 5px;
  cursor: pointer;
  transition: .5s;
 }
.tags ul li:hover {
  background-color: var(--primary);
  color:  var(--secondary-color);
  transition: .5s;
}

.blog-part{
  margin: -35px 0px 22px 0px !important;
}

.blog-slider {
  margin-top: -10px;
}

.blog-img img{
  height: 300px;
}

@media (max-width: 991px) {
  .section-header-text {
    padding: 5px 20px;
    border: 1px solid var(--primary) !important;
    border-top-width: 3px !important;
  }
  .overwrite-blog-heading{
    margin-top: -12px;
    margin-bottom: 54px;
  }
}

@media screen and (max-width: 767px) {
  .section-header-text{
    font-size: 18px;
  }
  .heading-line{
    margin-top: -20px;
  }
  .section-btn-25 a{
    font-size: 12px;
    padding: 6px 15px;
  }
}

@media (max-width: 425px) {
  .blog-part{
    margin-top: -50px !important;
  }

  .section-heading{
    margin: 15px 0 85px 0;
  }

  
}


</style>
