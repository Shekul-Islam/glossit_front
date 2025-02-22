<script setup>
// All Import File  Code Is Here......................................................................................................
import { ref } from "vue";
import {LoginFrom, Modal} from "@/components"
import { useAuth, useNotification, useModal } from "@/stores";
// validation error
import { Form, Field } from "vee-validate";
import * as yup from "yup";
// router pushing
import { useRouter, useRoute } from "vue-router";
import { storeToRefs } from "pinia";
const {backendErrors, user} = storeToRefs(useAuth())
// All Variable  Code Is Here.....................................................................................................
const modal = useModal();
const router = useRouter();
const route = useRoute();


const auth = useAuth();
const showPassword = ref(false);
const notify = useNotification();
const phone_number = ref(user.value?.phone_number);

// API Calling Code Is Here.....................................................................................................
const onSubmit = async (values, { setErrors, resetForm }) => {
    const fromData = {otp: values.otp, phone_number: phone_number.value }
    console.log(fromData);
  try {
    const res = await auth.otpVerify(fromData);
    console.log(res);
    if (res.status == 200) {
          if (route.path === "/OtpLogin") {
          router.push({ name: route.path === "/OtpLogin" ? "homePage" : "" });
        }else{
          router.push({ name: "checkoutPage" });
      }
      notify.Success("Login Successfully Done");
    }
    // if (res.data) {
    // //   resetForm();
    //   modal.Modalclose() 
    //   if (route.path === "/login") {
    //       router.push({ name: route.path === "/login" ? "homePage" : "" });
    //     }else{
    //       router.push({ name: "checkoutPage" });
    //   }
    //   notify.Success("Login Successfully Done");
    // } else {
    //   console.error("Unexpected response:", res);
    // }
  } catch (error) {
    console.error("Error:", error);
    // Handle any other errors here
  }
};

// All Function  Code Is Here.....................................................................................................

const schema = yup.object({
  otp: yup.string().required("OPT Number Feild Is Required"),
});

</script>

<template>
<Modal>
    <section class="user-form-part">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-sm-10 col-md-12 col-lg-12 col-xl-10">
                    <div class="user-form-logo">
                        <router-link :to="{name: 'homePage'}"><img src="@/assets/images/maxfit.png" alt="logo" /></router-link>
                    </div>
                    <div class="user-form-card my-5">
                        <div class="user-form-group">
                            <Form
                                class="user-form"
                                @submit="onSubmit"
                                :validation-schema="schema"
                                v-slot="{ errors, isSubmitting }"
                            >
                            <div class="form-group">
                                <Field
                                name="otp"
                                type="text"
                                class="form-control"
                                placeholder="OTP CODE"
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

<style lang="scss">

</style>