import { createApp } from "vue";

// Import Framework7 Bundle
import Framework7 from "framework7/lite-bundle";

// Import Framework7-Vue with helper to register all components
import Framework7Vue, { registerComponents } from "framework7-vue/bundle";

// Import CSS of Framework7
import "framework7/css/bundle";

// Import your main app component
import App from "./App.vue";

// Init plugin and register all components
Framework7.use(Framework7Vue);

// create Vue app
const app = createApp(App);

// register all Framework7 Vue components by passing Vue app instance there
registerComponents(app);

// mount to #app
app.mount("#app");
