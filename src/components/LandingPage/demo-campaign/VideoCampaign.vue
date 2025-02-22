<script setup>
import { ref } from "vue";

const props = defineProps({
  landingPageData: {
    type: Object,
    default: {},
  },
});

// video url setup start

const getEmbedUrl = (watchUrl) => {
  const videoIdMatch = watchUrl.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  );
  const videoId = (videoIdMatch && videoIdMatch[1]) || "";

  return `https://www.youtube.com/embed/${videoId}`;
};

// video url setup end
</script>

<template>
  <div class="video-campaign-section">
    <section class="container text-center" v-if="landingPageData">
      <div class="pd-b">
        <div class="top-title-b container">
          <p>{{ landingPageData.title }}</p>
        </div>
        <div class="videoHW">
          <iframe
            class=""
            :src="getEmbedUrl(landingPageData?.video_url)"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>

        <div class="border-a">
          <div class="seb-title">
            <span class="tx-c" >{{ landingPageData.sub_title }}</span
            >
          </div>
          <div class="list-section">
            <ul>
              <li v-for="(title, index) in landingPageData.titles" :key="index">
                <span class="check-mark">&#10003;</span>
                <span>{{ title.title }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="pd-c text-center">
          <a href="#" class="order-btn-c">অর্ডার করুন</a>
        </div>
      </div>
    </section>
  </div>
</template>


<style scoped>

@import "@/assets/css/landing-page.css";

.list-section ul {
  list-style: none;
  text-align: start;
  color: black;
}
.list-section span {
  font-weight: 800;
  margin-left: 10px;
  text-align: start !important;
  line-height: 1.5;
  
}

/* video section start */
.videoHW iframe{
  width: 1290px !important;
  height: 725px !important;
}
/* video section end */

.top-title-b{
  width: 33%;
  font-size: 31px;
  padding: 16px 0px 9px 0px;
  margin-bottom: 34px;
}
.seb-title {
  padding: 15px 0px 10px 0px;
  margin-bottom: 20px;
}

.border-a{
  padding: 33px 10px 10px 10px;
  margin-bottom: 30px;
  font-display: 'hind shiliguri',  Sans-serif;
  font-size: 17px;
  border-radius: 15px;
}
.tx-c{
  font-display: 'hind shiliguri',  Sans-serif;
  font-size: 22px;
  color:white;
}

.check-mark {
  color: rgb(255, 255, 255);
  font-size: 24px;
  font-weight: 900;
  background-color: #389a4c;
  padding: 0px 6px;;
  border-radius: 5px;
}

.pd-b{
  padding-bottom: 40px;
}

@media (max-width: 1399px) {
  .videoHW iframe {
    width: 1150px !important;
    height: 725px !important;
  }

  .check-mark{
    font-size: 18px;
    padding: 1px 6px;
  }

}

@media (max-width: 1199px) {
  .top-title-b{
    width: 48%;
  }

  .videoHW iframe {
    width: 941px !important;
    height: 605px !important;
  }

}

@media (max-width: 991px) {

  .video-campaign-section .container{
    max-width: 100%;
  }

  .top-title-b{
    width: 100%;
  }

  .videoHW iframe {
    width: 723px !important;
    height: 507px !important;
  }

}

@media (max-width: 767px) {

  .video-campaign-section .container{
    max-width: 100%;
  }

  .top-title-b{
    width: 100%;
  }

  .videoHW iframe {
    width: 534px !important;
    height: 350px !important;
  }

}

@media (max-width: 575px) {

  .videoHW iframe{
    width: 477px !important;
    height: 291px !important;
  }

  .top-title-b{
    font-size: 26px;
  }

  .order-btn-c{
    font-size: 25px;
    padding: 13px;
  }

}

@media (min-width: 480px) and (max-width: 519px) {
  .videoHW iframe{
    width: 441px !important;
    height: 275px !important;
  }
}

@media (min-width: 425px) and (max-width: 480px) {
  .videoHW iframe{
    width: 384px !important;
    height: 229px !important;
  }
}


@media (min-width: 321px) and (max-width: 424px) {
  .videoHW iframe{
    width: 293px !important;
    height: 180px !important;
  }
  .tx-c{
    font-size: 18px;
  }
}


@media (max-width: 320px) {

  .list-section ul {
    list-style: none;
    text-align: start;
    color: black;
  }
  .list-section span {
    font-weight: 800;
    margin-left: 10px;
    text-align: start !important;
    line-height: 1.5;
    
  }
  
  /* video section start */
  .videoHW iframe{
    width: 293px !important;
    height: 180px !important;
  }
  /* video section end */
  
  .top-title-b{
    width: 100%;
    font-size: 14px;
    padding: 6px 0px;
    margin-bottom: 28px;
    border-radius: 14px;
  }
  .seb-title {
    padding: 6px 0px;
    margin-bottom: 20px;
}
  
  .border-a{
    padding: 33px 10px 10px 10px;
    margin-bottom: 30px;
    font-display: 'hind shiliguri',  Sans-serif;
    font-size: 17px;
    border-radius: 15px;
  }
  .tx-c{
    font-display: 'hind shiliguri',  Sans-serif;
    font-size: 15px;
    color:white;
  }
  
  .check-mark {
    color: rgb(255, 255, 255);
    font-size: 14px;
    font-weight: 900;
    background-color: #389a4c;
    padding: 0px 3px;;
    border-radius: 5px;
  }
  
  .pd-b{
    padding-bottom: 30px;
    padding-top: 27px;
  }
  

}



</style>
