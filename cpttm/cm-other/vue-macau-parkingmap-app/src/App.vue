<template>
  <!-- Main Framework7 App component where we pass Framework7 params -->
  <f7-app v-bind="f7params">
    <!-- Main View -->
    <f7-view id="main-view" url="/" main :push-state="true"></f7-view>
  </f7-app>
</template>

<script>
import routes from "./routes";

export default {
  name: "App",
  components: {},
  data() {
    return {
      f7params: {
        name: "Carpark Info",
        id: "com.example.carpark-info",
        view: {
          browserHistory: true,
          browserHistorySeparator: "",
        },
        routes,
      },
    };
  },
};
</script>

<style></style>
