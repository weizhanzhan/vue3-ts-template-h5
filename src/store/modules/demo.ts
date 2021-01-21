interface DemoState {
  count: number;
}
const state: DemoState = {
  count: 0
};
export default {
  state,
  mutations: {
    increase(state: DemoState) {
      state.count++;
    },
    decrease(state: DemoState) {
      state.count--;
    }
  }
};
