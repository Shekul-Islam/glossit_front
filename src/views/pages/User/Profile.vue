<script setup>
import axiosInstance from "@/services/axiosService.js";
import { useAuth, useModal } from '@/stores';
import { ref, onMounted } from 'vue';
import {Modal} from "@/components"
import { storeToRefs } from "pinia";

const auth            = useAuth();
const {backendErrors} = storeToRefs(auth)
const profileData     = ref();
const modal           = useModal()
const id              = ref()
const username        = ref()
const currentPassword = ref()
const newPassword     = ref()
const confirmPassword = ref()

const getData = async() => {
    profileData.value = await auth.profile()
    id.value          = profileData.value.id
    username.value    = profileData.value.username
}

const profileInfoUpdate = async () => {
     const res =  await auth.profileUpdate(id.value, username.value, currentPassword.value, newPassword.value, confirmPassword.value)    
     if (res) {
        modal.Modalclose()
        getData();
     }else{
        console.log(res); 
     }

}

onMounted(() => {
    getData();
})

</script>

<template>
    <div>
         <!--=====================================
                    PROFILE PART START
        =======================================-->
        <section class="inner-section profile-part mt-5">
            <div class="container">


                <Modal>
                    <form class="modal-form">
                        <div class="form-title">
                            <h3>edit profile info</h3>
                        </div>
                        <div class="form-group">
                            <label class="form-label">name</label>
                            <input class="form-control" type="text" v-model="username">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Current Password</label>
                            <input class="form-control" type="password" v-model="currentPassword">
                            <span class="text-danger">{{ backendErrors }}</span>
                        </div>
                        <div class="form-group">
                            <label class="form-label">New Password</label>
                            <input class="form-control" type="password" v-model="newPassword">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Confirm Password</label>
                            <input class="form-control" type="password" v-model="confirmPassword">
                        </div>
                        <button class="form-btn" @click.prevent="profileInfoUpdate">Update profile info</button>
                    </form>    
                </Modal>

                
                <div class="row">
                    <div class="col-lg-12">
                        <div class="account-card">
                            <div class="account-title">
                                <h4>Your Profile</h4>
                                <button @click.prevent="modal.toggleModal()">edit profile</button>
                            </div>
                            <div class="account-content">
                                <div class="row" v-if="profileData">
                                    <div class="col-md-6 col-lg-4">
                                        <div class="form-group">
                                            <label class="form-label">name</label>
                                            <input class="form-control" type="text" :value="profileData.username" disabled>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-lg-4">
                                        <div class="form-group">
                                            <label class="form-label">Email</label>
                                            <input class="form-control" type="email" :value="profileData.email" disabled>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-lg-4">
                                        <div class="form-group">
                                            <label class="form-label">Phone Number</label>
                                            <input class="form-control" type="email" :value="profileData.phone_number" disabled>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--=====================================
                    PROFILE PART END
        =======================================-->
    </div>
</template>

<style scoped>

</style>