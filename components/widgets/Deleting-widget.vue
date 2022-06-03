<script>
import { EventBus } from "~/plugins/eventBus.js";
import lottie from "vue-lottie/src/lottie.vue";
import * as deletingWidgetAnim from "~/assets/lottie/delete-widget.json";
/**
 *Delete Widget component
 */
export default {
  components: {
    lottie,
  },
  data() {
    return {
      score_roe: null,
      expanded: false,
      editLayout: false,
      cardBefore: "card-skor-roe-before",
      cardAfter: "card-skor-roe-after",
      cardTopBefore: "card-top-before",
      cardTopAfter: "card-top-after",
      darkmode: false,
      cardClass: "card-light",
      cardTopBorder: "card-top-border-light",
      contentCard: "content-light",
      collapseButton: "collapse-button-light",
      activePeriod: "active-light",
      anim: null,
      lottieOptions: {
        animationData: deletingWidgetAnim.default,
        autoplay: true,
      },
    };
  },
  methods: {
    expandWidget() {
      this.expanded = !this.expanded;
    },
    handleAnimation(anim) {
      this.anim = anim;
    },
    stop() {
      this.anim.stop();
    },
    play() {
      this.anim.play();
    },
    pause() {
      this.anim.pause();
    },
  },
  created() {
    EventBus.$on("darkmode", (darkmodeBool) => {
      this.darkmode = darkmodeBool;
    });
  },
  watch: {
    darkmode: function (val) {
      if (val == true) {
        this.cardClass = "card-dark";
        this.cardTopBorder = "card-top-border-dark";
        this.contentCard = "content-dark";
        this.collapseButton = "collapse-button-dark";
        this.activePeriod = "active-dark";
      } else {
        this.cardClass = "card-light";
        this.cardTopBorder = "card-top-border-light";
        this.contentCard = "content-light";
        this.collapseButton = "collapse-button-light";
        this.activePeriod = "active-light";
      }
    },
  },
};
</script>

<style>
.card-skor-roe-before {
  max-height: 255px;
  transition: all 500ms ease;
  overflow: hidden;
}

.card-skor-roe-after {
  max-height: 718px;
  transition: all 500ms ease;
  overflow: hidden;
}

.card-top-before {
  max-height: 0px;
  transition: all 500ms ease;
  margin-bottom: -20px;
  overflow: hidden;
}

.card-top-after {
  max-height: 94px;
  transition: all 500ms ease;
  overflow: hidden;
}
</style>

<template>
  <div
    class="card container"
    :class="[expanded ? cardAfter : cardBefore, cardClass]"
  >
    <div style="margin: 20px 0px" v-if="score_roe == null">
      <lottie
        :width="250"
        :options="lottieOptions"
        @animCreated="handleAnimation"
      />
    </div>
  </div>
</template>
