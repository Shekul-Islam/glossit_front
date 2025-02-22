// All Import File  Code Is Here......................................................................................................
import { defineStore } from 'pinia'
import axiosInstance from "@/services/axiosService.js";




export const useSlider = defineStore('slider', {
  // All Variable  Code Is Here.....................................................................................................
  state: () => ({ 
    sliders: {},
    loading: false,
  }),
  
  actions: {
    // API Calling Code Is Here.....................................................................................................
    
    async getData() {
      try {
        const res = await axiosInstance.get('/sliders');
        if(res.data.success){
            this.sliders = res.data?.result
            return res.data?.result
        }
      } catch (error) {
        console.log(error);
      }finally{
        this.loading = false;
      }
    },

  },
  })
  // All Function  Code Is Here.....................................................................................................