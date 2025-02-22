// All Import File  Code Is Here......................................................................................................
import { defineStore } from 'pinia'
import axiosInstance from "@/services/axiosService.js";




export const useAbout = defineStore('about', {
  // All Variable  Code Is Here.....................................................................................................
  state: () => ({ 
    loading: false,
  }),
  
  actions: {
    // API Calling Code Is Here.....................................................................................................
    
    async getData() {
      try {
        const res = await axiosInstance.get("/abouts");
        if (res.status === 200) {
           return res.data.result;
        }
      } catch (error) {
        console.log(error);
      }
    },

  },
  })
  // All Function  Code Is Here.....................................................................................................