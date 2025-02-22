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
    <section class="offer-campaign-section">
      <div class="container mt-5 ct-title" v-if="landingPageData">
         <div class="price-offer">
            <div class=" price-title">
                <div class=" price">
                    <h1 class=" price-text">{{ landingPageData.title }}</h1>
                </div>
            </div>
  
            <div class="row">
                <div class="col-md-6 mb-4">
                    <div class="card">
                        <div class="card-body c-bd">
                            <h5 class="card-title text-center"><span class="tx-r">রেগুলার মূল্যঃ</span><span
                                    class="tx-bl"> {{ landingPageData.titles[0].title }}</span>
                                <span class="tx-r">টাকা</span></h5>
                        </div>
                    </div>
                </div>
             
                <div class="col-md-6 mb-4">
                    <div class="card">
                        <div class="card-body c-bd">
                            <h5 class="card-title text-center"><span class="tx-r">অফার মূল্যঃ</span> <span
                                    class="tx-bl"> {{ landingPageData.titles[1].title }} </span><span class="tx-r">টাকা</span></h5>
                        </div>
                    </div>
                </div>
            </div>
         </div>
      </div>
  </section>
  </div>
</template>


<style scoped>
@import "@/assets/css/landing-page.css";

    .price-offer{
        border: 2px solid black;
        padding: 60px 20px 40px 20px;
        margin-bottom: 50px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
    }

    .price-title{
        display: flex;
        margin-bottom: 30px;
        align-content: center;
        text-align: center;
        justify-content: center
    }

    .price-text {
        color: #ffffff;
        border-style: solid;
        border-color: #000000;
        background-color: #000000;
        padding: .5rem 12rem;
        font-size: 32px;
        font-weight: 700;
        border-width: 2px 2px 2px 2px;
        border-radius: 10px 10px 10px 10px;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
    }

  
@media (max-width:767px) {
    .offer-campaign-section .container{
        max-width: 100%;
    }
}


@media (max-width: 580px) {
    .price-text{
        padding: .5rem 5rem;
    }
}



@media (max-width: 320px) {
    
    .price-offer{
        border: 2px solid black;
        padding: 14px 20px 25px 20px;
        margin-bottom: 33px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
    }
    
    .price-title{
    display: flex;
    margin-bottom: 30px;
    align-content: center;
    text-align: center;
    justify-content: center
    }
    
    .price-text {
        color: #ffffff;
        border-style: solid;
        border-color: #000000;
        background-color: #000000;
        font-size: 26px;
        font-weight: 700;
        border-width: 2px 2px 2px 2px;
        border-radius: 10px 10px 10px 10px;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
      }
    
    
    }
</style>