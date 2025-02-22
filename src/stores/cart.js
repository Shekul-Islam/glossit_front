// All Import File  Code Is Here......................................................................................................
import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosService.js";

export const useCart = defineStore("cart", {
  // All Variable  Code Is Here.....................................................................................................
  state: () => ({
    cartItem: [],
    loading: false,
  }),

  persist: {
    paths: ["cartItem"],
  },

  getters: {
    totalPrice: (state) => {
      let price = 0;
      state.cartItem.map((el) => {
        const itemPrice = el["sell_price"];
        price += itemPrice * el["quantity"];
      });

      return Math.round(price);
    },

    cartItemCount: (state) => {
      let price = 0;
      state.cartItem.map((el) => {
        price += el["quantity"];
      });

      return price;
    },
  },

  actions: {
    // API Calling Code Is Here.....................................................................................................

    // async addToCart(product) {
    //   this.campaignId = product.campaign_id;
    //   this.loading = product.product_id;
    //   let item = product;
    //   console.log(item);
      
    //   if (this.cartItem.length > 0) {
        
    //     // if (item.size_id) {
    //     //   let boolean = this.cartItem.some((i) => i.product_id === item.product_id && i.size_id === item.size_id );
    //     //   if (boolean) {
    //     //     let index = this.cartItem.findIndex((i) => i.product_id === item.product_id && i.size_id === item.size_id);
    //     //     this.cartItem[index]["quantity"] += item.quantity;
    //     //   } else {
    //     //     this.cartItem.push(item);
    //     //   }
    //     // } else {
    //     //   let boolean = this.cartItem.some((i) => i.product_id === item.product_id);
    //     //   if (boolean) {
    //     //     let index = this.cartItem.findIndex((i) => i.product_id === item.product_id);
    //     //     this.cartItem[index]["quantity"] += item.quantity;
    //     //   } else {
    //     //     this.cartItem.push(item);
    //     //   }
    //     // }
    //   } else {
    //     this.cartItem.push(item);
    //   }

    //   setTimeout(() => {
    //     this.loading = false;
    //   }, 1000);

    // },

    async addToCart(product) {
        this.loading = product.product_id;

        let index = this.cartItem.findIndex((i) => {
            if (i.product_id !== product.product_id) {
                return false;
            }
    
            // সমস্ত attribute_value_id গুলো চেক করা হচ্ছে
            for (let key in product) {
                if (key.startsWith('attribute_value_id_')) {
                    // যদি attribute_value_id থাকে এবং মেলে না, তাহলে false রিটার্ন করবে
                    if (product[key] && i[key] !== product[key]) {
                        return false;
                    }
                }
            }
    
            return true; 
        });
    
        if (index !== -1) {
            this.cartItem[index]["quantity"] += product.quantity;
        } else {
            this.cartItem.push(product);
        }
    
        setTimeout(() => {
            this.loading = false;
        }, 1000);


        // let index = this.cartItem.findIndex((i) => 
        //   console.log(product.attribute_value_id_1)
          
        // );

        // console.log(index);
        


    },

    async destroy(index) {
        this.cartItem.splice(index, 1);
    },

    async decrement(index) {
      if (this.cartItem.length > 0) {
        if (this.cartItem[index]["quantity"] !== 1) {
          this.cartItem[index]["quantity"] -= 1;
        }
      }
    },

    async removeAllItems() {
      this.cartItem.splice(0, this.cartItem.length);
    },

    async increment(index) {
      this.cartItem[index]["quantity"] += 1;
    },

  },
});
// All Function  Code Is Here.....................................................................................................
