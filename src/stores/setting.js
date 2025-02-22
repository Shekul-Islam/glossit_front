import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosService.js";

export const useSetting = defineStore("setting", {
    state: () =>({
        settings : {},
        loading : false,
        isActive : false,
    }),

        actions: {
            async getData(){
                try {
                    const response = await axiosInstance.get('/settings');

                    this.settings = response.data.result
                    
                    return response.data.result;
                  } catch (error) {
                    console.log(error); 
                  }
            }
        }
})