<script>
import { EventBus } from "~/plugins/eventBus.js";
/**
 * Topbar component
 */
export default {
  data() {
    return {
      editLayout: true,
    };
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
      this.$store.dispatch("layout/saveList1Position", {
        list: this.$store.state.layout.list1,
      });
      this.$store.dispatch("layout/saveList2Position", {
        list: this.$store.state.layout.list2,
      });
      this.$store.dispatch("layout/saveList3Position", {
        list: this.$store.state.layout.list3,
      });
      this.$store.dispatch("layout/saveBeforeListPosition1", {
        list1: this.$store.state.layout.list1,
      });
      this.$store.dispatch("layout/saveBeforeListPosition2", {
        list2: this.$store.state.layout.list2,
      });
      this.$store.dispatch("layout/saveBeforeListPosition3", {
        list3: this.$store.state.layout.list3,
      });
      this.editLayout = !this.editLayout;
      EventBus.$emit("editLayout", this.editLayout);
    },

    cancelEdit() {
      this.$store.dispatch("layout/saveList1Position", {
        list: this.$store.state.layout._list1,
      });
      this.$store.dispatch("layout/saveList2Position", {
        list: this.$store.state.layout._list2,
      });
      this.$store.dispatch("layout/saveList3Position", {
        list: this.$store.state.layout._list3,
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
      class="container-fluid"
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
