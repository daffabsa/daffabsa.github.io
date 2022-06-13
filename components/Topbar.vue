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
      editLayout: false,
      darkmode: false,
      headerColor: "topbar-light",
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
      this.editLayout = !this.editLayout;
      EventBus.$emit("editLayout", this.editLayout);
    },

    changeDarkmode() {
      if (this.darkmode == true) {
        this.headerColor = "topbar-dark";
      } else {
        this.headerColor = "topbar-light";
      }
      EventBus.$emit("darkmode", this.darkmode);
    },
  },
};
</script>

<style>
.topbar-dark {
  background-color: #233753;
  color: white !important;
}
.topbar-light {
  background-color: white;
}
</style>

<template>
  <!-- Topbar Start -->
  <div
    class="navbar-custom"
    style="
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
      -o-user-select: none;
    "
    :class="headerColor"
  >
    <div class="container-fluid">
      <ul class="list-unstyled topnav-menu float-right mb-0">
        <li>
          <div
            style="margin-top: 25px; margin-right: 20px; margin-left: -110px"
          >
            <label
              style="
                font-family: sans-serif;
                font-weight: normal;
                font-size: 12px;
                float: left;
                margin-top: 2px;
              "
              >Dark Mode</label
            >
            <label class="switch" style="margin-left: 20px">
              <input
                type="checkbox"
                v-model="darkmode"
                v-on:change="changeDarkmode"
              />
              <span class="slider round"></span>
            </label>
          </div>
        </li>
        <b-nav-item-dropdown
          right
          class="notification-list topbar-dropdown"
          menu-class="profile-dropdown"
          toggle-class="p-0"
        >
          <template slot="button-content" class="nav-link dropdown-toggle">
            <div class="nav-user mr-0">
              <img
                src="~/assets/images/users/avatar-1.jpg"
                alt="user-image"
                class="rounded-circle"
              />

              <span
                class="pro-user-name ml-1"
                :style="
                  darkmode
                    ? { color: 'white !important' }
                    : { color: 'rgb(100,100,100) !important' }
                "
              >
                {{ $t("navbar.dropdown.name.text") }}
                <i class="mdi mdi-chevron-down"></i>
              </span>
            </div>
          </template>

          <a
            class="dropdown-item"
            style="
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
            "
          >
            <i class="fe-settings mr-1"></i>
            <span>{{ $t("navbar.dropdown.name.list.settings") }}</span>
          </a>

          <b-dropdown-divider></b-dropdown-divider>
          <a
            class="dropdown-item"
            @click="layoutEditor"
            style="
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
            "
          >
            <i class="fa fa-plus mr-1"></i>
            <span>{{ $t("navbar.dropdown.name.list.editlayout") }}</span>
          </a>

          <b-dropdown-divider></b-dropdown-divider>
          <a
            class="dropdown-item"
            @click="logoutUser"
            href="jvascript: void(0);"
          >
            <i class="fe-log-out mr-1"></i>
            <span>{{ $t("navbar.dropdown.name.list.logout") }}</span>
          </a>
        </b-nav-item-dropdown>
      </ul>

      <!-- LOGO -->
      <div class="logo-box">
        <nuxt-link to="/" class="logo logo-light text-center">
          <span class="logo-sm">
            <img
              src="~/assets/images/pdam_pintar.png"
              alt
              height="25"
              style="margin-right: 20px"
            />
          </span>
          <span class="logo-lg">
            <img
              src="~/assets/images/pdam_pintar.png"
              alt
              height="25"
              style="margin-right: 20px"
            />
            <img src="~/assets/images/tirta.png" alt height="25" />
          </span>
        </nuxt-link>
      </div>

      <div style="width: 100%; padding-top: 15px" class="textTitle">
        <p
          style="
            text-align: center;
            font-weight: bold;
            font-size: 20px;
            line-height: 10px;
          "
          :style="
            darkmode
              ? { color: 'white !important' }
              : { color: '#011a3d !important' }
          "
        >
          INTEGRATED COMMAND CENTER
        </p>
        <p
          style="
            text-align: center;
            font-weight: bold;
            font-size: 18px;
            line-height: 10px;
          "
          :style="
            darkmode
              ? { color: 'white !important' }
              : { color: '#2275ff !important' }
          "
        >
          PERUMDA TIRTA SAIL CRUISE PINK BEACH KOMODO
        </p>
      </div>

      <ul class="list-unstyled topnav-menu topnav-menu-left m-0">
        <li>
          <button
            class="button-menu-mobile waves-effect waves-light"
            @click="toggleMenu"
          >
            <i class="fe-menu"></i>
          </button>
        </li>

        <li>
          <!-- Mobile menu toggle (Horizontal Layout)-->
          <a
            class="navbar-toggle nav-link"
            data-toggle="collapse"
            @click="horizonalmenu()"
            data-target="#topnav-menu-content"
          >
            <div class="lines">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </a>
          <!-- End mobile menu toggle-->
        </li>
      </ul>
      <div class="clearfix"></div>
    </div>
  </div>
  <!-- end Topbar -->
</template>
