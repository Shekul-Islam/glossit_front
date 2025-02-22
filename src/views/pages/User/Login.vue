
<script setup>
import {LoginFrom} from "@/components"
import { useSetting} from '@/stores'
import { ref, onMounted } from "vue";


const setting = useSetting();
const logo = ref('');
const getSettingsData = async() => {
  const settingData = await setting.getData('header_logo');
  logo.value = settingData.data[0].value;  
}

onMounted(() => {
    getSettingsData(); 
})

</script>

<template>
    <div>
        <section class="user-form-part">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-sm-10 col-md-12 col-lg-12 col-xl-10">
                        <div class="user-form-logo">
                            <router-link :to="{name: 'homePage'}"><img :src="logo" alt="logo" /></router-link>
                        </div>
                        
                        <LoginFrom />

                        <div class="user-form-remind mb-5">
                            <p>Don't have any account?<router-link :to="{name: 'Registration'}" href="register.html">register here</router-link></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>

</style>