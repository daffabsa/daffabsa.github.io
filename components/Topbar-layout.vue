<script>
import { EventBus } from "~/plugins/eventBus.js";
/**
 * Topbar component
 */
export default {
  head() {
    return {
      bodyAttrs: {
        class: this.darkmode ? "dark" : "light",
      },
    };
  },
  data() {
    return {
      editLayout: true,
      darkmode: false,
    };
  },
  created() {
    EventBus.$on("editLayout", (editLayoutBool) => {
      this.editLayout = editLayoutBool;
    });
    EventBus.$on("darkmode", (darkmodeBool) => {
      this.darkmode = darkmodeBool;
    });
  },
  methods: {
    /**
     * Toggle menu
     */
    toggleMenu() {
      this.$parent.toggleMenu();
    },
    /**
     * Logout user
     */
    logoutUser() {
      if (process.env.auth === "firebase") {
        this.$store.dispatch("auth/logOut");
      } else if (process.env.auth === "fakebackend") {
        this.$store.dispatch("authfack/logout");
      }
      this.$router.push({
        path: "/account/login",
      });
    },

    layoutEditor() {
      this.$store.dispatch("layout/savePositionList", {
        key: "_list1",
        list: this.$store.state.layout.datalist.list1,
      });
      this.$store.dispatch("layout/savePositionList", {
        key: "_list2",
        list: this.$store.state.layout.datalist.list2,
      });
      this.$store.dispatch("layout/savePositionList", {
        key: "_list3",
        list: this.$store.state.layout.datalist.list3,
      });
      this.editLayout = !this.editLayout;
      EventBus.$emit("editLayout", this.editLayout);
    },

    cancelEdit() {
      this.$store.dispatch("layout/savePositionList", {
        key: "list1",
        list: this.$store.state.layout.datalist._list1,
      });
      this.$store.dispatch("layout/savePositionList", {
        key: "list2",
        list: this.$store.state.layout.datalist._list2,
      });
      this.$store.dispatch("layout/savePositionList", {
        key: "list3",
        list: this.$store.state.layout.datalist._list3,
      });
      this.editLayout = !this.editLayout;
      EventBus.$emit("editLayout", this.editLayout);
    },
  },
};
</script>

<template>
  <!-- Topbar Start -->
  <div class="navbar-custom-layout">
    <div
      style="padding-top: 15px; padding-bottom: 15px"
    >
      <p
        style="
          color: white;
          font-size: 20px;
          text-align: center;
          font-weight: bold;
        "
      >
        Mode Atur Layout&nbsp;
        <button
          style="
            border-radius: 6px;
            border: 1px solid white;
            color: white;
            padding: 5px 10px;
            background-color: #4bca81;
            font-size: 14px;
          "
          @click="cancelEdit"
        >
          Batal
        </button>
        <button
          style="
            border-radius: 6px;
            border: 1px solid white;
            color: #4bca81;
            padding: 5px 10px;
            background-color: white;
            font-size: 14px;
          "
          @click="layoutEditor"
        >
          Simpan
        </button>
      </p>
      <div class="clearfix"></div>
    </div>
  </div>
  <!-- end Topbar -->
</template>
