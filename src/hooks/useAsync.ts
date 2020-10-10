import { ref, onMounted } from "vue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAsync = (func: () => Promise<any>) => {
  const loading = ref(false);

  async function doFunc() {
    try {
      loading.value = true;
      await func();
      // eslint-disable-next-line no-useless-catch
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  }

  onMounted(doFunc);

  function refresh() {
    doFunc();
  }

  return {
    loading,
    refresh
  };
};
