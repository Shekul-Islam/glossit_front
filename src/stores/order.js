// All Import File  Code Is Here......................................................................................................
import { defineStore } from 'pinia'
import axiosInstance from "@/services/axiosService.js";
import { useCart } from '@/stores'; 
import router from "../router";


export const useOrder = defineStore('order', {
  // All Variable  Code Is Here.....................................................................................................
  state: () => ({ 
    orderItems: [],
    orderLists: {},
    backendErrors: {},
    loading: false,
    }),

 
  
  actions: {
    // API Calling Code Is Here.....................................................................................................
    
      async storeOrder(orderInfo) {
        try {
          this.loading = true;
          const response = await axiosInstance.post('/orders',{
            user_token             : orderInfo.userToken,
            customer_name          : orderInfo.name,
            phone_number           : orderInfo.phoneNumber,
            address_details        : orderInfo.address,
            order_note             : orderInfo.orderNote,
            items                  : orderInfo.items,
            delivery_gateway_id    : orderInfo.delivery_gateway_id,
            payment_gateway_id     : orderInfo.payment_gateway_id,
            district               : orderInfo.district,
            coupon_id              : orderInfo.coupon_id,
            payment_send_number    : orderInfo.payment_send_number,
            payment_received_number: orderInfo.payment_received_number,
          });

          if (response.status === 200) {
              if (response.data.result) {
                  let url = response.data.result;
                  window.location.href = url;
              } else {
                  router.push({ name: 'thankYou.page', query: {orderInfo: JSON.stringify(orderInfo)} });
                  const cart = useCart();
                  cart.removeAllItems();
              }
            return response
          }else{
            this.backendErrors = response.data.message
          }
      } catch (error) {
          return error.response.data.message;
      } finally {
          this.loading = false
      }                 
       }, 


       async getOrderList(){
        const response = await axiosInstance.get('/orders');
        if (response.status === 200) {
          this.orderLists = response.data;
        }else{
          console.log(response);
        }

       }
      

     },
  })
  // All Function  Code Is Here.....................................................................................................