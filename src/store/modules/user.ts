export interface UserState {
  loginUser: string;
}

export default {
  state: {
    name: "VUE3.0快速入门",
    age: 18,
    github: "https://github.com/weizhanzhan",
    loginUser: ""
  },
  mutations: {
    setUserInfo(state: UserState, data: string) {
      state.loginUser = data;
    }
  }
};
