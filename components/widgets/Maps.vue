
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
  <div class="card" style="height: 480px; width: 100%" :class="cardClass">
    <div class="card-body">
      <div id="map-wrap" style="height: 100%">
        <iframe
          src="http://pdambanyumas.net/gis/"
          frameborder="0"
          style="width: 100%; height: 100%"
        ></iframe>
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
      </div>
    </div>
  </div>
</template>
