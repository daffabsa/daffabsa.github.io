<script>
import { EventBus } from "~/plugins/eventBus.js";

/**
 * CRM component
 */
export default {
  head() {
    return {
      title: `${this.title} Dashboard`,
    };
  },
  data() {
    return {
      darkmode: false,
      title: "ICC",
      items: [
        {
          text: "Command Center",
        },
        {
          text: "Dashboards",
        },
        {
          text: "ICC",
          active: true,
        },
      ],
      editLayout: false,
    };
  },
  created() {
    EventBus.$on("editLayout", (editLayoutBool) => {
      this.editLayout = editLayoutBool;
    });
    EventBus.$on("darkmode", (darkmodeBool) => {
      this.darkmode = darkmodeBool;
    });
    EventBus.$emit("settings", true);
  },
  methods: {},
  computed: {},
  watch: {
    editLayout(newValue) {
      if (newValue == false) {
        localStorage.removeItem("editLayout");
      } else {
        localStorage.editLayout = true;
      }
    },
    darkmode(newValue) {
      if (newValue == false) {
        localStorage.removeItem("darkmode");
      } else {
        localStorage.darkmode = true;
      }
    },
  },
  mounted() {
    if (localStorage.editLayout) this.editLayout = localStorage.editLayout;
    if (localStorage.darkmode) this.darkmode = localStorage.darkmode;
  },
  middleware: "router-auth",
};
</script>

<template>
  <div style="margin-top: -40px; margin-left: 20px; margin-right: 20px">
    <div class="row">
      <div class="col-md-3">
        <SidebarSettings />
      </div>
    </div>
  </div>
</template>
