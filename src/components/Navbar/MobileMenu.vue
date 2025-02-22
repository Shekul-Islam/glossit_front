<script setup>

import { vOnClickOutside } from '@vueuse/components'
import { ref } from 'vue'
import { useCart, useCommonIsToggleFunctionality } from '@/stores'
import { storeToRefs } from 'pinia'


const cart = useCart();
const commonIsToggleFunctionality = useCommonIsToggleFunctionality();
const { cartItemCount } = storeToRefs(cart);


</script>

<template lang="">
  <div>
    <div class="mobile-menu">
      <router-link :to="{ name: 'homePage' }">
        <i class="fas fa-home"></i>
        <span>Home</span>
      </router-link>
      <button class="cate-btn" title="Category List" @click="commonIsToggleFunctionality.isCategorySideBarOpenOrClose">
          <i class="fas fa-list"></i>
          <span>category</span>
      </button>
      <router-link title="Shop Page" :to="{ name: 'shopPage'}">
        <i class="fas fa-store"></i>
        <span>Shop</span>
      </router-link>
      <router-link title="Shop Page" :to="{ name: 'CampaignBanner'}" class="campaign-mobile-menu">
        <i class="fa-solid fa-blog"></i>
        <span>Campaign</span>
      </router-link>
      <!-- <button title="Shop Page"  @click="cartBtn">
        <i class="fas fa-shopping-basket"></i>
        <span>cartlist</span>
        <sup>{{ cartItemCount }}+</sup>
      </button> -->
    </div>
  </div>
</template>

<style>

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Base button styling */

.campaign-mobile-menu{
  animation: pulse 1s infinite; 
}

.campaign-mobile-menu *{
  color: var(--primary) !important; 
}

</style>
