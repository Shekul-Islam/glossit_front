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
    <section>
      <div class="clb">
          <div class="container pd-bt">
              <div class="sec-or text-center">
                  <h2 class="title-e">{{ landingPageData.title }} <span class="sp">{{ landingPageData.sub_title }}</span></h2>
              </div>
              <div class="row align-items-center se-img">
                  <div class="col-md-6 col-12 tx-p mb-3 mb-md-0">
                      <p>
                          <span v-for="(title, index) in landingPageData.titles" :key="index">✅ {{ title.title }}<br></span>
                      </p>
                  </div>
                  <div class="col-md-6 col-12">
                      <img :src="landingPageData.image" alt="Product Image" class="img-fluid img-lf">
                  </div>
              </div>
              <div class="btn-frame text-center">
                <a href="#" class="order-btn-c">অর্ডার করুন</a>
              </div>
          </div>
      </div>
  </section>
  </div>
</template>


<style scoped>
@import "@/assets/css/landing-page.css";
.sec-or {
    padding: 27px;
}

.pd-cd{
    padding-top: 12px;
}
.se-img {
    border-radius: 10px;
}


@media (max-width:1199px) {
    .sec-or{
        padding: 20px 0px 35px 0px;
    }

    .title-e {
        width: 70%;
        padding: 10px 0px 10px 0px;
    }
}

@media (max-width:991px) {
    .clb .container{
        max-width: 100%;
        padding: 0px 30px 30px;
    }

    .sec-or{
        padding: 20px 0px 35px 0px;
    }

    .title-e {
        width: 90%;
    }

    .tx-p{
        font-size: 15px;
        font-weight: 600;
    }
    .order-btn-c{
        font-size: 22px;
        padding: 10px 20px;
    }
}


@media (min-width: 580px) and (max-width: 700px) {
    .title-e {
        line-height: 35px;
    }
}

@media (min-width: 480px) and (max-width: 579px) {
    .title-e {
        line-height: 30px;
        font-size: 22px;
    }
}

@media (min-width: 350px) and (max-width: 479px) {
    .title-e {
        line-height: 30px;
        font-size: 20px;
        width: 100%;
    }
}

@media (max-width: 344px) {
    .title-e{
        width: 100%;
        font-size: 24px;
        line-height: 30px;
    }
}

@media (max-width:320px){
    .sec-or {
        padding: 18px 10px 30px 10px;
    }
    
    .pd-cd{
        padding-top: 12px;
    }
    .se-img {
        border-radius: 10px;
    }
    
    .title-e{
        width: 100%;
        color: #000000;
        text-align: center;
        border-style: solid;
        box-sizing: border-box;
        border-color: #000000;
        background-color: #4c677cad;
        font-family: "Hind Siliguri", Sans-serif;
        font-size: 18px;
        font-weight: 700;
        padding: 8px 13px 6px 13px;
        border-width: 3px 3px 3px 3px;
        border-radius: 20px 20px 20px 20px;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
        line-height: 20px;
    }

      .pd-bt {
        padding-bottom: 38px;
      }
      .tx-p {
        color: #000000;
        font-family: "Hind Siliguri", Sans-serif;
        font-size: 15px;
        font-weight: bold;
        line-height: 30px;
        padding-left: 16px;
      }

    
}
</style>