<script setup>
import {LoginFrom, Modal} from "@/components"

import { ref } from "vue";

import { useAuth, useNotification, useModal, useOrder } from "@/stores";
// validation error
import { Form, Field } from "vee-validate";
import * as yup from "yup";
// router pushing

import { useRouter, useRoute } from "vue-router";
import { storeToRefs } from "pinia";
const {backendErrors, user, isOrder} = storeToRefs(useAuth())
const order = useOrder();
const { storeOrder } = storeToRefs(order);
// All Variable  Code Is Here.....................................................................................................
const modal = useModal();
const router = useRouter();
const route = useRoute();
const auth = useAuth();
const showPassword = ref(false);
const notify = useNotification();
const emit = defineEmits(['orderSubmitted']);


const otpSubmit = async (values, { setErrors, resetForm }) => {
  const fromData = {otp: values.otp, phone_number: user.value.phone_number }
  try {
    const res = await auth.otpVerify(fromData);
    if (res.status == 200) {
      modal.Modalclose() 
      if (route.path === "/login") {
          router.push({ name: route.path === "/login" ? "homePage" : "" });
        }else if(route.path === "/checkout-page"){
            emit('orderSubmitted');
        }else{
            router.push({ name: "checkoutPage" });
        }
      notify.Success("Login Successfully Done");
    } else {
      console.error("Unexpected response:", res);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};



const schemaTwo = yup.object({
  otp: yup.string().required("OPT Number Feild Is Required"),
});

</script>


<template lang="">
    <!-- <Modal>
      <div class="product-view">
            <div class="row">
              <div class=" col-md-12 col-lg-12">
                  <div class="user-form-logo">
                      <router-link :to="{name: 'homePage'}"><img src="@/assets/images/maxfit.png" alt="logo" /></router-link>
                  </div>
                  <LoginFrom />
                  <div class="user-form-remind">
                      <p>Don't have any account?<router-link :to="{name: 'Registration'}"><span data-bs-dismiss="modal">register here</span></router-link></p>
                  </div>
              </div>
            </div>
          </div>
    </Modal> -->


        <Modal>            
            <section class="user-form-part">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-12 col-sm-10 col-md-12 col-lg-12 col-xl-10">
                            <div class="user-form-logo">
                                <router-link :to="{name: 'homePage'}"><img src="@/assets/images/maxfit.png" alt="logo" /></router-link>
                            </div>
                            <div class="user-form-card my-5">
                                <span class="text-danger">আপনার নাম্বারে একটি ওটিপি কোড পাঠানো হয়েছে সেই কোডটি এখানে সাবমিট করুন</span>
                                <div class="user-form-group">
                                    <Form
                                        class="user-form"
                                        @submit="otpSubmit"
                                        :validation-schema="schemaTwo"
                                        v-slot="{ errors, isSubmitting }"
                                    >
                                    <div class="form-group">
                                        <Field
                                        name="otp"
                                        type="text"
                                        class="form-control"
                                        placeholder="OTP Code"
                                        :class="{ 'is-invalid': errors.otp }"
                                        />
                                        <span class="text-danger" v-if="errors.otp">{{ errors.otp }}</span>
                                        <template  v-if="backendErrors.otp">
                                                <span class="text-danger" v-show="backendErrors.otp">{{ backendErrors.otp[0] }}</span>
                                        </template>
                                    </div>
                                        <div class="form-button">
                                            <button type="submit" :disabled="isSubmitting">
                                                SEND
                                                <span
                                                    v-show="isSubmitting"
                                                    class="spinner-border spinner-border-sm mr-1"
                                                ></span>
                                            </button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Modal>

</template>

<style>

</style>
