<script setup>

// import {TopView} from "@/components/";
import axiosInstance from "@/services/axiosService";
import { ref, onMounted } from "vue";

const landingPageDatas = ref("");


const getLandingPageData = async () => {
  try {
    // const res = await axiosInstance.get(`https://jsonplaceholder.typicode.com/posts`);
    const res = await axiosInstance.get(`/landing-pages/${'anon-leather-landing-page'}`);
    landingPageDatas.value = res.data.result;
    console.log(res);
    
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getLandingPageData();
});



</script>


<template>
  <h2>Data Call from Api</h2>

  
 

  <!-- <div>
    {{ landingPageDatas.sections[0].title}}
  </div>

  <div>
    {{ landingPageDatas.sections[0].sub_title}}
  </div>

  <div>
    {{ landingPageDatas.sections[0].image}}
  </div>

  <div>
    {{ landingPageDatas.sections[1].title}}
  </div>

  <div>
    {{ landingPageDatas.sections[1].sub_t}}
  </div>

  <div>
    {{ landingPageDatas.sections[1].video_url}}
  </div>

  <div>
    {{ landingPageDatas.sections[2].title}}
  </div>

  <div>
    {{ landingPageDatas.sections[2].sub_title}}
  </div>

  <div>
    {{ landingPageDatas.sections[3].title}}
  </div>

  <div>
    {{ landingPageDatas.sections[3].image}}
  </div>

  <div>
    {{ landingPageDatas.sections[4].title}}
  </div>

  <div>
    {{ landingPageDatas.sections[4].image}}
  </div>

  <div>
    {{ landingPageDatas.sections[5].title}}
  </div>

  <div>
    {{ landingPageDatas.sections[6].title}}
  </div>

  <div>
    {{ landingPageDatas.sections[6].image}}
  </div>

  <div>
    {{ landingPageDatas.sections[7].title}}
  </div>

  <div>
    {{ landingPageDatas.sections[8].title}}
  </div> -->

 
  <span v-for="(landingPageData, index) in landingPageDatas.sections" :key="index">
    <span v-if="landingPageData.layout.id == 1">
      <div :landingPageData="landingPageData">
        <h2>{{ landingPageData.title }}</h2>
        <h2>{{ landingPageData.sub_title }}</h2>
        <h2>{{ landingPageData.image }}</h2>
      </div>
    </span>

    <span v-if="landingPageData.layout.id == 2">
      <div :landingPageData="landingPageData">
        <h2>{{ landingPageData.title }}</h2>
        <h2>{{ landingPageData.sub_title }}</h2>
        <h2>{{ landingPageData.image }}</h2>
      </div>
    </span>

    <span v-if="landingPageData.layout.id == 3">
      <div :landingPageData="landingPageData">
        <h2>{{ landingPageData.title }}</h2>
        <h2>{{ landingPageData.sub_title }}</h2>
        <h2>{{ landingPageData.image }}</h2>
      </div>
    </span>

    <span v-if="landingPageData.layout.id == 4">
      <div :landingPageData="landingPageData">
        <h2>{{ landingPageData.title }}</h2>
        <h2>{{ landingPageData.sub_title }}</h2>
        <h2>{{ landingPageData.image }}</h2>
      </div>
    </span>

    <span v-if="landingPageData.layout.id == 5">
      <div :landingPageData="landingPageData">
        <h2>{{ landingPageData.title }}</h2>
        <h2>{{ landingPageData.sub_title }}</h2>
        <h2>{{ landingPageData.image }}</h2>
      </div>
    </span>

    <span v-if="landingPageData.layout.id == 6">
      <div :landingPageData="landingPageData">
        <h2>{{ landingPageData.title }}</h2>
        <h2>{{ landingPageData.sub_title }}</h2>
        <h2>{{ landingPageData.image }}</h2>
      </div>
    </span>

    <span v-if="landingPageData.layout.id == 7">
      <div :landingPageData="landingPageData">
        <h2>{{ landingPageData.title }}</h2>
        <h2>{{ landingPageData.sub_title }}</h2>
        <h2>{{ landingPageData.image }}</h2>
      </div>
    </span>

    <span v-if="landingPageData.layout.id == 8">
      <div :landingPageData="landingPageData">
        <h2>{{ landingPageData.title }}</h2>
        <h2>{{ landingPageData.sub_title }}</h2>
        <h2>{{ landingPageData.image }}</h2>
      </div>
    </span>
    

  </span>




</template>


