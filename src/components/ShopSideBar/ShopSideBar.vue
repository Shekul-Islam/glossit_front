<script setup>
// All Import File  Code Is Here......................................................................................................
import { useShop, useCommonIsToggleFunctionality } from "@/stores";
import { storeToRefs } from "pinia";
import { onMounted, ref, computed  } from "vue";
import { useRouter } from "vue-router";
// All Variable  Code Is Here.....................................................................................................
const shop = useShop();
const { products, sideBar } = storeToRefs(shop);
const commonIsToggleFunctionality = useCommonIsToggleFunctionality();
const {  shopSideBar } = storeToRefs(commonIsToggleFunctionality);

const searchBrandQuery = ref("");
const searchCategoryQuery = ref(""); 
const getAttributeDatas = ref();

const sortingPrice = ref([]);
const productType = ref("");
const selectedBrandIds = ref([]);
const selectedCategoryIds = ref([]);
const selectedAttributeIds = ref([]);
const selectedSubCategoryIds = ref("");
const searchQuery = ref("");
const paginateSize = ref("");

const getProducts = () => {
  products.value = [];
  shop.getData(
    productType.value,
    selectedBrandIds.value,
    selectedCategoryIds.value,
    selectedSubCategoryIds.value,
    selectedAttributeIds.value,
    sortingPrice.value,
    searchQuery.value,
    paginateSize.value,
  );
};

const searchCategories = computed(() => {
  return (shop?.sideBar?.result?.categories || []).filter((category) => {
    return category.name
      .toLowerCase()
      .match(searchCategoryQuery.value.toLocaleLowerCase());
  });
  
});

const searchBrands = computed(() => {
  return (shop?.sideBar?.result?.brands || []).filter((brand) => {
    return brand.name.toLowerCase().match(searchBrandQuery.value.toLowerCase());
  });
});

const getAttributeData = async() => {
  getAttributeDatas.value = await shop.sideBarAttributeData();
}
 

onMounted(() => {
  shop.sideBarData();
  getAttributeData();
});

</script>

<template>
  <div>
    <div
      class="backdrop"
      :style="{ display: shopSideBar ? 'block' : 'none' }"
      @click="commonIsToggleFunctionality.isShopSideBarOpenOrClose"
    ></div>

    <aside :class="['category-sidebar p-2', { active: shopSideBar }]">
        <div class="shop-widget">
            <div class="shop-widget-title" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="true" aria-controls="collapseExample">
                <h6>Filter by Price</h6>
                <a><i class="fa-solid fa-plus"></i></a>
            </div>
            <form class="collapse show" id="collapseExample">
                <div class="shop-widget-group">
                <input type="text" v-model="sortingPrice[0]" :placeholder="`Min - ${$filters.currencySymbol(sideBar?.result?.min_price)}`" />
                <input type="text" v-model="sortingPrice[1]" :placeholder="`Max - ${$filters.currencySymbol(sideBar?.result?.max_price)}`" />
                </div>
                <button class="shop-widget-btn" @click.prevent="getProducts">
                    <i class="fas fa-search"></i>
                    <span>search</span>
                </button>
            </form>
        </div>
        <div class="shop-widget" v-for="(getAttributeData, index) in getAttributeDatas" :key="index">
            <div class="shop-widget-header" data-bs-toggle="collapse" :href="`#${getAttributeData.id}`" role="button" aria-expanded="false" aria-controls="collapseExample">
              <h6>Filter by {{ getAttributeData.name }}</h6>
              <a><i class="fa-solid fa-plus"></i></a>
            </div>
            <form class="collapse show" :id="`${getAttributeData.id}`">
              <ul class="shop-widget-list shop-widget-scroll">
                <li v-for="(attributeValue, attributeValueIndex) in getAttributeData.attribute_values" :key="attributeValueIndex">
                  <div class="shop-widget-content">
                    <input type="checkbox" :id="`cate${attributeValueIndex}`" :value="attributeValue.id" @change="getProducts()"
                      v-model="selectedAttributeIds" />
                    <label :for="`cate${attributeValueIndex}`">{{ attributeValue.value }}</label>
                  </div>
                  <!-- <span class="shop-widget-number">({{ attributeValue.products_count }})</span> -->
                </li>
                
                <!-- <li v-show="searchCategories.length === 0">
                  <img src="@/assets/images/nodatafound.png" class="image-fluid mt-5" alt="" />
                </li> -->
              </ul>
              <button class="shop-widget-btn" @click.prevent="clearFilter('attributeValue')">
                <i class="far fa-trash-alt"></i>
                <span>clear filter</span>
              </button>
            </form>
          </div>
        <div class="shop-widget">
            <div class="shop-widget-header" data-bs-toggle="collapse" href="#category" role="button" aria-expanded="false" aria-controls="collapseExample">
              <h6>Filter by Category</h6>
              <a><i class="fa-solid fa-plus"></i></a>
            </div>
            <form class="collapse show" id="category">
              <input class="shop-widget-search" type="text" placeholder="Search..." v-model="searchCategoryQuery" />
              <ul class="shop-widget-list shop-widget-scroll">
                <li v-for="(category, index) in searchCategories" :key="index">
                  <div class="shop-widget-content">
                    <input type="checkbox" :id="`cate${index}`" :value="category.id" @change="getProducts"
                      v-model="selectedCategoryIds" />
                    <label :for="`cate${index}`">{{ category.name }}</label>
                  </div>
                  <span class="shop-widget-number">({{ category.products_count }})</span>
                </li>
                <!-- <li v-show="searchCategories?.length === 0">
                  <img src="@/assets/images/nodatafound.png" class="image-fluid mt-5" alt="" />
                </li> -->
              </ul>
              <button class="shop-widget-btn" @click.prevent="clearFilter('category')">
                <i class="far fa-trash-alt"></i>
                <span>clear filter</span>
              </button>
            </form>
          </div>

          <div class="shop-widget mb-4">
            <div class="shop-widget-header" data-bs-toggle="collapse" href="#brand" role="button" aria-expanded="false" aria-controls="collapseExample">
              <h6>Filter by Brand</h6>
              <a><i class="fa-solid fa-plus"></i></a>
            </div>
            <form class="collapse show" id="brand">
              <input class="shop-widget-search" type="text" placeholder="Search..." v-model="searchBrandQuery" />
              <TransitionGroup tag="ul" class="shop-widget-list shop-widget-scroll">
                <li v-for="(brand, index) in searchBrands" :key="brand.id">
                  <div class="shop-widget-content">
                    <input type="checkbox" :id="`brand${index}`" :value="brand.id" v-model="selectedBrandIds"
                      @change="getProducts" />
                    <label :for="`brand${index}`">{{ brand.name }}</label>
                  </div>
                  <span class="shop-widget-number">({{ brand.products_count }})</span>
                </li>
                <!-- <li v-show="searchBrands?.length === 0">
                  <img src="@/assets/images/nodatafound.png" class="image-fluid mt-5" alt="" />
                </li> -->
              </TransitionGroup>
              <button class="shop-widget-btn" @click.prevent="clearFilter('brand')">
                <i class="far fa-trash-alt"></i>
                <span>clear filter</span>
              </button>
            </form>
          </div>

      <div class="category-footer">
        <p class="text-danger fw-bold">&copy; 2024 Anon Leather</p>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.category-sidebar{
  overflow-y: scroll;
}


@media (max-width: 991px) {
    .shop-widget{
      display: block;
    }
  }

</style>
