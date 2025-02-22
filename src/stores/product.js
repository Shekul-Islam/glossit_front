// All Import File  Code Is Here......................................................................................................
import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosService.js";

export const useProduct = defineStore("product", {
  // All Variable  Code Is Here.....................................................................................................
  state: () => ({
    products: {},
    campaignProductData: {},
    recentProducts: [],
    topProducts: [],
    featureProducts: [],
    loading: false,
  }),

  actions: {
    // API Calling Code Is Here.....................................................................................................

    async getData(type = "", paginate_size = 0) {
      this.loading = true;
      try {
        const res = await axiosInstance.get(
          `/products?type=${type}&paginate_size=${paginate_size}`
        );
        if (res.status === 200) {
          this.featureProducts = res.data.result;
          if (type === "feature-product") {
          } else if (type === "top-product") {
            this.topProducts = res.data.result;
          } else if (type === "recent-product") {
            this.recentProducts = res.data.result;
          } else {
            this.products = res.data.result;
          }
          return res.data;
        }
      } catch (error) {
          console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async productById(id) {
      this.loading = true;
      try {
        const res = await axiosInstance.get(`/products/${id}`);
        if (res?.data?.success) {
          this.products = res.data?.result;
          return res.data?.result;
        }
        
      } catch (error) {
          console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async campaignProduct(campaignSlug, productSlug) {
      this.loading = true;
      try {
        const res = await axiosInstance.get(`/campaigns/products/${campaignSlug}/${productSlug}`);
        if (res?.data?.success) {
          this.campaignProductData = res.data?.result;
          return res.data?.result;
        }
        
      } catch (error) {
          console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async productVariations(productVariationData) {
      
      this.loading = true;
      try {
        
        const res = await axiosInstance.get(`/products/variations`, {
          params: {
            "product_id": productVariationData.product_id,
            "attribute_id_1": productVariationData.attribute_id_1,
            "attribute_id_2": productVariationData.attribute_id_2,
            "attribute_id_3": productVariationData.attribute_id_3,
            "attribute_value_id_1": productVariationData.attribute_value_id_1,
            "attribute_value_id_2": productVariationData.attribute_value_id_2,
            "attribute_value_id_3": productVariationData.attribute_value_id_3
          },
        });

        if (res?.status === 200) {
          return res?.data;
        }
        
        } catch (error) {
            console.log(error);
        } finally {
          this.loading = false;
        }
    },
  },
});




// All Function  Code Is Here.....................................................................................................
