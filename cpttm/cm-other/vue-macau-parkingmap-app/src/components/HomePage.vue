<template>
  <f7-page>
    <f7-navbar title="Macau CarPark Info">
      <f7-nav-right>
        <f7-link @click="locateUser" v-if="!isLocating">定位</f7-link>
        <f7-preloader v-else></f7-preloader>
      </f7-nav-right>
    </f7-navbar>
    <f7-block-title strong>Macau ParkingMap List </f7-block-title>

    <f7-block class="text-align-center" v-if="carparkData.length == 0">
      <f7-preloader :size="28"></f7-preloader>
    </f7-block>

    <f7-list>
      <f7-list-item
        class="item-link"
        @click="
          f7router.navigate('/info/', {
            props: { carpark: carpark },
          })
        "
        :key="index"
        :title="carpark.name"
        :footer="`🚙 ${carpark.car} 🛵 ${carpark.motor}`"
        v-for="(carpark, index) in carparkData"
      >
        <f7-icon icon="demo-list-icon"></f7-icon>
      </f7-list-item>
    </f7-list>
  </f7-page>
</template>

<script>
import { f7ready } from "framework7-vue";
import { f7 } from "framework7-vue";

export default {
  props: {
    f7router: Object,
  },
  data() {
    return {
      carparkData: [],

      location: {
        lat: null,
        lng: null,
      },
      isLocating: false,
    };
  },
  mounted() {
    // then method:
    // f7ready(() => {
    //   fetch(`http://localhost:3000`)
    //     .then((res) => {
    //       res.json().then((json) => {
    //         // eslint-disable-next-line no-console
    //         console.log(json);
    //         this.carparkData = json;
    //       });
    //     })
    //     .catch((err) => {
    //       // eslint-disable-next-line no-console
    //       console.log(err);
    //     });
    // });
    // await method:
    f7ready(async () => {
      // try {
      //   const InfoResponse = await fetch(`http://localhost:3000`);
      //   const InfoJson = await InfoResponse.json();
      //   // console.log(InfoJson);
      //   this.carparkData = InfoJson;
      // } catch (err) {
      //   console.error(err);
      // }

      this.fetchData()
        .then((data) => {
          this.carparkData = data;
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
          f7.dialog.alert("在獲取資料時發生錯誤，請重試。", "錯誤");
        });
    });
  },

  methods: {
    refresh(done) {
      console.log("refresh triggered");

      this.fetchData().then((data) => {
        this.carparkData = data;
        done();
      });
    },
    fetchData() {
      return new Promise((resolve, reject) => {
        let url = `http://localhost:3000`;

        if (this.location.lat != null && this.location.lng != null) {
          url += `?lat=${this.location.lat}&lng=${this.location.lng}`;
          console.log(url);
        }

        fetch(url)
          .then((res) => {
            res.json().then((json) => {
              resolve(json);
            });
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    locateUser() {
      this.isLocating = true;
      navigator.geolocation.getCurrentPosition((location) => {
        // eslint-disable-next-line no-console
        console.log(location);
        this.location = {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        };
      });
    },
  },
  computed: {
    locationCombined() {
      return this.location.lat && this.location.lng;
    },
  },
  watch: {
    locationCombined() {
      // eslint-disable-next-line no-console
      console.log(`location is being updated`);

      this.fetchData()
        .then((data) => {
          this.carparkData = data;

          this.isLocating = false;
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    },
  },
};
</script>

<style>
.list .item-footer {
  color: #333;
  margin-top: 0.5em;
}
</style>
