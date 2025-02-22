<script setup>

import { ref } from "vue";

const props = defineProps({
 landingPageData: {
    type: Object,
    default: {}, 
  },
});


</script>

<template>
  <div>
    <section class="container pd-bc" v-if="landingPageData">
      <div class="sec-4 text-center">
          <h2 class="title-d">{{ landingPageData.title }}</h2>
      </div>

      <div class="row card-bx">
          <div class="col-lg-3  col-md-6 col-sm-6 col-12 mb-4" v-for="(item, index) in 4" :key="index">
              <div class="crd text-center">
                  <img :src="landingPageData.images[index]?.image" alt="Handmade Shoe" class="img-fluid card-image mb-3">
                  <p class="dis-d">{{ landingPageData.titles[index]?.title }}</p>
              </div>
          </div>
      </div>

      <div class="pd-c text-center">
        <a href="#" class="order-btn-c">অর্ডার করুন</a>
      </div>
  </section>
  </div>
</template>


<style scoped>
@import "@/assets/css/landing-page.css";
.card-bx{
  padding: 13px 12px 6px 10px;
}
.pd-bc {
  padding-bottom: 42px;
}

@media (max-width:1399px) {
  .sec-4{
    padding: 30px 5px 20px 5px;
  }
}

@media (max-width:1199px) {
  .dis-d{
    font-size: 17px;
  }
}

@media (max-width:991px) {
  .dis-d{
    font-size: 18px;
  }
  .title-d {
    font-size: 24px;
  }

  .order-btn-c{
    padding: 10px 25px;
    font-size: 25px;
  }
}

@media (max-width:767px) {
  
  .title-d {
    font-size: 22px;
  }

  .order-btn-c{
    font-size: 20px;
  }
}

@media (min-width: 431px) and (max-width: 550px) {
  .title-d {
    font-size: 18px;
  }
}

@media (min-width: 376px) and (max-width: 430px) {
  .title-d {
    font-size: 26px;
    line-height: 37px;
  }
}

@media (min-width: 321px) and (max-width: 375px) {
  .title-d {
    font-size: 21px;
    line-height: 37px;
  }
}

@media (max-width:320px) {
  

  .title-d {
    color: #000000;
    text-align: center;
    border-style: solid;
    box-sizing: border-box;
    border-color: #000000;
    background-color: #4c677cad;
    font-family: "Hind Siliguri", Sans-serif;
    font-size: 19px;
    font-weight: bolder;
    line-height: 1.5;
    padding: 8px 0px 4px 0px;
    border-width: 4px 4px 4px 4px;
    border-radius: 20px 20px 20px 20px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  }

  .pd-bc {
    padding-bottom: 35px;
  }

  .sp {
    color: #fff;
    font-size: 32px;
    font-weight: 700;
  }
  
  
  
  .card-bx {
    display: flex;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    padding: 10px 0px 0px 0px;
  }
  
  .card-bx div {
    height: 200px;
  }

  .dis-d {
    font-family: "Hind Siliguri", Sans-serif;
    color: #000000;
    box-sizing: border-box;
    margin: 0;
    width: 100%;
    padding: 5px;
    font-size: 15px;
    font-weight: bold;
    line-height: 1.3em;
  }
  

  .order-btn-c{
    font-family: "Hind Siliguri", Sans-serif;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    border-style: solid;
    text-decoration: none;
    border-color: #000000;
    background-color: #ff7400;
    padding: 10px 35px 8px 35px;
    border-width: 4px 4px 4px 4px;
    border-radius: 30px 30px 30px 30px;
  
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .order-btn-c:hover {
    background-color: #028309;
    padding: 18px 30px;
    font-size: 1.4em;
  } 


}

</style>