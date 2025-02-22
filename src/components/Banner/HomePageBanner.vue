<script setup></script>

<template>
  <div>
    <div class="container mt-4 mb-5">
      <div class="row">
        <div class="col-md-6 mb-4">
          <div class="img-section">
            <img src="https://anonleather.com/wp-content/uploads/2023/10/9b43855c-ba05-4705-98b9-5bc48549f5bf-800x800.jpg" alt="" style="max-width: 100%;">
          </div>
        </div>
        <div class="col-md-6 mb-4">
          <div class="img-section">
            <img src="https://anonleather.com/wp-content/uploads/2023/10/48d31af1-3df5-4515-b0d4-26beca93fa79-800x800.jpg" alt="" style="max-width: 100%;">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.img-section{
  overflow: hidden;
}

.img-section:hover img{
  transform: scale(1.5);
  transition: 2s;
}

.img-section img{
  transition: 1s;
}

</style>
