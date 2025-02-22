import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosService.js";

export const useSection = defineStore("section", {
    state: () =>({
        sections : {},
        loading : false,
        isActive : false,
    }),

        actions: {
            async getData(){
                try {
                    this.loading = true;
                    const res = await axiosInstance.get('/sections');
                    
                    if(res.data.success){         
                        return res.data?.result
                    }
                } catch (error) {
                    console.log(error);
                }finally{
                    this.loading = false;
                }
            }
        }
})