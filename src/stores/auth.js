// All Import File  Code Is Here......................................................................................................
import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosService.js";

export const useAuth = defineStore("auth", {
  // All Variable  Code Is Here.....................................................................................................
  state: () => ({
    user: {},
    isOrder: false,
    backendErrors: '',
    loading: false,
  }),

  persist: {
    paths: ["user"],
  },

  actions: {
    // API Calling Code Is Here.....................................................................................................

    async login(formData) {
      try {
        const res = await axiosInstance.post("/login", formData);

        console.log(res);
        if (res.status == 200) {
          this.user = res.data.result;
          return res;
        }else{
          this.backendErrors = res.data.message
        }
      } catch (error) {
        console.log(error);
      }
    },

    async register(formData) {
      try {
        const res = await axiosInstance.post("/register", formData);
        console.log(res.data.message);
        if (res.status === 200) {
          return res.data;
        }else{
          this.backendErrors = res.data.message
        }
      } catch (error) {
        if (error.response.data) {
          return new Promise((reject) => {
            reject(error.response.data.errors);
          });
        }
      }
    },


    async otpVerify(formData) {
      try {
        const res = await axiosInstance.post("/check-otp", formData);
        if (res.status === 200) {
          this.user = res.data.result;
          return res
        }
      } catch (error) {
        console.log(error);
      }
    },

    // async resendOtp(phone) {
    //   try {
    //     const res = await axiosInstance.post("/otp-resend", {
    //       phone: phone,
    //     });
    //     if (res.status === 200) {
    //       this.user = res.data;
    //       return new Promise((resolve) => {
    //         resolve(res.data);
    //       });
    //     }
    //   } catch (error) {
    //     if (error.response.data) {
    //       return new Promise((reject) => {
    //         reject(error.response.data.errors);
    //       });
    //     }
    //   }
    // },

    async logout() {
      this.loading = true;
      try {
        const res = await axiosInstance.post("/users/logout");
        if (res.status === 200) {
          this.user = {};
          return res.data;
        }
      } catch (error) {
        if (error.response) {
          return new Promise((reject) => {
            reject(error.response);
          });
        }
      } finally {
        this.loading = false;
      }
    },


    async profile() {
      try {
        const res = await axiosInstance.get("/users/profile");
        if (res.status === 200) {
          return res.data.result
        }else{
          this.backendErrors = res.data.message
        }
      } catch (error) {
        if (error.response.data) {
          // this.errors = error.response.data.errors;
        }
      }
    },


    async profileUpdate(id, name, currentPassword, newPassword, confirmPassword) {      
      try {
        const res = await axiosInstance.post("/users/change-password",{
          id                       : id,
          name                     : name,
          current_password         : currentPassword,
          new_password             : newPassword,
          new_password_confirmation: confirmPassword,
        });

        if (res.status === 200) {
          return res.data.result;
        }else{
          this.backendErrors = res.data.message;
        }
      } catch (error) {
        this.backendErrors = error.response.data.message;        
      }
    }

  },
});




// All Function  Code Is Here.....................................................................................................
