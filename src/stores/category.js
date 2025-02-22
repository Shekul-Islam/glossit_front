// All Import File  Code Is Here......................................................................................................
import { defineStore } from 'pinia'
import axiosInstance from "@/services/axiosService.js";




export const useCategory = defineStore('category', {
  // All Variable  Code Is Here.....................................................................................................
  state: () => ({ 
    categories: {},
    loading: false,
  }),
  
  actions: {
    // API Calling Code Is Here.....................................................................................................
    
    async getCategories(){
      this.loading = true;
      try {
          const res = await axiosInstance.get('/categories');
          if(res.data.success){
              this.categories = res.data?.result              
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