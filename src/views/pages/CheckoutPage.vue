<script setup>
import { BannerPart, ProductView } from "@/components";
import axiosInstance from "@/services/axiosService.js";
import { useCart, useOrder, useAuth, useModal, useCommonIsToggleFunctionality, useNotification } from "@/stores";
import { storeToRefs } from "pinia";
import { onMounted, ref, onUpdated, onBeforeUpdate, onUnmounted, computed, watch  } from "vue";
import { useRouter } from "vue-router";
// validation error
import { Form, Field } from "vee-validate";
import * as yup from "yup";

const commonIsToggleFunctionality             = useCommonIsToggleFunctionality();
const { cartSideBar }                         = storeToRefs(commonIsToggleFunctionality);
const isDesktop                               = ref(window.innerWidth > 768);
const modal                                   = useModal()
const router                                  = useRouter()
const auth                                    = useAuth();
const { isOrder }                             = storeToRefs(auth);
const cart                                    = useCart();
const { cartItem, totalPrice, cartItemCount } = storeToRefs(cart);
const order                                   = useOrder();
const { storeOrder, backendErrors, loading }  = storeToRefs(order);
const isLoading                               = ref(false);
const clickIsOrder                            = ref(true);
const isFreeShippingChecking                  = ref();
const blockSmsErrorMessage                    = ref();
const notify                                  = useNotification();

const userToken           = ref(localStorage.getItem('user_token'))
const name                = ref(auth?.user?.user?.name);
const phoneNumber         = ref(auth?.user?.user?.phone_number);
const district            = ref("");
const address             = ref("");
const payment_gateway_id  = ref(null);
const delivery_gateway_id = ref(1);
const deliverCharge       = ref();
const deliveryInfo        = ref([]);
const payment_gateways    = ref({data: []});
const orderNote           = ref("");

// coupon 
const showCouponForm       = ref(false);
const couponDiscountAmount = ref();
const coupon               = ref('');
const couponErrorMessage   = ref();
const couponId             = ref();
const isOpen               = ref(false);

// Refs for the input fields
const nameFieldRef        = ref(null);
const phoneNumberFieldRef = ref(null);
const districtFieldRef    = ref(null);
const addressFieldRef     = ref(null);
const deliveryGatewayRef  = ref(null);
const paymentGatewayRef   = ref(null);

// payment getways details
  const bkash                 = ref('');
  const nogod                 = ref('');
  const rocket                = ref('');
  const cod                   = ref('');
  const paymentGetwayName     = ref(null);
  const paymentSendNumber     = ref('');
  const paymentReceivedNumber = ref('');

    const isOpenCoupon = () =>{
      isOpen.value = !isOpen.value;
    }

    const getDeliveryGateway = async () => {
      try {
        const res = await axiosInstance.get("/delivery-gateway");
        deliveryInfo.value = res.data.result;

        if (cartItem.value.some((item) => item.free_shipping === 1)) {
          delivery_gateway_id.value = 0;
          deliverCharge.value = 0;
        } else {
          delivery_gateway_id.value = res.data.result.data[0].id;
          deliverCharge.value = res.data.result.data[0].delivery_fee;
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getDeliveryAmount = async () => {
      try {
        const res = await axiosInstance.get(`/delivery-gateway/price/${delivery_gateway_id.value}`);
        deliverCharge.value = res.data.result.delivery_fee;
      } catch (error) {
        console.log(error);
      }
    };

    const getPaymentGetway = async () => {
      try {
        const res = await axiosInstance.get(`/payment-gateway`);
        payment_gateways.value = res.data.result;
      } catch (error) { }
    };

    const selectedGetway = (payment_gateway) => {
      payment_gateway_id.value = payment_gateway.id;
      paymentGetwayName.value = payment_gateway.name

        // Clear input fields when switching between payment methods
      paymentSendNumber.value = ''
      paymentReceivedNumber.value = ''
      

      if (payment_gateway.name === 'bkash') {
        paymentGetwayName.value = payment_gateway.name;
      }
      if (payment_gateway.name === 'Cash On Delivery') {
        paymentGetwayName.value = payment_gateway.name;
      }
      if (payment_gateway.name === 'Nagad') {
        paymentGetwayName.value = payment_gateway.name;
      }  
    }

// order work start here 

    const orderSubmited = async () => {
     const res =   await order.storeOrder({
          userToken              : userToken.value,
          name                   : name.value,
          phoneNumber            : phoneNumber.value,
          district               : district.value,
          address                : address.value,
          orderNote              : orderNote.value,
          items                  : cartItem.value,
          coupon_id              : couponId.value,
          totalPrice             : totalPrice.value,
          payment_gateway_id     : payment_gateway_id.value,
          delivery_gateway_id    : delivery_gateway_id.value == 0 ? null    : delivery_gateway_id.value,
          deliverCharge          : deliverCharge.value ? deliverCharge.value: null,
          payment_send_number    : paymentSendNumber.value,
          payment_received_number: paymentReceivedNumber.value,
          // campaign_id: campaignId.value,
        });
       if (res.status == 200) {
          clickIsOrder.value = false;
       }else{
        blockSmsErrorMessage.value = res
        notify.Error(`${res}`);      
       }
      
    }

    const placeOrder = async() => {
      isLoading.value = true;
      try {
        await orderSubmited();
        // Handle successful order submission
      } catch (error) {
        // Handle error
        console.error("Order submission failed:", error);
      } finally {
        isLoading.value = false; // Hide the preloader
      }


      if (Object.keys(auth.user).length > 0) {
      }else{
        const res = await auth.login({phone_number: phoneNumber.value, name: name.value});
        if (res?.status == 200) {
          modal.toggleModal()
        }
      }

    };



    const handleOrderSubmitted = () => {
      orderSubmited(); 
    }

// order work end here 

// if destop version is available then show this order note start
const checkScreenSize = () => {
  isDesktop.value = window.innerWidth > 768;
};
// if destop version is available then show this order note end

// Scroll to the first error field
    const scrollToErrorField = () => {
      if (!name.value) {
        nameFieldRef.value?.scrollIntoView({ behavior: "smooth", block: "center" });
        nameFieldRef.value?.focus();
        return;
      }
      if (!phoneNumber.value) {
        phoneNumberFieldRef.value?.scrollIntoView({ behavior: "smooth", block: "center" });
        phoneNumberFieldRef.value?.focus();
        return;
      }
      if (!district.value) {
        districtFieldRef.value?.scrollIntoView({ behavior: "smooth", block: "center" });
        districtFieldRef.value?.focus();
        return;
      }
      if (!address.value) {
        addressFieldRef.value?.scrollIntoView({ behavior: "smooth", block: "center" });
        addressFieldRef.value?.focus();
        return;
      }
      if (!delivery_gateway_id.value) {
        deliveryGatewayRef.value?.scrollIntoView({ behavior: "smooth", block: "center" });
        deliveryGatewayRef.value?.focus();
        return;
      }
      if (!payment_gateway_id.value) {
        paymentGatewayRef.value?.scrollIntoView({ behavior: "smooth", block: "center" });
        paymentGatewayRef.value?.focus();
        return;
      }
    };


// cart delete 

    const deleteCart = (index) => {
      cart.destroy(index);
    };

    const cartIncrement = (index) => {
      cart.increment(index);
    };

    const cartDecrement = (index) => {
      cart.decrement(index);
    };

// coupon 

    const couponCalculate = async() => {
      try {

          const res = await axiosInstance.get(`/coupons/check?coupon_code=${coupon.value}&cart_total_amount=${totalPrice.value}`);   
          console.log(res);
          
          if (res.status == 200) {
          couponDiscountAmount.value = res.data.result.discount_amount;
          couponId.value = res.data.result.coupon_id;
          isOpen.value = false

        }else{
          couponErrorMessage.value = res.data.message 
        }
      } catch (error) {
        couponErrorMessage.value = error.response.data.message      
      }
    }


// validation error
    const schema = yup.object({
      name               : yup.string().required("আপনার নাম IS REQUIRED"),
      phone              : yup.string().required("আপনার মোবাইল নাম্বার IS REQUIRED"),
      district           : yup.string().required("District Feild Is Required"),
      address            : yup.string().required("আপনার সম্পূর্ণ ঠিকানা IS REQUIRED"),
      delivery_gateway_id: yup.string().required("Delivery Gateway Feild Is Required"),
      payment_gateway_id : yup.string().required("Payment Gateway Feild Is Required"),
    });

// has free shipping function 
    const hasFreeShipping = () => {
      return cartItem.value.some(item => item.free_shipping === 1);
    }


// total price section hide and show 

    const showTotalPriceSection = () => {
      const hideAndShowTopSection    = document.querySelector('.hide_and_show_top_section');
      const hideAndShowButtomSection = document.querySelector('.hide_and_show_bottam_section');
      const scrollScreenSize         = window.screen.width;
      
      if (scrollScreenSize < 768) {            
        hideAndShowTopSection.classList.add('price_section_hide');
        hideAndShowButtomSection.classList.remove('price_section_show');
      }else{
        hideAndShowButtomSection.classList.add('price_section_hide');
        hideAndShowTopSection.classList.remove('price_section_show');
      }
    }

// total price section hide and show 

// is cart item empty then fall back start
//  const isCartItemEmpty = () => {
//   if (cartItem.value.length <= 0) {
//     router.push({ name:'shopPage'});
//   }
//  }
// is cart item empty then fall back end

// free shipping section show and hide start
    const freeShippingChecking = async () => {
      const res = await axiosInstance.get("/free-delivery/get");
      isFreeShippingChecking.value = res.data.result;    
      delivery_gateway_id.value = 1;   
      getDeliveryAmount();
    }
// free shipping section show and hide end

// get Selected Delivery Id start
    const getSelectedDeliveryId = (deliveryId) => {
      // delivery_gateway_id.value = deliveryId;
      // getDeliveryAmount();
      // if (deliveryId != 3) {
      // }
      if (deliveryId != 3 && isFreeShippingChecking.value) {
        delivery_gateway_id.value = deliveryId;
        getDeliveryAmount();
      }else if (deliveryId == 3 && isFreeShippingEligible.value){
        delivery_gateway_id.value = deliveryId;
        getDeliveryAmount();
      }
    }

    const isFreeShippingEligible = computed(() => {
      return (isFreeShippingChecking.value?.type === 'quantity' && cartItemCount.value >= isFreeShippingChecking.value.quantity) ||
            (isFreeShippingChecking.value?.type === 'price' && totalPrice.value >= isFreeShippingChecking.value.price);
    });
    
    // Automatically select free shipping when eligible
    watch(isFreeShippingEligible, (newVal) => {
      if (newVal) {        
        const freeShippingOption = deliveryInfo.value.data.find((delivery) => delivery.id === 3);
        if (freeShippingOption) {
          delivery_gateway_id.value = freeShippingOption.id;
          getDeliveryAmount();
        }
      } else if (delivery_gateway_id.value === 3) {
        delivery_gateway_id.value = 1; 
        getDeliveryAmount();
      }
    });

// get Selected Delivery Id end

  onMounted(() => {
    getDeliveryGateway();
    getPaymentGetway();
    modal.Modalclose();
    showTotalPriceSection();  
    freeShippingChecking();  
    let uniqueID = localStorage.getItem('uniqueVisitorID')
    window.addEventListener('resize', checkScreenSize);
    commonIsToggleFunctionality.cartSideBar = false;
  });

  onUnmounted(() => {
    window.removeEventListener('resize', checkScreenSize);
  });


</script>

<template>
  <div class="testing">
    <!-- pre loader -->
    <div v-if="isLoading" class="preloader">
      <div class="loader"></div>
    </div>
     

    <!-- pre loader -->


    <!--=====================================
                    BANNER PART START
        =======================================-->
    <BannerPart :title="'Checkout Page'" :sub_title="'Home'" />

   <ProductView @orderSubmitted="handleOrderSubmitted"/>
        
    <div class="container my-5 checkoutBorder">
        <div class="row">
            <div class="col-lg-8">
                <div class="table-responsive">
                    <table class="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">SL</th>
                        <th scope="col">Image</th>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(product, index) in cartItem" :key="index" class="checkoutTable">
                          <th scope="row">{{ 1 + index }}</th>
                          <td class="align-items-center"><a href="" class="img"><img :src="product.image" class="" alt=""></a></td>
                          <td class="text-wrap align-items-center">{{ product.name }}</td>
                          <td>{{ Math.round(product.sell_price) }}</td>
                          <td class="w-25">
                            <div class="checkout-page-action">
                                <button
                                  class=""
                                  title="Quantity Minus"
                                  @click.prevent="cartDecrement(index)"
                                >
                                  <i class="fas fa-minus"></i>
                                </button>
                                <input
                                  class=""
                                  title="Quantity Number"
                                  type="text"
                                  name="quantity"
                                  :disabled="product.quantity === 1 ? true : false"
                                  :value="product.quantity"
                                />
                                <button
                                  class=""
                                  title="Quantity Plus"
                                  @click.prevent="cartIncrement(index)"
                                >
                                  <i class="fas fa-plus"></i>
                                </button>
                            </div>
                          </td>
                          <td>{{ (Math.round(product.sell_price)) * product.quantity }}</td>
                          <td>
                            <button class="cart-delete" @click.prevent="deleteCart(index)">
                              <i class="far fa-trash-alt text-danger"></i>
                            </button>
                          </td>
                        </tr>
                    </tbody>
                    </table>
                    <div class="continue-shopping">
                      <router-link :to="{ name: 'shopPage'}"> <i class="fas fa-arrow-left"></i> Continue Shopping</router-link>
                    </div>
                    <div class="is-free-shipping-active" v-if="(isFreeShippingChecking?.type == 'quantity' && cartItemCount >= isFreeShippingChecking?.quantity) || (isFreeShippingChecking?.type == 'price' && totalPrice >= isFreeShippingChecking?.price)">
                      <p>You are Enjoying Free Shipping!</p>
                    </div>
                    <div :class="{ 'is-free-shipping': isFreeShippingChecking }" v-else>
                      <span v-if="isFreeShippingChecking?.type == 'price'">
                        <p>Add {{ isFreeShippingChecking?.price -  totalPrice}} more Price to get free shipping!</p>
                      </span>
                      <span v-if="isFreeShippingChecking?.type == 'quantity'">
                        <p>Add {{ isFreeShippingChecking?.quantity -  cartItemCount}} more product to get free shipping!</p>
                      </span>
                    </div>
                    <div class="left my-3 p-0">
                      <div class="d-flex justify-content-between is-coupon" @click="isOpenCoupon">
                        <h6>Do you have any coupon ?</h6>
                        <button class="btn-danger btn-sm" ><i class="fas fa-chevron-down " :class="{'isRoted' : isOpen}"></i></button>
                      </div>
                      <div class="input-group p-3" :class="{'d-none' : !isOpen}">
                        <input type="text" class="form-control" placeholder="Apply Your Coupon Here" aria-label="Input group example" aria-describedby="btnGroupAddon" v-model="coupon">
                        <div class="input-group-text btn-danger" id="btnGroupAddon" @click.prevent="couponCalculate">Apply</div>
                      </div>
                      <span v-if="couponErrorMessage" class="text-danger ps-3">{{ couponErrorMessage }}</span>
                  </div>
                  <div class="left my-3 hide_and_show_top_section">
                    <h5 class="text-wrap">Order Summery</h5>
                    <div class="d-flex justify-content-between my-2">
                      <p class="">Sub Total</p>
                      <p class="text-dark">{{ cart.totalPrice }} <span class="font-weight-bold">TK</span></p>
                    </div>
                    <div class="d-flex justify-content-between my-2">
                      <p class="">Delivary Charge</p>
                      <p class="text-dark">{{ deliverCharge }}<span class="font-weight-bold">TK</span></p>
                    </div>
                    <div class="d-flex justify-content-between my-2" v-if="couponDiscountAmount">
                      <p class="text-danger">Coupon Discount</p>
                      <p class="text-danger"> -({{ couponDiscountAmount ?  cart.totalPrice - couponDiscountAmount : 0 }})<span class="font-weight-bold">TK</span></p>
                    </div>
                    <div class="line"></div>
                    <div class="d-flex justify-content-between my-2">
                      <p class="text-dark">Total</p>
                      <p class="text-dark"><span class="flag-discount me-4">Amount</span> {{ couponDiscountAmount ?  Number(deliverCharge) + couponDiscountAmount : cart.totalPrice + Number(deliverCharge) }}  <span class="font-weight-bold">TK</span></p>
                    </div>
                  </div>
                  <div class="text-note mt-3" v-if="isDesktop">
                    <p class="">প্রয়োজনীয় কোনো তথ্য দিতে এই এখানে লিখুনঃ </p>
                      <textarea class="p-2" name="" id="" cols="50" rows="5" placeholder="দয়া করে আপনার অর্ডারের জন্য যে কোনও বিশেষ নির্দেশিকা বা পছন্দ দিন এখানে বলতে পারেন ।" v-model="orderNote"></textarea>
                  </div>
                </div>
            </div>
            <div class="col-lg-4">
              <Form
                @submit.prevent="placeOrder"
                :validation-schema="schema"
                v-slot="{ errors, isSubmitting }"
              >
                <div class="left">
                    <h5 class="text-wrap text-center">অর্ডার কনফার্ম করতে আপনার নাম, মোবাইল নাম্বর, ঠিকানা লিখে অর্ডার করুন" বাটনে ক্লিক করুন।</h5>
                    <div class="form-group">
                        <label for="exampleInputEmail1" class="fw-bold">নামঃ</label>
                        <Field
                        name="name"
                        type="text"
                        v-model="name"
                        class="form-control"
                        placeholder="এখানে লিখুন....."
                        :class="{ 'is-invalid': errors.name }"
                      />
                      <span class="text-danger" v-if="errors.name">{{ errors.name }}</span>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1" class="fw-bold">ঠিকানা:</label>
                        <Field
                        name="address"
                        type="text"
                        v-model="address"
                        class="form-control PlaceHolderColorChange"
                        placeholder="বাসা নং, রোড নং, থানা/উপজেলা, জেলা"
                        :class="{ 'is-invalid': errors.address }"
                      />
                      <span class="text-danger" v-if="errors.address">{{ errors.address }}</span>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1" class="fw-bold">মোবাইল নম্বরঃ</label>
                        <Field
                        name="phone"
                        type="text"
                        v-model="phoneNumber"
                        class="form-control"
                        placeholder="এখানে লিখুন....."
                        :class="{ 'is-invalid': errors.phone }"
                      />
                      <span class="text-danger" v-if="errors.phone">{{ errors.phone }}</span>
                      <span class="text-danger" v-if="backendErrors?.phone_number">{{ backendErrors.phone_number[0] }}</span>
                    </div>
                    <h6 class="delivary-charge text-center mb-3" >ডেলিভারি চার্জ</h6>
                    <div  v-for="(delivery, index) in deliveryInfo.data" :key="index"  @click="getSelectedDeliveryId(delivery.id)">
                      <div class="formRadioControl" v-if="!(delivery.id === 3 && !isFreeShippingEligible)">
                        <input
                          class="form-check-input me-2"
                          type="radio"
                          :id="'deliveryGateway_' + index"
                          name="delivery_gateway_id"
                          :value="delivery.id"
                          v-model="delivery_gateway_id"
                          >
                          <!-- :disabled="delivery.id === 3 && !(isFreeShippingEligible)" -->
                        <label class="form-check-label" :for="'deliveryGateway_' + index">{{ delivery.name + ' - ' + Number(delivery.delivery_fee) }} টাকা </label>
                      </div>
                    </div>
                </div>
                <div class="secend-box p-2 bg-light mt-3">
                    <div class="">
                      <div class="right-text fw-bolder text-dark text-center"><i class="fa-solid fa-lock"></i>সম্পূর্ণ নিরাপদ পেমেন্ট</div>
                    </div>

                    <div v-for="(payment_gateway, index) in payment_gateways.data" :key="index">
                      <div class="formRadioControl d-flex align-items-center"  @click="selectedGetway(payment_gateway)">
                        <input
                          class="form-check-input payment-getway-input me-2 mt-0"
                          type="radio"
                          :id="'paymentGateway_' + index"
                          name="payment_gateway_id"
                          :value="payment_gateway.id"
                          v-model="payment_gateway_id"
                        >
                        <div class="d-flex justify-content-between w-100 align-items-center">
                          <label class="form-check-label payment-getway-lebal" :for="'paymentGateway_' + index">{{ payment_gateway.name }}</label>
                          <img :src="payment_gateway.image" alt="" style="width: 40px;">
                        </div>
                      </div> 

                      <div class="box box--top" v-if="paymentGetwayName?.toLowerCase() === 'bkash' && payment_gateway.id === payment_gateway_id">
                        <span>
                          <span class="text-danger font-weight-bold">"Upto 300 Taka Discount"</span><br>
                            <span class="text-danger">➞</span> BKash Agent Number : 01873 046 404 <br>
                            <div class="paymentgetway-customize-input-feilds">
                              <span>BKash Send Number</span>
                              <input type="email" class="form-control form-control-sm" placeholder="017XXXXXXXX" v-model="paymentSendNumber">
                            </div>
                            <div class="paymentgetway-customize-input-feilds">
                              <span>BKash Transaction ID</span>
                              <input type="email" class="form-control form-control-sm" placeholder="017XXXXXXXX" v-model="paymentReceivedNumber">
                            </div>
                          </span>
                      </div>

                      <div class="box box--top"  v-else-if="paymentGetwayName?.toLowerCase() === 'nagad' && payment_gateway.id === payment_gateway_id">
                        <span>
                          <span class="text-danger font-weight-bold">"Upto 300 Taka Discount"</span><br>
                            <span class="text-danger">➞</span> Nagad Agent Number : 01894 689 206 <br>
                            <div class="paymentgetway-customize-input-feilds">
                              <span>Nagad Send Number</span>
                              <input type="email" class="form-control form-control-sm" placeholder="017XXXXXXXX" v-model="paymentSendNumber">
                            </div>
                            <div class="paymentgetway-customize-input-feilds">
                              <span>Nagad Transaction ID</span>
                              <input type="email" class="form-control form-control-sm" placeholder="9KE6DF5T4M" v-model="paymentReceivedNumber">
                            </div>
                          </span>
                      </div>

                      <div class="box box--top" v-else-if="paymentGetwayName == 'Cash On Delivery'  &&  payment_gateway.id == payment_gateway_id">
                        <span class="text-danger">➞</span> Pay with cash upon delivery. 
                      </div>
                    </div>

                    </div>
                    <div class="left my-3 hide_and_show_bottam_section ">
                      <h5 class="text-wrap">Order Summery</h5>
                      <div class="d-flex justify-content-between my-2">
                        <p class="text-danger">Sub Total</p>
                        <p class="text-danger">{{ cart.totalPrice }} <span class="font-weight-bold">TK</span></p>
                      </div>
                      <div class="d-flex justify-content-between my-2">
                        <p class="text-danger">Delivary Charge</p>
                        <p class="text-danger">{{ deliverCharge }}<span class="font-weight-bold">TK</span></p>
                      </div>
                      <div class="d-flex justify-content-between my-2" v-if="couponDiscountAmount">
                        <p class="text-danger">Coupon Discount</p>
                        <p class="text-danger"> -({{ couponDiscountAmount ?  cart.totalPrice - couponDiscountAmount : 0 }})<span class="font-weight-bold">TK</span></p>
                      </div>
                      <div class="line"></div>
                      <div class="d-flex justify-content-between my-2">
                        <p class="text-danger">Total</p>
                        <p class="text-danger"><span class="flag-discount me-4">Amount</span> {{ couponDiscountAmount ?  Number(deliverCharge) + couponDiscountAmount : cart.totalPrice + Number(deliverCharge) }}  <span class="font-weight-bold">TK</span></p>
                      </div>
                    </div>
                    <div class="text-note mt-3" v-if="!isDesktop">
                      <p class="">প্রয়োজনীয় কোনো তথ্য দিতে এই এখানে লিখুনঃ </p>
                        <textarea class="p-2" name="" id="" cols="30" rows="5" placeholder="দয়া করে আপনার অর্ডারের জন্য যে কোনও বিশেষ নির্দেশিকা বা পছন্দ দিন এখানে বলতে পারেন ।" v-model="orderNote"></textarea>
                    </div>
                    <div v-if="isLoading" class="preloader"></div>
                  <button type="submit"  class="text-center orderBTN mt-3 w-100" @click="placeOrder()">
                    <span v-if="loading" class="spinner-border spinner-border-sm mr-1"></span>
                    <span v-else>Place Order</span>
                  </button>
                  <span class="text-danger" v-if="blockSmsErrorMessage">{{ blockSmsErrorMessage }}</span>
              </Form>
            </div>
        </div>
    </div>


    <!--=====================================
                    CHECKOUT PART END
        =======================================-->
  </div>
</template>


<style>
@import "@/assets/css/checkout.css";



.box {
  border: 1px solid #ddd;
  padding: 10px;
  margin-top: 10px;
  background-color: #f9f9f9;
}

.paymentgetway-customize-input-feilds {
  margin-top: 8px;
}

/* paymentgetway customize input feilds */

.paymentgetway-customize-input-feilds{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0px;
}
.paymentgetway-customize-input-feilds span{
  font-size: 14px;
  font-weight: 600;
  font-style: italic;
  color: #000;
}
.paymentgetway-customize-input-feilds input{
  width: 50%;
}

/* paymentgetway customize input feilds */

/* checkoutTable start*/
.checkoutTable th,
.checkoutTable td {
  text-align: center !important; /* Horizontal alignment */
  vertical-align: middle !important; /* Vertical alignment */
}
/* checkoutTable end*/


/* is free shipping start*/

.continue-shopping a{
  border: 2px solid var(--secondary-color);
  padding: 8px 20px;
  margin-bottom: 20px;
  color: var(--secondary-color);
  font-weight: 500;
  transition: .2s;
}

.continue-shopping a:hover{
  color: var(--black);
  border: 2px solid var(--black);
  transition: .2s;
}

.is-free-shipping{
  border: 2px solid var(--secondary-color);
  border-radius: 5px;
  padding: 10px;
  text-align: center;
}
.is-free-shipping p{
  font-size: 20px;
  color: var(--secondary-color);
  font-weight: 600;
}
.is-free-shipping-active{
  border: 2px solid var(--green);
  border-radius: 5px;
  padding: 10px;
  text-align: center;
}
.is-free-shipping-active p{
  font-size: 20px;
  color: var(--green);
}
/* is free shipping end*/

/* pre loader start*/
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loader {
  width: 50px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #25b09b;
  --_m:
    conic-gradient(#0000 10%, #000),
    linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: l3 1s infinite linear;
}

@keyframes l3 {
  to {
    transform: rotate(1turn)
  }
}

/* pre loader end*/

.price_section_show{
  display: block;
}
.price_section_hide{
  display: none;
}

.formRadioControl{
  border: 1px solid rgb(0, 0, 0);
  border-radius: 5px;
  padding: 5px 10px;
  margin: 10px 0;
  border-top: 3px solid var(--primary) !important;
}

.text-note textarea {
    border-color: var(--primary);
    border-radius: 5px;
    margin-top: 5px;
}

.form-control.PlaceHolderColorChange::placeholder {
    color: var(--black) !important;
}

.form-control {
  border: 1px solid var(--black) !important;
  border-top: 3px solid var(--primary) !important;
}

/* Define the keyframes for the pulse animation */
@keyframes pulse {
  0% {
    transform: scale(0.2);
    opacity: 1;
  }
  50% {
    transform: scale(0.5);
    opacity: 0.7;
  }
  100% {
    transform: scale(0.2);
    opacity: 1;
  }
}

/* Base button styling */

.orderBTN {
  background-color: var(--primary);
  border-top: 3px solid var(--primary);
  border-left: 3px solid var(--primary);
  border-bottom: 3px solid var(--primary);
  border-right: 3px solid var(--primary);
  color: #fff;
  padding: 10px;
  border-top-left-radius: 20px !important;
  border-bottom-right-radius: 20px !important;
  transition: .3s ease-in-out;
  font-weight: 500;
  font-size: 23px;
  animation: pulse 1.5s infinite; 
}

@keyframes pulse {
  0% {
    transform: scale(1.);
  }
  50% {
    transform: scale(.9); /* আগের থেকে কম zoom effect */
  }
  100% {
    transform: scale(1.);
  }
}

.orderBTN:hover{
  background-color: var(--secondary-color);
  border-top: 3px solid var(--secondary-color);
  border-left: 3px solid var(--secondary-color);
  border-bottom: 3px solid var(--secondary-color);
  border-right: 3px solid var(--secondary-color);
  color: var(--black);
}

.img{
    width: 50px;
}
.img img{
    width: 100%;
    border-radius: 0% !important;
}

.left {
  border: 1px solid var(--primary);
  padding: 15px;
  border-top: 4px solid var(--primary) !important;
  border-left: 4px solid var(--primary) !important;
  border-bottom: 1px solid var(--primary) !important;
  border-right: 2px solid var(--primary) !important;
  border-top-left-radius: 20px !important;
  border-bottom-right-radius: 20px !important;
}

.delivary-charge {
    padding: 7px 0px;
    border: 1px solid black;
    color: var(--primary);
}
.left-text h5{
  font-weight: 800;
  font-size: 15px;
}

.line{
  border-bottom: 2px solid var(--primary);
}

.secend-box{
  box-shadow: 3px 5px 9px -3px rgba(0,0,0,0.7);
-webkit-box-shadow: 3px 5px 9px -3px rgba(0,0,0,0.7);
-moz-box-shadow: 3px 5px 9px -3px rgba(0,0,0,0.7);
padding: 15px;
border-top: 4px solid var(--primary) !important;
border-left: 4px solid var(--primary) !important;
border-bottom: 1px solid var(--primary) !important;
border-right: 2px solid var(--primary) !important;
border-top-left-radius: 20px !important;
border-bottom-right-radius: 20px !important;
border: 1px solid var(--primary) !important;
}

.right-text i {
  margin: 0px 5px;
  border: 1px solid var(--primary);
  padding: 5px;
  border-radius: 50%;
  background-color: var(--primary);
  color: white;
}
.payment-text i {
  border: 1px solid var(--primary);
  padding: 2px;
  border-radius: 50%;
  background-color: var(--primary);
  color: white;
  font-size: 12px;
  margin-right: 6px;
}

.flag-discount {
    border-radius: 6px 0 0 6px;
    color: #fff;
    display: block;
    float: left;
    padding: 0px 5px;
    background: var(--primary);
    font-size: 15px;
    font-weight: 400;
    position: relative;
}
.flag-discount::before,
.flag-discount::after {
    content: "";
    position: absolute;
    left: 100%;
    width: 0;
    height: 0;
    border-style: solid;
    display: block;
}
.flag-discount::before {
    top: 0;
    border-width: 22px 15px 0 0;
    border-color: var(--primary) transparent transparent transparent;
}
.flag-discount::after {
    bottom: 0;
    border-width: 0 15px 22px 0;
    border-color: transparent transparent var(--primary) transparent;
}


/* input quantity start */


.checkout-page-action{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
}

.checkout-page-action button i {
  width: 35px;
  height: 35px;
  font-size: 14px;
  line-height: 35px;
  border-radius: 6px;
  text-align: center;
  display: inline-block;
  color: var(--text);
  background: var(--chalk);
  text-shadow: var(--primary-tshadow);
  transition: all linear .3s;
  -webkit-transition: all linear .3s;
  -moz-transition: all linear .3s;
  -ms-transition: all linear .3s;
  -o-transition: all linear .3s;
}

.checkout-page-action button i:hover {
  color: var(--white);
  background: var(--primary);
}

.checkout-page-action input {
  width: 17% !important;
  font-size: 15px;
  margin: 0px 5px;
  padding: 6px 0px;
  border-radius: 6px;
  text-align: center;
  color: var(--white);
  background: var(--primary);
  text-shadow: var(--primary-tshadow);
}

/* input quantity end */



.is-coupon{
  padding: 10px;
}
.isRoted{
  transform: rotate(180deg);
  transition: all 0.5s;
}
.fa-chevron-down{
  transition: all 0.5s;
}

#btnGroupAddon{
  cursor: pointer;
}

.checkoutBorder{
    padding: 20px;
    border: 1px solid var(--primary);
    border-top: 7px solid var(--primary);
    border-bottom: 7px solid var(--primary);
    border-radius: 15px;
}

@media (max-width: 767px) {
  .continue-shopping a {
      font-size: 17px;
  }
  .is-free-shipping p {
      font-size: 17px;
  }
}



@media (max-width: 575px) {


}
@media (max-width: 430px) {
  .continue-shopping a {
    font-size: 17px;
  }
  .is-free-shipping p {
    font-size: 17px;
  }
}

@media (max-width: 425px) {



}

@media (max-width: 412px) {


}

@media (max-width: 390px) {
  .is-free-shipping p {
    font-size: 13px;
  }
  .continue-shopping a{
    font-size: 13px;
  }
}

@media (max-width: 375px) {


}

@media (max-width: 360px) {

}
@media (max-width: 344px) {
  .is-free-shipping p {
    font-size: 13px;
  }
}


@media (max-width: 330px) {


}
@media (max-width: 320px) {


}


</style>