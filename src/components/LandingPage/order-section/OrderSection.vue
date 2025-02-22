<script setup>
import { onMounted, ref } from "vue";
import axiosInstance from "@/services/axiosService.js";
import { useRouter } from "vue-router";
import { useOrder } from "@/stores";


const props = defineProps({
  landingPageData: {
    type: Object,
    default: {},
  },
  products: {
    type: Array,
    default: () => [],
  },
});


const order                = useOrder();
const quantities           = ref(props.products.map(() => 1));
const name                 = ref();
const phoneNumber          = ref();
const address              = ref("");
const delivery_gateway_id  = ref(2);
const payment_gateway_id   = ref(1);
const selectedProductIndex = ref(null);
const selectedProduct      = ref();
const deliveryCharge       = ref(120);
const district             = ref("");
const items                = ref([]);
const backEndErrors        = ref({});
const deliveryInfo         = ref();
const router               = useRouter();
const totalPrice           = ref();

// delivery getway working start

const getDeliveryGateway = async () => {
  try {
    const res = await axiosInstance.get("/delivery-gateway");
    deliveryInfo.value = res.data.result;

    // if (cartItem.value.some((item) => item.free_shipping === 1)) {
    //   delivery_gateway_id.value = 0;
    //   deliveryCharge.value = 0;
    // } else {
    //   delivery_gateway_id.value = res.data.result.data[0].id;
    //   deliveryCharge.value = res.data.result.data[0].delivery_fee;
    // }
  } catch (error) {
    console.log(error);
  }
};

const selectedDeliveryGetway = (deliveryItems) => {
  deliveryCharge.value = deliveryItems.delivery_fee;
  delivery_gateway_id.value = deliveryItems.id;
}

// delivery getway working end


// increment ফাংশন যা নির্দিষ্ট প্রোডাক্টের quantity বাড়াবে
const increment = (index) => {
  quantities.value[index]++;
};

// decrement ফাংশন যা নির্দিষ্ট প্রোডাক্টের quantity কমাবে, তবে ১ এর নিচে কমবে না
const decrement = (index) => {
  if (quantities.value[index] > 1) {
    quantities.value[index]--;
  }
};

const selectProduct = (index, product) => {
  selectedProductIndex.value = index;
  selectedProduct.value = product;
  items.value = [
    {
      product_id: product.product.id,
      name: product.product.name,
      mrp: product.mrp,
      offer_price: product.offer_price,
      sell_price: product.sell_price,
      image: product.product.img_path,
      attribute_value_id_1: product.attribute_value_id_1,
      attribute_value_id_2: product.attribute_value_id_2,
      attribute_value_id_3: product.attribute_value_id_3,
      quantity: quantities.value[index],
      free_shipping: 0,
    },
  ];
};

const storeOrder = async () => {
  const orderInfo = {
      // userToken          : userToken.value,
      name               : name.value,
      phoneNumber        : phoneNumber.value,
      address            : address.value,
      items              : items.value,
      delivery_gateway_id: delivery_gateway_id.value == 0 ? null      : delivery_gateway_id.value,
      deliverCharge      : deliveryCharge.value ? deliveryCharge.value: null,
      payment_gateway_id : payment_gateway_id.value,
      district           : district.value,
      totalPrice         : Math.round(selectedProduct?.value.sell_price)
      // coupon_id          : couponId.value,
    }
    try {
      const response = await order.storeOrder(orderInfo);
      console.log(response);
      if (response.status === 200) {
        router.push({ name: 'thankYou.page', query: {orderInfo: JSON.stringify(orderInfo)} });
      }
    } catch (error) {
      backEndErrors.value = error.response.data.errors;
    }
};

onMounted(() => {
  getDeliveryGateway();
});
</script>

<template>
  <div>
    <section class="body-field" v-if="landingPageData">
      <div class="container pt-5 ct-title">
        <div class="border-sec">
          <div class="w-title">
            <div class="title-sec">
              <p>{{ landingPageData.title }}</p>
            </div>
          </div>

          <div class="size-select"><span >সাইজ সিলেক্ট করুনঃ</span></div>

          <div class="row pt-3">
            <div
              class="col-md-6 card-section"
              v-for="(product, index) in products"
              :key="index"
              @click="selectProduct(index, product)"
              style="cursor: pointer"
            >
              <div class="card order-card">
                <div class="demo-card ">
                  <div class="card-left">
                    <input
                      type="radio"
                      name="radios"
                      :checked="selectedProductIndex === index"
                    />
                    <img
                      :src="product.product.image"
                      alt=""
                      width="60px"
                      height="60px"
                      class="ms-2"
                    />
                  </div>
                  <div class="card-right">
                    <div class="card-txt">
                      <span
                      >{{ product.product.name }}
                      <span v-if="product.attribute_value_1"
                        >({{ product.attribute_value_1.attribute.name }}-{{
                          product.attribute_value_1.value
                        }})</span
                      >
                      <span v-if="product.attribute_value_2"
                        >({{ product.attribute_value_2.attribute.name }}-{{
                          product.attribute_value_2.value
                        }})</span
                      >
                      <span v-if="product.attribute_value_3"
                        >({{ product.attribute_value_3.attribute.name }}-{{
                          product.attribute_value_3.value
                        }})</span
                      >
                    </span>
                    </div>
                    <div class="d-flex gap-2 align-items-center">
                      <div class="wrapper">
                        <button
                          class="btn-pls btn--minus"
                          @click="decrement(index)"
                          type="button"
                          name="button"
                        >
                          -
                        </button>
                        <input
                          class="quantity"
                          type="text"
                          name="name"
                          :value="quantities[index]"
                          readonly
                        />
                        <button
                          class="btn-mns btn--plus"
                          @click="increment(index)"
                          type="button"
                          name="button"
                        >
                          +
                        </button>
                      </div>
                      <div>{{ product.sell_price }} ৳</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <span class="text-danger" v-if="backEndErrors.items">{{
              backEndErrors.items[0]
            }}</span>
            <div
            class="col-md-6 card-section">
            <div class="card order-card">
              <div class="checkbox-card ">
                <div class="checkbox-card-left">
                  <input
                    type="radio"
                    name="radeo"
                  />
                  <img src="@/assets/images/cr-a.png" height="50" width="50"
                    
                  />
                </div>
                <div class="checkbox-card-right">
                  <div class="card-txt">
                    <span>ANON Kabli Shoes KB01-Black</span>

                  </div>
                  <div class="d-flex gap-2 align-items-center">
                    <div class="wrapper">
                      <button
                        class="btn-pls btn--minus"
                        
                        type="button"
                        name="button"
                      >
                        -
                      </button>
                      <input
                        class="quantity"
                        type="text"
                        name="name"
                       
                      />
                      <button
                        class="btn-mns btn--plus"
                        type="button"
                        name="button"
                      >
                        +
                      </button>
                    </div>
                    <div> 1100.00 ৳</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          <br /><br />
          <!-- card-for-checkbox-start -->
         
          <!-- card-for-checkbox-end -->

          <!-- checkbox-section-start -->
          <div class="checkbox-outer">
            <div class="checkbox-border col-md-6 col-lg-3">
              <div class="checkbox">
                <input type="checkbox" id="check" >
                <label for="check"></label>
               </div>

               <div class="check-value">
                <div > <span class="me-2">Check to Confirm</span> <span >1100.00 ৳</span></div>
              </div>
               
             </div>
          </div>
          <!-- checkbox-section-end -->


          <br /><br />
          <div class="row billing">
            <div class="col-md-6 col-lg-6 mb-4">
              <span class="bill-title">BILLING DETAILS</span>
              <div>
                <div class="bill-dtl">
                  <form>
                    <div class="mb-3">
                      <label for="name" class="form-label"
                        >আপনার নাম লিখুন *</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        placeholder=" সম্পূর্ণ নাম লিখুন "
                        id="name"
                        aria-describedby="nameHelp"
                        v-model="name"
                      />
                      <span
                        class="text-danger"
                        v-if="backEndErrors.customer_name"
                        >{{ backEndErrors.customer_name[0] }}</span
                      >
                    </div>

                    <div class="mb-3">
                      <label for="mobile" class="form-label"
                        >মোবাইল নাম্বার *</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        placeholder=" মোবাইল নাম্বার "
                        id="mobile"
                        aria-describedby="mobileHelp"
                        v-model="phoneNumber"
                      />
                      <span
                        class="text-danger"
                        v-if="backEndErrors.phone_number"
                        >{{ backEndErrors.phone_number[0] }}</span
                      >
                    </div>

                    <div class="mb-3">
                      <label for="address" class="form-label"
                        >আপনার ঠিকানা *</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        placeholder="বাসা/থানা সহ ঠিকানা লিখুন"
                        id="address"
                        aria-describedby="addressHelp"
                        v-model="address"
                      />
                      <span
                        class="text-danger"
                        v-if="backEndErrors.address_details"
                        >{{ backEndErrors.address_details[0] }}</span
                      >
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div class="col-md-6 mb-4">
              <span class="bill-title">YOUR ORDER</span>
              <div>
                <div class="order-dtl">
                  <div class=" bill-section">
                    <span>Product</span>
                    <span>Subtotal</span>
                  </div>
                  <hr class="dash" />

                  <div class="select-item" v-if="selectedProduct">
                    <img
                      src="@/assets/images/cr-a.png"
                      alt=""
                      width="50px"
                      height="50px"
                    />
                    <p>
                      {{ selectedProduct?.product?.name }}
                      <span v-if="selectedProduct.attribute_value_1"
                        >({{
                          selectedProduct.attribute_value_1.attribute.name
                        }}-{{ selectedProduct.attribute_value_1.value }})</span
                      >
                      <span v-if="selectedProduct.attribute_value_2"
                        >({{
                          selectedProduct.attribute_value_2.attribute.name
                        }}-{{ selectedProduct.attribute_value_2.value }})</span
                      >
                      <span v-if="selectedProduct.attribute_value_3"
                        >({{
                          selectedProduct.attribute_value_3.attribute.name
                        }}-{{ selectedProduct.attribute_value_3.value }})</span
                      >
                    </p>
                    <label>{{ selectedProduct?.sell_price }} ৳</label>
                  </div>
                  <hr class="dash" v-if="selectedProduct" />

                  <div
                    class=" bill-section "
                    v-if="selectedProduct?.sell_price"
                  >
                    <span>Subtotal</span>
                    <span>{{ selectedProduct?.sell_price }} ৳</span>
                  </div>
                  <br />

                  <hr class="dash" v-if="selectedProduct?.sell_price" />

                  <div
                    class=" bill-section-mid "
                  >
                    <div>Shipping</div>
                    <div>
                      <div
                        v-for="(delivery, index) in deliveryInfo?.data"
                        :key="index"
                        class="form-check"
                        :class="{ selected: delivery_gateway_id === 1 }"
                        style="cursor: pointer"
                        @click="selectedDeliveryGetway(delivery)"
                      >
                        <input
                          type="radio"
                          name="radios-op"
                          :value="delivery.id"
                          v-model="delivery_gateway_id"
                        />
                        <label class="form-check-label ms-2">{{
                          delivery.name
                        }}</label>
                      </div>
                    </div>
                  </div>

                  <hr class="dash" />

                  <div class=" bill-section ">
                    <span>Total</span>
                    <span v-if="selectedProduct?.sell_price"
                      >{{ 
                        Math.round(selectedProduct?.sell_price) + Math.round(deliveryCharge) 
                      }}
                      ৳</span
                    >
                    <span v-else>00 ৳</span>
                  </div>
                  <br />
                  

                  <!-- <div>
                    <form id="couponForm">
                      <div id="slider" class="collapsed">
                        <input
                          class="txt-input"
                          type="button"
                          id="toggle"
                          value="Have a coupon ?"
                        />
                        <input
                          class="aft-input"
                          type="text"
                          id="input"
                          tabindex="-1"
                          placeholder="Coupon Number"
                          size="8"
                        />
                        <input
                          class="copn-submt"
                          type="submit"
                          id="ok"
                          tabindex="-1"
                          value="Submit"
                        />
                      </div>
                    </form>
                  </div> -->

                  <hr />
                  <span>Cash on delivery</span><br />
                  <div>
                    <div class="triangle triangle-top-left-2"></div>
                    <div class="pop">Pay with cash upon delivery.</div>
                  </div>
                  <div class="d-grid pt-5">
                    <button
                      class="order-submit"
                      type="button"
                      @click="storeOrder"
                      v-if="selectedProduct?.sell_price"
                    >
                      অর্ডার করুন {{ Math.round(selectedProduct?.sell_price) + Math.round(deliveryCharge) }}
                    </button>
                    <button
                      class="order-submit"
                      type="button"
                      @click="storeOrder"
                      v-else
                    >
                      অর্ডার করুন 
                    </button>
                  </div>
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



input[type=checkbox] + label {
  display: block;
  margin: 0.2em;
  cursor: pointer;
  padding: 0.2em;
}

input[type=checkbox] {
  display: none;
}

input[type=checkbox] + label:before {
  content: "\2714";
  border: 0.1em solid #000;
  border-radius: 0.2em;
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  padding-left: 0.3em;
  margin-right: 0.2em;
  margin-bottom: 0.01em;
  vertical-align: bottom;
  color: transparent;
  transition: .2s;
  
}

input[type=checkbox] + label:active:before {
  transform: scale(0);
}

input[type=checkbox]:checked + label:before {
  background-color: MediumSeaGreen;
  border-color: MediumSeaGreen;
  color: #fff;
}

input[type=checkbox]:disabled + label:before {
  transform: scale(1);
  border-color: #aaa;
}

input[type=checkbox]:checked:disabled + label:before {
  transform: scale(1);
  background-color: #bfb;
  border-color: #bfb;
}


.size-select{

  font-size: 15px;
  font-weight: bold;
  padding-top: 40px;

}

.bill-title{
  font-size: 18px;
  font-weight: bold;
  padding: 20px 55px 12px 0px;
}

.bill-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 130px;
  
}

.bill-section-mid {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 67px;
  
}


.bill-dtl {
  margin: 0px;
  padding: 20px 20px 0px 0px;
}

.order-dtl {
  margin: 0px;
  padding: 20px 10px 0px 0px;
}


.card-section{
  
  padding-bottom: 20px;
}

.checkbox-outer{
  padding-right: 20px;
}
.check-value {
  display: flex;
  gap: 80px;
  
}

.checkbox-border{
  display: flex;
  padding: 8px 10px;
  border-radius: 5px;
  align-items: center;
  background: #5a6e7c31;
  color: #000;
  box-shadow: 0px 0px 1px #5a6e7c31;
}

.checkbox-card {
  display: flex;
  padding: 11px 22px;
  background-color: #fff;
  border-radius: 15px;
  gap: 15px;
  
}

.checkbox-card-left{
  display: flex;
  align-items: center;
  justify-content: start;

}
.checkbox-card-right{
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;

}




@media (max-width:1440px){

  .card-section{
  
    padding-bottom: 20px;
  }
  .bill-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 5px;
    font-weight: bold;
    
  }
  
  .bill-section-mid {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 0px;
    font-size: 14px;
    
  }
  .order-dtl{
    margin: 0px;
    padding: 20px 10px 0px 11px; 
  }


  .body-field {
    background-color: #ffeffa6b;
    padding-bottom: 50px;
  }
  
  .bill-dtl {
    margin: 0px;
    padding: 20px 10px;
  }
  
  .bill-title{
    font-size: 15px;
    font-weight: bold;
    padding-left: 7px;
  }
 
  
  
  .border-sec {
  width: 100%;
  border-style: solid;
  border-radius: 30px;
  padding: 15px 12px 12px 12px;
  border-width: 2px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  margin-top: 10px;
  }
  
  
  .title-sec {
  text-align: center;
  border-style: solid;
  border-color: #000;
  background-color: green;
  padding: 15px 0px;
  margin: 10px 0px;
  border-width: 4px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  }
  
  
  .title-sec p {
  color: whitesmoke;
  font-family: "Hind Siliguri", Sans-serif;
  font-size: 18px ;
  font-weight:bold;
  
  }
  
  .order-card{
  
    border: 1px solid rgb(138, 138, 138);
    border-radius: 8px;
  }
  .checkbox-outer{
    padding-right: 20px;
  }
  .check-value {
    display: flex;
    gap: 80px;
    
  }
  
  .checkbox-border{
    display: flex;
    border: 1px solid black;
    padding: 13px 6px;
    border-radius: 5px;
    align-items: center;
    background: #5a6e7c31;
    color: #000;
    box-shadow: 0px 0px 1px #5a6e7c31;
  
  }
  
  .checkbox-card {
    display: flex;
    padding: 11px 22px;
    background-color: #fff;
    border-radius: 15px;
    gap: 15px;
    
  }
  
  .checkbox-card-left{
    display: flex;
    align-items: center;
    justify-content: start;
  
  }
  .checkbox-card-right{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
  
  }

  
  .checkbox-card {
    padding: 11px 22px;
    background-color: #fff;
    border-radius: 15px;
    
  }
  

  .demo-card {
  padding: 11px 22px;
  background-color: #fff;
  border-radius: 15px;
  
}
  
  .size-select {
    font-size: 15px;
    font-weight: bold;
    padding-top: 22px;
    padding-left: 7px;
  }
  
  .card-txt{
    display: flex;
    font-size: 16px;
    color: #414040;
  }
  
  .dash {
  border: none;
  border-top: 2px dashed #322f32;
  height: 0;
  }
  

  .billing{
    font-size: 14px;
  }

  .form-label {
    font-weight: 500;
    margin: 0px 0px 7px 3px;
    white-space: nowrap;
    text-transform: capitalize;
    font-size: 13px;
    color: #333232;
  }
  
  /* Product Quantity */
  .wrapper {
  height: 30px;
  display: flex;
  }
  .quantity {
  text-align: center;
  width: 33px;
  height: 34px;
  font-size: 14px;
  color: #201d1d;
  font-weight: bold;
  border: 1px solid #e1e8ee;
  
  }
  
  .btn-pls {
  border: 1px solid #9b9b9b;
  width: 30px;
  background-color: #fdfdfd;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  /* cursor: pointer; */
  }
  
  .btn-mns {
  border: 1px solid #9b9b9b;
  width: 30px;
  background-color: #fdfdfd;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  }
  
  button:focus,
  input:focus {
  outline: 5px;
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
  
  ::-webkit-input-placeholder {
  font-size: 12px;
  }
  .form-text {
  font-size: 11px;
  }
  
  
  
  
  :root {
  accent-color: rgb(255, 94, 0);
  }
  
  [type="radio"] {
  font-size: inherit;
  width: 0.95em;
  height: 0.95em;
  }
  
  
  .select-item {
  display: flex;
  gap: 5px;
  }
  
  
  .triangle-top-left-2 {
  position: relative;
  left: 5%;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 15px 15px 0;
  
  border-color: transparent transparent rgba(213, 213, 213, 0.71) transparent;
  }
  
  .pop {
    width: 90%;
  display: flex;
  background-color: rgba(213, 213, 213, 0.71);
  height: 50px;
  align-items: center;
  justify-content: start;
  border-radius: 4px;
  padding-left: 10px;
  }
  
  .btn-warning {
  box-shadow: 0 2px 4px rgba(199, 126, 0, 0.751);
  height: 50px;
  }
  
  /* Coupon-start */
  
  #buttonWithText {
  overflow: hidden;
  width: 250px;
  }
  
  #slider {
  display: flex;
  width: 200%;
  transition: 0.5s;
  }
  
  #slider.expanded {
  transform: translateX(-50%);
  }
  
  #toggle {
  flex: 0 0 50%;
  }
  
  #input {
  flex: auto;
  }
  
  #ok {
  flex: none;
  }
  
  /* Coupon-end */
  
  .txt-input {
  background-color: orange;
  box-shadow: #ff7700ce;
  border-radius: 25px;
  border: 1px solid orange;
  color: rgb(0, 0, 0);
  }
  
  .aft-input {
  
    height: 40px;
    border-radius: 25px;
    font-size: 20px;
    border: 1px solid;
    color: #262525;
  }
  
  .btn-sbt {
  background-color: #f16334;
  }
  
  .copn-submt{
    background-color: orange;
    border: 1px solid gray;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
  }
  
  
  .order-submit{
  background-color: orange;
  border-radius: 5px;
  padding: 15px 15px;
  border: none;
  box-shadow: 0px 0px 1px orange;
  }
  
  }

@media (max-width:1024px){

  .card-section{
  
    padding-bottom: 20px;
  }
  .bill-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 5px;
    font-weight: bold;
    
  }
  
  .bill-section-mid {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 0px;
    font-size: 14px;
    
  }
  .order-dtl{
    margin: 0px;
    padding: 20px 10px 0px 11px; 
  }


  .body-field {
    background-color: #ffeffa6b;
    padding-bottom: 50px;
  }
  
  .bill-dtl {
    margin: 0px;
    padding: 20px 10px;
  }
  
  .bill-title{
    font-size: 15px;
    font-weight: bold;
    padding-left: 7px;
  }
 
  
  
  .border-sec {
  width: 100%;
  border-style: solid;
  border-radius: 30px;
  padding: 15px 12px 12px 12px;
  border-width: 2px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  margin-top: 10px;
  }
  
  
  .title-sec {
  text-align: center;
  border-style: solid;
  border-color: #000;
  background-color: green;
  padding: 15px 0px;
  margin: 10px 0px;
  border-width: 4px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  }
  
  
  .title-sec p {
  color: whitesmoke;
  font-family: "Hind Siliguri", Sans-serif;
  font-size: 18px ;
  font-weight:bold;
  
  }
  
  .order-card{
  
    border: 1px solid rgb(138, 138, 138);
    border-radius: 8px;
  }
  .checkbox-outer{
    padding-right: 0px;
  }
  .check-value {
    display: flex;
    gap: 80px;
    
  }
  
  .checkbox-border{
    display: flex;
    border: 1px solid black;
    padding: 13px 6px;
    border-radius: 5px;
    align-items: center;
    background: #5a6e7c31;
    color: #000;
    box-shadow: 0px 0px 1px #5a6e7c31;
  }
  
  .checkbox-card {
    display: flex;
    padding: 11px 22px;
    background-color: #fff;
    border-radius: 15px;
    gap: 15px;
    
  }
  
  .checkbox-card-left{
    display: flex;
    align-items: center;
    justify-content: start;
  
  }
  .checkbox-card-right{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
  
  }

  
  .checkbox-card {
    padding: 11px 22px;
    background-color: #fff;
    border-radius: 15px;
    
  }
  

  .demo-card {
  padding: 11px 22px;
  background-color: #fff;
  border-radius: 15px;
  
}
  
  .size-select {
    font-size: 15px;
    font-weight: bold;
    padding-top: 22px;
    padding-left: 7px;
  }
  
  .card-txt{
    display: flex;
    font-size: 16px;
    color: #414040;
  }
  
  .dash {
  border: none;
  border-top: 2px dashed #322f32;
  height: 0;
  }
  

  .billing{
    font-size: 14px;
  }

  .form-label {
    font-weight: 500;
    margin: 0px 0px 7px 3px;
    white-space: nowrap;
    text-transform: capitalize;
    font-size: 13px;
    color: #333232;
  }
  
  /* Product Quantity */
  .wrapper {
  height: 30px;
  display: flex;
  }
  .quantity {
  text-align: center;
  width: 33px;
  height: 34px;
  font-size: 14px;
  color: #201d1d;
  font-weight: bold;
  border: 1px solid #e1e8ee;
  
  }
  
  .btn-pls {
  border: 1px solid #9b9b9b;
  width: 30px;
  background-color: #fdfdfd;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  /* cursor: pointer; */
  }
  
  .btn-mns {
  border: 1px solid #9b9b9b;
  width: 30px;
  background-color: #fdfdfd;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  }
  
  button:focus,
  input:focus {
  outline: 5px;
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
  
  ::-webkit-input-placeholder {
  font-size: 12px;
  }
  .form-text {
  font-size: 11px;
  }
  
  
  
  
  :root {
  accent-color: rgb(255, 94, 0);
  }
  
  [type="radio"] {
  font-size: inherit;
  width: 0.95em;
  height: 0.95em;
  }
  
  
  .select-item {
  display: flex;
  gap: 5px;
  }
  
  
  .triangle-top-left-2 {
  position: relative;
  left: 5%;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 15px 15px 0;
  
  border-color: transparent transparent rgba(213, 213, 213, 0.71) transparent;
  }
  
  .pop {
    width: 90%;
  display: flex;
  background-color: rgba(213, 213, 213, 0.71);
  height: 50px;
  align-items: center;
  justify-content: start;
  border-radius: 4px;
  padding-left: 10px;
  }
  
  .btn-warning {
  box-shadow: 0 2px 4px rgba(199, 126, 0, 0.751);
  height: 50px;
  }
  
  /* Coupon-start */
  
  #buttonWithText {
  overflow: hidden;
  width: 250px;
  }
  
  #slider {
  display: flex;
  width: 200%;
  transition: 0.5s;
  }
  
  #slider.expanded {
  transform: translateX(-50%);
  }
  
  #toggle {
  flex: 0 0 50%;
  }
  
  #input {
  flex: auto;
  }
  
  #ok {
  flex: none;
  }
  
  /* Coupon-end */
  
  .txt-input {
  background-color: orange;
  box-shadow: #ff7700ce;
  border-radius: 25px;
  border: 1px solid orange;
  color: rgb(0, 0, 0);
  }
  
  .aft-input {
  
    height: 40px;
    border-radius: 25px;
    font-size: 20px;
    border: 1px solid;
    color: #262525;
  }
  
  .btn-sbt {
  background-color: #f16334;
  }
  
  .copn-submt{
    background-color: orange;
    border: 1px solid gray;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
  }
  
  
  .order-submit{
  background-color: orange;
  border-radius: 5px;
  padding: 15px 15px;
  border: none;
  box-shadow: 0px 0px 1px orange;
  }
  
  }

@media (max-width:768px){

  .card-section{
  
    padding-bottom: 20px;
  }
  .bill-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 5px;
    font-weight: bold;
    
  }
  
  .bill-section-mid {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 0px;
    font-size: 14px;
    
  }
  .order-dtl{
    margin: 0px;
    padding: 20px 10px 0px 11px; 
  }


  .body-field {
    background-color: #ffeffa6b;
    padding-bottom: 50px;
  }
  
  .bill-dtl {
    margin: 0px;
    padding: 20px 10px;
  }
  
  .bill-title{
    font-size: 15px;
    font-weight: bold;
    padding-left: 7px;
  }
 
  
  
  .border-sec {
  width: 100%;
  border-style: solid;
  border-radius: 30px;
  padding: 15px 12px 12px 12px;
  border-width: 2px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  margin-top: 10px;
  }
  
  
  .title-sec {
  text-align: center;
  border-style: solid;
  border-color: #000;
  background-color: green;
  padding: 15px 0px;
  margin: 10px 0px;
  border-width: 4px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  }
  
  
  .title-sec p {
  color: whitesmoke;
  font-family: "Hind Siliguri", Sans-serif;
  font-size: 18px ;
  font-weight:bold;
  
  }

  .checkbox-outer{
    padding-right: 20px;
  }
  .check-value {
    display: flex;
    gap: 80px;
    
  }
  
  .checkbox-border{
    display: flex;
    border: 1px solid black;
    padding: 13px 13px;
    border-radius: 5px;
    align-items: center;
    background: #5a6e7c31;
    color: #000;
    box-shadow: 0px 0px 1px #5a6e7c31;
    width: 50;
  
  }
  
  .checkbox-card {
    display: flex;
    padding: 11px 22px;
    background-color: #fff;
    border-radius: 15px;
    gap: 15px;
    
  }
  
  .checkbox-card-left{
    display: flex;
    align-items: center;
    justify-content: start;
  
  }
  .checkbox-card-right{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
  
  }
  
  .order-card{
  
    border: 1px solid rgb(138, 138, 138);
    border-radius: 8px;
  }
  
  
  .demo-card {
  margin: 23px 10px 21px 10px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  gap: 9px;
  }
  
  
  .size-select {
    font-size: 15px;
    font-weight: bold;
    padding-top: 22px;
    padding-left: 7px;
  }
  
  .card-txt{
    display: flex;
    font-size: 16px;
    color: #414040;
  }
  
  .dash {
  border: none;
  border-top: 2px dashed #322f32;
  height: 0;
  }
  

  .billing{
    font-size: 14px;
  }

  .form-label {
    font-weight: 500;
    margin: 0px 0px 7px 3px;
    white-space: nowrap;
    text-transform: capitalize;
    font-size: 13px;
    color: #333232;
  }
  
  /* Product Quantity */
  .wrapper {
  height: 30px;
  display: flex;
  }
  .quantity {
  text-align: center;
  width: 33px;
  height: 34px;
  font-size: 14px;
  color: #201d1d;
  font-weight: bold;
  border: 1px solid #e1e8ee;
  
  }
  
  .btn-pls {
  border: 1px solid #9b9b9b;
  width: 30px;
  background-color: #fdfdfd;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  /* cursor: pointer; */
  }
  
  .btn-mns {
  border: 1px solid #9b9b9b;
  width: 30px;
  background-color: #fdfdfd;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  }
  
  button:focus,
  input:focus {
  outline: 5px;
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
  
  ::-webkit-input-placeholder {
  font-size: 12px;
  }
  .form-text {
  font-size: 11px;
  }
  
  
  
  
  :root {
  accent-color: rgb(255, 94, 0);
  }
  
  [type="radio"] {
  font-size: inherit;
  width: 0.95em;
  height: 0.95em;
  }
  
  
  .select-item {
  display: flex;
  gap: 5px;
  }
  
  
  .triangle-top-left-2 {
  position: relative;
  left: 5%;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 15px 15px 0;
  
  border-color: transparent transparent rgba(213, 213, 213, 0.71) transparent;
  }
  
  .pop {
    width: 90%;
  display: flex;
  background-color: rgba(213, 213, 213, 0.71);
  height: 50px;
  align-items: center;
  justify-content: start;
  border-radius: 4px;
  padding-left: 10px;
  }
  
  .btn-warning {
  box-shadow: 0 2px 4px rgba(199, 126, 0, 0.751);
  height: 50px;
  }
  
  /* Coupon-start */
  
  #buttonWithText {
  overflow: hidden;
  width: 250px;
  }
  
  #slider {
  display: flex;
  width: 200%;
  transition: 0.5s;
  }
  
  #slider.expanded {
  transform: translateX(-50%);
  }
  
  #toggle {
  flex: 0 0 50%;
  }
  
  #input {
  flex: auto;
  }
  
  #ok {
  flex: none;
  }
  
  /* Coupon-end */
  
  .txt-input {
  background-color: orange;
  box-shadow: #ff7700ce;
  border-radius: 25px;
  border: 1px solid orange;
  color: rgb(0, 0, 0);
  }
  
  .aft-input {
  
    height: 40px;
    border-radius: 25px;
    font-size: 20px;
    border: 1px solid;
    color: #262525;
  }
  
  .btn-sbt {
  background-color: #f16334;
  }
  
  .copn-submt{
    background-color: orange;
    border: 1px solid gray;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
  }
  
  
  .order-submit{
    background-color: orange;
    border-radius: 5px;
    padding: 15px 15px;
    border: none;
  }
  
  }

@media (max-width:434px){

  .card-section{
  
    padding-bottom: 20px;
  }
    .bill-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 5px;
      font-weight: bold;
      
    }
    
    .bill-section-mid {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 0px;
      font-size: 14px;
      
    }
    .order-dtl{
      margin: 0px;
      padding: 20px 10px 0px 11px; 
    }
  
    
    .body-field {
      background-color: #ffeffa6b;
      padding-bottom: 50px;
    }
    
    .bill-dtl {
      margin: 0px;
      padding: 20px 14px 12px 0px;
    }
    
    .bill-title{
      font-size: 15px;
      font-weight: bold;
      padding-left: 7px;
    }
   
    
    .border-sec {
    width: 100%;
    border-style: solid;
    border-radius: 30px;
    padding: 15px 12px 12px 12px;
    border-width: 2px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    margin-top: 10px;
    }
    
    
    .title-sec {
    text-align: center;
    border-style: solid;
    border-color: #000;
    background-color: green;
    padding: 15px 0px;
    margin: 10px 0px;
    border-width: 4px;
    border-radius: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    }

    .checkbox-outer{
      padding-right: 20px;
    }
    .check-value {
      display: flex;
      gap: 80px;
      
    }
    
    .checkbox-border{
      display: flex;
      border: 1px solid black;
      padding: 13px 13px;
      border-radius: 5px;
      align-items: center;
      background: #5a6e7c31;
      color: #000;
      box-shadow: 0px 0px 1px #5a6e7c31;
    }
    
    .checkbox-card {
      display: flex;
      padding: 11px 22px;
      background-color: #fff;
      border-radius: 15px;
      gap: 15px;
      
    }
    
    .checkbox-card-left{
      display: flex;
      align-items: center;
      justify-content: start;
    
    }
    .checkbox-card-right{
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
    
    }
    
    
    .title-sec p {
    color: whitesmoke;
    font-family: "Hind Siliguri", Sans-serif;
    font-size: 21px ;
    font-weight:bold;
    
    }
    
    .order-card{
    
      border: 1px solid rgb(138, 138, 138);
      border-radius: 8px;
    }
    
    .demo-card {
      margin: 0px !important;
      background-color: #fff;
      border-radius: 10px;
      display: flex;
      gap: 15px;
      }
  
    .card-left{
      display: flex;
      align-items: center;
      justify-content: center;
  
    }
    .card-right{
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
  
    }
    
    
    .size-select {
      font-size: 15px;
      font-weight: bold;
      padding-top: 22px;
    }
    
    .card-txt{
      display: flex;
      font-size: 16px;
      color: #414040;
    }
    
    .dash {
    border: none;
    border-top: 2px dashed #322f32;
    height: 0;
    }
    
  
    .billing{
      font-size: 14px;
    }
  
    .form-label {
      font-weight: 500;
      margin: 0px 0px 7px 3px;
      white-space: nowrap;
      text-transform: capitalize;
      font-size: 13px;
      color: #333232;
    }
    
    /* Product Quantity */
    .wrapper {
    height: 30px;
    display: flex;
    }
    .quantity {
    text-align: center;
    width: 33px;
    height: 34px;
    font-size: 14px;
    color: #201d1d;
    font-weight: bold;
    border: 1px solid #e1e8ee;
    
    }
    
    .btn-pls {
    border: 1px solid #9b9b9b;
    width: 30px;
    background-color: #fdfdfd;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    /* cursor: pointer; */
    }
    
    .btn-mns {
    border: 1px solid #9b9b9b;
    width: 30px;
    background-color: #fdfdfd;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    }
    
    button:focus,
    input:focus {
    outline: 5px;
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
    
    ::-webkit-input-placeholder {
    font-size: 12px;
    }
    .form-text {
    font-size: 11px;
    }
    
    
    
    
    :root {
    accent-color: rgb(255, 94, 0);
    }
    
    [type="radio"] {
    font-size: inherit;
    width: 0.95em;
    height: 0.95em;
    }
    
    
    .select-item {
    display: flex;
    gap: 5px;
    }
    
    
    .triangle-top-left-2 {
    position: relative;
    left: 5%;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 15px 15px 0;
    
    border-color: transparent transparent rgba(213, 213, 213, 0.71) transparent;
    }
    
    .pop {
      width: 90%;
    display: flex;
    background-color: rgba(213, 213, 213, 0.71);
    height: 50px;
    align-items: center;
    justify-content: start;
    border-radius: 4px;
    padding-left: 10px;
    }
    
    .btn-warning {
    box-shadow: 0 2px 4px rgba(199, 126, 0, 0.751);
    height: 50px;
    }
    
    /* Coupon-start */
    
    #buttonWithText {
    overflow: hidden;
    width: 250px;
    }
    
    #slider {
    display: flex;
    width: 200%;
    transition: 0.5s;
    }
    
    #slider.expanded {
    transform: translateX(-50%);
    }
    
    #toggle {
    flex: 0 0 50%;
    }
    
    #input {
    flex: auto;
    }
    
    #ok {
    flex: none;
    }
    
    /* Coupon-end */
    
    .txt-input {
    background-color: orange;
    box-shadow: #ff7700ce;
    border-radius: 25px;
    border: 1px solid orange;
    color: rgb(0, 0, 0);
    }
    
    .aft-input {
    
      height: 40px;
      border-radius: 25px;
      font-size: 20px;
      border: 1px solid;
      color: #262525;
    }
    
    .btn-sbt {
    background-color: #f16334;
    }
    
    .copn-submt{
      background-color: orange;
      border: 1px solid gray;
      border-top-left-radius: 25px;
      border-bottom-left-radius: 25px;
      border-top-right-radius: 25px;
      border-bottom-right-radius: 25px;
    }
    
    
    .order-submit{
      background-color: orange;
      border-radius: 5px;
      padding: 15px 15px;
      border: none;
    }
    
    }

@media (max-width:430px){

  .card-section{
  
    padding-bottom: 20px;
  }
    .bill-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 5px;
      font-weight: bold;
      
    }
    
    .bill-section-mid {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 0px;
      font-size: 14px;
      
    }
    .order-dtl{
      margin: 0px;
      padding: 20px 10px 0px 11px; 
    }
  
    
    .body-field {
      background-color: #ffeffa6b;
      padding-bottom: 50px;
    }
    
    .bill-dtl {
      margin: 0px;
      padding: 20px 14px 12px 0px;
    }
    
    .bill-title{
      font-size: 15px;
      font-weight: bold;
      padding-left: 7px;
    }
    
    
    
    .border-sec {
    width: 100%;
    border-style: solid;
    border-radius: 30px;
    padding: 15px 12px 12px 12px;
    border-width: 2px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    margin-top: 10px;
    }
    
    
    .title-sec {
    text-align: center;
    border-style: solid;
    border-color: #000;
    background-color: green;
    padding: 15px 0px;
    margin: 10px 0px;
    border-width: 4px;
    border-radius: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    }
    
    
    .title-sec p {
    color: whitesmoke;
    font-family: "Hind Siliguri", Sans-serif;
    font-size: 21px ;
    font-weight:bold;
    
    }

    .checkbox-outer{
      padding-right: 0px;
    }
    .check-value {
      display: flex;
      gap: 80px;
      
    }
    
    .checkbox-border{
      display: flex;
      border: 1px solid black;
      padding: 13px 13px;
      border-radius: 5px;
      align-items: center;
      background: #5a6e7c31;
      color: #000;
      box-shadow: 0px 0px 1px #5a6e7c31;
    }
    
    .checkbox-card {
      display: flex;
      padding: 11px 22px;
      background-color: #fff;
      border-radius: 15px;
      gap: 15px;
      
    }
    
    .checkbox-card-left{
      display: flex;
      align-items: center;
      justify-content: start;
    
    }
    .checkbox-card-right{
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
    
    }
    
    .order-card{
    
      border: 1px solid rgb(138, 138, 138);
      border-radius: 8px;
    }
    
    
    .demo-card {
    margin: 23px 10px 21px 10px;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    gap: 9px;
    }
    
    
    .size-select {
      font-size: 15px;
      font-weight: bold;
      padding-top: 22px;
    }
    
    .card-txt{
      display: flex;
      font-size: 16px;
      color: #414040;
    }
    
    .dash {
    border: none;
    border-top: 2px dashed #322f32;
    height: 0;
    }
    
  
    .billing{
      font-size: 14px;
    }
  
    .form-label {
      font-weight: 500;
      margin: 0px 0px 7px 3px;
      white-space: nowrap;
      text-transform: capitalize;
      font-size: 13px;
      color: #333232;
    }
    
    /* Product Quantity */
    .wrapper {
    height: 30px;
    display: flex;
    }
    .quantity {
    text-align: center;
    width: 33px;
    height: 34px;
    font-size: 14px;
    color: #201d1d;
    font-weight: bold;
    border: 1px solid #e1e8ee;
    
    }
    
    .btn-pls {
    border: 1px solid #9b9b9b;
    width: 30px;
    background-color: #fdfdfd;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    /* cursor: pointer; */
    }
    
    .btn-mns {
    border: 1px solid #9b9b9b;
    width: 30px;
    background-color: #fdfdfd;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    }
    
    button:focus,
    input:focus {
    outline: 5px;
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
    
    ::-webkit-input-placeholder {
    font-size: 12px;
    }
    .form-text {
    font-size: 11px;
    }
    
    
    
    
    :root {
    accent-color: rgb(255, 94, 0);
    }
    
    [type="radio"] {
    font-size: inherit;
    width: 0.95em;
    height: 0.95em;
    }
    
    
    .select-item {
    display: flex;
    gap: 5px;
    }
    
    
    .triangle-top-left-2 {
    position: relative;
    left: 5%;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 15px 15px 0;
    
    border-color: transparent transparent rgba(213, 213, 213, 0.71) transparent;
    }
    
    .pop {
      width: 90%;
    display: flex;
    background-color: rgba(213, 213, 213, 0.71);
    height: 50px;
    align-items: center;
    justify-content: start;
    border-radius: 4px;
    padding-left: 10px;
    }
    
    .btn-warning {
    box-shadow: 0 2px 4px rgba(199, 126, 0, 0.751);
    height: 50px;
    }
    
    /* Coupon-start */
    
    #buttonWithText {
    overflow: hidden;
    width: 250px;
    }
    
    #slider {
    display: flex;
    width: 200%;
    transition: 0.5s;
    }
    
    #slider.expanded {
    transform: translateX(-50%);
    }
    
    #toggle {
    flex: 0 0 50%;
    }
    
    #input {
    flex: auto;
    }
    
    #ok {
    flex: none;
    }
    
    /* Coupon-end */
    
    .txt-input {
    background-color: orange;
    box-shadow: #ff7700ce;
    border-radius: 25px;
    border: 1px solid orange;
    color: rgb(0, 0, 0);
    }
    
    .aft-input {
    
      height: 40px;
      border-radius: 25px;
      font-size: 20px;
      border: 1px solid;
      color: #262525;
    }
    
    .btn-sbt {
    background-color: #f16334;
    }
    
    .copn-submt{
      background-color: orange;
      border: 1px solid gray;
      border-top-left-radius: 25px;
      border-bottom-left-radius: 25px;
      border-top-right-radius: 25px;
      border-bottom-right-radius: 25px;
    }
    
    
    .order-submit{
      background-color: orange;
      border-radius: 5px;
      padding: 15px 15px;
      border: none;
    }
    
    }

@media (max-width:425px){

  .card-section{
  
    padding-bottom: 20px;
  }

  .demo-card {
    margin: 0px !important;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    gap: 15px;
    }

  .card-left{
    display: flex;
    align-items: center;
    justify-content: center;

  }
  .card-right{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;

  }
  
  .bill-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 5px;
    font-weight: bold;
    
  }
  
  .bill-section-mid {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 0px;
    font-size: 14px;
    
  }
  .order-dtl{
    margin: 0px;
    padding: 20px 10px 0px 11px; 
  }


  .body-field {
    background-color: #ffeffa6b;
    padding-bottom: 50px;
  }
  
  .bill-dtl {
    margin: 0px;
    padding: 20px 10px;
  }
  
  .bill-title{
    font-size: 15px;
    font-weight: bold;
    padding-left: 7px;
  }

  
  
  .border-sec {
  width: 100%;
  border-style: solid;
  border-radius: 30px;
  padding: 15px 12px 12px 12px;
  border-width: 2px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  margin-top: 10px;
  }
  
  
  .title-sec {
  text-align: center;
  border-style: solid;
  border-color: #000;
  background-color: green;
  padding: 15px 0px;
  margin: 10px 0px;
  border-width: 4px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  }
  
  
  .title-sec p {
  color: whitesmoke;
  font-family: "Hind Siliguri", Sans-serif;
  font-size: 21px ;
  font-weight:bold;
  
  }



  .checkbox-outer{
    padding-right: 0px;
  }
  .check-value {
    display: flex;
    gap: 80px;
    
  }
  
  .checkbox-border{
    display: flex;
    border: 1px solid black;
    padding: 13px 13px;
    border-radius: 5px;
    align-items: center;
    background: #5a6e7c31;
    color: #000;
    box-shadow: 0px 0px 1px #5a6e7c31;
  }
  
  .checkbox-card {
    display: flex;
    padding: 11px 22px;
    background-color: #fff;
    border-radius: 15px;
    gap: 15px;
    
  }
  
  .checkbox-card-left{
    display: flex;
    align-items: center;
    justify-content: start;
  
  }
  .checkbox-card-right{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
  
  }
  
  .order-card{
  
    border: 1px solid rgb(138, 138, 138);
    border-radius: 8px;
  }
  

  
  
  .size-select {
    font-size: 15px;
    font-weight: bold;
    padding-top: 22px;
  }
  
  .card-txt{
    display: flex;
    font-size: 16px;
    color: #414040;
  }
  
  .dash {
  border: none;
  border-top: 2px dashed #322f32;
  height: 0;
  }
  

  .billing{
    font-size: 14px;
  }

  .form-label {
    font-weight: 500;
    margin: 0px 0px 7px 3px;
    white-space: nowrap;
    text-transform: capitalize;
    font-size: 13px;
    color: #333232;
  }
  
  /* Product Quantity */
  .wrapper {
  height: 30px;
  display: flex;
  }
  .quantity {
  text-align: center;
  width: 33px;
  height: 34px;
  font-size: 14px;
  color: #201d1d;
  font-weight: bold;
  border: 1px solid #e1e8ee;
  
  }
  
  .btn-pls {
  border: 1px solid #9b9b9b;
  width: 30px;
  background-color: #fdfdfd;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  /* cursor: pointer; */
  }
  
  .btn-mns {
  border: 1px solid #9b9b9b;
  width: 30px;
  background-color: #fdfdfd;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  }
  
  button:focus,
  input:focus {
  outline: 5px;
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
  
  ::-webkit-input-placeholder {
  font-size: 12px;
  }
  .form-text {
  font-size: 11px;
  }
  
  
  
  
  :root {
  accent-color: rgb(255, 94, 0);
  }
  
  [type="radio"] {
  font-size: inherit;
  width: 0.95em;
  height: 0.95em;
  }
  
  
  .select-item {
  display: flex;
  gap: 5px;
  }
  
  
  .triangle-top-left-2 {
  position: relative;
  left: 5%;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 15px 15px 0;
  
  border-color: transparent transparent rgba(213, 213, 213, 0.71) transparent;
  }
  
  .pop {
    width: 90%;
  display: flex;
  background-color: rgba(213, 213, 213, 0.71);
  height: 50px;
  align-items: center;
  justify-content: start;
  border-radius: 4px;
  padding-left: 10px;
  }
  
  .btn-warning {
  box-shadow: 0 2px 4px rgba(199, 126, 0, 0.751);
  height: 50px;
  }
  
  /* Coupon-start */
  
  #buttonWithText {
  overflow: hidden;
  width: 250px;
  }
  
  #slider {
  display: flex;
  width: 200%;
  transition: 0.5s;
  }
  
  #slider.expanded {
  transform: translateX(-50%);
  }
  
  #toggle {
  flex: 0 0 50%;
  }
  
  #input {
  flex: auto;
  }
  
  #ok {
  flex: none;
  }
  
  /* Coupon-end */
  
  .txt-input {
  background-color: orange;
  box-shadow: #ff7700ce;
  border-radius: 25px;
  border: 1px solid orange;
  color: rgb(0, 0, 0);
  }
  
  .aft-input {
  
    height: 40px;
    border-radius: 25px;
    font-size: 20px;
    border: 1px solid;
    color: #262525;
  }
  
  .btn-sbt {
  background-color: #f16334;
  }
  
  .copn-submt{
    background-color: orange;
    border: 1px solid gray;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
  }
  
  
  .order-submit{
    background-color: orange;
    border-radius: 5px;
    padding: 15px 15px;
    border: none;
  }
  
  }

@media (max-width:412px){
  .card-section{
  
    padding-bottom: 20px;
  }

    .bill-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 5px;
      font-weight: bold;
      
    }
    
    .bill-section-mid {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 0px;
      font-size: 14px;
      
    }
    .order-dtl{
      margin: 0px;
      padding: 20px 10px 0px 11px; 
    }
  
    
    .body-field {
      background-color: #ffeffa6b;
      padding-bottom: 50px;
    }
    
    .bill-dtl {
      margin: 0px;
      padding: 20px 14px 12px 0px;
    }
    
    .bill-title{
      font-size: 15px;
      font-weight: bold;
      padding-left: 7px;
    }
    
    
    
    .border-sec {
    width: 100%;
    border-style: solid;
    border-radius: 30px;
    padding: 15px 12px 12px 12px;
    border-width: 2px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    margin-top: 10px;
    }
    
    
    .title-sec {
    text-align: center;
    border-style: solid;
    border-color: #000;
    background-color: green;
    padding: 15px 8px 12px 8px;
    margin: 10px 0px;
    border-width: 4px;
    border-radius: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    }
    
    
    .title-sec p {
    color: whitesmoke;
    font-family: "Hind Siliguri", Sans-serif;
    font-size: 21px ;
    font-weight:bold;
    
    }

    .checkbox-outer{
      padding-right: 0px;
    }
    .check-value {
      display: flex;
      gap: 80px;
      
    }
    
    .checkbox-border{
      display: flex;
      border: 1px solid black;
      padding: 13px 13px;
      border-radius: 5px;
      align-items: center;
      background: #5a6e7c31;
      color: #000;
      box-shadow: 0px 0px 1px #5a6e7c31;
    }
    
    .checkbox-card {
      display: flex;
      padding: 11px 22px;
      background-color: #fff;
      border-radius: 15px;
      gap: 15px;
      
    }
    
    .checkbox-card-left{
      display: flex;
      align-items: center;
      justify-content: start;
    
    }
    .checkbox-card-right{
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
    
    }
    
    .order-card{
    
      border: 1px solid rgb(138, 138, 138);
      border-radius: 8px;
    }
    
    
    .demo-card {
    margin: 23px 10px 21px 10px;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    gap: 9px;
    }
    
    
    .size-select {
      font-size: 15px;
      font-weight: bold;
      padding-top: 22px;
    }
    
    .card-txt{
      display: flex;
      font-size: 16px;
      color: #414040;
    }
    
    .dash {
    border: none;
    border-top: 2px dashed #322f32;
    height: 0;
    }
    
  
    .billing{
      font-size: 14px;
    }
  
    .form-label {
      font-weight: 500;
      margin: 0px 0px 7px 3px;
      white-space: nowrap;
      text-transform: capitalize;
      font-size: 13px;
      color: #333232;
    }
    
    /* Product Quantity */
    .wrapper {
    height: 30px;
    display: flex;
    }
    .quantity {
    text-align: center;
    width: 33px;
    height: 34px;
    font-size: 14px;
    color: #201d1d;
    font-weight: bold;
    border: 1px solid #e1e8ee;
    
    }
    
    .btn-pls {
    border: 1px solid #9b9b9b;
    width: 30px;
    background-color: #fdfdfd;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    /* cursor: pointer; */
    }
    
    .btn-mns {
    border: 1px solid #9b9b9b;
    width: 30px;
    background-color: #fdfdfd;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    }
    
    button:focus,
    input:focus {
    outline: 5px;
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
    
    ::-webkit-input-placeholder {
    font-size: 12px;
    }
    .form-text {
    font-size: 11px;
    }
    
    
    
    
    :root {
    accent-color: rgb(255, 94, 0);
    }
    
    [type="radio"] {
    font-size: inherit;
    width: 0.95em;
    height: 0.95em;
    }
    
    
    .select-item {
    display: flex;
    gap: 5px;
    }
    
    
    .triangle-top-left-2 {
    position: relative;
    left: 5%;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 15px 15px 0;
    
    border-color: transparent transparent rgba(213, 213, 213, 0.71) transparent;
    }
    
    .pop {
      width: 90%;
    display: flex;
    background-color: rgba(213, 213, 213, 0.71);
    height: 50px;
    align-items: center;
    justify-content: start;
    border-radius: 4px;
    padding-left: 10px;
    }
    
    .btn-warning {
    box-shadow: 0 2px 4px rgba(199, 126, 0, 0.751);
    height: 50px;
    }
    
    /* Coupon-start */
    
    #buttonWithText {
    overflow: hidden;
    width: 250px;
    }
    
    #slider {
    display: flex;
    width: 200%;
    transition: 0.5s;
    }
    
    #slider.expanded {
    transform: translateX(-50%);
    }
    
    #toggle {
    flex: 0 0 50%;
    }
    
    #input {
    flex: auto;
    }
    
    #ok {
    flex: none;
    }
    
    /* Coupon-end */
    
    .txt-input {
    background-color: orange;
    box-shadow: #ff7700ce;
    border-radius: 25px;
    border: 1px solid orange;
    color: rgb(0, 0, 0);
    }
    
    .aft-input {
    
      height: 40px;
      border-radius: 25px;
      font-size: 20px;
      border: 1px solid;
      color: #262525;
    }
    
    .btn-sbt {
    background-color: #f16334;
    }
    
    .copn-submt{
      background-color: orange;
      border: 1px solid gray;
      border-top-left-radius: 25px;
      border-bottom-left-radius: 25px;
      border-top-right-radius: 25px;
      border-bottom-right-radius: 25px;
    }
    
    
    .order-submit{
      background-color: orange;
      border-radius: 5px;
      padding: 15px 15px;
      border: none;
    }
    
    }

@media (max-width:375px){

  .card-section{
    padding-bottom: 20px;
  }

  .bill-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 5px;
    font-weight: bold;
    
  }
  
  .bill-section-mid {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 0px;
    font-size: 14px;
    
  }
  .order-dtl{
    margin: 0px;
    padding: 20px 10px 0px 11px; 
  }

  
  .body-field {
    background-color: #ffeffa6b;
    padding-bottom: 50px;
  }
  
  .bill-dtl {
    margin: 0px;
    padding: 20px 10px;
  }
  
  .bill-title{
    font-size: 15px;
    font-weight: bold;
    padding-left: 7px;
  }

  
  
  .border-sec {
  width: 100%;
  border-style: solid;
  border-radius: 30px;
  padding: 15px 12px 12px 12px;
  border-width: 2px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  margin-top: 10px;
  }
  
  
  .title-sec {
  text-align: center;
  border-style: solid;
  border-color: #000;
  background-color: green;
  padding: 15px 0px;
  margin: 10px 0px;
  border-width: 4px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  }
  
  
  .title-sec p {
  color: whitesmoke;
  font-family: "Hind Siliguri", Sans-serif;
  font-size: 22px ;
  font-weight:bold;
  
  }

  .checkbox-outer{
    padding-right: 0px;
  }
  .check-value {
    display: flex;
    gap: 20px;
    
  }
  
  .checkbox-border{
    display: flex;
    border: 1px solid black;
    padding: 13px 13px;
    border-radius: 5px;
    align-items: center;
    background: #5a6e7c31;
    color: #000;
    box-shadow: 0px 0px 1px #5a6e7c31;
  }
  
  .checkbox-card {
    display: flex;
    padding: 11px 22px;
    background-color: #fff;
    border-radius: 15px;
    gap: 15px;
    
  }
  
  .checkbox-card-left{
    display: flex;
    align-items: center;
    justify-content: start;
  
  }
  .checkbox-card-right{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
  
  }
  
  .order-card{
  
    border: 1px solid rgb(138, 138, 138);
    border-radius: 8px;
  }
  
  
  .demo-card {
  margin: 23px 10px 21px 10px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  gap: 9px;
  }
  
  
  .size-select {
    font-size: 15px;
    font-weight: bold;
    padding-top: 22px;
  }
  
  .card-txt{
    display: flex;
    font-size: 16px;
    color: #414040;
  }
  
  .dash {
  border: none;
  border-top: 2px dashed #322f32;
  height: 0;
  }
  

  .billing{
    font-size: 15px;
  }

  .form-label {
    font-weight: 500;
    margin: 0px 0px 7px 3px;
    white-space: nowrap;
    text-transform: capitalize;
    font-size: 13px;
    color: #333232;
  }
  
  /* Product Quantity */
  .wrapper {
  height: 30px;
  display: flex;
  }
  .quantity {
  text-align: center;
  width: 33px;
  height: 34px;
  font-size: 14px;
  color: #201d1d;
  font-weight: bold;
  border: 1px solid #e1e8ee;
  
  }
  
  .btn-pls {
  border: 1px solid #9b9b9b;
  width: 30px;
  background-color: #fdfdfd;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  /* cursor: pointer; */
  }
  
  .btn-mns {
  border: 1px solid #9b9b9b;
  width: 30px;
  background-color: #fdfdfd;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  }
  
  button:focus,
  input:focus {
  outline: 5px;
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
  
  ::-webkit-input-placeholder {
  font-size: 12px;
  }
  .form-text {
  font-size: 11px;
  }
  
  
  
  
  :root {
  accent-color: rgb(255, 94, 0);
  }
  
  [type="radio"] {
  font-size: inherit;
  width: 0.95em;
  height: 0.95em;
  }
  
  
  .select-item {
  display: flex;
  gap: 5px;
  }
  
  
  .triangle-top-left-2 {
  position: relative;
  left: 5%;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 15px 15px 0;
  
  border-color: transparent transparent rgba(213, 213, 213, 0.71) transparent;
  }
  
  .pop {
    width: 90%;
  display: flex;
  background-color: rgba(213, 213, 213, 0.71);
  height: 50px;
  align-items: center;
  justify-content: start;
  border-radius: 4px;
  padding-left: 10px;
  }
  
  .btn-warning {
  box-shadow: 0 2px 4px rgba(199, 126, 0, 0.751);
  height: 50px;
  }
  
  /* Coupon-start */
  
  #buttonWithText {
  overflow: hidden;
  width: 250px;
  }
  
  #slider {
  display: flex;
  width: 200%;
  transition: 0.5s;
  }
  
  #slider.expanded {
  transform: translateX(-50%);
  }
  
  #toggle {
  flex: 0 0 50%;
  }
  
  #input {
  flex: auto;
  }
  
  #ok {
  flex: none;
  }
  
  /* Coupon-end */
  
  .txt-input {
  background-color: orange;
  box-shadow: #ff7700ce;
  border-radius: 25px;
  border: 1px solid orange;
  color: rgb(0, 0, 0);
  }
  
  .aft-input {
  
    height: 40px;
    border-radius: 25px;
    font-size: 20px;
    border: 1px solid;
    color: #262525;
  }
  
  .btn-sbt {
  background-color: #f16334;
  }
  
  .copn-submt{
    background-color: orange;
    border: 1px solid gray;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
  }
  
  
  .order-submit{
    background-color: orange;
    border-radius: 5px;
    padding: 15px 15px;
    border: none;
  }
  
  }

@media (max-width:320px){

  
input[type=checkbox] + label {
  display: block;
  margin: 0.2em;
  cursor: pointer;
  padding: 0.0em;
}

input[type=checkbox] {
  display: none;
}

input[type=checkbox] + label:before {
  content: "\2714";
  border: 0.1em solid #000;
  border-radius: 0.2em;
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  padding-left: 0.3em;
  margin-right: 0.2em;
  margin-bottom: 0.01em;
  vertical-align: bottom;
  color: transparent;
  transition: .2s;
  
}

input[type=checkbox] + label:active:before {
  transform: scale(0);
}

input[type=checkbox]:checked + label:before {
  background-color: MediumSeaGreen;
  border-color: MediumSeaGreen;
  color: #fff;
}

input[type=checkbox]:disabled + label:before {
  transform: scale(1);
  border-color: #aaa;
}

input[type=checkbox]:checked:disabled + label:before {
  transform: scale(1);
  background-color: #bfb;
  border-color: #bfb;
}

  .card-section{
  
    padding-bottom: 20px;
  }
  .card-left{
    display: flex;
    align-items: start;
    justify-content: start;
}

  .bill-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 5px;
    font-weight: bold;
    
  }
  
  .bill-section-mid {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 0px;
    font-size: 14px;
    
  }

.body-field {
  background-color: #ffeffa6b;
  padding-bottom: 50px;
}

.bill-dtl {
  margin: 0px;
  padding: 20px 10px;
}
.order-dtl {
  margin: 0px;
  padding: 20px 10px 0px 0px;
}
l


.bill-title{
  font-size: 17px;
  font-weight: bold;
  padding-left: 7px;
}

.billing{
  font-size: 15px;
}


.border-sec {
width: 100%;
border-style: solid;
border-radius: 30px;
padding: 15px 12px 12px 12px;
border-width: 2px;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
margin-top: 10px;
}



.title-sec {
text-align: center;
border-style: solid;
border-color: #000;
background-color: green;
padding: 15px 0px;
margin: 10px 0px;
border-width: 4px;
border-radius: 20px;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}


.title-sec p {
color: whitesmoke;
font-family: "Hind Siliguri", Sans-serif;
font-size: 23px ;
font-weight:bold;

}

.checkbox-outer{
  padding-right: 0px;
}

.check-value {
  display: flex;
  gap: 20px;
  
}

.checkbox-border{
  display: flex;
  border: 1px solid black;
  padding: 13px 10px;
  border-radius: 5px;
  align-items: center;
  background: #5a6e7c31;
  color: #000;
  box-shadow: 0px 0px 1px #5a6e7c31;
}

.checkbox-card {
  display: flex;
  padding: 6px 8px;
  background-color: #fff;
  border-radius: 15px;
  gap: 15px;
  
}

.checkbox-card-left{
  display: flex;
  align-items: start;
  justify-content: start;

}

.checkbox-card-right{
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;

}



.size-select {
  font-size: 15px;
  font-weight: bold;
  padding-top: 22px;
}

.card-section{
  padding-bottom: 0px;
  padding-bottom: 18px;
}

.demo-card {
padding: 6px 6px;
background-color: #fff;
border-radius: 10px;
display: flex;
gap: 9px;
}

.order-card{

  border: 1px solid rgb(138, 138, 138);
  border-radius: 8px;
}
.card-txt{
  display: flex;
  font-size: 15px;
  color: #414040;
}

.dash {
border: none;
border-top: 2px dashed #322f32;
height: 0;
}

.form-label {
  font-weight: 500;
  margin: 0px 0px 7px 3px;
  white-space: nowrap;
  text-transform: capitalize;
  font-size: 14px;
  color: #333232;
}

/* Product Quantity */
.wrapper {
height: 30px;
display: flex;
}
.quantity {
text-align: center;
width: 33px;
height: 30px;
font-size: 14px;
color: #201d1d;
font-weight: bold;
border: 1px solid #e1e8ee;

}

.btn-pls {
border: 1px solid #9b9b9b;
width: 30px;
background-color: #fdfdfd;
border-top-left-radius: 4px;
border-bottom-left-radius: 4px;
/* cursor: pointer; */
}

.btn-mns {
border: 1px solid #9b9b9b;
width: 30px;
background-color: #fdfdfd;
border-top-right-radius: 4px;
border-bottom-right-radius: 4px;
}

button:focus,
input:focus {
outline: 5px;
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

::-webkit-input-placeholder {
font-size: 12px;
}
.form-text {
font-size: 11px;
}




:root {
accent-color: rgb(255, 94, 0);
}

[type="radio"] {
font-size: inherit;
width: 0.95em;
height: 0.95em;
}


.select-item {
display: flex;
gap: 5px;
}


.triangle-top-left-2 {
position: relative;
left: 5%;
width: 0;
height: 0;
border-style: solid;
border-width: 0 15px 15px 0;

border-color: transparent transparent rgba(213, 213, 213, 0.71) transparent;
}

.pop {
display: flex;
background-color: rgba(213, 213, 213, 0.71);
height: 55px;
align-items: center;
justify-content: center;
border-radius: 5px;
font-size: 14px;
}

.btn-warning {
box-shadow: 0 2px 4px rgba(199, 126, 0, 0.751);
height: 50px;
}

/* Coupon-start */

#buttonWithText {
overflow: hidden;
width: 250px;
}

#slider {
display: flex;
width: 200%;
transition: 0.5s;
}

#slider.expanded {
transform: translateX(-50%);
}

#toggle {
flex: 0 0 50%;
}

#input {
flex: auto;
}

#ok {
flex: none;
}

/* Coupon-end */

.txt-input {
background-color: orange;
box-shadow: #ff7700ce;
border-radius: 25px;
border: 1px solid orange;
color: rgb(0, 0, 0);
}

.aft-input {

  height: 40px;
  border-radius: 25px;
  font-size: 20px;
  border: 1px solid;
  color: #262525;
}

.btn-sbt {
background-color: #f16334;
}

.copn-submt{
  background-color: orange;
  border: 1px solid gray;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
}


.order-submit{
  background-color: orange;
  border-radius: 5px;
  padding: 15px 15px;
  border: none;
}

}

</style>
