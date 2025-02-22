<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { storeToRefs } from 'pinia';
import {useSetting} from '@/stores'
const route = useRoute();
const text1 = ref('');
const text2 = ref('');
const text3 = ref('');

// orderInfo এর জন্য null বা undefined চেক করা
const orderInfo = route.query.orderInfo ? JSON.parse(route.query.orderInfo) : {};

const setting = useSetting();
const { settings } = storeToRefs(setting);

const getSettingsData = async () => {
  const settingData = await setting.getData();

  // Object থেকে Array তে কনভার্ট করা
  const settingsArray = Array.isArray(settingData) ? settingData : Object.values(settingData);
  console.log("✅ Converted to Array:", settingsArray);

  settingsArray.forEach((ele) => {
    if (ele.key == "thankyoupage-text1") {
      text1.value = ele.value;
    }
    if (ele.key == "thankyoupage-text2") {
      text2.value = ele.value;
    }
    if (ele.key == "thankyoupage-text3") {
      text3.value = ele.value;
    }
  });
};

onMounted(() => {
  getSettingsData();
});

</script>

<template>
  <div>
    <section class="inner-section single-banner bg-danger">
      <div class="container">
        <h1 class="text-light">ধন্যবাদ !!!</h1>
        <h4 class="text-light">আপনার অর্ডারটি সফলভাবে সম্পন্ন হয়েছে।</h4>
        <p class="text-info">আমাদের একজন প্রতিনিধি আপনার সাথে যোগাযোগ করে বিস্তারিত জানিয়ে দিবে</p>
      </div>
    </section>

    <section>
      <div class="container order-details">
              <div class="row">
                <div class="account-card">
                <div class="account-content">
                  <div class="col-md-6 checkout-charge pt-4">
                    <h4>Your Order Has Been Received</h4>
                    <ul>
                      <li>
                        <span>Date and Time</span>
                        <span>{{ new Date().toLocaleDateString() }}</span>
                      </li>
                      <li>
                        <span>Phone Number</span>
                        <span>{{ orderInfo.phoneNumber }}</span>
                      </li>
                      <li>
                        <span>Customer Name</span>
                        <span>{{ orderInfo.name }}</span>
                      </li>
                      <li>
                        <span>Customer Adress</span>
                        <span>{{ orderInfo.address }}</span>
                      </li>
                    </ul>
                  </div>
                 

                  <div class="col-md-6 checkout-charge pt-4">
                    <ul>
                      <h3>Order Details</h3>
                      <li>
                        <span>Payment Method</span>
                        <span v-if="orderInfo.payment_gateway_id == 1">Cash On Delivery</span>
                        <span v-else>Other Transition</span>
                      </li>
                      <li>
                        <span>Delivery Address</span>
                        <span v-if="orderInfo.delivery_gateway_id == 1">ঢাকার মধ্যে - {{ Number(orderInfo.deliverCharge) }} টাকা</span>
                        <span v-else>ঢাকার বাইরে - {{  Number(orderInfo.deliverCharge) }} টাকা</span>
                      </li>
                      <li>
                        <span>Total<small>(Incl. VAT)</small></span>
                        <span>{{ orderInfo.totalPrice + Number(orderInfo.deliverCharge) }}tk</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <p>Pay with cash upon delivery.</p>
              </div>
              </div>
            </div>
    </section>
  </div>
</template>
<style scope>

.account-content{
  display: flex;
  justify-content: space-between;
 
}

.checkout-charge{
  display: grid;
  justify-content: center;
}

.account-card p {
  text-align: center;
}
</style>
