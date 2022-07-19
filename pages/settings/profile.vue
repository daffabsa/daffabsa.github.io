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
  layout: "horizontal-settings",
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
  <div></div>
</template>
