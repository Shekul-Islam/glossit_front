<script setup>
// All Import File  Code Is Here......................................................................................................
import { useCategory, useCommonIsToggleFunctionality } from '@/stores'
import { storeToRefs } from 'pinia';
import { onMounted, ref, onBeforeUnmount } from 'vue'; 
import { useRouter } from 'vue-router';
// All Variable  Code Is Here.....................................................................................................
const category = useCategory();
const commonIsToggleFunctionality = useCommonIsToggleFunctionality();
const { categorySideBar } = storeToRefs(commonIsToggleFunctionality);
const router = useRouter();
const categories = ref('');

const getCategories = async() =>{
   categories.value =  await category.getCategories();
}

const activeIndex = ref(null);

 const toggleDropdown = (index, category) => {
  if (category?.sub_category.length > 0) {
    if (activeIndex.value === index) {
      activeIndex.value = null; // Hide dropdown if already active
    } else {
      activeIndex.value = index; // Show dropdown of clicked item
    }
  }else{
    router.push({ name:'shopPage', query:{ category: category?.id} });
  }
}


onMounted(() => {
  getCategories();
});


</script>

<template lang="">
  <div>
    <div class="backdrop" :style="{ display: categorySideBar ? 'block' : 'none' }" @click="commonIsToggleFunctionality.isCategorySideBarOpenOrClose"></div>
    
     <aside :class="['category-sidebar', { active: categorySideBar }]">
            <div class="category-header">
                <h4 class="category-title">
                    <i class="fas fa-align-left"></i>
                    <span>categories</span>
                </h4>
                <button class="category-close" @click="commonIsToggleFunctionality.isCategorySideBarOpenOrClose"><i class="fas fa-times"></i></button>
            </div>
            <ul class="category-list">
                 <li class="category-item" v-for="(category, index) in categories?.data" :key="index">
                    <router-link :to="{name: 'shopPage', query:{ category: category?.id}}" class="category-link dropdown-link" :class="{ active: activeIndex === index }">
                        <i class="flaticon-vegetable"></i>
                        <span>{{ category?.name }}</span>
                        <i v-if="category && category.sub_category && category.sub_category.length > 0" 
                          class="fa-solid fa-arrow-right ms-auto fs-6" 
                          @click.prevent="toggleDropdown(index, category)">
                        </i>

                    </router-link>
                    <ul class="dropdown-list:visible" v-show="activeIndex === index">
                        <li class="category-item" v-for="(subCategory, index) in category?.sub_category">
                          <router-link :to="{ name:'shopPage', query:{ subCategory: subCategory.id} }" class="category-link">{{ subCategory.name }}</router-link>
                        </li>
                    </ul>
                </li>
            </ul>
            <div class="category-footer">
                <p class="text-danger fw-bold">&copy; 2024 Anon Leather</p>
            </div>
        </aside>
  </div>
</template>

<style>

</style>
