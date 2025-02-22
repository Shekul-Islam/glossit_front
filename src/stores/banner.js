// All Import File  Code Is Here......................................................................................................
import { defineStore } from 'pinia';
import axiosInstance from "@/services/axiosService.js";

export const useBanner = defineStore('banner', {
  state: () => ({ 
    banners: [], // ✅ Banner Data Store করার জন্য Array নিচ্ছি
    loading: false,
  }),
  
  actions: {
    async getData(data = null) {
      this.loading = true;
      console.log("Fetching banner data..."); // ✅ লগ রাখছি
      
      try {
        const res = await axiosInstance.get("/banners", {
          params: { type: data },
        });

        console.log("API Response in Store:", res.data); // ✅ Response আসছে কিনা চেক করো
        
        if (res.status === 200) {
          this.banners = res.data.result; // ✅ Store এ ডাটা সেট করছি
          this.loading = false;
          return res.data.result;
        } else {
          console.error("API Response Error:", res);
          this.loading = false;
          return null;
        }
      } catch (error) {
        console.error("API Call Failed:", error);
        this.loading = false;
        return null;
      }
    },
  },
});



  // All Function  Code Is Here.....................................................................................................