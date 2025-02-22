import { ref } from 'vue'


export function mrpOrOfferPrice(mrp = null, offerPrice = null) {
  if (offerPrice == 0.00) {
    return mrp
  }else{
    return offerPrice
  }
}