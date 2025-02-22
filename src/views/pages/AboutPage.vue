<script setup>
import { BannerPart } from "@/components";
import { useAbout } from "@/stores";
import { ref, onMounted } from "vue";

const about = useAbout();
const aboutUsData = ref("");

const getAboutUsData = async () => {
  aboutUsData.value = await about.getData();
};

onMounted(() => {
  getAboutUsData();
});
</script>

<template>
  <div>
    <!--=====================================
                BANNER PART START
    =======================================-->

    <BannerPart :title="'About Page'" />
    <!--=====================================
                BANNER PART END
    =======================================-->
    <div class="container">
      <section class="section_all bg-light" id="about">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="section_title_all text-center">
                <h3 class="font-weight-bold">
                  Welcome To <span class="text-custom">Lorem Ipsum</span>
                </h3>
                <p class="section_subtitle mx-auto text-muted">
                  Description-Hello and welcome to Nittonoton.com. Our website is your ultimate guide to mastering the art of homemaking and kitchen management! With a focus on quality and
                  functionality, we strive to offer a wide selection of home and kitchen tools that enhance your homemaking experience. We understand the importance of having the right tools at your
                  disposal to streamline your daily routines and enhance your daily life experiences. Explore our comprehensive guides on house gadgets, kitchen gadgets, grinders and knives. Our
                  passion lies in empowering you with the best tools and knowledge to make your everyday tasks easier and more enjoyable. Each product in our collection is crafted to deliver
                  exceptional performance and durability. We are committed to providing not just products, but solutions that simplify your daily tasks. Our team carefully selects each item, ensuring
                  they meet our high standards of quality, durability, and functionality. From the sharpest knives to the most efficient food grinder, every product is designed to meet the unique
                  needs of homemakers who value efficiency without compromising on quality. At Nittonoton.com, your satisfaction is our priority. We believe in building lasting relationships with our
                  customers by offering exceptional service and support. Have a question about a product? Need assistance with your order? Our friendly customer service team is here to help, ensuring
                  your shopping experience is seamless from start to finish. Thank you for visiting Nittonoton.com. We look forward to being your trusted source for home making tools!"
                </p>
                <div class="">
                  <i class=""></i>
                </div>
              </div>
            </div>
            <div class="col-md-12 mt-5 d-flex">
              <div class="col-md-6">
                <h3>Lorem Ipsum is simply dummy text of the printing industry.</h3>
                <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                  Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage.</p>
              </div>
              <div class="col-md-6">
                <img src="@/assets/images/About-us.jpg" alt="" class="img-fluid mx-auto d-block">
              </div>
            </div>
            <div class="col-md-12 mt-5 d-flex">
              <div class="col-md-6 me-3">
                <img src="@/assets/images/About-us.jpg" alt="" class="img-fluid mx-auto d-block">
              </div>
              <div class="col-md-6">
                <h3>Lorem Ipsum is simply dummy text of the printing industry.</h3>
                <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                  Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage.</p>
              </div>
            </div>
            <div class="col-md-12 our-team">
              <h3>Our Team</h3>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. <br>
                Lorem Ipsum has been the industry's standard dummy text.</p>
            </div>
          </div>
          <div class="row vertical_content_manage mt-5" v-for="(about, index) in aboutUsData.data" :key="index">
            <div :class="[
              'col-lg-6',
              index % 2 === 0 ? 'order-lg-2' : 'order-lg-1',
            ]">
              <div class="about_header_main mt-3">
                <h4 class="about_heading text-capitalize font-weight-bold mt-4">
                  {{ about.title }}
                </h4>
                <p class="text-muted mt-3" v-html="about.description"></p>
              </div>
            </div>
            <div :class="[
              'col-lg-6',
              index % 2 === 0 ? 'order-lg-1' : 'order-lg-2',
            ]">
              <div class="img_about mt-3">
                <img :src="about.image" alt="" class="img-fluid mx-auto d-block" />
              </div>
            </div>
          </div>

          <!-- <div class="row vertical_content_manage mt-5">
            <div class="col-lg-6">
              <div class="img_about mt-3">
                <img
                  src="https://i.ibb.co/qpz1hvM/About-us.jpg"
                  alt=""
                  class="img-fluid mx-auto d-block"
                />
              </div>
            </div>
            <div class="col-lg-6">
              <div class="about_header_main mt-3">
                <h4 class="about_heading text-capitalize font-weight-bold mt-4">
                  Lorem Ipsum is simply dummy text of the printing industry.
                </h4>
                <p class="text-muted mt-3">
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old.
                </p>

                <p class="text-muted mt-3">
                  Richard McClintock, a Latin professor at Hampden-Sydney
                  College in Virginia, looked up one of the more obscure Latin
                  words, consectetur, from a Lorem Ipsum passage.
                </p>
              </div>
            </div>
          </div> -->

          <!-- <div class="row mt-5">
            <div class="col-lg-12">
              <div class="section_title_all text-center">
                <h3 class="font-weight-bold">Our Team</h3>
                <p class="section_subtitle mx-auto text-muted">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. <br />Lorem Ipsum has been the
                  industry's standard dummy text.
                </p>
                <div class="">
                  <i class=""></i>
                </div>
              </div>
            </div>
          </div>
          <div class="main">
            <div class="profile-card">
              <div class="img">
                <img
                  src="https://1.bp.blogspot.com/-8c7QTLoyajs/YLjr2V6KYRI/AAAAAAAACO8/ViVPQpLWVM0jGh3RZhh-Ha1-1r3Oj62wQCNcBGAsYHQ/s16000/team-1-3.jpg"
                />
              </div>
              <div class="caption">
                <h3>Vin Diesel</h3>
                <p>Senior App Developer</p>
                <div class="social-links">
                  <a href="#"><i class="fab fa-facebook"></i></a>
                  <a href="#"><i class="fab fa-instagram"></i></a>
                  <a href="#"><i class="fab fa-twitter"></i></a>
                </div>
              </div>
            </div>
            <div class="profile-card">
              <div class="img">
                <img
                  src="https://1.bp.blogspot.com/-vhmWFWO2r8U/YLjr2A57toI/AAAAAAAACO4/0GBonlEZPmAiQW4uvkCTm5LvlJVd_-l_wCNcBGAsYHQ/s16000/team-1-2.jpg"
                />
              </div>
              <div class="caption">
                <h3>David Corner</h3>
                <p>Front End Developer</p>
                <div class="social-links">
                  <a href="#"><i class="fab fa-facebook"></i></a>
                  <a href="#"><i class="fab fa-instagram"></i></a>
                  <a href="#"><i class="fab fa-twitter"></i></a>
                </div>
              </div>
            </div>
            <div class="profile-card">
              <div class="img">
                <img
                  src="https://1.bp.blogspot.com/-AO5j2Y9lzME/YLjr3mxiqAI/AAAAAAAACPE/KAaYYTtQTrgBE3diTbxGoc4U4fCGx-C2gCNcBGAsYHQ/s16000/team-1-4.jpg"
                />
              </div>
              <div class="caption">
                <h3>Tom Cruise</h3>
                <p>Full Stact Developer</p>
                <div class="social-links">
                  <a href="#"><i class="fab fa-facebook"></i></a>
                  <a href="#"><i class="fab fa-instagram"></i></a>
                  <a href="#"><i class="fab fa-twitter"></i></a>
                </div>
              </div>
            </div>
          </div> -->

          <div class="row mt-3">
            <div class="col-lg-4">
              <div class="about_content_box_all mt-3">
                <div class="about_detail text-center">
                  <div class="about_icon">
                    <i class="fas fa-pencil-alt"></i>
                  </div>
                  <h5 class="text-dark text-capitalize mt-3 font-weight-bold">
                    Creative Design
                  </h5>
                  <p class="edu_desc mt-3 mb-0 text-muted">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </div>
              </div>
            </div>

            <div class="col-lg-4">
              <div class="about_content_box_all mt-3">
                <div class="about_detail text-center">
                  <div class="about_icon">
                    <i class="fab fa-angellist"></i>
                  </div>
                  <h5 class="text-dark text-capitalize mt-3 font-weight-bold">
                    We make Best Result
                  </h5>
                  <p class="edu_desc mb-0 mt-3 text-muted">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </div>
              </div>
            </div>

            <div class="col-lg-4">
              <div class="about_content_box_all mt-3">
                <div class="about_detail text-center">
                  <div class="about_icon">
                    <i class="fas fa-paper-plane"></i>
                  </div>
                  <h5 class="text-dark text-capitalize mt-3 font-weight-bold">
                    best platform
                  </h5>
                  <p class="edu_desc mb-0 mt-3 text-muted">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>


</template>

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  color: #2c3145;
}

a,
a:hover,
a:focus,
a:active {
  text-decoration: none;
  outline: none;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.section_all {
  position: relative;
  padding-top: 80px;
  padding-bottom: 80px;
  min-height: 100vh;
}

.section-title {
  font-weight: 700;
  text-transform: capitalize;
  letter-spacing: 1px;
}

.section-subtitle {
  letter-spacing: 0.4px;
  line-height: 28px;
  max-width: 550px;
}

.section-title-border {
  background-color: #000;
  height: 1 3px;
  width: 44px;
}

.section-title-border-white {
  background-color: #fff;
  height: 2px;
  width: 100px;
}

.text_custom {
  color: #00bd2a;
}

.about_icon i {
  font-size: 22px;
  height: 65px;
  width: 65px;
  line-height: 65px;
  display: inline-block;
  background: #fff;
  border-radius: 35px;
  color: #00bd2a;
  box-shadow: 0 8px 20px -2px rgba(158, 152, 153, 0.5);
}

.about_header_main .about_heading {
  max-width: 450px;
  font-size: 24px;
}

.about_icon span {
  position: relative;
  top: -10px;
}

.about_content_box_all {
  padding: 28px;
}

.inner-section,
.section_all {
  margin-bottom: 20px;
}

.our-team{
  display: flex;
  text-align: center;
  margin-top: 50px;
  flex-direction: column;
}

.main {
  width: 100%;
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-card {
  position: relative;
  font-family: sans-serif;
  width: 220px;
  height: 220px;
  background: #fff;
  padding: 30px;
  border-radius: 50%;
  box-shadow: 0 0 22px #3336;
  transition: 0.6s;
  margin: 0 25px;
}

.profile-card:hover {
  border-radius: 10px;
  height: 260px;
}

.profile-card .img {
  position: relative;
  width: 100%;
  height: 100%;
  transition: 0.6s;
  z-index: 99;
}

.profile-card:hover .img {
  transform: translateY(-60px);
}

.img img {
  width: 100%;
  border-radius: 50%;
  box-shadow: 0 0 22px #3336;
  transition: 0.6s;
}

.profile-card:hover img {
  border-radius: 10px;
}

.caption {
  text-align: center;
  transform: translateY(-80px);
  opacity: 0;
  transition: 0.6s;
}

.profile-card:hover .caption {
  opacity: 1;
}

.caption h3 {
  font-size: 21px;
  font-family: sans-serif;
}

.caption p {
  font-size: 15px;
  color: #0c52a1;
  font-family: sans-serif;
  margin: 2px 0 9px 0;
}

.caption .social-links a {
  color: #333;
  margin-right: 15px;
  font-size: 21px;
  transition: 0.6s;
}

.social-links a:hover {
  color: #0c52a1;
}
</style>
