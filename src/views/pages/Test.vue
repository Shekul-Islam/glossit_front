<template>
  <div 
    class="image-container" 
    @mousemove="moveLens" 
    @mouseleave="hideLens"
    @touchstart="startZoom" 
    @touchmove="moveTouchLens" 
    @touchend="hideLens">
    
    <!-- Zoom lens (magnifying glass) -->
    <div ref="lens" class="zoom-lens"></div>

    <!-- The image to zoom in on -->
    <img ref="image" :src="imageSrc" class="image" alt="Product" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Image source
const imageSrc = ref('https://img.freepik.com/free-photo/organic-cosmetic-product-with-dreamy-aesthetic-fresh-background_23-2151382816.jpg?semt=ais_hybrid');

// Refs to elements
const image = ref(null);
const lens = ref(null);

// To handle zoom activation for touch devices
let isZooming = ref(false);

// Check if the device is a touch device
const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
};

// Function to handle mouse movement for non-touch devices (PC)
const moveLens = (event) => {
  if (isTouchDevice()) return; // Avoid mouse-based zoom on touch devices

  const img = image.value;
  const lensEl = lens.value;

  // Get the bounding rectangle of the image
  const rect = img.getBoundingClientRect();

  // Get mouse position relative to image container
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // Check bounds to prevent lens from going outside the image
  const lensWidth = lensEl.offsetWidth / 2;
  const lensHeight = lensEl.offsetHeight / 2;
  let lensX = x - lensWidth;
  let lensY = y - lensHeight;

  if (lensX < 0) lensX = 0;
  if (lensY < 0) lensY = 0;
  if (lensX > img.width - lensEl.offsetWidth) lensX = img.width - lensEl.offsetWidth;
  if (lensY > img.height - lensEl.offsetHeight) lensY = img.height - lensEl.offsetHeight;

  // Move the zoom lens
  lensEl.style.left = lensX + 'px';
  lensEl.style.top = lensY + 'px';

  // Show the zoom lens
  lensEl.style.visibility = 'visible';

  // Zoom effect by changing background position of the zoomed image
  const backgroundX = (x / img.width) * 100;
  const backgroundY = (y / img.height) * 100;
  lensEl.style.backgroundPosition = `${backgroundX}% ${backgroundY}%`;
};

// Function to hide the lens when mouse leaves the image
const hideLens = () => {
  lens.value.style.visibility = 'hidden';
  isZooming.value = false;
};

// Function to start zooming when touch starts (for mobile)
const startZoom = (event) => {
  if (!isTouchDevice()) return; // Only for touch devices

  const img = image.value;
  const lensEl = lens.value;
  
  isZooming.value = true;

  // Set lens background size based on the image
  lensEl.style.backgroundImage = `url(${img.src})`;
  lensEl.style.backgroundSize = `${img.width * 2}px ${img.height * 2}px`;

  // Immediately trigger touch move to position the lens
  moveTouchLens(event);
};

// Function to handle zooming on touch move (for mobile)
const moveTouchLens = (event) => {
  if (!isZooming.value || !isTouchDevice()) return; // Only for touch devices

  const img = image.value;
  const lensEl = lens.value;

  // Get the bounding rectangle of the image
  const rect = img.getBoundingClientRect();

  // Get touch position relative to the image container
  const touch = event.touches[0];
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;

  // Check bounds to prevent lens from going outside the image
  const lensWidth = lensEl.offsetWidth / 2;
  const lensHeight = lensEl.offsetHeight / 2;
  let lensX = x - lensWidth;
  let lensY = y - lensHeight;

  if (lensX < 0) lensX = 0;
  if (lensY < 0) lensY = 0;
  if (lensX > img.width - lensEl.offsetWidth) lensX = img.width - lensEl.offsetWidth;
  if (lensY > img.height - lensEl.offsetHeight) lensY = img.height - lensEl.offsetHeight;

  // Move the zoom lens
  lensEl.style.left = lensX + 'px';
  lensEl.style.top = lensY + 'px';

  // Show the zoom lens
  lensEl.style.visibility = 'visible';

  // Zoom effect by changing background position of the zoomed image
  const backgroundX = (x / img.width) * 100;
  const backgroundY = (y / img.height) * 100;
  lensEl.style.backgroundPosition = `${backgroundX}% ${backgroundY}%`;
};
</script>

<style scoped>
.image-container {
  position: relative;
  width: 400px;
  height: 400px;
  overflow: hidden;
  cursor: crosshair;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.zoom-lens {
  position: absolute;
  width: 100px; /* Size of zoom lens */
  height: 100px;
  border: 2px solid #000;
  background-repeat: no-repeat;
  visibility: hidden;
  pointer-events: none;
  z-index: 10;
}
</style>
