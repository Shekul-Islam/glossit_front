// All Import File  Code Is Here......................................................................................................
import { defineStore } from 'pinia'
import axiosInstance from "@/services/axiosService.js";




export const useContact = defineStore('contact', {
  // All Variable  Code Is Here.....................................................................................................
  state: () => ({ 
    loading: false,
  }),
  
  actions: {
    // API Calling Code Is Here.....................................................................................................
    
    async insertData(data) {
      try {
        const res = await axiosInstance.post("/contacts", data);
        
        if (res.data.success) {
           return res;
        }
      } catch (error) {
        console.log(error);
      }
    },

  },
  })
  // All Function  Code Is Here.....................................................................................................