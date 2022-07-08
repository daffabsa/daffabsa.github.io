<script>
import axios from "~/plugins/axios";
import { EventBus } from "~/plugins/eventBus.js";
import lottie from "vue-lottie/src/lottie.vue";
import * as addWidgetAnim from "~/assets/lottie/loading-widget.json";
import moment from "moment";
/**
 * Skor-roe component
 */
export default {
  components: {
    lottie,
  },
  data() {
    return {
      efektivitas_pembacaan: null,
      expanded: false,
      editLayout: false,
      cardBefore: "card-efisiensi-before",
      cardAfter: "card-efisiensi-after",
      cardTopBefore: "card-top-before",
      cardTopAfter: "card-top-after",
      darkmode: false,
      cardClass: "card-light",
      cardTopBorder: "card-top-border-light",
      contentCard: "content-light",
      collapseButton: "collapse-button-light",
      activePeriod: "active-light",
      boxValueColor: "box-value-default",
      anim: null,
      lottieOptions: {
        animationData: addWidgetAnim.default,
        autoplay: true,
      },
      today: '',
    };
  },
  methods: {
    expandWidget() {
      this.expanded = !this.expanded;
    },
    handleAnimation(anim) {
      this.anim = anim;
    },
    stop() {
      this.anim.stop();
    },
    play() {
      this.anim.play();
    },
    pause() {
      this.anim.pause();
    },
  },
  mounted(){
    if(localStorage.darkmode) {
      this.darkmode = localStorage.darkmode
    }
  },
  beforeMount() {
    setTimeout(() => {
      axios.get("icc-efektivitaspembacaan/b91727d8799abcdd352d164bbb9615d9c4dd4316/2022-06-28.10:16:26").then((res) => {
        this.efektivitas_pembacaan = res.data;
        if(this.efektivitas_pembacaan.data.presentase.includes('-')){
          this.boxValueColor = "box-value-red";
        } else {
          this.boxValueColor = "box-value-green";
        }
      });
    }, 2000);
    moment.locale("id");
    this.today = moment(Date()).format("LT");
  },
  created() {
    EventBus.$on("editLayout", (editLayoutBool) => {
      this.editLayout = editLayoutBool;
    });
    EventBus.$on("darkmode", (darkmodeBool) => {
      this.darkmode = darkmodeBool;
    });
  },
  watch: {
    darkmode: function (val) {
      if (val == true) {
        this.cardClass = "card-dark";
        this.cardTopBorder = "card-top-border-dark";
        this.contentCard = "content-dark";
        this.collapseButton = "collapse-button-dark";
        this.activePeriod = "active-dark";
      } else {
        this.cardClass = "card-light";
        this.cardTopBorder = "card-top-border-light";
        this.contentCard = "content-light";
        this.collapseButton = "collapse-button-light";
        this.activePeriod = "active-light";
      }
    },
  },
};
</script>
<style>
.card-efisiensi-before {
  max-height: 285px;
  transition: all 500ms ease;
  overflow: hidden;
}

.card-efisiensi-after {
  max-height: 406px;
  transition: all 500ms ease;
  overflow: hidden;
}

.card-top-before {
  max-height: 0px;
  transition: all 500ms ease;
  margin-bottom: -20px;
  overflow: hidden;
}

.card-top-after {
  max-height: 94px;
  transition: all 500ms ease;
  overflow: hidden;
}
</style>

<template>
  <div
    class="card container"
    :class="[expanded ? cardAfter : cardBefore, darkmode ? 'card-dark' : 'card-light']"
  >
    <div style="margin: 20px 0px" v-if="efektivitas_pembacaan == null">
      <lottie
        :width="250"
        :options="lottieOptions"
        @animCreated="handleAnimation"
      />
    </div>

    <div v-else>
      <div style="color: #1b2559; height: 32px">
        <div v-if="editLayout == false" class="row header-card">
          <div class="col-3 tab-nav">
            <p
              :style="
                darkmode
                  ? { color: 'white !important' }
                  : { color: '#1B2559 !important' }
              "
            >
              Periode
            </p>
          </div>
          <div class="col-9" style="font-size: 10px">
            <ul class="nav nav-pills nav-justified">
              <li class="nav-item">
                <a class="nav-link" :class="darkmode ? 'active-dark' : 'active-light'" href="#">Hari</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="#"
                  :style="
                    darkmode
                      ? { color: '#9E9E9E !important' }
                      : { color: '#1B2559 !important' }
                  "
                  >Bulan</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="#"
                  :style="
                    darkmode
                      ? { color: '#9E9E9E !important' }
                      : { color: '#1B2559 !important' }
                  "
                  >Tahun</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        class="row"
        :class="darkmode ? 'content-dark' : 'content-light'"
        style="border-radius: 15px 15px 0px 0px"
      >
        <div
          class="card-top-border"
          :class="[expanded ? cardTopAfter : cardTopBefore, darkmode ? 'card-top-border-dark' : 'card-top-border-light']"
        >
          <div class="badges">
            <span>BPPSPAM</span>
          </div>

          <div class="mt-1">
            <div class="row">
              <h3
                class="heading-text"
                :style="darkmode ? { color: 'white' } : { color: '#1B2559' }"
              >
                Efektivitas Pembacaan
              </h3>
            </div>
          </div>
        </div>
        <div class="box-card-before">
          <div style="padding: 20px 20px 0px 20px">
            <div class="row">
              <div class="col-5">
                <div class="badges">
                  <span>BPPSPAM</span>
                </div>
              </div>
              <div class="col-7">
                <p style="font-size: 10px; margin-top: 5px; float: right">
                  Last Updated: {{ today }} WITA
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-7">
                <p>Efektivitas Pembacaan</p>
                <h2 style="margin-top: -10px">
                  {{ efektivitas_pembacaan.data.efektifitaspembacaan }}%
                </h2>
              </div>
              <div class="col-5">
                <div :class="boxValueColor">
                  <div class="row">
                    <i class="fas fa-arrow-down box-value-icon" v-if="boxValueColor == 'box-value-red'"></i>
                    <i class="fas fa-arrow-up box-value-icon" v-else-if="boxValueColor == 'box-value-green'"></i>
                    <i class="fas fa-equals box-value-icon" v-else></i>
                    <p class="box-value-text">{{ efektivitas_pembacaan.data.presentase}}%</p>
                  </div>
                </div>
              </div>
              <span class="container horirow"></span>
              <div class="row" style="margin: 10px; 0px; width:100%">
                <div class="col-6">
                  <div class="row">
                    <p style="color: #e9edf7; font-size: 12px; margin-top: 4px">
                      Pelanggan Aktif
                      <span
                        style="
                          color: white;
                          font-weight: bold;
                          margin-left: 7px;
                          font-size: 13px;
                        "
                      >
                        {{ efektivitas_pembacaan.data.pelangganaktif }}
                      </span>
                    </p>
                  </div>
                </div>
                <div class="col-6">
                  <div class="row" style="float:right">
                    <p style="color: #e9edf7; font-size: 12px; margin-top: 4px; margin-right:20px">
                      Sudah Baca
                      <span
                        style="
                          color: white;
                          font-weight: bold;
                          margin-left: 7px;
                          font-size: 13px;
                        "
                      >
                        {{ efektivitas_pembacaan.data.sudahbaca }}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- end card-body -->
  </div>
  <!-- end card-->
</template>
