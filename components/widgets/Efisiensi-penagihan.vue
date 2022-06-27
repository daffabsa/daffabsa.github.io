<script>
import axios from "~/plugins/axios";
import { EventBus } from "~/plugins/eventBus.js";
import lottie from "vue-lottie/src/lottie.vue";
import * as addWidgetAnim from "~/assets/lottie/loading-widget.json";
/**
 * Skor-roe component
 */
export default {
  components: {
    lottie,
  },
  data() {
    return {
      efektivitas_penagihan: null,
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
  beforeMount() {
    setTimeout(() => {
      axios.get("icc-efektivitaspenagihan/d299fe835e259065c5341e37b6ee8928042f8a54/2022-06-23.13:44:48/2022/rekap").then((res) => {
        this.efektivitas_penagihan = res.data;
        if(this.efektivitas_penagihan.data.presentase.includes('-')){
          this.boxValueColor = "box-value-red";
        } else {
          this.boxValueColor = "box-value-green";
        }
      });
    }, 2000);
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
  max-height: 255px;
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
    :class="[expanded ? cardAfter : cardBefore, cardClass]"
  >
    <div style="margin: 20px 0px" v-if="efektivitas_penagihan == null">
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
                <a class="nav-link" :class="activePeriod" href="#">Hari</a>
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
        :class="contentCard"
        style="border-radius: 15px 15px 0px 0px"
      >
        <div
          class="card-top-border"
          :class="[expanded ? cardTopAfter : cardTopBefore, cardTopBorder]"
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
                Efektivitas Penagihan
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
                  Last Updated: 09.15 WITA
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-7">
                <p>Efektivitas Penagihan</p>
                <h2 style="margin-top: -10px">
                  {{ efektivitas_penagihan.data.efektifitaspenagihan }}%
                </h2>
              </div>
              <div class="col-5">
                <div :class="boxValueColor">
                  <div class="row">
                    <i class="fas fa-arrow-down box-value-icon" v-if="boxValueColor == 'box-value-red'"></i>
                    <i class="fas fa-arrow-up box-value-icon" v-else-if="boxValueColor == 'box-value-green'"></i>
                    <i class="fas fa-equals box-value-icon" v-else></i>
                    <p class="box-value-text">{{ efektivitas_penagihan.data.presentase}}</p>
                  </div>
                </div>
              </div>
              <span class="container horirow"></span>
              <div class="row" style="margin: 10px; 0px; width:100%">
                <div class="col-8">
                  <div class="row">
                    <p style="color: #e9edf7; font-size: 12px; margin-top: 4px">
                      Penerimaan
                      <span
                        style="
                          color: white;
                          font-weight: bold;
                          margin-left: 7px;
                          font-size: 15px;
                        "
                      >
                        Rp{{ efektivitas_penagihan.data.penerimaanair }}
                      </span>
                    </p>
                  </div>
                </div>
                <div class="col-4">
                  <div class="row">
                    <p style="color: #e9edf7; font-size: 12px; margin-top: 4px">
                      DRD

                      <span
                        style="
                          color: white;
                          font-weight: bold;
                          margin-left: 7px;
                          font-size: 15px;
                        "
                      >
                        Rp {{ efektivitas_penagihan.data.rekeningair }}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            @click="expandWidget()"
            class="d-flex justify-content-center expand-button"
            v-if="expanded == false"
            style="cursor: pointer"
          >
            <i
              style="margin-top: 7px"
              class="fa fa-angle-double-down"
              aria-hidden="true"
            ></i>
          </div>
        </div>
      </div>

      <div
        class="row"
        :class="contentCard"
        style="padding-top: 24px; padding-left: 20px; padding-right: 20px"
      >
        <p class="alternate-text">Detail</p>
      </div>
      <div class="row">
        <div
          @click="expandWidget()"
          class="d-flex justify-content-center collapse-button"
          :class="collapseButton"
          style="cursor: pointer"
        >
          <i
            style="margin-top: 7px"
            class="fa fa-angle-double-up"
            aria-hidden="true"
          ></i>
        </div>
      </div>
      <br />
    </div>

    <!-- end card-body -->
  </div>
  <!-- end card-->
</template>
