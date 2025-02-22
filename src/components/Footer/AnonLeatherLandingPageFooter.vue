
<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
 landingPageData: {
    type: Object,
    default: {}, 
  },
});

</script>

<template>
  <div>
    <section class="footer">
      <div class="footer-sec">
          
          <div class=" ">
              <div class="container footer-middle">
                  <span>Refund policy</span>
                  <span>Privacy policy</span>
                  <span>Terms & Conditions</span>
                  
              </div>
              <div class="copyright-text"><span>© {{ landingPageData.title }}</span></div>
          </div>
          
      </div>

  </section>
  </div>
</template>

<style scoped>
@import "@/assets/css/landing-page.css";

@media (max-width: 767px) {
  .footer-middle span {
    font-size: 18px;
  }

}

</style>