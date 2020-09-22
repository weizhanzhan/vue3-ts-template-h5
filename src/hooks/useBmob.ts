import { getCurrentInstance } from "vue";

export const useBmob = () => {
  const app = getCurrentInstance();
  const bomb = app && app.appContext.config.globalProperties.$bmob;
  return [bomb];
};
