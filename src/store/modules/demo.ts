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
      console.log(state);
      state.count++;
    },
    decrease(state: DemoState) {
      console.log(state);
      state.count--;
    }
  }
};
