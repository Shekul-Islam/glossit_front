import { ref } from 'vue'
import { useCart, useNotification } from "@/stores";

export function addToCart(tProduct, quantity = 1, variationProduct = null, productVariationPrice = 0, campaignSlug = null) {

    const cart           = useCart();
    const notify         = useNotification();
  
    if(variationProduct){
      cart.addToCart({
        product_id            : tProduct.id,
        name                  : tProduct.name,
        slug                  : tProduct.slug,
        mrp                   : productVariationPrice.mrp,
        offer_price           : productVariationPrice.offer_price,
        sell_price            : productVariationPrice.sell_price,
        image                 : tProduct.image,
        attribute_value_id_1  : variationProduct.attribute_value_id_1,
        attribute_value_id_2  : variationProduct.attribute_value_id_2,
        attribute_value_id_3  : variationProduct.attribute_value_id_3,
        quantity              : quantity,
        free_shipping         : tProduct.free_shipping,
        campaign_slug         : campaignSlug,
      });
      
    }else{
      cart.addToCart({
        product_id   : tProduct.id,
        name         : tProduct.name,
        slug         : tProduct.slug,
        mrp          : tProduct.mrp,
        offer_price  : tProduct.offer_price,
        sell_price   : tProduct.sell_price,
        image        : tProduct.image,
        variations   : '',
        quantity     : quantity,
        free_shipping: tProduct.free_shipping,
        campaign_slug: campaignSlug,
      });
  
    }
  
     notify.Success(`${tProduct.name} Successfully Added Your Cart Item`);
  }