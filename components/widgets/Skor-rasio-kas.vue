<script>
import axios from "~/plugins/axios";
import { EventBus } from "~/plugins/eventBus.js";
/**
 * Skor-roe component
 */
export default {
  data() {
    return {
      score_roe: {},
      expanded: false,
      editLayout: false,
    };
  },
  methods: {
    expandWidget() {
      this.expanded = !this.expanded;
    },
  },
  beforeMount() {
    axios.get("/score_roe").then((res) => {
      this.score_roe = res.data;
    });
  },
  created() {
    EventBus.$on("editLayout", (editLayoutBool) => {
      this.editLayout = editLayoutBool;
    });
  },
};
</script>

<template>
  <div class="card container">
    <div style="color: #1b2559; height: 32px">
      <div v-if="editLayout == false" class="row">
        <div class="col-3 tab-nav">
          <p>Periode</p>
        </div>
        <div class="col-9" style="font-size: 10px">
          <ul class="nav nav-pills nav-justified">
            <li class="nav-item">
              <a class="nav-link active" href="#">Hari</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Bulan</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Tahun</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="card-top-border" v-if="expanded == true">
        <div class="badges">
          <span>BPPSPAM</span>
        </div>

        <div class="mt-1">
          <div class="row">
            <h3 class="heading-text">Skor Rasio Kas</h3>
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
            <div class="col-6">
              <p>Skor Rasio Kas</p>
              <h2 style="margin-top: -10px">{{ score_roe.roe_score }}</h2>
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
                Skor ROE Bulan Lalu
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
        >
          <i
            style="margin-top: 7px"
            class="fa fa-angle-double-down"
            aria-hidden="true"
          ></i>
        </div>
      </div>
    </div>
    <div v-if="expanded == true">
      <div
        class="row"
        style="margin-top: 24px; margin-left: 0px; margin-right: 0px"
      >
        <p class="alternate-text">Detail Skor</p>
      </div>
      <div class="row" style="margin-bottom: -20px">
        <div class="col-9">
          <p style="color: #1b2559">Laba Setelah Pajak</p>
        </div>
        <div class="col-3">
          <p class="value-text">{{ score_roe.profit_after_tax }}</p>
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
      <div class="row" style="margin-bottom: -20px">
        <div class="col-9">
          <p style="color: #1b2559">Ekuitas</p>
        </div>
        <div class="col-3">
          <p class="value-text">{{ score_roe.equity }}</p>
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
      <div class="row" style="margin-bottom: -20px">
        <div class="col-9">
          <p style="color: #1b2559">Batas Maksimal</p>
        </div>
        <div class="col-3">
          <p class="value-text">{{ score_roe.max_limit }}</p>

          <p class="value-default-text">
            {{ score_roe.max_limit_percentage }}%
          </p>
        </div>
      </div>
      <hr />
      <div class="row" style="margin-bottom: -20px">
        <div class="col-9">
          <p style="color: #1b2559">Nilai Roe</p>
        </div>
        <div class="col-3">
          <p class="value-text">{{ score_roe.roe_value }}</p>

          <p class="value-default-text">
            {{ score_roe.roe_value_percentage }}%
          </p>
        </div>
        <div
          @click="expandWidget()"
          class="d-flex justify-content-center collapse-button"
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
