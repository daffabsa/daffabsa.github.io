<script>
/**
 * Topbar component
 */
export default {
  data() {},
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
  },
};
</script>

<template>
  <!-- Topbar Start -->
  <div class="navbar-custom">
    <div class="container-fluid">
      <ul class="list-unstyled topnav-menu float-right mb-0">
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

              <span class="pro-user-name ml-1">
                {{ $t("navbar.dropdown.name.text") }}
                <i class="mdi mdi-chevron-down"></i>
              </span>
            </div>
          </template>

          <a class="dropdown-item">
            <i class="fe-settings mr-1"></i>
            <span>Pengaturan</span>
          </a>

          <b-dropdown-divider></b-dropdown-divider>
          <a class="dropdown-item">
            <i class="fa fa-plus mr-1"></i>
            <span>Atur Layout</span>
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
            color: #011a3d;
            text-align: center;
            font-weight: bold;
            font-size: 20px;
            line-height: 10px;
          "
        >
          INTEGRATED COMMAND CENTER
        </p>
        <p
          style="
            color: #2275ff;
            text-align: center;
            font-weight: bold;
            font-size: 18px;
            line-height: 10px;
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
