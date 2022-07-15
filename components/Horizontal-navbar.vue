<script>
import { menuItems } from "../helpers/horizontal-menu";
import { mapState } from "vuex";
import axios from "~/plugins/axios";
import { EventBus } from "~/plugins/eventBus.js";
import FlipCountdown from "~/helpers/flip-clock";
import moment from "moment";
/**
 * Horiontal-navbar component
 */
export default {
  components: { FlipCountdown },
  data() {
    return {
      menuItems: menuItems,
      announcements: [],
      darkmode: false,
      sliderColor: "slider-light",
      today: "",
    };
  },
  computed: mapState(["layout"]),
  beforeMount() {
    axios
      .get(
        "icc-pengumuman/d299fe835e259065c5341e37b6ee8928042f8a54/2022-06-23.13:44:48"
      )
      .then((res) => {
        this.announcements = res.data.announcements;
      });
    moment.locale("id");
    this.today = moment(Date()).format("dddd, Do MMMM YYYY");
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      required: true,
    },
    menu: {
      type: String,
      required: true,
    },
  },
  watch: {
    darkmode: function (val) {
      if (val == true) {
        this.sliderColor = "slider-dark";
      } else {
        this.sliderColor = "slider-light";
      }
    },
    type: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "dark":
              document.body.setAttribute("data-topbar-color", "dark");
              break;
            case "light":
              document.body.setAttribute("data-topbar-color", "light");
              break;
            default:
              document.body.setAttribute("data-topbar-color", "dark");
              break;
          }
        }
      },
    },
    width: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "boxed":
              document.body.setAttribute("data-layout-width", "boxed");
              break;
            case "fluid":
              document.body.setAttribute("data-layout-mode", "horizontal");
              document.body.removeAttribute("data-layout-width");
              break;
            default:
              document.body.setAttribute("data-layout-mode", "fluid");
              break;
          }
        }
      },
    },
    menu: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "fixed":
              document.body.setAttribute("data-layout-menu-position", "fixed");
              break;
            case "scrollable":
              document.body.setAttribute(
                "data-layout-menu-position",
                "scrollable"
              );
              break;
            default:
              document.body.setAttribute("data-layout-menu-position", "fixed");
              break;
          }
        }
      },
    },
  },
  watch: {
    darkmode(newValue) {
      localStorage.darkmode = newValue;
    },
  },
  mounted() {
    if (localStorage.darkmode) {
      this.darkmode = localStorage.darkmode;
    }
    this.activateParentDropdown();

    this.$router.afterEach((routeTo, routeFrom) => {
      this.activateParentDropdown();
    });
  },
  methods: {
    activateParentDropdown() {
      const resetParent = (el) => {
        const parent = el.parentElement;
        if (parent) {
          parent.classList.remove("active");
          const parent2 = parent.parentElement;
          if (parent2) {
            parent2.classList.remove("active");
            const parent3 = parent2.parentElement;
            parent3.classList.remove("show");
            if (parent3) {
              parent3.classList.remove("active");
              const parent4 = parent3.parentElement;
              if (parent4) {
                parent4.classList.remove("active");
                const parent5 = parent4.parentElement;
                if (parent5) {
                  parent5.classList.remove("active");
                }
              }
            }
          }
        }
      };
      var links = document.getElementsByClassName("side-nav-link-ref");
      var matchingMenuItem = null;
      for (let i = 0; i < links.length; i++) {
        // reset menu
        resetParent(links[i]);
      }
      for (var i = 0; i < links.length; i++) {
        if (window.location.pathname === links[i].pathname) {
          matchingMenuItem = links[i];
          break;
        }
      }
      if (matchingMenuItem) {
        matchingMenuItem.classList.add("active");
        var parent = matchingMenuItem.parentElement;
        if (parent) {
          parent.classList.add("active");
          const parent2 = parent.parentElement;
          if (parent2) {
            parent2.classList.add("active");
            const parent3 = parent2.parentElement;
            if (parent3) {
              parent3.classList.add("active");
              const parent4 = parent3.parentElement;
              if (parent4) {
                parent4.classList.add("active");
                const parent5 = parent4.parentElement;
                if (parent5) {
                  parent5.classList.add("active");
                }
              }
            }
          }
        }
      }
    },
    /**
     * Returns true or false if given menu item has child or not
     * @param item menuItem
     */
    hasItems(item) {
      return item.subItems !== undefined ? item.subItems.length > 0 : false;
    },
    /**
     * Menu clicked show the submenu
     */
    onMenuClick(event) {
      event.preventDefault();
      const nextEl = event.target.nextSibling;
      const isHorizontal = document
        .getElementById("wrapper")
        .hasAttribute("layout");
      if (isHorizontal) {
        nextEl.parentElement.classList.add("show");
        nextEl.nextSibling.classList.add("show");
      } else {
        if (nextEl && nextEl.classList && !nextEl.classList.contains("show")) {
          const parentEl = event.target.parentNode;
          if (parentEl) {
            parentEl.classList.remove("show");
          }
          nextEl.classList.add("show");
        } else if (nextEl && nextEl.classList) {
          nextEl.classList.remove("show");
        }
      }
      return false;
    },
  },
  created() {
    EventBus.$on("darkmode", (darkmodeBool) => {
      this.darkmode = darkmodeBool;
    });
  },
};
</script>

<style>
.slider-dark {
  background-color: #233753;
}

.slider-light {
  background-color: white;
}

.marquee-wrapper {
  text-align: center;
}

.marquee-wrapper .container {
  overflow: hidden;
}

.marquee-inner span {
  float: left;
  width: 50%;
}

.marquee-wrapper .marquee-block {
  height: 60px;
  width: 124%;
  overflow: hidden;
  box-sizing: border-box;
  position: absolute;
  margin: auto;
  padding: 0;
  margin-left: -12px;
}

.marquee-inner {
  display: block;
  width: 200%;
  position: absolute;
}

.marquee-inner.to-left {
  animation: marqueeLeft 25s linear infinite;
}
.announcement-box-green {
  height: auto;
  display: inline-block;
  margin: 10px 10px;
  float: left;
  transition: all 0.2s ease-out;
  border-radius: 20px;
  background: #e6faf5;
  color: #009f68;
  padding: 8px 15px;
  font-weight: bold;
  width: auto;
}

.announcement-box-red {
  height: auto;
  display: inline-block;
  margin: 10px 10px;
  float: left;
  transition: all 0.2s ease-out;
  border-radius: 20px;
  background: #fdefed;
  color: #ff3855;
  padding: 8px 15px;
  font-weight: bold;
  width: auto;
}

.announcement-box-green div {
  border-radius: 20px;
  background: #009f68;
  color: white;
  padding: 0px 10px;
  font-weight: bold;
  display: inline;
  margin-right: 10px;
}

.announcement-box-red div {
  border-radius: 20px;
  background: #ff3855;
  color: white;
  padding: 0px 10px;
  font-weight: bold;
  display: inline;
  margin-right: 10px;
}

@keyframes marqueeLeft {
  0% {
    left: 0;
  }

  100% {
    left: -100%;
  }
}

@keyframes marqueeRight {
  0% {
    left: -100%;
  }

  100% {
    left: 0;
  }
}
</style>

<template>
  <div>
    <div
      class="topnav"
      :class="darkmode ? 'slider-dark' : 'slider-light'"
      style="-webkit-box-shadow: none; -moz-box-shadow: none; box-shadow: none"
    >
      <nav class="navbar navbar-light navbar-expand-lg topnav-menu">
        <div class="collapse navbar-collapse" id="topnav-menu-content">
          <ul class="navbar-nav" style="width: 37%">
            <div>
              <div
                class="row"
                style="
                  height: 60px;
                  width: 102%;
                  background-color: #011a3d;
                  padding-right: 20px;
                "
              >
                <div class="col-md-4" style="margin: auto">
                  <p
                    style="
                      color: white;
                      width: 200px;
                      margin-top: 15px;
                      font-size: 15px;
                    "
                  >
                    {{ today }}
                    <!-- Minggu, 27 Desember 2022 -->
                  </p>
                </div>
                <div
                  class="col-md-7"
                  style="margin-left: 30px; margin-right: -20px"
                >
                  <div style="width: 280px; margin-top: 7px; float: right">
                    <flip-countdown
                      deadline="2052-12-25 00:00:00"
                      :showDays="false"
                    ></flip-countdown>
                    <!-- <span style="font-size: 30px; color: red;">:</span> -->
                  </div>
                </div>
              </div>
            </div>
          </ul>
          <div style="width: 70%">
            <div class="marquee-wrapper">
              <div class="container">
                <div class="marquee-block">
                  <div class="marquee-inner to-left">
                    <span>
                      <div
                        v-for="(announcement, index) in announcements.slice(
                          0,
                          9
                        )"
                        :key="index"
                        :class="{
                          'announcement-box-green':
                            announcement.color === 'green',
                          'announcement-box-red': announcement.color === 'red',
                        }"
                      >
                        <div style="display: inline-block">
                          +{{ announcement.count }}
                        </div>
                        {{ announcement.message }}
                      </div>
                    </span>
                    <span>
                      <div
                        v-for="(announcement, index) in announcements.slice(
                          0,
                          9
                        )"
                        :key="index"
                        :class="{
                          'announcement-box-green':
                            announcement.color === 'green',
                          'announcement-box-red': announcement.color === 'red',
                        }"
                      >
                        <div style="display: inline-block">
                          +{{ announcement.count }}
                        </div>
                        {{ announcement.message }}
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="marquee-parent">
                <div class="marquee-child">
                  <div
                    v-for="(announcement, index) in announcements"
                    :key="index"
                    :class="{
                      'announcement-box-green': announcement.color === 'green',
                      'announcement-box-red': announcement.color === 'red',
                    }"
                    style="height: 35px !important; padding-top:5px"
                  >
                    <div style="display:inline-block">+{{ announcement.count }}</div>
                    {{ announcement.message }}
                  </div>
                </div>
              </div> -->
          </div>
          <!-- end navbar-->
        </div>
        <!-- end .collapsed-->
      </nav>
      <!-- end container-fluid -->
    </div>
    <!-- end topnav-->
  </div>
</template>
