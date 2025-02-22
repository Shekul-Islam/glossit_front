// All Import File  Code Is Here......................................................................................................
import { defineStore } from 'pinia'
import axiosInstance from "@/services/axiosService.js";




export const useCommonIsToggleFunctionality = defineStore('commonIsToggleFunctionality', {
  // All Variable  Code Is Here.....................................................................................................
  state: () => ({ 
    cartSideBar    : false,
    navSideBar     : false,
    categorySideBar: false,
    shopSideBar    : false,
  }),
  
  actions: {
    // API Calling Code Is Here.....................................................................................................
    
    async isCategorySideBarOpenOrClose(){
      this.categorySideBar = !this.categorySideBar;
    }, 

    async isNavSideBarOpenOrClose(){
      this.navSideBar = !this.navSideBar;
    }, 

    async isCartSideBartOpenOrClose(){
      this.cartSideBar = !this.cartSideBar;
    },

    async isShopSideBarOpenOrClose(){
      this.shopSideBar = !this.shopSideBar;
    }, 

  },
  })