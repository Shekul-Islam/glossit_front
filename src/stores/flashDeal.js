// All Import File  Code Is Here......................................................................................................
import { defineStore } from 'pinia'
import axiosInstance from "@/services/axiosService.js";




export const useFlashDeal = defineStore('flashDeal', {
  // All Variable  Code Is Here.....................................................................................................
  state: () => ({ 
    loading: false,
    campaignData: {},
    campaignProduct: {},
    campaignVariationProduct: [],
  }),

  persist: {
       paths: ["campaignProduct"],
    },
  
  actions: {
    // API Calling Code Is Here.....................................................................................................

    async campaignProductById(campaignId, productId) {
      this.loading = true
      try {
        const res = await axiosInstance.get(`/campaigns/product/show/${campaignId}/${productId}`);
        this.campaignProduct = res.data.result.products[0]
        this.campaignVariationProduct = res.data.result.products[0].campaign_product_prices
        // console.log(res.data.result.products[0].campaign_product_prices);
                  
      } catch (error) {
        if (error.response.data) {
          return new Promise((reject) => {
            reject(error.response.data);
          });
        }
      }finally {
        this.loading = false
      }
    },


    async index(){
      try {
          const res = await axiosInstance.get(`/campaigns`);
          return res?.data?.result[0].key 
         
       } catch (error) {
         
       } 
    }

  },
  })
  // All Function  Code Is Here.....................................................................................................