<script setup>
import ProductSkeleton from '../skeleton/ProductSkeleton.vue'
import { CoreDeveloperProductCard, ProductCard} from "@/components";

// product data fetch
import { useProduct, useSection } from "@/stores";
import { ref, onMounted } from "vue";
const product = useProduct();
const section = useSection();
const sections = ref("");
const bannerAllItems = ref({});

const getSections = async () => {
  sections.value = await section.getData();
};

onMounted(() => {
  getSections();
});

</script>


<template>
  <span v-if="!sections.data">
    <div class="container">
      <ProductSkeleton :dataAmount="12" :cols="4" />
    </div>
  </span>
  <span v-else>
    <section
      class="section deals-part"
      v-for="(section, index) in sections.data"
      :key="index"
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-heading overwrite-heading-style">
              <h2>
                <span class="section-header-text">{{ section.title }}</span>
              </h2>
            </div>
          </div>
        </div>
        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 category-sec">
          <div
            class="col"
            v-for="(product, index) in section.products.data"
            :key="index"
          >
            <ProductCard :product="product" />
            <!-- <CoreDeveloperProductCard :product="product" :types="'sale'" /> -->
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="section-btn-25 overwrite-mb">
              <router-link
                :to="{
                  name: 'shopPage',
                  query: { recent: 'recent-product' },
                }"
                class="btn btn-inline"
              >
                <i class="fas fa-eye"></i>
                <span>আরো দেখুন </span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </span>
</template>


<style scoped>

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


.heading-line {
  width: 100%;
  background-color: var(--primary);
  height: 2px;
  margin-top: -25px;
}
.heading-line:hover {
  background-color: var(--secondary-color);
}

@media screen and (max-width: 991px) {
  .section-header-text{
    padding: 5px 20px;
    border: 1px solid var(--primary) !important;
    border-top-width: 3px !important;
    border-radius: 15px / 45px !important;
  }
  
}

@media screen and (max-width: 767px) {
  .section-header-text{
    font-size: 18px;
  }
  .heading-line{
    margin-top: -20px;
  }
  .category-sec{
    margin-top: -10px;
  }
  .overwrite-mb{
    margin-bottom: 14px;
  }
}

@media screen and (max-width: 576px) {
  .section-header-text{
    font-size: 16px;
  }
  .section-btn-25 a{
    font-size: 12px;
    padding: 6px 15px;
  }
}
</style>