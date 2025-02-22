<script setup>
import { storeToRefs } from "pinia";

// All Import File  Code Is Here......................................................................................................

// All Variable  Code Is Here.....................................................................................................

// API Calling Code Is Here.....................................................................................................

// All Function  Code Is Here.....................................................................................................

defineProps({
  title: String,
});
</script>


<template>
  <div>
     <!--=====================================
                  BANNER PART START
      =======================================-->
      <section class="inner-section single-banner">
          <div class="container">
              <h2>Shop Page</h2>
          </div>
      </section>
      <!--=====================================
                  BANNER PART END
      =======================================-->
  </div>
</template>

<style scope>


.single-banner {
  background-size: cover !important;
  background-color: red;
  padding: 20px 0px;
  text-align: center;
  position: relative;
  z-index: 1;
}

.single-banner::before {
  position: absolute;
  content: "";
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  /* background: -webkit-gradient(linear, left top, right top, from(rgba(150, 25, 16, 0.8)), to(rgba(194, 191, 25, 0.8)));
  background: linear-gradient(to right,rgb(0 0 0 / 80%),rgb(0 0 0 / 80%)); */
  /* background-color: var(--primary-color); */

  z-index: -1;
}

.single-banner h2 {
  font-size: 25px;
  color: var(--white);
  text-transform: uppercase;
}

</style>
