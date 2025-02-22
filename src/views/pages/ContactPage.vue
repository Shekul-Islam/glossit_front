<script setup>
import { BannerPart } from "@/components";
import { useSetting, useContact, useNotification } from "@/stores";
import { ref, onMounted } from "vue";

const setting         = useSetting();
const contact         = useContact();
const notify          = useNotification();
const email           = ref("");
const phone           = ref("");
const description     = ref("");
const address         = ref("");
const userName        = ref("");
const userEmail       = ref("");
const userPhone       = ref("");
const userDescription = ref("");

const getSettingData = async () => {
  const value = await setting.getData();
  value.data.map((ele) => {
    if (ele.key == "footer_email") {
      email.value = ele.value;
    }
    if (ele.key == "footer_address") {
      address.value = ele.value;
    }
    if (ele.key == "phone_number") {
      phone.value = ele.value;
    }
    if (ele.key == "footer_description") {
      description.value = ele.value;
    }
  });
};

const submitForm = async () => {
  const res = await contact.insertData({
    name: userName.value,
    phone: userEmail.value,
    email: userPhone.value,
    description: userDescription.value,
  });

  if (res.data.success) {
    notify.Success(
      "Your Information has been successfully submitted Thank you"
    );
    userName.value = "";
    userEmail.value = "";
    userPhone.value = "";
    userDescription.value = "";
  }
};

onMounted(() => {
  getSettingData();
  const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});
});
</script>

<template>
  <div>
    <BannerPart :title="'Contact Page'" />

    <!-- <section class="contact_us">
      <div class="container">
        <div class="row">
          <div class="col-md-10 offset-md-1">
            <div class="contact_inner">
              <div class="row">
                <div class="col-md-10">
                  <div class="contact_form_inner">
                    <div class="contact_field">
                      <h3>Contatc Us</h3>
                      <p>
                        Feel Free to contact us any time. We will get back to
                        you as soon as we can!.
                      </p>
                      <input
                        type="text"
                        class="form-control form-group"
                        placeholder="Name"
                        v-model="userName"
                      />
                      <input
                        type="text"
                        class="form-control form-group"
                        placeholder="Phone"
                        v-model="userPhone"
                      />
                      <input
                        type="text"
                        class="form-control form-group"
                        placeholder="Email"
                        v-model="userEmail"
                      />
                      <textarea
                        class="form-control form-group"
                        rows="10"
                        placeholder="Message"
                        v-model="userDescription"
                      ></textarea>
                      <button
                        class="contact_form_submit"
                        @click.prevent="submitForm"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="right_conatct_social_icon d-flex align-items-end">
                    <div class="socil_item_inner d-flex">
                      <li>
                        <a href="#"><i class="fab fa-facebook-square"></i></a>
                      </li>
                      <li>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                      </li>
                      <li>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                      </li>
                    </div>
                  </div>
                </div>
              </div>
              <div class="contact_info_sec">
                <h4>Contact Info</h4>
                <div class="d-flex info_single align-items-center">
                  <i class="fas fa-headset"></i>
                  <span>+88{{ phone }}</span>
                </div>
                <div class="d-flex info_single align-items-center">
                  <i class="fas fa-envelope-open-text"></i>
                  <span>{{ email }}</span>
                </div>
                <div class="d-flex info_single align-items-center">
                  <i class="fas fa-map-marked-alt"></i>
                  <span>{{ address }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->

  <span class="container mx-auto">
    <div class="container">
        <span class="big-circle"></span>
        <img src="" class="square" alt="" />
        <div class="form">
          <div class="contact-info">
            <h3 class="title">Let's get in touch</h3>
            <p class="text">{{ description }}</p>
  
            <div class="info">
              <div class="information">
                <i class="fas fa-map-marker-alt"></i> &nbsp &nbsp
  
                <p>{{ address }}</p>
              </div>
              <div class="information">
                <i class="fas fa-envelope"></i> &nbsp &nbsp
                <p>{{ email }}</p>
              </div>
              <div class="information">
                <i class="fas fa-phone"></i>&nbsp&nbsp
                <p>+88{{ phone }}</p>
              </div>
            </div>
  
            <div class="social-media">
              <p>Connect with us :</p>
              <div class="social-icons">
                <a href="#">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="#">
                  <i class="fab fa-instagram"></i>
                </a>
                <a href="#">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
  
          <div class="contact-form">
            <span class="circle one"></span>
            <span class="circle two"></span>
  
            <form action="index.html" autocomplete="off">
              <h3 class="title">Contact us</h3>
              <div class="input-container">
                <input type="text" name="name" class="input" v-model="userName" />
                <label for="">Username</label>
                <span>Username</span>
              </div>
              <div class="input-container">
                <input type="email" name="email" class="input" v-model="userPhone" />
                <label for="">Email</label>
                <span>Email</span>
              </div>
              <div class="input-container">
                <input type="tel" name="phone" class="input" v-model="userEmail" />
                <label for="">Phone</label>
                <span>Phone</span>
              </div>
              <div class="input-container textarea">
                <textarea name="message" class="input" v-model="userDescription"></textarea>
                <label for="">Message</label>
                <span>Message</span>
              </div>
              <input type="submit" value="Send" class="btn" @click.prevent="submitForm"/>
            </form>
          </div>
        </div>
      </div>
  </span>



  </div>
</template>

<style scoped>
/*
.right_conatct_social_icon {
  background: linear-gradient(
    to right,
    rgba(165, 36, 19, 0.8),
    rgba(170, 168, 27, 0.8)
  );
}
.contact_us {
  background-color: var(--body);
  padding: 120px 0px;
}

.contact_inner {
  background-color: #fff;
  position: relative;
  box-shadow: 20px 22px 44px #cccc;
  border-radius: 25px;
}
.contact_field {
  padding: 60px 340px 90px 100px;
}
.right_conatct_social_icon {
  height: 100%;
}

.contact_field h3 {
  color: #000;
  font-size: 40px;
  letter-spacing: 1px;
  font-weight: 600;
  margin-bottom: 10px;
}
.contact_field p {
  color: #000;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 1px;
  margin-bottom: 35px;
}
.contact_field .form-control {
  border-radius: 0px;
  border: none;
  border-bottom: 1px solid #ccc;
}
.contact_field .form-control:focus {
  box-shadow: none;
  outline: none;
  border-bottom: 2px solid #1325e8;
}
.contact_field .form-control::placeholder {
  font-size: 13px;
  letter-spacing: 1px;
}

.contact_info_sec {
  position: absolute;
  background-color: #2d2d2d;
  right: 1px;
  top: 18%;
  height: 340px;
  width: 340px;
  padding: 40px;
  border-radius: 25px 0 0 25px;
}
.contact_info_sec h4 {
  letter-spacing: 1px;
  padding-bottom: 15px;
  color: #fff;
}

.info_single {
  margin: 30px 0px;
}
.info_single i {
  margin-right: 15px;
  color: #fff;
}
.info_single span {
  font-size: 14px;
  letter-spacing: 1px;
  color: #fff;
}

button.contact_form_submit {
  background: linear-gradient(
    to right,
    rgba(165, 36, 19, 0.8),
    rgba(170, 168, 27, 0.8)
  );
  border: none;
  color: #fff;
  padding: 10px 15px;
  width: 100%;
  margin-top: 25px;
  border-radius: 35px;
  cursor: pointer;
  font-size: 14px;
  letter-spacing: 2px;
}
.socil_item_inner li {
  list-style: none;
}
.socil_item_inner li a {
  color: #fff;
  margin: 0px 15px;
  font-size: 14px;
}
.socil_item_inner {
  padding-bottom: 10px;
}

.map_sec {
  padding: 50px 0px;
}
.map_inner h4,
.map_inner p {
  color: #000;
  text-align: center;
}
.map_inner p {
  font-size: 13px;
}
.map_bind {
  margin-top: 50px;
  border-radius: 30px;
  overflow: hidden;
}
*/

@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body,
input,
textarea {
  font-family: "Poppins", sans-serif;
}

.container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f5f6f7;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form {
  width: 100%;
  max-width: 820px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.contact-form {
  background-color: #1abc9c;
  position: relative;
}

.circle {
  border-radius: 50%;
  background: linear-gradient(135deg, transparent 20%, #149279);
  position: absolute;
}

.circle.one {
  width: 130px;
  height: 130px;
  top: 130px;
  right: -40px;
}

.circle.two {
  width: 80px;
  height: 80px;
  top: 10px;
  right: 30px;
}

.contact-form:before {
  content: "";
  position: absolute;
  width: 26px;
  height: 26px;
  background-color: #1abc9c;
  transform: rotate(45deg);
  top: 50px;
  left: -13px;
}

form {
  padding: 2.3rem 2.2rem;
  z-index: 10;
  overflow: hidden;
  position: relative;
}

.title {
  color: #fff;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
  margin-bottom: 0.7rem;
}

.input-container {
  position: relative;
  margin: 1rem 0;
}

.input {
  width: 100%;
  outline: none;
  border: 2px solid #fafafa;
  background: none;
  padding: 0.6rem 1.2rem;
  color: #fff;
  font-weight: 500;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  border-radius: 5px;
  transition: 0.3s;
}

textarea.input {
  padding: 0.8rem 1.2rem;
  min-height: 150px;
  border-radius: 5px;
  resize: none;
  overflow-y: auto;
}

.input-container label {
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  padding: 0 0.4rem;
  color: #fafafa;
  font-size: 0.9rem;
  font-weight: 400;
  pointer-events: none;
  z-index: 1000;
  transition: 0.5s;
}

.input-container.textarea label {
  top: 1rem;
  transform: translateY(0);
}

.btn {
  padding: 0.6rem 1.3rem;
  background-color: #fff;
  border: 2px solid #fafafa;
  font-size: 0.95rem;
  color: #1abc9c;
  line-height: 1;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  transition: 0.3s;
  margin: 0;
  width: 100%;
}

.btn:hover {
  background-color: transparent;
  color: #fff;
}

.input-container span {
  position: absolute;
  top: 0;
  left: 25px;
  transform: translateY(-50%);
  font-size: 0.8rem;
  padding: 0 0.4rem;
  color: transparent;
  pointer-events: none;
  z-index: 500;
}

.input-container span:before,
.input-container span:after {
  content: "";
  position: absolute;
  width: 10%;
  opacity: 0;
  transition: 0.3s;
  height: 5px;
  background-color: #1abc9c;
  top: 50%;
  transform: translateY(-50%);
}

.input-container span:before {
  left: 50%;
}

.input-container span:after {
  right: 50%;
}

.input-container.focus label {
  top: 0;
  transform: translateY(-50%);
  left: 25px;
  font-size: 0.8rem;
}

.input-container.focus span:before,
.input-container.focus span:after {
  width: 50%;
  opacity: 1;
}

.contact-info {
  padding: 2.3rem 2.2rem;
  position: relative;
}

.contact-info .title {
  color: #1abc9c;
}

.text {
  color: #333;
  margin: 1.5rem 0 2rem 0;
}

.information {
  display: flex;
  color: #555;
  margin: 0.7rem 0;
  align-items: center;
  font-size: 0.95rem;
}

.information i {
  color: #1ABC9C;
}

.icon {
  width: 28px;
  margin-right: 0.7rem;
}

.social-media {
  padding: 2rem 0 0 0;
}

.social-media p {
  color: #333;
}

.social-icons {
  display: flex;
  margin-top: 0.5rem;
}

.social-icons a {
  width: 35px;
  height: 35px;
  border-radius: 5px;
  background: linear-gradient(45deg, #1abc9c, #149279);
  color: #fff;
  text-align: center;
  line-height: 35px;
  margin-right: 0.5rem;
  transition: 0.3s;
}

.social-icons a:hover {
  transform: scale(1.05);
}

.contact-info:before {
  content: "";
  position: absolute;
  width: 110px;
  height: 100px;
  border: 22px solid #1abc9c;
  border-radius: 50%;
  bottom: -77px;
  right: 50px;
  opacity: 0.3;
}

.big-circle {
  position: absolute;
  width: 448px;
  height: 465px;
  border-radius: 50%;
  background: linear-gradient(to bottom, #1cd4af, #159b80);
  bottom: 50%;
  right: 50%;
  transform: translate(-40%, 38%);
}

.big-circle:after {
  content: "";
  position: absolute;
  width: 360px;
  height: 360px;
  background-color: #f5f6f7;
  border-radius: 50%;
  top: calc(50% - 180px);
  left: calc(50% - 180px);
}

.square {
  position: absolute;
  height: 400px;
  top: 50%;
  left: 50%;
  transform: translate(181%, 11%);
  opacity: 0.2;
}

@media (max-width: 850px) {
  .form {
    grid-template-columns: 1fr;
  }

  .contact-info:before {
    bottom: initial;
    top: -75px;
    right: 65px;
    transform: scale(0.95);
  }

  .contact-form:before {
    top: -13px;
    left: initial;
    right: 70px;
  }

  .square {
    transform: translate(140%, 43%);
    height: 350px;
  }

  .big-circle {
    bottom: 75%;
    transform: scale(0.9) translate(-40%, 30%);
    right: 50%;
  }

  .text {
    margin: 1rem 0 1.5rem 0;
  }

  .social-media {
    padding: 1.5rem 0 0 0;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 1.5rem;
  }

  .contact-info:before {
    display: none;
  }

  .square,
  .big-circle {
    display: none;
  }

  form,
  .contact-info {
    padding: 1.7rem 1.6rem;
  }

  .text,
  .information,
  .social-media p {
    font-size: 0.8rem;
  }

  .title {
    font-size: 1.15rem;
  }

  .social-icons a {
    width: 30px;
    height: 30px;
    line-height: 30px;
  }

  .icon {
    width: 23px;
  }

  .input {
    padding: 0.45rem 1.2rem;
  }

  .btn {
    padding: 0.45rem 1.2rem;
  }
}

</style>
