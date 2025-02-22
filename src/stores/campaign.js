// All Import File  Code Is Here......................................................................................................
import { defineStore } from 'pinia'
import axiosInstance from "@/services/axiosService.js";




export const useCampaign = defineStore('campaign', {
  // All Variable  Code Is Here.....................................................................................................
  state: () => ({ 
    campaigns: {},
    loading: false,
  }),
  
  actions: {
    // API Calling Code Is Here.....................................................................................................
    
    async getCampaignBanner(){
      this.loading = true;
      try {
          const res = await axiosInstance.get('/campaigns');          
          if(res.data.result){
              this.campaigns = res.data?.result;            
              return res.data?.result;
          }
      } catch (error) {
          console.log(error);
      }finally{
          this.loading = false;
      }
   }, 

    async getCampaign(id){
      this.loading = true;
      try {
          const res = await axiosInstance.get(`/campaigns/${id}`);          
          if(res.data.result){
              this.campaigns = res.data?.result;            
              return res.data?.result;
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