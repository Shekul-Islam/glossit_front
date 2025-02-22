import { createRouter, createWebHistory } from "vue-router";
import {
  Test,
  LandingPage, TestPage
} from "@/views/pages";
import NProgress from "nprogress";
import {useAuth, useCart} from '@/stores'

let brandName = "Service Key";

const routes = [
  // Auth Pages
  {
    path: "/login",
    name: "Login",
    component: () => import('@/views/pages/User/Login.vue'),
    meta: { title: " Login", guest: true },
  },
  {
    path: "/registration",
    name: "Registration",
    component: () => import('@/views/pages/User/Registration.vue'),
    meta: { title: " Registration", guest: true },
  },
  {
    path: "/OtpLogin",
    name: "OtpLogin",
    component: () => import('@/views/pages/User/OtpLogin.vue'),
    meta: { title: " Otp-Code", guest: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import('@/views/pages/User/Profile.vue'),
    meta: { title: " Profile", requiresAuth: true },
  },
  {
    path: "/order-list",
    name: "OrderList",
    component: () => import('@/views/pages/User/OrderList.vue'),
    meta: { title: " OrderList", requiresAuth: true },
  },

  // Other pages
  {
    path: "/",
    name: "homePage",
    component: () => import('@/views/pages/HomePage/HomePage.vue'),
    meta: { title: " Home Page" },
  },
  {
    path: "/shop-page",
    name: "shopPage",
    component: () => import('@/views/pages/ShopPage/ShopPage.vue'),
    meta: { title: " Shop Page" },
  },
  {
    path: "/product-details/:slug?",
    name: "productDetailsPage",
    component: () => import('@/views/pages/ProductDetails/ProductDetailsPage.vue'),
    meta: { title: " Product Details" },
  },
  {
    path: "/checkout-page",
    name: "checkoutPage",
    component: () => import('@/views/pages/CheckoutPage.vue'),
    meta: { title: " Checkout Page" },
  },
  {
    path: "/your-order-submited",
    name: "thankYou.page",
    component: () => import('@/views/pages/ThankYou.vue'),
    meta: { title: " Thank You" },
  },
  {
    path: "/about-us",
    name: "aboutPage",
    component: () => import('@/views/pages/AboutPage.vue'),
    meta: { title: " About US" },
  },
  {
    path: "/contact-us",
    name: "contactPage",
    component: () => import('@/views/pages/ContactPage.vue'),
    meta: { title: " Contact US" },
  },
  {
    path: "/campaign",
    name: "CampaignBanner",
    component: () => import('@/views/pages/Campaign/CampaignBanner.vue'),
    meta: { title: " Campaign Page" },
  },
  {
    path: "/campaign-products/:campaignId?",
    name: "CampaignProductList",
    component: () => import('@/views/pages/Campaign/CampaignProductList.vue'),
    meta: { title: " Campaign products Page" },
  },
  {
    path: "/campaign-products-details/:campaign_slug?/:product_slug?",
    name: "CampaignProductDetails",
    component: () => import('@/views/pages/Campaign/CampaignProductDetails.vue'),
    meta: { title: "Campaign Products Details Page" },
  },  
  {
    path: "/blog-page",
    name: "blogPage",
    component: () => import('@/views/pages/BlogPage.vue'),
    meta: { title: " Blog Page" },
  },
  {
    path: "/blog-details-page/:postSlug?",
    name: "blogDetailsPage",
    component: () => import('@/views/pages/BlogDetailsPage.vue'),
    meta: { title: " Blog Details Page" },
  },
  {
    path: "/terms-and-conditions",
    name: "TermsConditions",
    component: () => import('@/views/pages/FooterPages/TermsConditions.vue'),
    meta: { title: " Terms & Conditions Page" },
  },
  {
    path: "/Privacy-Policy",
    name: "PrivacyPolicy",
    component: () => import('@/views/pages/FooterPages/PrivacyPolicy.vue'),
    meta: { title: " Privacy & Policy Page" },
  },
  {
    path: "/Privacy-Policy",
    name: "ReturnRefund",
    component: () => import('@/views/pages/FooterPages/ReturnRefund.vue'),
    meta: { title: " Return & Refund Page" },
  },
  {
    path: "/test",
    name: "test",
    component: Test,
    meta: { title: " Test Page" },
  },

  {
    path: "/:slug",
    name: "LandingPage",
    component: LandingPage,
    meta: { title: "Anon Leather | Landing Page" },
  },

// extra
{
  path: "/shekul",
  name: "TestPage",
  component: TestPage,
  meta: { title: "Anon Leather | Test Page" },
},
// extra

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  //dynamiclly scroll behavior start
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },
  //dynamiclly scroll behavior end
});

const DEFAULT_TITLE = "404";

router.beforeEach(async (to, from, next) => {
  // dynamiclly page title start

  document.title = to.meta.title || DEFAULT_TITLE;

  // dynamiclly page title end

  //dynamiclly scroll behavior start
  window.scrollTo(0, 0);
  //dynamiclly scroll behavior end

  // dynamiclly page progress bar start
  NProgress.start();
  // dynamiclly page progress bar end

  // dynamiclly Auth Checking Start
  const isLogin = useAuth();
  if(to.matched.some((record)=> record.meta.requiresAuth)){
    if (!isLogin.user.user) {
      next({name: 'Login'})  
    }else{
      next()
    }
  }else if(to.matched.some((record)=> record.meta.guest)){
    if (isLogin.user.user) {
      next({name: 'homePage'})  
    }else{
      next()
    }
  }else{
    next()
  }
// dynamiclly Auth Checking End
});

// dynamiclly page progress bar start
router.afterEach(() => {
  NProgress.done();
});
// dynamiclly page progress bar end


export default router;
