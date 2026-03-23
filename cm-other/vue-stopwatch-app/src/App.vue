<template>
  <div id="app">
    <div id="stopwatch">
      {{ displayTime }}
    </div>
    <div id="stopwatch-controls">
      <button id="reset-and-lap" @click="resetAndLapHandler">
        {{ isStarted && !isStopped ? "Lap" : "Reset" }}
      </button>
      <!-- [1] -->

      <button
        id="start-and-stop"
        @click="startAndStopHandler"
        :class="{ red: isStarted && !isStopped }"
      >
        <!-- [3] -->
        {{ isStarted && !isStopped ? "Stop" : "Start" }}
      </button>

      <span id="brand">Stopwatch</span>
    </div>
    <ul id="stopwatch-records">
      <li
        :key="index"
        v-for="(lap, index) in lapsRecords"
        :class="{ red: lap.isSlowest, green: lap.isFastest }"
      >
        <span>Lap {{ lapsRecords.length - index }}</span>
        <span>{{ lap.display }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {}, // not in use
  data() {
    return {
      // start time param set
      timer: null,
      displayTime: "00:00.0",
      startTime: null,

      // reset & stop time param set
      stopTIme: null,
      stoppedTimeOffset: null,
      isStarted: false,
      isStopped: false,

      // laps time param set
      lastLapTime: null, // define first lapTime as null,
      laps: [], // define laps array
      stoppedTimeOffsetForLap: 0,
    };
  },
  methods: {
    // function calc timer start and stop
    startAndStopHandler() {
      if (!this.isStarted) {
        // start - the beginning
        this.startTime = Date.now(); // rec init start time
        this.lastLapTime = Date.now(); // rec init lap time

        this.timer = setInterval(() => {
          this.currentTime = Date.now(); // mark current time
          // let elapsedTime = this.currentTime - this.startTime; // calc elapsedTime
          let elapsedTime =
            this.currentTime - this.startTime - this.stoppedTimeOffset; // calc elapsedTime with stoppedoffset
          this.displayTime = this.formatTime((elapsedTime / 1000).toFixed(2));
        }, 10); // Build Interval observe the time change

        // define laps array for calc fast/slow
        this.laps = [
          {
            time: 0,
            display: this.displayTime,
            isFastest: false,
            isSlowest: false,
          },
        ];

        // console.log(this.displayTime); // for debug

        this.isStarted = true; // mark run
        this.isStopped = false; // mark stop
      } else if (this.isStarted && !this.isStopped) {
        // start - and pressed STOP
        clearInterval(this.timer); // Reset time
        this.stopTime = Date.now();
        this.isStopped = true; // mark stop
      } else if (this.isStarted && this.isStopped) {
        // stopped - want to start again
        this.stoppedTimeOffset += Date.now() - this.stopTime;
        // Setup record of the lapsTime

        this.timer = setInterval(() => {
          // add new Inverval
          this.currentTime = Date.now(); // add new lasptime
          let elapsedTime =
            this.currentTime - this.startTime - this.stoppedTimeOffset; // [6]
          this.displayTime = this.formatTime((elapsedTime / 1000).toFixed(2));
        }, 10); // setup new lapstime let timer continue

        this.isStopped = false;
      }
      console.log(this.displayTime);
    },

    // function reset and stop
    resetAndLapHandler() {
      // [2]
      if (this.isStarted && this.isStopped) {

        // Reset function to clear all params
        this.startTime = null;
        this.stopTime = null;
        this.stoppedTimeOffset = null;
        this.displayTime = "00:00.00";
        clearInterval(this.timer);
        this.isStarted = false;
        this.isStopped = false;
        this.laps = []; // clear the laps array

      } else if (this.isStarted && !this.isStopped) {
        // lap button clicked
        // let elapsedTime = this.currentTime - this.lastLapTime;
        let elapsedTime =
          this.currentTime - this.lastLapTime - this.stoppedTimeOffsetForLap; // [3]

        let lapTime = (elapsedTime / 1000).toFixed(2);

        this.laps.push({
          time: parseFloat(lapTime),
          display: this.formatTime(lapTime),
        });
        this.lastLapTime = this.currentTime; //
        this.stoppedTimeOffsetForLap = 0; // [4]
      }
    },
    // format time into ISOString
    formatTime(seconds) {
      let date = new Date(null);
      date.setSeconds(seconds);
      let result = date.toISOString().substr(14, 5);

      return `${result}.${(seconds + "").split(".")[1]}`;
    },
  },
  computed: {
    lapsRecords() {
      // [1]
      let lapsClone = [...this.laps];

      if (lapsClone.length > 2) {
        lapsClone = lapsClone.map((oneLap) => {
          return {
            ...oneLap,
            isFastest: false,
            isSlowest: false,
          };
        });

        let fastestIndex = 0;
        let slowestIndex = 0;

        for (let i = 0; i < lapsClone.length - 1; i++) {
          if (lapsClone[i].time < lapsClone[fastestIndex].time) {
            fastestIndex = i;
          }
          if (lapsClone[i].time > lapsClone[slowestIndex].time) {
            slowestIndex = i;
          }
        }

        lapsClone[fastestIndex].isFastest = true;
        lapsClone[slowestIndex].isSlowest = true;
      }

      return lapsClone.reverse();
    },
  },
  watch: {
    displayTime() {
      let lapsClone = [...this.laps];
      let elapsedTime =
        this.currentTime - this.lastLapTime - this.stoppedTimeOffset;
      let lapTime = (elapsedTime / 1000).toFixed(2);

      lapsClone[this.laps.length - 1] = {
        time: parseFloat(lapTime),
        display: this.formatTime(lapTime),
        isFastest: false,
        isSlowest: false,
      };

      this.laps = lapsClone;
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #000;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: #fff;
}

#stopwatch {
  flex: 0px 1 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
}

#stopwatch-records {
  flex: 0px 1 1;
}

#stopwatch-records {
  list-style: none;
  padding: 0;
  margin: 0 1.2rem;
  overflow: auto;
}

#stopwatch-records li {
  border-bottom: 1px solid #323234;
  display: flex;
  padding: 0.8rem 0;
}

#stopwatch-records li.green {
  color: #2ed158;
}

#stopwatch-records li.red {
  color: #ff453a;
}

#stopwatch-records li:first-child {
  border-top: 1px solid #323234;
}

#stopwatch-records span {
  display: block;
  flex: 0px 1 1;
}

#stopwatch-records span:last-child {
  text-align: right;
}

#stopwatch-controls {
  flex: 80px 0 0;
  padding: 0.2rem 1.2rem;
  overflow: hidden;
  position: relative;
  margin-bottom: 1.5rem;
}

#brand {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}

button#reset-and-lap,
button#start-and-stop {
  width: 80px;
  height: 80px;
  outline: none;
  background-color: #333;
  border: 2px solid #000;
  border-radius: 100%;
  color: #fff;
  font-size: 1rem;
  box-shadow: 0px 0px 0px 2px #333;
  float: left;
}

button#start-and-stop {
  background-color: #082a12;
  box-shadow: 0px 0px 0px 2px #082a12;
  color: #2ed158;
  float: right;
}

button#start-and-stop.red {
  background-color: #320e0b;
  box-shadow: 0px 0px 0px 2px #320e0b;
  color: #ff453a;
}
</style>
