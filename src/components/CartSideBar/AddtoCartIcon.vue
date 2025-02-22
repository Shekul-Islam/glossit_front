<script setup>
import {useCart, useCommonIsToggleFunctionality} from '@/stores'
import { storeToRefs } from 'pinia';
const cart = useCart();
const { cartItemCount, totalPrice } = storeToRefs(cart);
const commonIsToggleFunctionality = useCommonIsToggleFunctionality();
</script>

<template>
    <div>
        <div class="addtocart-main-section"  v-if="cartItemCount > 0"  @click="commonIsToggleFunctionality.isCartSideBartOpenOrClose">
            <div class="top-section text-center">
                <i class="fas fa-cart-arrow-down"></i>
                <p><span class="me-2">{{ cartItemCount }}</span><span>ITEMS</span></p>
                <div class="triangle triangle-5"></div>
            </div> 
            <div class="buttom-section text-center">
                <span>{{ $filters.currencySymbol(totalPrice) }}</span>
            </div> 
        </div>
    </div>
</template>

<style scoped>
.addtocart-main-section{
    position: absolute;
    position: fixed;
    top: 46%;
    right: 0%;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    z-index: 9;    
    cursor: pointer;
}

.top-section{
    background-color: var(--secondary-color);
    padding: 8px;
    color: var(--primary); 

}
.top-section i{
    font-size: 20px;
    margin-top: 5px;
}
.top-section p{
    font-size: 15px;
}
.buttom-section{
    background-color: white;
    padding: 5px;
    color: black;
    font-weight: 600;
}

.buttom-section span{
    font-size: 14px;
}

.triangle {
    display: inline-block;
    margin: 0 5px;
    vertical-align: middle;
  }

  .triangle-5 {
    position: absolute;
    border-top: solid 10px var(--secondary-color);
    border-left: solid 10px transparent;
    border-right: solid 10px transparent;
    top: 62%;
    left: 32%;
  }

</style>