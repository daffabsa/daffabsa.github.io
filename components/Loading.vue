<script>
import lottie from "vue-lottie/src/lottie.vue";
import * as loadingWidgetAnim from "~/assets/lottie/logo-loading.json";

/**
 * Loading component
 */
export default {
  components: {
    lottie,
  },
  data: () => ({
    loading: false,
    anim: null,
    lottieOptions: {
      animationData: loadingWidgetAnim.default,
      autoplay: true,
    },
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
  },
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
