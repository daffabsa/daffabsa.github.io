<script>
import axios from "~/plugins/axios";
/**
 * Skor-roe component
 */
export default {
  data() {
    return {
      score_roe: {},
    };
  },
  beforeMount() {
    axios.get("/score_roe").then((res) => {
      this.score_roe = res.data;
    });
  },
};
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="badges">
        <span>BPPSPAM</span>
      </div>

      <div class="mt-2">
        <div class="row">
          <h3 class="heading-text">Skor ROE</h3>
        </div>
        <div class="row" style="margin-top: 10px">
          <div class="box-card">
            <p>Skor ROE</p>
            <h2>{{ score_roe.roe_score }}</h2>
          </div>
        </div>
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
        </div>
        <br />
      </div>
    </div>
    <!-- end card-body -->
  </div>
  <!-- end card-->
</template>
