<template>
  <f7-page @page:init="onPageInit" name="info">
    <f7-navbar :title="title" back-link="返回" ref="navbar"></f7-navbar>
    <div class="info-container" v-if="carpark">
      <div class="upper">
        <div class="numbers">
          <div class="section">
            <span>{{ carpark.car }}</span>
            <h4>私家車位</h4>
          </div>
          <div class="section">
            <span>{{ carpark.motor }}</span>
            <h4>電單車位</h4>
          </div>
        </div>
        <div class="address">
          {{ carpark.address }}
        </div>
      </div>
      <div class="lower">
        <img
          :src="`https://maps.googleapis.com/maps/api/staticmap?center=${carpark.coordinates.lat},${carpark.coordinates.lng}&zoom=17&size=375x320&maptype=roadmap&markers=color:red|${carpark.coordinates.lat},${carpark.coordinates.lng}&key=AIzaSyDCxVlChY61Oohz7UooDcoc5YKxLwqaJHY`"
        />
      </div>
    </div>
  </f7-page>
</template>

<script>
// export default {
//   props: {
//     id: String,
//   },
//   methods: {
//     onPageInit() {
//       // eslint-disable-next-line no-console
//       console.log(this.id);
//     },
//   },
// };

export default {
  props: {
    carpark: Object,
    f7router: Object,
  },
  data() {
    return {
      title: "",
    };
  },
  methods: {
    onPageInit() {
      if (this.carpark == null) {
        this.f7router.navigate("/", { reloadAll: true });
        return;
      }

      this.title = this.carpark.name;

      // perform the following action after this.title is updated
      this.$nextTick(() => {
        // recalculate the title position
        this.$refs.navbar.size();
      });
    },
  },
};
</script>

<style scoped>
.info-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.info-container .upper,
.info-container .lower {
  flex: 0px 1 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.numbers {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.numbers .section {
  display: flex;
  flex: 0px 1 1;
  flex-direction: column;
  text-align: center;
}

.numbers .section span {
  display: block;
  font-size: 4em;
}

.numbers .section h4 {
  font-size: 1.3em;
  margin: 1em 0;
}

.address {
  text-align: center;
  padding: 0 2em;
  font-size: 1.2em;
  margin-top: 1.8em;
}

.lower img {
  display: block;
  width: 100%;
  height: auto;
}
</style>
