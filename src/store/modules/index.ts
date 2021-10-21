// import { UserState } from "./user";

// const files = require.context(".", false, /\.ts$/);
// const modules: {
//   [key: string]: unknown;
//   user: UserState;
// } = {};
// let Realmodule = {};

// files.keys().forEach(key => {
//   if (key === "./index.ts") return;
//   modules[key.replace(/(\.\/|\.ts)/g, "")] = files(key).default;
// });

// Realmodule = Object.assign({}, modules);

// export default Realmodule;
