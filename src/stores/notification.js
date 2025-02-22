import { defineStore } from "pinia";
import { ElNotification } from "element-plus";
export const useNotification = defineStore("notification", {
  state: () => ({
    type: {
      success: "success",
      warning: "warning",
      info: "info",
      error: "error",
    },

    position: "top-left",
    duration: 2000,
  }),

  actions: {
    Success(msg) {
      ElNotification({
        title: "Success",
        message: msg,
        type: this.type.success,
        position: this.position,
        duration: this.duration,
        customClass: "custom-notification-z-index",
      });
    },

    Warning(msg) {
      ElNotification({
        title: "Success",
        message: msg,
        type: this.type.warning,
        position: this.position,
        duration: this.duration,
        customClass: "custom-notification-z-index",
      });
    },

    Info(msg) {
      ElNotification({
        title: "Success",
        message: msg,
        type: this.type.info,
        position: this.position,
        duration: this.duration,
        customClass: "custom-notification-z-index",
      });
    },

    Error(msg) {
      ElNotification({
        title: "Error",
        message: msg,
        type: this.type.error,
        position: this.position,
        duration: this.duration,
        customClass: "custom-notification-z-index",
      });
    },
  },
});