<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
 landingPageData: {
    type: Object,
    default: {}, 
  },
});


</script>

<template>
  <div>
    {{ landingPageData }}
    <section class="top-section" v-if="landingPageData" 
      :style="{ 
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${landingPageData?.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }"
    >
      <div class="container">
          <div class="top-title-top">
            <div class="top-title">
              <p>{{ landingPageData.title }}</p>
          </div>
          </div>
          <div class="sub-title">
              <p>{{ landingPageData.sub_title }}</p>
          </div>
          <div>
              <img :src="landingPageData.images[0].image" alt="Logo" class="logo-top">

              <div class="pd">
                  <a href="#" class="order-btn bt-a">অর্ডার করুন</a>
              </div>
          </div>
      </div>
      <div class="custom-shape-divider-bottom-1731474883">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
        </svg>
    </div>
  </section>
  </div>
</template>


<style scoped>
@import "@/assets/css/landing-page.css";

.custom-shape-divider-bottom-1731474883 {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);
}

.custom-shape-divider-bottom-1731474883 svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 35px;
  transform: rotateY(180deg);
}

.custom-shape-divider-bottom-1731474883 .shape-fill {
  fill: #FFFFFF;
}

.top-section {
  padding-bottom: 60px;
}

.top-title{
  font-size: 23px;
  padding: 20px 15px 15px 15px;
}

.top-title-top{
  display: flex;
  justify-content: center;
}

.sub-title{
  font-size: 22px;
  padding-left: 42px;
  padding-right: 42px;
  line-height: 2;
}

.logo-top {
  width: 11.5%;
  margin-top: 98px;
  padding: 15px 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: absolute;
  transform: translate(-50%, -50%);
  
}
.logo-top:hover {
    padding: 18px 30px;
    font-size: 1.4em;
  }

.pd{
  padding-top: 210px;
}

.pd-b{
  padding-top: 48px;
}

@media (max-width: 1440px) {
  .sub-title {
    padding-top: 25px;
  }

  .logo-top{
    margin-top: 75px;
  }

  .pd {
    padding-top: 160px;
  }

}

@media (max-width: 1399px) {
  .logo-top {
    width: 12.5%;
  }
  .order-btn{
    font-size: 25px;
    padding: 15px 18px;
  }

}
@media (max-width: 1199px) {
  .logo-top {
    width: 14.5%;
  }

}


@media (max-width: 991px) {
  .top-title{
    font-size: 18px;
    padding: 20px 15px 15px 15px;
  }
  .logo-top {
    margin-top: 60px;
    width: 16.5%;
  }
  .pd{
    padding-top: 131px;
  }
  .top-section{
    padding-bottom: 35px;
  }

}

@media (max-width: 767px) {
  .top-title{
    font-size: 18px;
    padding: 20px 15px 15px 15px;
  }

  .top-section .container{
    max-width: 100%;
  }

  .sub-title {
        padding-left: 0px;
        padding-right: 0px;
        line-height: 35px;
    }
    .logo-top {
      width: 19.5%;
    }
  

}

@media (max-width: 631px) {
  .logo-top{
    width: 25.5%;
  }

}


@media (max-width: 575px) {
  .top-title{
    font-size: 22px;
  }
  .logo-top {
    width: 30.5%;
  }

  .order-btn {
    font-size: 23px;
  }
}

@media (max-width: 540px) {

}

@media (min-width: 480px) and (max-width: 519px) {

}

@media (min-width: 450px) and (max-width: 480px) {

}

@media (min-width: 431px) and (max-width: 450px) {
  .top-title{
    font-size: 18px;
  }
  .logo-top {
    width: 30.5%;
  }
}

@media (max-width: 430px) {
  .top-title{
    font-size: 18px;
  }

  .order-btn {
    font-size: 20px;
    padding: 14px;
  }

  .logo-top {
    width: 33.5%;
    margin-top: 64px;
  }
}

@media (max-width: 428px) {

}

@media (max-width: 414px) {

}
@media (max-width: 412px) {

}
@media (max-width: 390px) {

  .top-title{
    font-size: 15px;
  }

  .sub-title{
    font-size: 18px;
    padding-top: 20px;
  }

  .logo-top{
    margin-top: 70px;
  }

  .order-btn{
    padding: 15px;
  }

  .pd {
    padding-top: 148px;
  }


}
@media (max-width: 384px) {

}


@media (max-width: 375px) {

  .top-title{
    font-size: 15px;
  }

  .sub-title{
    font-size: 18px;
    padding-top: 20px;
  }

  .logo-top{
    margin-top: 55px;
  }

  .order-btn{
    padding: 15px;
  }

  .pd {
    padding-top: 120px;
  }

}

@media (max-width: 360px) {
  .logo-top {
    width: 42.5%;
  }
}

@media (max-width: 344px) {

}
@media (max-width: 320px) {
  .top-title{
    font-size: 13px;
  }
  .logo-top {
    width: 42.5%;
  }
}

@media (max-width: 319px) {

}

</style>