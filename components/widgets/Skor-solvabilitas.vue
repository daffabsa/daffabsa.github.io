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
      score_roe: null,
      expanded: false,
      editLayout: false,
      cardBefore: "card-skor-roe-before",
      cardAfter: "card-skor-roe-after",
      cardTopBefore: "card-top-before",
      cardTopAfter: "card-top-after",
      darkmode: false,
      cardClass: "card-light",
      cardTopBorder: "card-top-border-light",
      contentCard: "content-light",
      collapseButton: "collapse-button-light",
      activePeriod: "active-light",
      anim: null,
      lottieOptions: {
        animationData: addWidgetAnim.default,
        autoplay: true,
      },
      today: "",
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
  mounted() {
    if (localStorage.darkmode) {
      this.darkmode = localStorage.darkmode;
    }
    if (localStorage.editLayout) {
      this.editLayout = localStorage.editLayout;
    }
  },
  beforeMount() {
    setTimeout(() => {
      axios
        .get(
          "akuntansi-kinerja/7ba03428662358ed0af5d09749615f141eacd13f/2022-06-23.16:37:57/2022"
        )
        .then((res) => {
          this.score_roe = res.data;
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
.card-skor-roe-before {
  max-height: 255px;
  transition: all 500ms ease;
  overflow: hidden;
}

.card-skor-roe-after {
  max-height: 718px;
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
    :class="[
      expanded ? cardAfter : cardBefore,
      darkmode ? 'card-dark' : 'card-light',
    ]"
  >
    <div style="margin: 20px 0px" v-if="score_roe == null">
      <lottie
        :width="250"
        :options="lottieOptions"
        @animCreated="handleAnimation"
      />
    </div>

    <div v-else>
      <div style="color: #1b2559; height: 32px; margin-bottom: -1px">
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
                <a
                  class="nav-link"
                  :class="darkmode ? 'active-dark' : 'active-light'"
                  href="#"
                  >Hari</a
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
          :class="[
            expanded ? cardTopAfter : cardTopBefore,
            darkmode ? 'card-top-border-dark' : 'card-top-border-light',
          ]"
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
                Skor Solvabilitas
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
              <div class="col-6">
                <p>Skor Solvabilitas</p>
                <h2 style="margin-top: -10px">
                  {{ score_roe.data.skorsolvabilitas }}
                </h2>
              </div>
              <div class="col-6">
                <div class="box-value-default">
                  <div class="row">
                    <i class="fas fa-equals box-value-icon"></i>
                    <p class="box-value-text">0</p>
                  </div>
                </div>
              </div>
              <span class="container horirow"></span>
              <div class="row" style="margin: 10px; 0px;">
                <p style="color: #e9edf7; font-size: 12px; margin-top: 4px">
                  Skor Solvabilitas Bulan Lalu
                </p>
                <p
                  style="
                    color: white;
                    font-weight: bold;
                    margin-left: 7px;
                    font-size: 18px;
                  "
                >
                  2
                </p>
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
        :class="darkmode ? 'content-dark' : 'content-light'"
        style="margin-right: -20px; margin-left: -20px; padding: 0px 20px"
      >
        <div
          class="row"
          :class="darkmode ? 'content-dark' : 'content-light'"
          style="padding-top: 24px; padding-left: 12px; padding-right: 20px"
        >
          <p class="alternate-text">Detail Skor</p>
        </div>
        <div class="row" style="margin-bottom: -20px; margin-top: -10px">
          <div class="col-9">
            <p>Laba Setelah Pajak</p>
          </div>
          <div class="col-3">
            <p class="value-text" style="margin-bottom: 7px">
              {{ score_roe.data.lababersih }}
            </p>
            <div class="row" style="float: right; margin-right: 0px">
              <i
                class="fa fa-arrow-up"
                style="font-size: 11px; line-height: 0px; color: #009f68"
              ></i>
              <p class="value-plus-text">
                {{ score_roe.profit_after_tax_accumulatives }}%
              </p>
            </div>
          </div>
        </div>
        <hr />
        <div class="row" style="margin-bottom: -20px; margin-top: -10px">
          <div class="col-9">
            <p>Ekuitas</p>
          </div>
          <div class="col-3">
            <p class="value-text" style="margin-bottom: 7px">
              {{ score_roe.data.equitas }}
            </p>
            <div class="row" style="float: right; margin-right: 0px">
              <i
                class="fa fa-arrow-down"
                style="font-size: 11px; line-height: 0px; color: #ff4a6d"
              ></i>
              <p class="value-minus-text">
                {{ score_roe.equity_accumulatives }}%
              </p>
            </div>
          </div>
        </div>
        <hr />
        <div class="row" style="margin-bottom: -20px; margin-top: -10px">
          <div class="col-9">
            <p>Batas Maksimal</p>
          </div>
          <div class="col-3">
            <p class="value-text" style="margin-bottom: 7px">
              {{ score_roe.max_limit }}
            </p>

            <p class="value-default-text">
              {{ score_roe.max_limit_percentage }}%
            </p>
          </div>
        </div>
        <hr />
        <div class="row" style="margin-bottom: -20px; margin-top: -10px">
          <div class="col-9">
            <p>Nilai Roe</p>
          </div>
          <div class="col-3">
            <p class="value-text" style="margin-bottom: 7px">
              {{ score_roe.data.roe }}
            </p>

            <p class="value-default-text">
              {{ score_roe.roe_value_percentage }}%
            </p>
          </div>
          <div
            @click="expandWidget()"
            class="d-flex justify-content-center collapse-button"
            :class="darkmode ? 'collapse-button-dark' : 'collapse-button-light'"
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
    </div>
  </div>
</template>
