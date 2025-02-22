<script setup>
import { storeToRefs } from "pinia";
import { ref, onMounted, watch } from "vue";
import { useProduct, useSetting } from "@/stores";
import ProductImage from "./ProductImage.vue";
import ProductDetails from "./ProductDetails.vue";

const uProduct       = useProduct();
const { products, variationProducts }   = storeToRefs(uProduct);
const setting       = useSetting();


const modalProduct = ref('');

// product variations start
const productVariations     = ref([]);

// get modal data start

const getProductDetails = async (productId) => {
  modalProduct.value = await uProduct.productById(productId);
  productVariations.value = modalProduct.value?.variations?.attributes
};



watch(products, (newProduct) => {
    modalProduct.value = { ...newProduct }; 
    productVariations.value = modalProduct.value?.variations?.attributes
});


// get modal data end


onMounted(() => {
  $(document).ready(function () {
    $(".venobox").venobox();
  });

});

const props = defineProps({
  modalProduct: Object,
});

</script>

<template>
  <div class="modal fade" id="product-view" style="display: none;" aria-hidden="true">
    <div class="modal-dialog"> 
      <div class="modal-content">
        <button class="modal-close icofont-close" data-bs-dismiss="modal"><i class="fas fa-times"></i></button>
        <div class="product-view">
          <div class="row">
            <!-- <div class="col-md-12 col-lg-6">
              <ProductImage :singleProduct="modalProduct" :type="'view'" />
            </div> -->
            <div class="col-md-12 col-lg-12 ps-5 pe-5 pb-3 pt-4">
              <ProductDetails :singleProduct="modalProduct" :productVariations="productVariations" :type="'view'"/>
            </div>
          </div>
        </div>
     </div> 
   </div> 
  </div>
</template>


<style scoped>

.variationRemoveBtn{
  padding: 1px 10px;
  background-color: white;
  color: rgb(255, 0, 0);
  border-radius: 5px;
  border: 2px solid rgb(255, 0, 0);
}
.variationRemoveBtn:hover{
  background-color: rgb(255, 0, 0);
  color: white;
  border: 2px solid rgb(255, 0, 0);
}

.discout_amount{
  border          : 1px solid var(--primary);
  margin-left     : 20px;
  padding         : 0px 8px;
  border-radius   : 5px;
  background-color: var(--primary);
  color           : var(--white) !important;
  font-size       : 18px;
  margin-bottom   : 5px;
}

.details-list-group{
  margin-bottom: 0px !important;
}

.singleProductBtn{
  background: rgb(199, 40, 40);
  color: white;
  border: 0;
  cursor: pointer;
  padding: 1em;
  opacity: 0.5;
  cursor: not-allowed;
}

.is-active{
  color: var(--white) !important;
  background: var(--primary) !important;
}

.is-disabled {
  pointer-events: none; 
  opacity: 0.5;
}


.quantity {
  display: flex;
  border: 2px solid var(--primary);
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.quantity-disabled{
  background: rgb(199, 40, 40);
  color: white;
  cursor: pointer;
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity button {
  background-color: var(--primary);
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 20px;
  width: 30px;
  height: auto;
  text-align: center;
  transition: background-color 0.2s;
}

.quantity button:hover {
  background-color: rgb(172, 16, 16);
  color: white;
}

.input-box {
  width: 40px;
  text-align: center;
  border: none;
  padding: 8px 10px;
  font-size: 16px;
  outline: none;
}

/* Hide the number input spin buttons */
.input-box::-webkit-inner-spin-button,
.input-box::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.input-box[type="number"] {
  -moz-appearance: textfield;
}


/* Product image */

img{
  width: 100%;
  display: block;
}
.img-display{
  overflow: hidden;
}
.img-showcase{
  display: flex;
  width: 100%;
  transition: all 0.5s ease;
}
.img-showcase img{
  min-width: 100%;
}
.img-select{
  display: flex;
}
.img-item{
  margin: 0.3rem;
}
.img-item:nth-child(1),
.img-item:nth-child(2),
.img-item:nth-child(3){
  margin-right: 0;
}
.img-item:hover{
  opacity: 0.8;
}
.active-thumb{
border: 2px solid #119744;
}

.image-gallery {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 5px;
}


/* Product image */


.product-widget a[title="Product View"], .product-widget a[title="Product Video"] {
  background-color: var(--primary);
  color: var(--white);
}
.product-widget a[title="Product View"]:hover, .product-widget a[title="Product Video"]:hover {
  background-color: var(--secondary-color);
  color: var(--white);
}

/* Shine */
.hover14 figure {
	position: relative;
}
.hover14 figure::before {
	position: absolute;
	top: 0;
	left: -75%;
	z-index: 2;
	display: block;
	content: '';
	width: 50%;
	height: 100%;
	background: -webkit-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,.3) 100%);
	background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,.3) 100%);
	-webkit-transform: skewX(-25deg);
	transform: skewX(-25deg);
}
.hover14 figure:hover::before {
	-webkit-animation: shine .75s;
	animation: shine .75s;
}
@-webkit-keyframes shine {
	100% {
		left: 125%;
	}
}
@keyframes shine {
	100% {
		left: 125%;
	}
}

/* Zoom In #1 */
.hover01 figure img {
	-webkit-transform: scale(1);
	transform: scale(1);
	-webkit-transition: .3s ease-in-out;
	transition: .3s ease-in-out;
}
.hover01 figure:hover img {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
}


.product-name a {
  width: 204px !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

/* product variation start */

.details-list-group {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-pack: start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  margin-bottom: 25px;
}


.details-list-group label{
  margin-right: 20px;
}

.details-list-group:last-child {
  margin-bottom: 0px;
}

.details-tag-list {
    display: block;
  }
  .details-tag-list li{
    display: inline-block;
    margin: 5px;
  }

.details-tag-list li a {
  font-size: 14px;
  line-height: 12px;
  padding: 8px 10px;
  border-radius: 5px;
  letter-spacing: 0.3px;
  text-transform: capitalize;
  color: var(--text);
  background: var(--chalk);
  transition: all linear .3s;
  -webkit-transition: all linear .3s;
  -moz-transition: all linear .3s;
  -ms-transition: all linear .3s;
  -o-transition: all linear .3s;
}

.details-tag-list li a:hover {
  color: var(--white);
  background: var(--primary);
}

.selectedSizeColor {
  color: white !important;
  background-color: var(--primary) !important;
}

.btnColorOrder{
  background-color: var(--secondary-color) !important;
  color: var(--white) !important;
}

.btnColorOrder:hover{
  color: white !important;
  background-color: var(--primary) !important;
}
/* product variation end */



@media (max-width: 768px) {
  .view-action-group{
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }
}

@media (max-width: 767px) {
  .videoHW iframe {
    width: 406px !important;
    height: 281px !important;
  }

}
@media (max-width: 576px) {
  .standard-wishs {
    margin-top: 8px;
  }

  .view-action-group{
    grid-template-columns: repeat(auto-fit, minmax(325px, 1fr)) !important;
  }
}


@media (max-width: 425px) {
  .details-tag-list {
    display: block;
  }
  .details-tag-list li{
    display: inline-block;
    margin-top: 10px;
  }
  .product-name a {
    width: 167px !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }
}


@media (max-width: 375px) {
  .view-action-group{
    grid-template-columns: repeat(auto-fit, minmax(325px, 1fr));
  }
}

@media (max-width: 320px) {
  .view-action-group{
    grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
  }
}


</style>