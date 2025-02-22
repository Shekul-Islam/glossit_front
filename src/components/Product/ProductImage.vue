<script setup>
import { ref, onUpdated, onMounted } from "vue";

// image working start

const thumbnailImage = ref(null);
const activeImage = ref(0);
const images = ref([]);

const changeImage = (img, index) => {
  thumbnailImage.value = img;
  activeImage.value = index;
};

// image working end

// image zooming effect start

// Refs to elements
const image = ref(null);
const lens = ref(null);

// To handle zoom activation for touch devices
let isZooming = ref(false);

// Check if the device is a touch device
const isTouchDevice = () => {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
};

// Function to handle mouse movement
const moveLens = (event) => {
  if (isTouchDevice()) return; // Avoid mouse-based zoom on touch devices

  const img = image.value;
  const lensEl = lens.value;

  // Get the bounding rectangle of the image
  const rect = img.getBoundingClientRect();

  // Get mouse position relative to image
  const x = event.pageX - rect.left;
  const y = event.pageY - rect.top;

  // Check bounds to prevent lens from going outside the image
  const lensWidth = lensEl.offsetWidth / 2;
  const lensHeight = lensEl.offsetHeight / 2;
  let lensX = x - lensWidth;
  let lensY = y - lensHeight;

  if (lensX < 0) lensX = 0;
  if (lensY < 0) lensY = 0;
  if (lensX > img.width - lensEl.offsetWidth)
    lensX = img.width - lensEl.offsetWidth;
  if (lensY > img.height - lensEl.offsetHeight)
    lensY = img.height - lensEl.offsetHeight;

  // Move the zoom lens
  lensEl.style.left = lensX + "px";
  lensEl.style.top = lensY + "px";

  // Show the zoom lens
  lensEl.style.visibility = "visible";

  // Zoom effect by changing background position of the zoomed image
  const backgroundX = (x / img.width) * 100;
  const backgroundY = (y / img.height) * 100;
  lensEl.style.backgroundPosition = `${backgroundX}% ${backgroundY}%`;
};

// Function to hide the lens when mouse leaves the image
const hideLens = () => {
  lens.value.style.visibility = "hidden";
  isZooming.value = false;
};

// Function to start zooming when touch starts (for mobile)
const startZoom = (event) => {
  if (!isTouchDevice()) return; // Only for touch devices

  const img = image.value;
  const lensEl = lens.value;
  console.log(img);
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
  if (lensX > img.width - lensEl.offsetWidth)
    lensX = img.width - lensEl.offsetWidth;
  if (lensY > img.height - lensEl.offsetHeight)
    lensY = img.height - lensEl.offsetHeight;

  // Move the zoom lens
  lensEl.style.left = lensX + "px";
  lensEl.style.top = lensY + "px";

  // Show the zoom lens
  lensEl.style.visibility = "visible";

  // Zoom effect by changing background position of the zoomed image
  const backgroundX = (x / img.width) * 100;
  const backgroundY = (y / img.height) * 100;
  lensEl.style.backgroundPosition = `${backgroundX}% ${backgroundY}%`;
};
// image zooming effect end

const props = defineProps({
  singleProduct: {
    type: [Object, String],
    default: () => ({}), // Empty object as default
  },
  type: String,
});


onUpdated(() => {
  // image zooming start
  const lensEl = lens.value;
  const img = image.value;  
  lensEl.style.backgroundImage = `url(${img.src})`;
  lensEl.style.backgroundSize = `${img.width * 2}px ${img.height * 2}px`;
  // image zooming end
});

onMounted(() => {
  // image zooming start
  const lensEl = lens.value;
  const img = image.value;  
  lensEl.style.backgroundImage = `url(${img.src})`;
  lensEl.style.backgroundSize = `${img.width * 2}px ${img.height * 2}px`;
  // image zooming end
});
</script>

<template>
  <div class="col-lg-12">
    <div :class="`${type}-gallery`">
    <div :class="`${type}-label-group`" >
      <label :class="`${type}-label`" v-if="singleProduct.type">{{
        singleProduct.type
      }}</label>
      <label
        :class="`${type}-label off`"
        v-if="singleProduct.offer_percent != 0.0"
        >-{{ singleProduct.offer_percent }}%</label
      >
    </div>
    <div class="product-imgs">
      <div class="img-display">
        <div
          class="img-showcase image-container"
          @mousemove="moveLens"
          @mouseleave="hideLens"
          @touchstart="startZoom"
          @touchmove="moveTouchLens"
          @touchend="hideLens"
        >
          <div ref="lens" class="zoom-lens"></div>
          <img
            :src="singleProduct?.image"
            alt="shoe image"
            ref="image"
            class="image"
            v-if="thumbnailImage == null"
          />
          <img
            :src="thumbnailImage"
            ref="image"
            class="image"
            alt="shoe image"
            v-else
          />
        </div>
      </div>
      <div class="image-gallery">
        <div
          class="img-item"
          v-for="(img, index) in singleProduct?.images"
          :key="index"
          :class="[activeImage == index ? 'active-thumb' : '']"
        >
          <img
            :src="img.image"
            alt="shoe image"
            @click.prevent="changeImage(img.image, index)"
          />
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<style scoped>
@import "@/assets/css/product-details.css";

/* image zooming start*/
.image-container {
  position: relative;
  width: 400px;
  overflow: hidden;
  cursor: crosshair;
}



.image {
  height: 80%;
  width: 100%; /* Aspect ratio ঠিক রাখার জন্য */
  object-fit: contain; /* ইমেজ যাতে ক্রপ না হয় */
}


.zoom-lens {
  position: absolute;
  width: 150px;
  height: 150px;
  border: 2px solid #000;
  background-repeat: no-repeat;
  visibility: hidden;
  pointer-events: none;
  z-index: 10;
  border-radius: 10px;
}
/* image zooming end*/

img {
  width: 100%;
  display: block;
}

.img-display {
  overflow: hidden;
}
.img-showcase {
  display: flex;
  width: 100%;
  transition: all 0.5s ease;
}
.img-showcase img {
  max-width: 100%;
}
.img-select {
  display: flex;
}
.img-item {
  margin: 0.3rem;
}
.img-item:nth-child(1),
.img-item:nth-child(2),
.img-item:nth-child(3) {
  margin-right: 0;
}
.img-item:hover {
  opacity: 0.8;
}
.active-thumb {
  border: 2px solid #119744;
}

.image-gallery {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 5px;
}

.view-gallery .image-gallery {
  grid-template-columns: repeat(auto-fill, minmax(125px, 1fr));
}

@media (max-width: 991px) {
}

@media (max-width: 768px) {
}

@media (max-width: 767px) {
  .image-gallery {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
}

@media (max-width: 425px) {
  .view-gallery .image-gallery {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
}
</style>
