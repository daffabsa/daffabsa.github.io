<script>
import axios from "~/plugins/axios";
import { EventBus } from "~/plugins/eventBus.js";
/**
 * Skor-roe component
 */
export default {
  data() {
    return {
      // billing_efficiency: {},
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
    // axios.get("/billing_efficiency").then((res) => {
    //   this.billing_efficiency = res.data;
    // });
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
            <h3 class="heading-text">Tarif Rata-Rata Bulan Ini</h3>
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
              <p>Tarif Rata-Rata Bulan Ini</p>
              <h2 style="margin-top: -10px; font-size: 22px">5.473 Rp/m3</h2>
            </div>
            <div class="col-5">
              <div class="box-value-default">
                <div class="row">
                  <i class="fas fa-equals box-value-icon"></i>
                  <p class="box-value-text">0</p>
                </div>
              </div>
            </div>
            <span class="container horirow"></span>
            <div class="row" style="margin: 10px; 0px; width:100%">
              <div class="col-6">
                <div class="row">
                  <p style="color: #e9edf7; font-size: 12px; margin-top: 4px">
                    Bulan Lalu
                    <span
                      style="
                        color: white;
                        font-weight: bold;
                        margin-left: 7px;
                        font-size: 15px;
                      "
                    >
                      5.505
                    </span>
                  </p>
                </div>
              </div>
              <div class="col-6">
                <div class="row">
                  <p style="color: #e9edf7; font-size: 12px; margin-top: 4px">
                    2 Bulan Lalu

                    <span
                      style="
                        color: white;
                        font-weight: bold;
                        margin-left: 7px;
                        font-size: 15px;
                      "
                    >
                      5.493
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
        <p class="alternate-text">Detail</p>
      </div>
      <div class="row" style="margin-bottom: -20px">
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
