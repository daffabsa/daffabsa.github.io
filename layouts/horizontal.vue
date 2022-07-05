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
    };
  },
  components: {
    TopbarLayout,
  },
  computed: mapState(["layout"]),
  mounted() {
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
  },
};
</script>

<template>
  <!-- Begin page -->
  <div id="wrapper">
    <div :style="editLayout == false ? 'display:block' : 'display:none'">
      <Topbar />
      <HorizontalNavbar
        :type="layout.topbar"
        :width="layout.layoutWidth"
        :menu="layout.menuPosition"
      />
    </div>
    <!-- ============================================================== -->
    <!-- Start Page Content here -->
    <!-- ============================================================== -->
    <div class="content-page" :style="darkmode ? 'background-color:#011A3D' : 'background-color: #f3f4f6 '">
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
