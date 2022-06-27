
<script>
import { EventBus } from "~/plugins/eventBus.js";
/**
 * Skor-roe component
 */
export default {
  data() {
    return {
      editLayout: false,
      darkmode: false,
      cardClass: "card-light",
    };
  },
  methods: {
    expandWidget() {
      this.expanded = !this.expanded;
    },
  },
  created() {
    EventBus.$on("editLayout", (editLayoutBool) => {
      this.editLayout = editLayoutBool;
    });
    EventBus.$on("darkmode", (darkmodeBool) => {
      this.darkmode = darkmodeBool;
    });
  },
  watch: {
    darkmode: function (val) {
      if (val == true) {
        this.cardClass = "card-dark";
      } else {
        this.cardClass = "card-light";
      }
    },
  },
};
</script>

<style>
.card-dark {
  background-color: #233753;
  color: #ffffff !important;
}

.card-light {
  background-color: white;
  color: #1b2559 !important;
}
</style>

<template>
  <div class="card" style="height: 80vh; width: 100%" :class="cardClass">
    <!-- <div class="card-body"> -->
    <!-- <div style="background-color: white; padding: 10px; border-radius: 15px"> -->
      <div id="map-wrap">
        <iframe
          src="https://gis.pdampintar.id/map/kabupaten-gianyar?icc=eyJ1c2VybmFtZSI6ImljY09QUzAxIiwicGFzc3dvcmQiOiJpY2NQQHNzMDEifQ=="
          frameborder="0"
          style="width: 100%; height:80vh; border-radius: 15px; border: solid 5px white"
        ></iframe>
      </div>

      <!-- <client-only>
          <l-map
            :zoom="15"
            :center="[-8.6730163, 115.1542327]"
            style="z-index: 1"
          >
            <l-tile-layer
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            ></l-tile-layer>
            <l-marker :lat-lng="[-8.6730163, 115.1542327]"></l-marker>
          </l-map>
        </client-only> -->
      <!-- </div> -->
    </div>
</template>
