<script setup>
import { useModal } from "@/stores";

const modal =  useModal()

</script>


<template lang="">
    <div class="modal fade" v-show="modal.isOpen" style="display: block">
      <div class="modal-dialog">
        <div class="modal-content">
          <button
            class="modal-close"
            data-bs-dismiss="modal"
            @click.prevent="modal.toggleModal()"
          ><i class="fas fa-times text-light"></i></button>
          <div class="product-view">
            <div class="row">
              <div class=" col-md-12 col-lg-12">

                <slot />   

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
.modal{
    background-color: rgba(10,10,10, 0.45);
}
</style>
