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
    axios.get("icc-pengumuman/d299fe835e259065c5341e37b6ee8928042f8a54/2022-06-23.13:44:48").then((res) => {
      this.announcements = res.data.announcements;
      console.log(this.announcements);
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
  mounted() {
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
</style>

<template>
  <div>
    <div
      class="topnav"
      :class="sliderColor"
      style="-webkit-box-shadow: none; -moz-box-shadow: none; box-shadow: none"
    >
      
        <nav class="navbar navbar-light navbar-expand-lg topnav-menu" style="height:80px;">
          <div class="collapse navbar-collapse" id="topnav-menu-content">
            <ul class="navbar-nav">
              <div
                style="
                  height: 80px;
                  background-color: #011a3d;
                  padding-left: 20px;
                  padding-right: 20px;
                "
              >
                <div class="row">
                  <div class="col-md-5">
                    <p
                      style="
                        color: white;
                        text-align: left;
                        vertical-align: baseline;
                        padding-top: 17px;
                        padding-bottom: 17px;
                        width: 200px;
                      "
                    >
                      {{ today }}
                    </p>
                  </div>
                  <div class="col-md-7">
                    <div style="width: 230px; margin-top: 10px">
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
            <div style="width: 80%">
              <div class="marquee-parent">
                <div class="marquee-child">
                  <div
                    v-for="(announcement, index) in announcements"
                    :key="index"
                    :class="{
                      'announcement-box-green': announcement.color === 'green',
                      'announcement-box-red': announcement.color === 'red',
                    }"
                  >
                    <div>+{{ announcement.count }}</div>
                    {{ announcement.message }}
                  </div>
                </div>
              </div>
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
