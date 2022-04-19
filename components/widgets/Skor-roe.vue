<script>
/**
 * Skor-roe component
 */
export default {
  data() {
    return {
      roeData: {
        skor: "Value",
        profit_after_tax: "Value",
        profit_after_tax_accumulatives: "Value",
        equity: "Value",
        equity_accumulatives: "Value",
        max_limit: "Value",
        max_limit_percentage: "Value",
        roe_value: "Value",
        roe_value_percentage: "Value",
      },
    };
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
            <h2>{{ roeData.skor }}</h2>
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
            <p class="value-text">{{ roeData.profit_after_tax }}</p>
            <div class="row">
              <i
                class="fa fa-arrow-up"
                style="font-size: 11px; line-height: 0px; color: #009f68"
              ></i>
              <p class="value-plus-text">
                {{ roeData.profit_after_tax_accumulatives }}%
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
            <p class="value-text">{{ roeData.equity }}</p>
            <div class="row">
              <i
                class="fa fa-arrow-up"
                style="font-size: 11px; line-height: 0px; color: #ff4a6d"
              ></i>
              <p class="value-minus-text">
                {{ roeData.equity_accumulatives }}%
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
            <p class="value-text">{{ roeData.max_limit }}</p>

            <p class="value-default-text">
              {{ roeData.max_limit_percentage }}%
            </p>
          </div>
        </div>
        <hr />
        <div class="row" style="margin-bottom: -20px">
          <div class="col-9">
            <p style="color: #1b2559">Nilai Roe</p>
          </div>
          <div class="col-3">
            <p class="value-text">{{ roeData.roe_value }}</p>

            <p class="value-default-text">
              {{ roeData.roe_value_percentage }}%
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
