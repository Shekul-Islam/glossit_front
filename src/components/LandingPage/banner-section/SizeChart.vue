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
      <div class="clb-size" v-if="landingPageData">
        <div class="container">
          <div class="title-frame-size">
            <div class="row">
              <div class="col-md-12">
                <div class="title-fram">
                  <div>
                    <h2 class="title-size">
                      <span class="sp">{{ landingPageData.title }}</span>
                    </h2>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="size-img">
                  <img :src="landingPageData.image" alt="Responsive Image" class="">
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

.clb-size[data-v-32b9d6aa] {
  padding: 30px 0px;
}

.title-frame-size {
  display: flex;
  justify-content: center;
  text-align: center;
}

.title-fram {
  font-size: 32px;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.3em;
  padding: 10px 10rem 5px;
  background-color: #030303;
  border-width: 4px 4px 4px 4px;
  border-radius: 10px;
}

.sp {
  color: #fff;
  font-size: 26px;
  font-weight: 700;
}

.size-img img{
  max-width: 100%;
  padding-top: 40px;
  padding-bottom: 40px;
}

@media (max-width: 767px) {

  .sp{
    font-size: 22px;
  }

  .title-fram {
    padding: 10px 0rem 5px;
  }
  
}

@media (max-width: 425px) {

  .sp{
    font-size: 18px;
  }

  .title-fram {
    padding: 0px;
  }
  .clb-size {
    padding: 20px 0px !important;
  }
  .size-img img {
    max-width: 100%;
    padding: 20px 0px 0px;
  }
  
}
@media (max-width: 320px) {

  .sp{
    font-size: 18px;
  }

  .title-fram {
    padding: 0px;
  }
  .clb-size {
    padding: 20px 0px !important;
  }
  .size-img img {
    max-width: 100%;
    padding: 20px 0px 0px;
  }
  
}
</style>
