<script>

import lottie from "vue-lottie/src/lottie.vue";
import * as deletingWidgetAnim from "~/assets/lottie/delete-widget.json";

/**
 * Loading component
 */
export default {
  components: {
    lottie,
  },
  data: () => ({
    loading: false
  }),
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
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
  }
};
</script>

<template>
  <!-- Loader -->
  <div id="preloader" v-if="loading">
    <div class="card-portlets-loader">
      <lottie
        :width="250"
        :options="lottieOptions"
        @animCreated="handleAnimation"
      />
      <!-- <div class="spinner-border text-primary m-2" role="status"></div> -->
    </div>
  </div>
</template>
