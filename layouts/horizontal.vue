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
  },
};
</script>

<template>
  <!-- Begin page -->
  <div id="wrapper">
    <div v-if="editLayout == false">
      <Topbar />
      <HorizontalNavbar
        :type="layout.topbar"
        :width="layout.layoutWidth"
        :menu="layout.menuPosition"
      />
    </div>
    <div v-else>
      <TopbarLayout />
    </div>
    <!-- ============================================================== -->
    <!-- Start Page Content here -->
    <!-- ============================================================== -->
    <div class="content-page">
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
