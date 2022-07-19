<script>
import { mapState } from "vuex";
import { EventBus } from "~/plugins/eventBus.js";
import TopbarLayout from "~/components/Topbar-layout";

/**
 * Horizontal layout
 */
export default {
  name: "horizontal",
  data() {
    return {
      editLayout: false,
      darkmode: false,
      settings: false,
    };
  },
  components: {
    TopbarLayout,
  },
  computed: mapState(["layout"]),
  mounted() {
    if (localStorage.darkmode) {
      this.darkmode = localStorage.darkmode;
    }
    document.body.setAttribute("data-layout-mode", "horizontal");
  },
  methods: {
    toggleRightSidebar() {
      document.body.classList.toggle("right-bar-enabled");
    },
    hideRightSidebar() {
      document.body.classList.remove("right-bar-enabled");
    },
  },
  created() {
    EventBus.$on("editLayout", (editLayoutBool) => {
      this.editLayout = editLayoutBool;
    });
    EventBus.$on("darkmode", (darkmodeBool) => {
      this.darkmode = darkmodeBool;
    });
    EventBus.$on("settings", (settingsBool) => {
      this.settings = settingsBool;
    });
  },
};
</script>

<template>
  <!-- Begin page -->
  <div id="wrapper">
    <div :style="editLayout == false ? 'display:block' : 'display:none'">
      <Topbar />
      <div v-if="settings == false">
        <HorizontalNavbar
          :type="layout.topbar"
          :width="layout.layoutWidth"
          :menu="layout.menuPosition"
        />
      </div>
    </div>
    <!-- ============================================================== -->
    <!-- Start Page Content here -->
    <!-- ============================================================== -->
    <div
      class="content-page"
      :style="
        darkmode ? 'background-color:#011A3D' : 'background-color: #f3f4f6 '
      "
    >
      <div class="content">
        <Nuxt />
      </div>
      <!-- content -->
    </div>
    <!-- ============================================================== -->
    <!-- End Page content -->
    <!-- ============================================================== -->
    <Rightbar />
  </div>
</template>
